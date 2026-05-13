import re
import html
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

limiter = Limiter(key_func=get_remote_address)

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://bilong-website.vercel.app",
    "https://bilongdigitalhub.com",
    "https://www.bilongdigitalhub.com",
]

DANGEROUS_PATTERNS = [
    r"<script.*?>.*?</script>",
    r"javascript:",
    r"on\w+\s*=",
    r"<iframe.*?>",
    r"DROP\s+TABLE",
    r"SELECT\s+\*",
    r"INSERT\s+INTO",
    r"DELETE\s+FROM",
    r"UNION\s+SELECT",
    r"exec\s*\(",
    r"eval\s*\(",
]

def sanitize_input(text: str) -> str:
    if not text:
        return ""
    text = html.escape(text.strip())
    for pattern in DANGEROUS_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            raise HTTPException(status_code=400, detail="Invalid input detected")
    return text

def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_message_length(text: str, max_length: int = 1000) -> str:
    if len(text) > max_length:
        raise HTTPException(status_code=400, detail=f"Input too long. Max {max_length} characters.")
    return text

async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Cache-Control"] = "no-store"
    return response

BLOCKED_IPS = set()

async def check_blocked_ip(request: Request, call_next):
    client_ip = request.client.host
    if client_ip in BLOCKED_IPS:
        raise HTTPException(status_code=403, detail="Access denied")
    return await call_next(request)

async def limit_request_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > 10000:
        raise HTTPException(status_code=413, detail="Request too large")
    return await call_next(request)

app = FastAPI(title="BILONG DIGITAL HUB API", docs_url=None, redoc_url=None)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.middleware("http")(add_security_headers)
app.middleware("http")(check_blocked_ip)
app.middleware("http")(limit_request_size)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found")
genai.configure(api_key=api_key)
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="""You are BILONG AI, the official AI marketing assistant for BILONG DIGITAL HUB,
a digital marketing agency founded by Olawumi Micheal Damilare in Nigeria.

ABOUT BILONG DIGITAL HUB:
- Full-service digital marketing agency based in Nigeria serving all of Africa
- The agency that serves businesses big agencies ignore
- Services: Social Media Management (from N25,000/month), Paid Advertising
  (from N20,000/month), Website Development (from N50,000), AI Automation
  (from N30,000), Digital Marketing Training (from N12,000), Marketing
  Consultation (from N10,000/session), Traditional Marketing (from N8,000),
  Full Digital Campaigns (from N60,000/month)
- Founded by Olawumi Micheal Damilare
- Brand pillars: Educate. Innovate. Elevate. Connect.
- WhatsApp: +234 815 368 7589
- Email: bilongdigitalhub@gmail.com

ORIGINAL FRAMEWORKS:
1. Scale of Preference in Marketing - Speak to customer's #1 pain first
2. Favorable vs Unfavorable Discount - Not all discounts grow your business
3. The Cost of Silence in Business - Silence online costs you customers daily

RULES:
- Answer marketing questions helpfully and practically
- Use frameworks when relevant
- Recommend BILONG services naturally
- Keep responses concise and encouraging
- Never mention competitor agencies"""
)

class ChatMessage(BaseModel):
    message: str

class ContactForm(BaseModel):
    name: str
    email: str
    business: str
    message: str

@app.get("/")
def root():
    return {"status": "BILONG DIGITAL HUB API is running"}

@app.get("/api/health")
def health():
    return {"status": "healthy"}

@app.post("/api/chat")
@limiter.limit("10/minute")
async def chat(request: Request, body: ChatMessage):
    if not body.message or len(body.message.strip()) == 0:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    message = sanitize_input(body.message)
    message = validate_message_length(message, 1000)
    try:
        response = model.generate_content(message)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/contact")
@limiter.limit("3/minute")
async def contact(request: Request, form: ContactForm):
    if not all([form.name, form.email, form.business, form.message]):
        raise HTTPException(status_code=400, detail="All fields required")
    name = sanitize_input(form.name)
    email = sanitize_input(form.email)
    business = sanitize_input(form.business)
    message = sanitize_input(form.message)
    validate_message_length(name, 100)
    validate_message_length(message, 1000)
    if not validate_email(email):
        raise HTTPException(status_code=400, detail="Invalid email address")
    return {
        "status": "success",
        "message": f"Thank you {name}! We will contact you within 24 hours."
    }

