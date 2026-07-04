import { useState, useRef, useEffect } from "react";

/* ── BRAND TOKENS ─────────────────────────────────────────────────────────── */
const C = {
  navy:    "#0A2342",
  navyMid: "#0d2f55",
  navyLight:"#16407a",
  sky:     "#1E90FF",
  skyLight:"#4da8ff",
  skyPale: "#e8f4ff",
  white:   "#FFFFFF",
  gray:    "#F5F5F5",
  grayMid: "#e2e8f0",
  grayText:"#64748b",
  dark:    "#0a1628",
};

/* ── LOGO SVG (matches uploaded logo) ───────────────────────────────────────*/
const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <rect width="60" height="60" rx="12" fill={C.navy}/>
    <rect width="60" height="60" rx="12" fill="url(#lg)" fillOpacity="0.3"/>
    {/* arcs */}
    <path d="M10 42 Q30 10 50 42" stroke={C.navyLight} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M15 42 Q30 16 45 42" stroke={C.sky} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M20 42 Q30 22 40 42" stroke="#60b8ff" strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* center beam */}
    <line x1="30" y1="28" x2="30" y2="44" stroke={C.white} strokeWidth="3" strokeLinecap="round"/>
    {/* base */}
    <rect x="22" y="43" width="16" height="4" rx="2" fill="#8ab4d4"/>
    {/* dots */}
    <circle cx="30" cy="27" r="3" fill={C.white}/>
    <circle cx="12" cy="36" r="2.5" fill={C.skyLight}/>
    <circle cx="48" cy="36" r="2.5" fill={C.skyLight}/>
    <circle cx="20" cy="26" r="2" fill={C.skyLight}/>
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="60" y2="60">
        <stop offset="0%" stopColor={C.sky} stopOpacity="0.4"/>
        <stop offset="100%" stopColor={C.navy} stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ── AI SYSTEM PROMPT ────────────────────────────────────────────────────────*/
const BASE_SYSTEM = `You are MarketIQ — the official AI advisor of Bilong Digital Hub, a global digital marketing platform founded in Nigeria, serving businesses and marketers worldwide.

Your ONLY areas of expertise are:
1. MARKETING (Primary) — Digital & Traditional: SEO, SEM, PPC, Social Media Marketing, Email Marketing, Content Marketing, Influencer Marketing, Affiliate Marketing, Video Marketing, Mobile Marketing, Brand Strategy, PR, Print/Outdoor, TV/Radio, Event Marketing, Consumer Psychology, Marketing Funnels, Copywriting, Campaign Planning, Market Research, Competitive Analysis, Go-To-Market Strategy, Product Launch
2. SALES (Secondary) — Lead Generation, Sales Funnels, Objection Handling, Closing Techniques, B2B & B2C Sales Strategy, Pricing Psychology, Sales Scripts, CRM Strategy, Pipeline Management
3. BUSINESS (Supportive) — Business Models, Revenue Streams, Growth Strategy, Startup Marketing, Customer Retention, Competitive Strategy, Business Planning

STRICT RULE: If anyone asks about anything outside Marketing, Sales, or Business (cooking, health, coding unrelated to marketing, politics, relationships, etc.), respond ONLY with:
"I'm MarketIQ — your specialist in Marketing, Sales & Business. That topic is outside my expertise. Ask me anything about growing your brand, increasing sales, or building your business and I'll give you expert guidance!"

GLOBAL CONTEXT: You serve users from every country and continent — USA, UK, Europe, Asia, Africa, Middle East, Latin America, Australia. You understand:
- Local market nuances: US/European consumer behavior, Asian digital platforms (WeChat, LINE, TikTok), African mobile-first markets, LATAM social commerce
- Global platforms: Google, Meta, TikTok, LinkedIn, YouTube, Amazon, Shopify, HubSpot, Mailchimp
- International business contexts: Startups, SMEs, Enterprise, D2C brands, SaaS, E-commerce, Service businesses, Agencies
- Regional examples: When relevant, tailor examples to the user's market or use globally recognised brands (Apple, Nike, Amazon, Coca-Cola, Airbnb, etc.)

RESPONSE STYLE:
- Be direct, specific, and actionable — never vague or generic
- Use real frameworks with names (AIDA, 4Ps, STP, Jobs-To-Be-Done, Blue Ocean, etc.)
- Give globally relevant examples — use well-known brands and universal strategies
- If a user mentions their country or industry, tailor your answer to their specific market
- Structure answers with bold headers and bullet points for clarity
- End EVERY response with: "**Your Next Action:** [one specific thing they can do TODAY]"
- Sound like a world-class marketing consultant, not a chatbot
- Be confident, authoritative, and results-focused`;

/* ── TOPICS ──────────────────────────────────────────────────────────────────*/
const TOPICS = [
  { icon:"🔍", title:"SEO & Search Marketing",    cat:"Digital",      q:"Teach me SEO from scratch — how do I rank on Google?" },
  { icon:"📱", title:"Social Media Marketing",     cat:"Digital",      q:"How do I build a strong social media presence for my business?" },
  { icon:"📧", title:"Email Marketing",            cat:"Digital",      q:"Teach me email marketing — how do I build a list and convert subscribers?" },
  { icon:"✍️", title:"Content Marketing",          cat:"Digital",      q:"What is content marketing and how do I use it to grow my business?" },
  { icon:"💰", title:"PPC & Paid Advertising",     cat:"Digital",      q:"How do I run profitable paid ads on Meta and Google?" },
  { icon:"📊", title:"Analytics & Data",           cat:"Digital",      q:"What marketing metrics should I track and how do I measure ROI?" },
  { icon:"🎨", title:"Brand Strategy",             cat:"Traditional",  q:"How do I build a powerful brand that people remember and trust?" },
  { icon:"📰", title:"Public Relations (PR)",      cat:"Traditional",  q:"Teach me PR — how do I get media coverage for my business?" },
  { icon:"🖨️", title:"Print & Outdoor Ads",        cat:"Traditional",  q:"How do I create effective print and outdoor advertising campaigns?" },
  { icon:"📺", title:"TV & Radio Advertising",     cat:"Traditional",  q:"How does TV and radio advertising work and when should I use it?" },
  { icon:"🎪", title:"Event Marketing",            cat:"Traditional",  q:"How do I use events, trade shows, and activations to grow my brand?" },
  { icon:"🤝", title:"Sales & Closing",            cat:"Sales",        q:"Teach me proven sales techniques and how to close more deals." },
  { icon:"🚀", title:"Growth Hacking",             cat:"Business",     q:"What are the best growth hacking strategies for a small business?" },
  { icon:"🌍", title:"Global Market Entry",        cat:"Business",     q:"How do I expand my business and market it internationally?" },
  { icon:"🛒", title:"E-commerce Marketing",       cat:"Digital",      q:"How do I market my e-commerce store and increase online sales globally?" },
  { icon:"🤖", title:"AI in Marketing",            cat:"Digital",      q:"How can I use AI tools to improve my marketing results?" },
];

const QUICK = [
  { icon:"📈", text:"Get my first 1,000 customers" },
  { icon:"🎯", text:"Build a marketing strategy for my business" },
  { icon:"✍️", text:"Write me a high-converting sales email" },
  { icon:"💰", text:"Increase my sales conversion rate" },
  { icon:"📱", text:"Grow my brand on social media from scratch" },
  { icon:"🌍", text:"How do I market my business internationally?" },
];

const PLANS = [
  {
    name:"Starter",  naira:"$9", usd:"₦13,500/mo", period:"/month",
    color: C.sky,
    features:["10 AI questions/day","Core marketing topics","Basic templates","Community access"],
    cta:"Get Started Free", popular:false,
  },
  {
    name:"Pro",      naira:"$19", usd:"₦28,500/mo", period:"/month",
    color: C.sky,
    features:["Unlimited AI questions","Full topic library","Campaign templates","Upload your content","Priority support"],
    cta:"Start Free Trial", popular:true,
  },
  {
    name:"Agency",   naira:"$79", usd:"₦118,500/mo", period:"/month",
    color: C.sky,
    features:["Everything in Pro","5 team members","Custom AI training","Strategy sessions","Dedicated support"],
    cta:"Contact Us", popular:false,
  },
];

/* ── FORMAT AI RESPONSE ──────────────────────────────────────────────────────*/
const fmt = (t) => t
  .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
  .replace(/###\s(.+)/g,"<div style='font-size:15px;font-weight:800;color:#0A2342;margin:14px 0 6px;font-family:Montserrat,sans-serif'>$1</div>")
  .replace(/##\s(.+)/g, "<div style='font-size:17px;font-weight:800;color:#0A2342;margin:16px 0 8px;font-family:Montserrat,sans-serif'>$1</div>")
  .replace(/\n- (.+)/g,"<div style='display:flex;gap:8px;margin:5px 0;align-items:flex-start'><span style='color:#1E90FF;flex-shrink:0;margin-top:2px'>▸</span><span>$1</span></div>")
  .replace(/\n(\d+)\.\s(.+)/g,"<div style='display:flex;gap:8px;margin:5px 0'><span style='color:#1E90FF;font-weight:700;flex-shrink:0;font-family:Montserrat,sans-serif'>$1.</span><span>$2</span></div>")
  .replace(/\n\n/g,"<div style='height:8px'></div>")
  .replace(/\n/g,"<br/>");

/* ══════════════════════════════════════════════════════════════════════════ */
export default function BilongMarketIQ() {
  const [view, setView]           = useState("home");
  const [topicTab, setTopicTab]   = useState("All");
  const [messages, setMessages]   = useState([{ role:"assistant", content:"__welcome__" }]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [userContent, setContent] = useState("");
  const [savedContent, setSaved]  = useState(`
=== BOOK 1: THE BRAND ARCHITECTURE BLUEPRINT ===
By Olawumi Micheal Damilare - Founder and CEO, Bilong Digital Hub

CORE CONCEPT: Every brand has two sides. Most businesses only build one and that is why they hit a growth ceiling no amount of effort can break through.
EXTERIOR BRAND: Everything communicating your quality BEFORE client says yes. Answers: Can I trust this person?
INTERIOR EXPERIENCE: Everything that happens AFTER client says yes. Answers: Did I make the right decision?

THE 6 EXTERIOR ELEMENTS:
1. Visual Identity - consistency is a credibility signal before a word is read.
2. Social Media - bio must state WHO you help and WHAT result, not generic.
3. Website First Screen - answer in seconds: who you help, what result, why trust you. If visitor must scroll to understand what you do you already lost them.
4. Visible Social Proof - specific testimonials must appear first, not buried.
5. First Communication - opens with their problem, not your offer.
6. Reputation - deliberate referral and testimonial collection system.

THE 5 INTERIOR STAGES:
1. Onboarding - warm welcome within 1 hour of commitment, confirm what they signed up for.
2. Communication - proactive updates, clients never chasing you. How you communicate IS the product.
3. Transformation - must be a documented repeatable SYSTEM not accidental delivery.
4. Offboarding - results review, next steps, personal acknowledgement, testimonial request.
5. Community - relationship continues after invoice is paid.

THE 4 BRAND ARCHITECTURE LAWS:
LAW 1 - VISIBILITY: Your brand communicates before you do. Design deliberately or lose clients you deserve.
LAW 2 - DELIVERY: Interior must match exterior promise. The gap between promise and delivery is the most expensive gap in your business.
LAW 3 - PERCEPTION: Design for how your audience experiences you, not how you see yourself.
LAW 4 - MULTI-FUNCTION ASSET: Best marketing does multiple jobs at once. Build fewer things. Build them to work harder.

BRAND DIAGNOSTIC:
Visibility Gap means exterior does not communicate quality. You are losing clients to competitors who simply look more credible.
Experience Gap means great service but no testimonials or referrals. Onboarding is unclear. Clients do not refer because experience was not designed to be memorable.
Fix exterior first. A great client journey nobody experiences because exterior fails to attract them is architecture without an audience.

KEY QUOTES:
"A brand has two sides. The outside, which determines whether people give you a chance. And the inside, which determines whether they stay, pay, and refer."
"Build the outside that brings people in. Build the inside that makes them stay. That is the architecture of a brand that does not just survive, it compounds."
"The gap between what your exterior promises and what your interior delivers is the most expensive gap in your business."

=== BOOK 2: THE MARKETING INVESTOR ===
By Olawumi Micheal Damilare - Founder and CEO, Bilong Digital Hub

CORE CONCEPT: Your brand is a financial asset. An investment portfolio with real returns that compound over time if managed correctly and erode if not. Stop spending your brand. Start investing it.

AUDIENCE EQUITY (Like Stock Investing):
Every follower represents a fractional ownership stake in your brand's future. Share real results. Acknowledge what did not work. Deliver consistent value like dividends. Your reputation is your stock price. One great case study raises it. Months of vague content lower it.

FIXED-INCOME BRAND (Predictable Revenue):
Every month starting at zero revenue is a recurring anxiety attack. Build predictable recurring income through:
1. RETAINER MODEL - convert clients from one-time projects to monthly retainers. One retainer client is worth 12x annually with zero acquisition cost after conversion.
2. COMMUNITY MEMBERSHIP - monthly subscription to course library or community. 100 members generates powerful recurring revenue with extraordinary margins.
3. MAINTENANCE PACKAGE - 3 to 6 month ongoing engagement post-project capturing clients at their most motivated.

LEVERAGED MARKETING (Multiply Impact Without Proportional Effort):
1. REPURPOSING SYSTEM - one excellent piece becomes content for 7 channels with fraction of original effort.
2. TESTIMONIAL STACK - single transformation testimonial deployed across every client acquisition touchpoint.
3. PARTNERSHIP HEDGE - strategic collaboration with complementary brand exposes you to warm pre-qualified audience at zero cost.
4. AUTOMATED FUNNEL - email sequence created once, delivers value and makes offers indefinitely 24 hours a day.

TIME VALUE OF MARKETING:
Marketing assets created today compound immediately. An email list of 500 built now will dramatically outperform the same list started later because of compounding. Every month of delay has a real calculable cost.
Compounding assets: email list, body of work, testimonial library, community relationships, platform authority.

MARKETING CAPITAL BUDGETING:
Evaluate every marketing investment by Payback Period, Ongoing Return, and Risk. Cut low-return activities ruthlessly. The same discipline a smart investor applies to loss-making positions.

BRAND BALANCE SHEET:
ASSETS: Email list, testimonials, evergreen content, community, authority positioning.
LIABILITIES: Time on low-return platforms, tools not producing results, energy on content not generating leads.

MANIFESTO: Creators produce content. Investors build systems. Creators react to trends. Investors compound assets. The market rewards the patient investor who builds real assets, not the speculator who chases every trend hoping for a quick return.

=== BOOK 3: TIMELESS MARKETING ===
By Olawumi Micheal Damilare - Founder and CEO, Bilong Digital Hub

CORE CONCEPT: There are only 3 types of marketing. The category you are in determines almost everything about your results.

THE ILLUSION OF GROWTH:
The gap between activity and results, between attention and action. Vanity metrics like followers, likes, and reach mean nothing if they do not generate revenue. Real growth is measured in qualified leads generated, conversion rate, and lifetime value. Five thousand converting followers are worth far more than 500,000 who never buy.

STYLE 1 - THE ROCOCO MARKETER (Beautiful But Unprofitable):
Visually compelling. Great engagement. Not making money. Has confused aesthetic quality with strategic quality. Optimises for how brand looks instead of converting attention into revenue.
WARNING SIGNS: Posts consistently with no clear purpose beyond engagement. Audience treats content as free entertainment. High engagement plus low revenue is the clearest possible signal of this problem.
"The Rococo marketer is building for applause. The profitable marketer is building for trust. These are not the same audience and require completely different strategies."

STYLE 2 - THE RENAISSANCE MARKETER (Strategic Foundation):
Asks what does my audience genuinely need and how can I deliver it better than anyone else.
4 PILLARS:
1. Deep Audience Knowledge - know their exact language, fears, and desires through real research and real conversations.
2. Clear Brand Identity - values, tone, visual identity, and positioning distinct from every competitor.
3. Specific Value Proposition - complete this sentence: I help [specific person] achieve [specific outcome] through [specific method]. If you cannot complete it with concrete language you have a posting schedule, not a marketing strategy.
4. Trust Before Selling - begin with the give, not the ask. Publish content that genuinely helps solve real problems.

STYLE 3 - THE BAROQUE MARKETER (Force Multiplier):
Takes Renaissance foundation and amplifies through emotional precision and strategic urgency. People decide through emotion and justify with logic afterward.
4 TOOLS:
1. Before-and-After Storytelling - reader FEELS the transformation, not just hears about it.
2. Precision Contrast - between where they are now and where they could be. Contrast creates urgency. Urgency drives decisions.
3. Emotional Spotlight - write directly to the precise emotion driving their decision right now.
4. One Clear CTA - not two, not three. ONE. Creates sense of NOW.

THE 30-DAY SYSTEM:
Week 1 - Audience research, collect exact language from real client conversations.
Week 2 - Pure value content, no offers, make trust deposits.
Week 3 - Introduce offer as natural extension of value content.
Week 4 - Measure what worked, double it, eliminate what did not.

KEY QUOTES:
"Stop trying to say everything. Pick the one thing your customer most needs to hear right now and say it with everything you know about their situation."
"We do not just teach marketing. We teach you to think like a marketer."

=== BOOK 4: THE CLEAN BRAND ===
By Olawumi Micheal Damilare - Founder and CEO, Bilong Digital Hub

CORE CONCEPT: Most brand pollution is invisible, accumulating silently and degrading from inside before symptoms become impossible to ignore. Businesses fail not from incompetence but from not knowing the pollutants exist.

CONTENT POLLUTION:
Low-quality, low-purpose content that trains the algorithm to undervalue your reach and trains your audience to scroll past without processing. A beautifully designed post with 2,000 likes can be content pollution if it serves no business purpose beyond engagement.

POLLUTION METER:
Level 1 CLEAN - 70 percent or more of content has clear strategic purpose. Audience regularly takes action.
Level 2 MILD - 50 to 70 percent has strategic purpose. Engagement decent but conversion is low.
Level 3 MODERATE - 30 to 50 percent has strategic purpose. Results have plateaued despite consistent effort.
Level 4 SEVERE - Below 30 percent has strategic purpose. Audience growing but revenue is not.

PURIFICATION RATIO: 60 percent Educate plus 20 percent Trust plus 20 percent Convert.
SPECIFICITY STANDARD: Can my ideal client do one concrete thing differently TODAY after consuming this? If no, it is pollution.

BRAND CONTAMINATION:
A specific incident like a negative review, public dispute, or unfulfilled promise that creates concentrated reputational damage. Left untreated it spreads through private conversations you cannot see.

3 STAGES:
Stage 1 - The Spill: The incident. Window for remediation is still open.
Stage 2 - The Spread: Contamination spreads to private messages. Warm leads go cold without explanation.
Stage 3 - Chronic Condition: Brand name produces hesitation in every informed potential client.

BIOREMEDIATION SYSTEM (Recovery):
1. Acknowledge before defending.
2. Remediate in public at the level contamination occurred.
3. Build visible social proof faster than contamination is spreading.
4. Genuinely reform the practice that caused the spill.
"Deleting a negative comment does not clean it. It moves it underground where it spreads faster."

5 MARKETING ECOSYSTEM SERVICES:
1. REFERRAL FOREST - systematic referrals through deliberate offboarding with referral ask.
2. CONTENT WETLAND - evergreen content that generates leads long after publication date.
3. COMMUNITY MANGROVE - loyal network that absorbs reputational threats and defends your brand without being asked.
4. AUTHORITY CANOPY - consistent expert content that protects premium pricing. Clients ask if they can afford you, not if you are cheaper.
5. ORGANIC CONVERSION PIPELINE - content attracts audience, audience builds community, community generates referrals, referrals produce clients, clients produce testimonials, testimonials build authority, authority attracts better audience. This cycle compounds without proportional increases in effort.

KEY QUOTES:
"The most dangerous form of content pollution is the kind that generates enough engagement to feel like it is working but never enough conversion to actually grow the business."
"Clean content attracts the right audience. A clean reputation converts them. A clean ecosystem sustains the growth indefinitely, without requiring you to work harder every single month."

=== ABOUT THE AUTHOR ===
Olawumi Micheal Damilare is the Founder and CEO of Bilong Digital Hub. A global digital marketing education and consulting company helping entrepreneurs, business owners, and marketers worldwide build brands that attract, convert, and retain clients consistently.
Mission: Educate. Innovate. Elevate. Connect.
Tagline: Your service is our priority.
Contact: WhatsApp +234 815 368 7589 | Instagram @bilongdigitalhub
`);

  const [charCount, setCharCount] = useState(0);
  // mobile menu reserved for future use
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const systemPrompt = () => {
    let p = BASE_SYSTEM;
    if (savedContent) p += `\n\n━━ FOUNDER'S PROPRIETARY CONTENT & BOOKS ━━\nThe following is the founder's own published marketing knowledge. Always reference and prioritise this content. Say things like "As our founder teaches in the course..." or "Based on our proven Bilong framework..."\n\n${savedContent}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    return p;
  };

  const send = async (override) => {
    const text = override || input;
    if (!text.trim() || loading) return;
    const userMsg = { role:"user", content: text };
    const history = messages.filter(m => m.content !== "__welcome__");
    setMessages(prev => [...prev.filter(m => m.content !== "__welcome__" || prev.indexOf(m) !== 0), ...(prev[0]?.content === "__welcome__" ? [] : []), userMsg]);
    setMessages(prev => {
      const clean = prev[0]?.content === "__welcome__" ? [] : prev.filter(m => m.content !== "__welcome__");
      return [...clean, userMsg];
    });
    setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: systemPrompt(),
          messages:[...history, userMsg].map(m => ({ role:m.role, content:m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text||"").join("") || "Unable to get a response. Please try again.";
      setMessages(prev => [...prev, { role:"assistant", content:reply }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", content:"⚠️ Connection error. Please check your internet and try again." }]);
    }
    setLoading(false);
  };

  // nav items defined inline below

  /* ── NAV ── */
  const Nav = () => (
    <nav style={{
      background: C.navy, borderBottom:`1px solid ${C.navyLight}`,
      position:"sticky", top:0, zIndex:100,
    }}>
      <div style={{
        maxWidth:1200, margin:"0 auto", padding:"0 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:64,
      }}>
        {/* Brand */}
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => setView("home")}>
          <Logo size={38}/>
          <div>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:900, fontSize:16, color:C.white, letterSpacing:"-0.3px", lineHeight:1.1 }}>
              Bilong <span style={{ color:C.sky }}>Digital Hub</span>
            </div>
            <div style={{ fontFamily:"Lato,sans-serif", fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:"1.5px", textTransform:"uppercase" }}>
              MarketIQ AI · Global Platform
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          {["home","learn","chat","pricing"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer",
              fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:700,
              textTransform:"capitalize", letterSpacing:"0.3px",
              background: view === v ? C.sky : "transparent",
              color: view === v ? C.white : "rgba(255,255,255,0.55)",
              transition:"all 0.15s",
            }}>{v === "chat" ? "💬 Ask AI" : v.charAt(0).toUpperCase()+v.slice(1)}</button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {savedContent && (
            <div style={{
              padding:"5px 12px", borderRadius:20, background:"rgba(30,144,255,0.15)",
              border:`1px solid rgba(30,144,255,0.3)`, fontSize:11, color:C.sky,
              fontFamily:"Lato,sans-serif", fontWeight:700,
            }}>📚 Content Loaded</div>
          )}
          <button onClick={() => setView("upload")} style={{
            padding:"9px 20px", borderRadius:6, border:`1px solid ${C.sky}`,
            background:"transparent", color:C.sky, cursor:"pointer",
            fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:700,
            transition:"all 0.15s",
          }}>Upload Content</button>
          <button onClick={() => setView("pricing")} style={{
            padding:"9px 20px", borderRadius:6, border:"none", cursor:"pointer",
            background:`linear-gradient(135deg, ${C.sky}, ${C.skyLight})`,
            color:C.white, fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:700,
            boxShadow:`0 0 20px rgba(30,144,255,0.35)`,
          }}>Subscribe →</button>
        </div>
      </div>
    </nav>
  );

  /* ── HOME ── */
  const Home = () => (
    <div>
      {/* Hero */}
      <div style={{
        background:`linear-gradient(160deg, ${C.dark} 0%, ${C.navy} 50%, #0d3060 100%)`,
        padding:"100px 24px 80px", position:"relative", overflow:"hidden",
      }}>
        {/* BG decoration */}
        {[...Array(6)].map((_,i) => (
          <div key={i} style={{
            position:"absolute",
            width: [400,300,200,500,250,350][i],
            height:[400,300,200,500,250,350][i],
            borderRadius:"50%",
            background:`rgba(30,144,255,${[0.04,0.03,0.05,0.02,0.06,0.03][i]})`,
            top:["-10%","20%","60%","-20%","40%","70%"][i],
            left:["-5%","60%","80%","40%","-10%","30%"][i],
            pointerEvents:"none",
          }}/>
        ))}
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            padding:"6px 18px", borderRadius:24,
            background:"rgba(30,144,255,0.12)", border:`1px solid rgba(30,144,255,0.3)`,
            marginBottom:28,
          }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.sky, animation:"pulse 2s infinite" }}/>
            <span style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.sky, fontWeight:700, letterSpacing:"2px" }}>
              THE WORLD'S MARKETING, SALES & BUSINESS AI
            </span>
          </div>

          <h1 style={{
            fontFamily:"Montserrat,sans-serif", fontSize:"clamp(32px,5.5vw,62px)",
            fontWeight:900, color:C.white, lineHeight:1.1, letterSpacing:"-2px",
            marginBottom:20,
          }}>
            Master Marketing.<br/>
            <span style={{ color:C.sky }}>Grow Your Business.</span>
          </h1>

          <p style={{
            fontFamily:"Playfair Display,serif", fontSize:"clamp(16px,2vw,20px)",
            color:"rgba(255,255,255,0.65)", maxWidth:580, margin:"0 auto 16px",
            lineHeight:1.7, fontStyle:"italic",
          }}>
            "The AI that thinks like a CMO — trained on expert marketing knowledge, built for Nigerian businesses."
          </p>

          <p style={{
            fontFamily:"Lato,sans-serif", fontSize:15,
            color:"rgba(255,255,255,0.45)", maxWidth:480, margin:"0 auto 44px",
            lineHeight:1.6,
          }}>
            Ask any marketing, sales or business question and get expert answers instantly. Serving businesses, marketers and entrepreneurs worldwide.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setView("chat")} style={{
              padding:"16px 36px", borderRadius:8, border:"none", cursor:"pointer",
              background:`linear-gradient(135deg, ${C.sky}, #0060d0)`,
              color:C.white, fontFamily:"Montserrat,sans-serif", fontSize:15, fontWeight:800,
              boxShadow:`0 0 40px rgba(30,144,255,0.4)`, letterSpacing:"0.3px",
              transition:"transform 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >Ask MarketIQ Now →</button>
            <button onClick={() => setView("learn")} style={{
              padding:"16px 36px", borderRadius:8, cursor:"pointer",
              border:`1px solid rgba(255,255,255,0.2)`, background:"transparent",
              color:C.white, fontFamily:"Montserrat,sans-serif", fontSize:15, fontWeight:700,
            }}>Explore Topics</button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:C.navyMid, borderBottom:`1px solid ${C.navyLight}` }}>
        <div style={{
          maxWidth:1000, margin:"0 auto", padding:"24px",
          display:"flex", justifyContent:"center", gap:"clamp(24px,6vw,80px)", flexWrap:"wrap",
        }}>
          {[["16+","Marketing Topics"],["AI-Powered","Expert Answers"],["Digital & Traditional","Full Coverage"],["Global","Worldwide Reach"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:22, fontWeight:900, color:C.sky }}>{v}</div>
              <div style={{ fontFamily:"Lato,sans-serif", fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background:C.gray, padding:"80px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.sky, fontWeight:700, letterSpacing:"2px", marginBottom:12 }}>WHY MARKETIQ</div>
            <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(24px,4vw,40px)", fontWeight:900, color:C.navy, letterSpacing:"-1px" }}>
              Everything You Need to<br/>Win in Marketing
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {[
              { icon:"🧠", title:"Expert AI Advisor", desc:"Get instant, CMO-level answers on any marketing topic — strategy, campaigns, copywriting, analytics, and more." },
              { icon:"📚", title:"Complete Knowledge Base", desc:"Structured lessons covering every area of digital and traditional marketing with real-world Nigerian examples." },
              { icon:"🛠️", title:"Problem Solver", desc:"Describe your marketing challenge. Get a custom action plan with specific, measurable steps to fix it." },
              { icon:"🎯", title:"Strategy Builder", desc:"Build full marketing strategies tailored to your industry, budget, and Nigerian target audience." },
              { icon:"📝", title:"Powered By Expert Content", desc:"The AI is trained on real marketing books and frameworks — not just generic internet knowledge." },
              { icon:"🌍", title:"Built for the World", desc:"Serving entrepreneurs, marketers and business owners across every continent — from startups to enterprises." },
            ].map(f => (
              <div key={f.title} style={{
                background:C.white, borderRadius:14, padding:"28px 26px",
                border:`1px solid ${C.grayMid}`, transition:"all 0.2s",
                boxShadow:"0 1px 4px rgba(10,35,66,0.06)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.sky; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(30,144,255,0.12)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.grayMid; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(10,35,66,0.06)"; }}
              >
                <div style={{ fontSize:36, marginBottom:14 }}>{f.icon}</div>
                <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:16, fontWeight:800, color:C.navy, marginBottom:8 }}>{f.title}</div>
                <div style={{ fontFamily:"Lato,sans-serif", fontSize:14, color:C.grayText, lineHeight:1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div style={{ background:C.navy, padding:"72px 24px" }}>
        <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:20, color:C.sky }}>❝</div>
          <p style={{
            fontFamily:"Playfair Display,serif", fontSize:"clamp(18px,2.5vw,24px)",
            color:C.white, lineHeight:1.7, fontStyle:"italic", marginBottom:28,
          }}>
            MarketIQ gave me a complete go-to-market strategy for my SaaS product in under 3 minutes. It's like having a world-class marketing agency available 24/7.
          </p>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:13, color:C.sky, fontWeight:700, letterSpacing:"1px" }}>
            — Startup Founder, United Kingdom
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:C.gray, padding:"72px 24px", textAlign:"center" }}>
        <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(22px,4vw,38px)", fontWeight:900, color:C.navy, marginBottom:16, letterSpacing:"-1px" }}>
          Ready to Transform Your Marketing?
        </h2>
        <p style={{ fontFamily:"Lato,sans-serif", fontSize:16, color:C.grayText, marginBottom:36 }}>
          Join businesses, marketers and entrepreneurs worldwide already using MarketIQ AI.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => setView("chat")} style={{
            padding:"15px 34px", borderRadius:8, border:"none", cursor:"pointer",
            background:`linear-gradient(135deg, ${C.sky}, #0060d0)`,
            color:C.white, fontFamily:"Montserrat,sans-serif", fontSize:15, fontWeight:800,
          }}>Start For Free →</button>
          <button onClick={() => setView("pricing")} style={{
            padding:"15px 34px", borderRadius:8, cursor:"pointer",
            border:`2px solid ${C.navy}`, background:"transparent",
            color:C.navy, fontFamily:"Montserrat,sans-serif", fontSize:15, fontWeight:700,
          }}>See Pricing</button>
        </div>
      </div>
    </div>
  );

  /* ── LEARN ── */
  const Learn = () => {
    const tabs = ["All","Digital","Traditional","Sales","Business","E-commerce"];
    const filtered = topicTab === "All" ? TOPICS : TOPICS.filter(t => t.cat === topicTab);
    return (
      <div style={{ background:C.gray, minHeight:"100vh", padding:"56px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ marginBottom:40 }}>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.sky, fontWeight:700, letterSpacing:"2px", marginBottom:10 }}>KNOWLEDGE BASE</div>
            <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(24px,4vw,40px)", fontWeight:900, color:C.navy, letterSpacing:"-1px", marginBottom:8 }}>
              All Marketing Topics
            </h2>
            <p style={{ fontFamily:"Lato,sans-serif", fontSize:15, color:C.grayText }}>
              Click any topic to start an AI-guided lesson instantly.
            </p>
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:36, flexWrap:"wrap" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTopicTab(t)} style={{
                padding:"8px 18px", borderRadius:20, cursor:"pointer",
                fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:700,
                background: topicTab === t ? C.navy : C.white,
                color: topicTab === t ? C.white : C.navy,
                border: `1px solid ${topicTab === t ? C.navy : C.grayMid}`,
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:18 }}>
            {filtered.map(topic => (
              <div key={topic.title} onClick={() => { setView("chat"); send(topic.q); }} style={{
                background:C.white, borderRadius:12, padding:"22px 20px",
                border:`1px solid ${C.grayMid}`, cursor:"pointer", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=C.sky; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 20px rgba(30,144,255,0.1)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.grayMid; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ fontSize:32, marginBottom:10 }}>{topic.icon}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:14, fontWeight:800, color:C.navy }}>{topic.title}</div>
                  <span style={{
                    fontSize:9, padding:"2px 8px", borderRadius:10,
                    background:C.skyPale, color:C.sky, fontWeight:700,
                    fontFamily:"Montserrat,sans-serif", flexShrink:0, marginLeft:6,
                  }}>{topic.cat}</span>
                </div>
                <div style={{ fontFamily:"Lato,sans-serif", fontSize:13, color:C.sky, fontWeight:600 }}>Start Lesson →</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ── CHAT ── */
  const Chat = () => {
    const showWelcome = messages.length === 1 && messages[0].content === "__welcome__";
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 64px)", background:C.gray }}>
        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"24px 16px" }}>
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            {showWelcome ? (
              <div>
                {/* Welcome card */}
                <div style={{
                  background:`linear-gradient(135deg, ${C.navy}, #0d3060)`,
                  borderRadius:16, padding:"32px 28px", marginBottom:24, color:C.white,
                  position:"relative", overflow:"hidden",
                }}>
                  <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"rgba(30,144,255,0.1)" }}/>
                  <div style={{ position:"relative", display:"flex", alignItems:"flex-start", gap:16 }}>
                    <Logo size={48}/>
                    <div>
                      <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.sky, fontWeight:700, letterSpacing:"1.5px", marginBottom:8 }}>MARKETIQ AI · BILONG DIGITAL HUB</div>
                      <h3 style={{ fontFamily:"Montserrat,sans-serif", fontSize:20, fontWeight:900, marginBottom:8, lineHeight:1.2 }}>
                        Your Personal Marketing<br/>& Sales Expert
                      </h3>
                      <p style={{ fontFamily:"Lato,sans-serif", fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.6, margin:0 }}>
                        Ask me anything about marketing, sales, or growing your business. I only answer within these topics — but within them, I know everything.
                      </p>
                    </div>
                  </div>
                  {savedContent && (
                    <div style={{
                      marginTop:16, padding:"8px 14px", background:"rgba(30,144,255,0.15)",
                      borderRadius:8, border:"1px solid rgba(30,144,255,0.3)",
                      fontSize:12, color:C.sky, fontFamily:"Lato,sans-serif",
                    }}>✓ Founder's content loaded — answers include proprietary frameworks</div>
                  )}
                </div>

                {/* Quick prompts */}
                <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.grayText, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", marginBottom:12 }}>
                  Try asking:
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  {QUICK.map(q => (
                    <button key={q.text} onClick={() => send(q.text)} style={{
                      padding:"12px 14px", borderRadius:10, border:`1px solid ${C.grayMid}`,
                      background:C.white, cursor:"pointer", textAlign:"left",
                      fontFamily:"Lato,sans-serif", fontSize:13, color:C.navy,
                      display:"flex", alignItems:"flex-start", gap:8, lineHeight:1.4,
                      transition:"all 0.15s", boxShadow:"0 1px 3px rgba(0,0,0,0.04)",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor=C.sky; e.currentTarget.style.background=C.skyPale; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor=C.grayMid; e.currentTarget.style.background=C.white; }}
                    >
                      <span style={{ fontSize:16, flexShrink:0 }}>{q.icon}</span>
                      <span>{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} style={{
                  marginBottom:20, display:"flex",
                  flexDirection: msg.role==="user" ? "row-reverse" : "row",
                  alignItems:"flex-start", gap:10,
                }}>
                  {msg.role === "assistant" && (
                    <div style={{ flexShrink:0, marginTop:2 }}><Logo size={32}/></div>
                  )}
                  <div style={{
                    maxWidth:"82%", padding:"14px 16px", borderRadius:14,
                    background: msg.role==="user"
                      ? `linear-gradient(135deg, ${C.navy}, #0d3060)`
                      : C.white,
                    color: msg.role==="user" ? C.white : C.navy,
                    fontFamily:"Lato,sans-serif", fontSize:14, lineHeight:1.7,
                    boxShadow:"0 2px 8px rgba(10,35,66,0.08)",
                    borderBottomRightRadius: msg.role==="user" ? 4 : 14,
                    borderBottomLeftRadius: msg.role==="assistant" ? 4 : 14,
                  }} dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}/>
                </div>
              ))
            )}

            {loading && (
              <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:20 }}>
                <Logo size={32}/>
                <div style={{
                  padding:"14px 18px", borderRadius:14, borderBottomLeftRadius:4,
                  background:C.white, boxShadow:"0 2px 8px rgba(10,35,66,0.08)",
                  display:"flex", gap:5, alignItems:"center",
                }}>
                  {[0,1,2].map(n => (
                    <div key={n} style={{
                      width:7, height:7, borderRadius:"50%", background:C.sky,
                      animation:"bounce 1.2s ease-in-out infinite",
                      animationDelay:`${n*0.2}s`,
                    }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
        </div>

        {/* Input */}
        <div style={{ background:C.white, borderTop:`1px solid ${C.grayMid}`, padding:"14px 16px" }}>
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); send(); }}}
                placeholder="Ask about marketing, sales or business growth... (Enter to send)"
                rows={1}
                style={{
                  flex:1, padding:"12px 16px", borderRadius:10,
                  border:`1.5px solid ${C.grayMid}`, fontFamily:"Lato,sans-serif",
                  fontSize:14, outline:"none", resize:"none", lineHeight:1.5,
                  color:C.navy, maxHeight:120, overflowY:"auto",
                  transition:"border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor=C.sky}
                onBlur={e => e.target.style.borderColor=C.grayMid}
                onInput={e => { e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,120)+"px"; }}
              />
              <button onClick={() => send()} disabled={loading||!input.trim()} style={{
                width:46, height:46, borderRadius:10, border:"none", cursor:"pointer",
                background: loading||!input.trim() ? C.grayMid : `linear-gradient(135deg, ${C.sky}, #0060d0)`,
                color: loading||!input.trim() ? C.grayText : C.white,
                fontSize:20, display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, transition:"all 0.15s",
              }}>↑</button>
            </div>
            <div style={{ textAlign:"center", marginTop:8, fontFamily:"Lato,sans-serif", fontSize:11, color:"#b0b8c4" }}>
              Marketing · Sales · Business only &nbsp;·&nbsp; MarketIQ by Bilong Digital Hub
              {savedContent && <span style={{ color:C.sky }}> · 📚 Your content active</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── PRICING ── */
  const Pricing = () => (
    <div style={{ background:C.gray, minHeight:"100vh", padding:"72px 24px" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.sky, fontWeight:700, letterSpacing:"2px", marginBottom:12 }}>PRICING</div>
          <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(26px,4vw,44px)", fontWeight:900, color:C.navy, letterSpacing:"-1.5px", marginBottom:12 }}>
            Invest in Your Marketing Growth
          </h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontSize:16, color:C.grayText, maxWidth:480, margin:"0 auto" }}>
            Affordable plans for every business — from students to global enterprises.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, marginBottom:48 }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background: plan.popular ? C.navy : C.white,
              borderRadius:16, padding:"32px 28px",
              border: `2px solid ${plan.popular ? C.sky : C.grayMid}`,
              position:"relative", transform: plan.popular ? "scale(1.03)" : "scale(1)",
              boxShadow: plan.popular ? `0 0 40px rgba(30,144,255,0.2)` : "0 2px 8px rgba(10,35,66,0.06)",
            }}>
              {plan.popular && (
                <div style={{
                  position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)",
                  padding:"4px 18px", borderRadius:20,
                  background:`linear-gradient(135deg, ${C.sky}, #0060d0)`,
                  fontFamily:"Montserrat,sans-serif", fontSize:11, fontWeight:800,
                  color:C.white, letterSpacing:"1px", whiteSpace:"nowrap",
                }}>⭐ MOST POPULAR</div>
              )}

              <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:18, fontWeight:900, color: plan.popular ? C.white : C.navy, marginBottom:6 }}>{plan.name}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:4 }}>
                <span style={{ fontFamily:"Montserrat,sans-serif", fontSize:40, fontWeight:900, color:C.sky }}>{plan.naira}</span>
                <span style={{ fontFamily:"Lato,sans-serif", fontSize:14, color: plan.popular ? "rgba(255,255,255,0.5)" : C.grayText }}>{plan.period}</span>
              </div>
              <div style={{ fontFamily:"Lato,sans-serif", fontSize:12, color: plan.popular ? "rgba(255,255,255,0.4)" : C.grayText, marginBottom:24 }}>{plan.usd} USD</div>

              <div style={{ marginBottom:28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
                    <span style={{ color:C.sky, fontSize:14, flexShrink:0, marginTop:1 }}>✓</span>
                    <span style={{ fontFamily:"Lato,sans-serif", fontSize:14, color: plan.popular ? "rgba(255,255,255,0.75)" : C.grayText, lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setView("chat")} style={{
                width:"100%", padding:"14px", borderRadius:8, border:"none", cursor:"pointer",
                background: plan.popular ? `linear-gradient(135deg, ${C.sky}, #0060d0)` : C.navy,
                color:C.white, fontFamily:"Montserrat,sans-serif", fontSize:14, fontWeight:800,
                letterSpacing:"0.3px", boxShadow: plan.popular ? `0 4px 16px rgba(30,144,255,0.35)` : "none",
              }}>{plan.cta}</button>
            </div>
          ))}
        </div>

        <div style={{
          background:C.white, borderRadius:14, padding:"24px 28px",
          border:`1px solid ${C.grayMid}`, textAlign:"center",
        }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:14, fontWeight:800, color:C.navy, marginBottom:6 }}>
            Payment Options
          </div>
          <p style={{ fontFamily:"Lato,sans-serif", fontSize:14, color:C.grayText, margin:0 }}>
            Pay globally via <strong>Stripe</strong>, <strong>PayPal</strong>, or <strong>credit/debit card</strong>. Nigerian users can pay via <strong>Paystack</strong> or <strong>Flutterwave</strong>. All major currencies accepted.
          </p>
        </div>
      </div>
    </div>
  );

  /* ── UPLOAD ── */
  const Upload = () => (
    <div style={{ background:C.gray, minHeight:"100vh", padding:"56px 24px" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:11, color:C.sky, fontWeight:700, letterSpacing:"2px", marginBottom:10 }}>FOUNDER ONLY</div>
          <h2 style={{ fontFamily:"Montserrat,sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:900, color:C.navy, letterSpacing:"-1px", marginBottom:8 }}>
            Upload Your Content
          </h2>
          <p style={{ fontFamily:"Lato,sans-serif", fontSize:15, color:C.grayText, lineHeight:1.6 }}>
            Paste your book chapters, marketing frameworks, course content or any proprietary knowledge.
            The AI will answer using <em>your voice and your methodology</em> — making it impossible to copy.
          </p>
        </div>

        <div style={{ background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
          <p style={{ fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:800, color:"#92400e", marginBottom:4 }}>⚡ Your Competitive Advantage</p>
          <p style={{ fontFamily:"Lato,sans-serif", fontSize:13, color:"#78350f", lineHeight:1.6, margin:0 }}>
            Generic AI gives generic answers. With your books loaded, MarketIQ says <em>"According to our Bilong framework..."</em> — building your authority with every answer.
          </p>
        </div>

        <div style={{ background:C.white, borderRadius:14, padding:28, border:`1px solid ${C.grayMid}`, marginBottom:20 }}>
          <label style={{ fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:800, color:C.navy, display:"block", marginBottom:8 }}>
            Content Title / Book Name
          </label>
          <input
            placeholder="e.g. 'The Nigerian Marketing Blueprint' or 'My Sales Mastery Framework'"
            style={{
              width:"100%", padding:"11px 14px", borderRadius:8, border:`1.5px solid ${C.grayMid}`,
              fontFamily:"Lato,sans-serif", fontSize:14, outline:"none", color:C.navy,
              boxSizing:"border-box", marginBottom:20,
            }}
            onFocus={e => e.target.style.borderColor=C.sky}
            onBlur={e => e.target.style.borderColor=C.grayMid}
          />

          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <label style={{ fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:800, color:C.navy }}>
              Paste Your Content
            </label>
            <span style={{ fontFamily:"Lato,sans-serif", fontSize:12, color:C.grayText }}>{charCount.toLocaleString()} characters</span>
          </div>
          <textarea
            value={userContent}
            onChange={e => { setContent(e.target.value); setCharCount(e.target.value.length); }}
            rows={14}
            placeholder="Paste your book chapters, frameworks, marketing methodologies, case studies, course content..."
            style={{
              width:"100%", padding:"14px", borderRadius:10, border:`1.5px solid ${C.grayMid}`,
              fontFamily:"Lato,sans-serif", fontSize:14, lineHeight:1.7, outline:"none",
              resize:"vertical", color:C.navy, boxSizing:"border-box",
            }}
            onFocus={e => e.target.style.borderColor=C.sky}
            onBlur={e => e.target.style.borderColor=C.grayMid}
          />
        </div>

        {savedContent && (
          <div style={{ padding:"10px 16px", background:"#f0fdf4", border:"1px solid #86efac", borderRadius:8, marginBottom:16, fontFamily:"Lato,sans-serif", fontSize:13, color:"#166534" }}>
            ✓ Content active: <strong>{savedContent.length.toLocaleString()} characters</strong> loaded into AI brain
          </div>
        )}

        <div style={{ display:"flex", gap:12 }}>
          <button
            onClick={() => { if(userContent.trim().length >= 50){ setSaved(userContent.trim()); setView("chat"); }}}
            disabled={userContent.trim().length < 50}
            style={{
              flex:1, padding:"15px", borderRadius:10, border:"none", cursor:"pointer",
              background: userContent.trim().length >= 50
                ? `linear-gradient(135deg, ${C.sky}, #0060d0)` : C.grayMid,
              color: userContent.trim().length >= 50 ? C.white : C.grayText,
              fontFamily:"Montserrat,sans-serif", fontSize:14, fontWeight:800,
            }}
          >{savedContent ? "Update AI Knowledge →" : "Load Into AI Brain →"}</button>
          {savedContent && (
            <button onClick={() => { setSaved(""); setContent(""); setCharCount(0); }} style={{
              padding:"15px 20px", borderRadius:10, border:`1px solid ${C.grayMid}`,
              background:C.white, color:C.grayText, cursor:"pointer",
              fontFamily:"Lato,sans-serif", fontSize:14,
            }}>Clear</button>
          )}
        </div>

        <div style={{ marginTop:28, background:C.white, borderRadius:12, padding:"20px 24px", border:`1px solid ${C.grayMid}` }}>
          <div style={{ fontFamily:"Montserrat,sans-serif", fontSize:12, fontWeight:800, color:C.navy, marginBottom:12 }}>📌 What to upload:</div>
          {["Book chapters or excerpts","Your marketing frameworks & methodologies","Course content or lecture notes","Case studies from your work","Blog posts, articles & newsletters","Personal sales scripts & playbooks","Your own research & insights"].map(item => (
            <div key={item} style={{ display:"flex", gap:8, marginBottom:8 }}>
              <span style={{ color:C.sky, flexShrink:0 }}>▸</span>
              <span style={{ fontFamily:"Lato,sans-serif", fontSize:13, color:C.grayText }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── FOOTER ── */
  const Footer = () => (
    <footer style={{ background:C.dark, borderTop:`1px solid ${C.navyLight}`, padding:"32px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Logo size={30}/>
          <div>
            <div style={{ fontFamily:"Montserrat,sans-serif", fontWeight:800, fontSize:13, color:C.white }}>
              Bilong <span style={{ color:C.sky }}>Digital Hub</span>
            </div>
            <div style={{ fontFamily:"Lato,sans-serif", fontSize:10, color:"rgba(255,255,255,0.35)" }}>MarketIQ AI · Global Platform</div>
          </div>
        </div>
        <div style={{ fontFamily:"Lato,sans-serif", fontSize:12, color:"rgba(255,255,255,0.3)", textAlign:"center" }}>
          © 2025 Bilong Digital Hub. All rights reserved. · Serving the World · Marketing · Sales · Business
        </div>
        <div style={{ display:"flex", gap:16 }}>
          {["Home","Learn","Chat","Pricing"].map(l => (
            <span key={l} onClick={() => setView(l.toLowerCase())} style={{ fontFamily:"Lato,sans-serif", fontSize:12, color:"rgba(255,255,255,0.4)", cursor:"pointer" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{ fontFamily:"Lato,sans-serif", background:C.gray, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Lato:wght@400;700&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet"/>
      <Nav/>
      <div style={{ flex:1 }}>
        {view === "home"    && <Home/>}
        {view === "learn"   && <Learn/>}
        {view === "chat"    && <Chat/>}
        {view === "pricing" && <Pricing/>}
        {view === "upload"  && <Upload/>}
      </div>
      {view !== "chat" && <Footer/>}
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:0.4} 40%{transform:translateY(-6px);opacity:1} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#c8d6e5;border-radius:4px}
        button{font-family:Montserrat,sans-serif}
      `}</style>
    </div>
  );
}
