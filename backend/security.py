import re
import html
from fastapi import Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address

# ── RATE LIMITER ─────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── ALLOWED ORIGINS ──────────────────────────────────────────────────────────
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://bilong-website.vercel.app",
    "https://bilongdigitalhub.com",
],
]

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type", "Authorization"],
    )

# ── INPUT SANITIZATION ───────────────────────────────────────────────────────
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
    # Escape HTML
    text = html.escape(text.strip())
    # Check for dangerous patterns
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

# ── SECURITY HEADERS ─────────────────────────────────────────────────────────
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["Cache-Control"] = "no-store"
    return response

# ── IP BLOCKLIST ─────────────────────────────────────────────────────────────
BLOCKED_IPS = set()

async def check_blocked_ip(request: Request, call_next):
    client_ip = request.client.host
    if client_ip in BLOCKED_IPS:
        raise HTTPException(status_code=403, detail="Access denied")
    return await call_next(request)

# ── REQUEST SIZE LIMIT ───────────────────────────────────────────────────────
MAX_REQUEST_SIZE = 10_000  # 10KB

async def limit_request_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > MAX_REQUEST_SIZE:
        raise HTTPException(status_code=413, detail="Request too large")
    return await call_next(request)

