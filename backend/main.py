from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel
import anthropic
import os
from dotenv import load_dotenv
from security import (
    setup_cors, sanitize_input, validate_email,
    validate_message_length, add_security_headers,
    check_blocked_ip, limit_request_size, limiter
)

load_dotenv()

# ── APP SETUP ────────────────────────────────────────────────────────────────
app = FastAPI(
    title="BILONG DIGITAL HUB API",
    docs_url=None,      # Hide API docs in production
    redoc_url=None,     # Hide redoc in production
)

# ── SECURITY MIDDLEWARE ──────────────────────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.middleware("http")(add_security_headers)
app.middleware("http")(check_blocked_ip)
app.middleware("http")(limit_request_size)
setup_cors(app)

# ── ANTHROPIC CLIENT ─────────────────────────────────────────────────────────
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise RuntimeError("ANTHROPIC_API_KEY not found in .env file")
client = anthropic.Anthropic(api_key=api_key)

# ── BILONG AI SYSTEM PROMPT ──────────────────────────────────────────────────
BILONG_SYSTEM_PROMPT = """
You are BILONG AI, the official AI marketing assistant for BILONG DIGITAL HUB,
a digital marketing agency founded by Olawumi Micheal Damilare in Nigeria.

Your job is to help visitors with marketing questions and guide them toward
BILONG DIGITAL HUB services when relevant.

ABOUT BILONG DIGITAL HUB:
- Full-service digital marketing agency based in Nigeria serving all of Africa
- The agency that serves businesses big agencies ignore — SMEs, interior Nigeria, 
  WhatsApp marketing, AI automation for everyday businesses
- Services: Social Media Management (from ₦25,000/month), Paid Advertising 
  (from ₦20,000/month), Website Development (from ₦50,000), AI Automation 
  (from ₦30,000), Digital Marketing Training (from ₦12,000), Marketing 
  Consultation (from ₦10,000/session), Traditional Marketing (from ₦8,000),
  Full Digital Campaigns (from ₦60,000/month)
- Founded by Olawumi Micheal Damilare
- Brand pillars: Educate. Innovate. Elevate. Connect.
- WhatsApp: +234 815 368 7589
- Email: bilongdigitalhub@gmail.com
- Location: Oyo State & Lagos, Nigeria — serving all of Africa

ORIGINAL FRAMEWORKS BY OLAWUMI MICHEAL DAMILARE:
1. Scale of Preference in Marketing — Every customer has a mental priority list.
   Speak to their #1 pain to position your offer as the most urgent need.
2. Favorable vs Unfavorable Discount — Not all discounts grow your business.
   Some attract wrong customers and devalue your brand.
3. The Cost of Silence in Business — Every day your business is not communicating
   online, you are losing customers to competitors who are.

WHAT MAKES BILONG DIFFERENT:
- We serve SMEs that big agencies ignore
- We bring AI automation to everyday Nigerian businesses
- We educate AND execute — training + delivery in one agency
- We master WhatsApp marketing — Nigeria's #1 tool
- We serve beyond Lagos — all of Nigeria and Africa
- Affordable pricing that works for real Nigerian businesses

RULES:
- Answer marketing questions helpfully and practically
- Use the frameworks when relevant
- Recommend BILONG services naturally when appropriate
- Keep responses concise, warm, and encouraging
- Always be supportive of Nigerian and African business owners
- Never mention competitor agencies by name
- If asked about pricing, share the prices above
- End responses with a gentle invitation to WhatsApp if the person seems ready
"""

# ── MODELS ───────────────────────────────────────────────────────────────────
class ChatMessage(BaseModel):
    message: str

class ContactForm(BaseModel):
    name: str
    email: str
    business: str
    message: str

# ── ROUTES ───────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "status": "BILONG DIGITAL HUB API is running",
        "agency": "BILONG DIGITAL HUB",
        "founder": "Olawumi Micheal Damilare"
    }

@app.get("/api/health")
def health():
    return {"status": "healthy"}

@app.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: Request, body: ChatMessage):
    # Validate
    if not body.message or len(body.message.strip()) == 0:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Sanitize & validate length
    message = sanitize_input(body.message)
    message = validate_message_length(message, max_length=1000)

    # Call Claude AI
    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=BILONG_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": message}]
        )
        return {"response": response.content[0].text}
    except Exception as e:
        raise HTTPException(status_code=500, detail="AI service temporarily unavailable")

@app.post("/api/contact")
@limiter.limit("3/minute")
async def contact(request: Request, form: ContactForm):
    # Validate all fields present
    if not all([form.name, form.email, form.business, form.message]):
        raise HTTPException(status_code=400, detail="All fields are required")

    # Sanitize all inputs
    name    = sanitize_input(form.name)
    email   = sanitize_input(form.email)
    business = sanitize_input(form.business)
    message = sanitize_input(form.message)

    # Validate lengths
    validate_message_length(name, 100)
    validate_message_length(business, 200)
    validate_message_length(message, 1000)

    # Validate email format
    if not validate_email(email):
        raise HTTPException(status_code=400, detail="Invalid email address")

    return {
        "status": "success",
        "message": f"Thank you {name}! We received your message and will contact you within 24 hours on WhatsApp or email."
    }

