import { useState } from "react";
import axios from "axios";

const API = "https://bilong-backend.onrender.com";

const NAV_LINKS = ["Home", "About", "Services", "AI Assistant", "Training", "Contact"];

const SERVICES = [
  { icon: "📱", name: "Social Media Management", desc: "Full management of Facebook, Instagram, LinkedIn & WhatsApp. Content, graphics, scheduling & community.", price: "From ₦25,000/month" },
  { icon: "📣", name: "Paid Advertising", desc: "Facebook, Instagram & Google ad campaigns strategically built to convert views into customers.", price: "From ₦20,000/month" },
  { icon: "🌐", name: "Website Development", desc: "Professional, SEO-ready, mobile-optimised websites that represent your brand 24/7.", price: "From ₦50,000" },
  { icon: "🤖", name: "AI Automation", desc: "ChatGPT & Claude automations for content creation, customer responses & business workflows.", price: "From ₦30,000" },
  { icon: "🎓", name: "Digital Marketing Training", desc: "Beginner to advanced courses. Learn social media, ads, AI tools & digital strategy.", price: "From ₦12,000" },
  { icon: "💡", name: "Marketing Consultation", desc: "1-on-1 strategy sessions. Walk away with a clear marketing roadmap for your business.", price: "From ₦10,000/session" },
  { icon: "📰", name: "Traditional Marketing", desc: "Flyers, banners, print design & community-based campaigns that reach offline audiences.", price: "From ₦8,000" },
  { icon: "🚀", name: "Full Digital Campaigns", desc: "End-to-end campaign management across all platforms. Strategy, execution & reporting.", price: "From ₦60,000/month" },
];

const FRAMEWORKS = [
  { num: "01", title: "Scale of Preference in Marketing", desc: "Every customer has a mental priority list. Speak to their #1 pain to position your offer as the most urgent need — and sales will follow." },
  { num: "02", title: "Favorable vs Unfavorable Discount", desc: "Not all discounts grow your business. Some attract the wrong customers and devalue your brand. Learn the difference before you cut your price." },
  { num: "03", title: "The Cost of Silence in Business", desc: "Every day your business is not communicating online, you are losing customers to competitors who are. Silence is not neutral — it is costly." },
];

const TRAINING = [
  { title: "Digital Marketing Beginners Course", sessions: "4 Sessions", price: "₦15,000", items: ["Foundations of digital marketing", "Social media basics", "Content creation", "Certificate included"] },
  { title: "Intermediate Marketing Course", sessions: "6 Sessions", price: "₦25,000", items: ["Strategy & analytics", "Paid advertising", "Email marketing", "Practical assignments + Certificate"] },
  { title: "Complete Marketing Masterclass", sessions: "10 Sessions", price: "₦40,000", items: ["Beginner to advanced", "All platforms covered", "1-on-1 support included", "Certificate included"] },
  { title: "AI Tools for Business", sessions: "3 Sessions", price: "₦12,000", items: ["ChatGPT & Claude mastery", "AI content creation", "Automation setup", "Certificate included"] },
];

export default function App() {
  const [active, setActive] = useState("Home");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm BILONG AI 👋 I'm here to help you with any marketing questions. Whether you're struggling to get customers, wondering about social media, or want to know how BILONG can help your business — just ask me anything!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await axios.post(`${API}/api/chat`, { message: userMsg });
      setChatMessages(prev => [...prev, { role: "assistant", text: res.data.response }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: "Sorry, I'm having trouble connecting right now. Please WhatsApp us directly at +234 815 368 7589" }]);
    }
    setChatLoading(false);
  };

  const sendForm = async () => {
    if (!form.name || !form.email || !form.business || !form.message) {
      setFormStatus("error");
      return;
    }
    try {
      const res = await axios.post(`${API}/api/contact`, form);
      setFormStatus("success");
      setForm({ name: "", email: "", business: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div style={styles.app}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <span style={styles.navLogo}>⚡</span>
            <div>
              <div style={styles.navName}>BILONG DIGITAL HUB</div>
              <div style={styles.navSub}>Your #1 Digital Marketing Agency</div>
            </div>
          </div>
          <div style={styles.navLinks}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => setActive(link)}
                style={{ ...styles.navLink, ...(active === link ? styles.navLinkActive : {}) }}>
                {link}
              </button>
            ))}
          </div>
          <a href="https://wa.me/2348153687589" target="_blank" style={styles.navCta}>
            WhatsApp Us
          </a>
        </div>
      </nav>

      {/* PAGES */}
      <main style={styles.main}>

        {/* ── HOME ── */}
        {active === "Home" && (
          <div>
            {/* Hero */}
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>🇳🇬 Nigeria's Gap-Filling Agency</div>
                <h1 style={styles.heroTitle}>
                  We Serve The Businesses<br />
                  <span style={styles.heroBlue}>Big Agencies Ignore.</span>
                </h1>
                <p style={styles.heroSub}>
                  While top agencies fight over Lagos boardrooms, BILONG DIGITAL HUB is building every Nigerian and African business that deserves to grow. Social media, websites, AI automation, training — all in one place, at prices that make sense.
                </p>
                <div style={styles.heroButtons}>
                  <button onClick={() => setActive("AI Assistant")} style={styles.btnPrimary}>
                    Ask Our AI Assistant
                  </button>
                  <button onClick={() => setActive("Services")} style={styles.btnSecondary}>
                    See Our Services
                  </button>
                </div>
                <div style={styles.heroStats}>
                  {[["8+", "Services"], ["3", "Original Frameworks"], ["₦8K", "Starting Price"], ["🌍", "Pan-African"]].map(([num, label]) => (
                    <div key={label} style={styles.heroStat}>
                      <div style={styles.heroStatNum}>{num}</div>
                      <div style={styles.heroStatLabel}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gap Section */}
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.sectionLabel}>The Gap We Are Filling</div>
                <h2 style={styles.sectionTitle}>What Big Agencies Are Leaving Behind</h2>
                <div style={styles.gapGrid}>
                  {[
                    ["🏢", "Big Agencies Ignore SMEs", "Every top agency chases enterprise clients. The 95% of Nigerian small businesses that need marketing help have nobody speaking to them."],
                    ["🤖", "AI Is For Everyone", "Large agencies talk about AI but don't bring it to small businesses. BILONG delivers Claude & ChatGPT automation to every Nigerian business."],
                    ["📚", "Education + Execution", "We don't just do the work — we train you too. No other agency in Nigeria combines teaching and delivering in one package."],
                    ["📱", "WhatsApp-First Marketing", "Big agencies ignore WhatsApp. We master it. Nigeria's #1 communication tool is also your #1 marketing channel."],
                    ["🗺️", "Beyond Lagos", "Every top agency is Victoria Island only. BILONG serves Oyo, Ibadan, Abeokuta, Enugu, and all of Africa professionally."],
                    ["💰", "Affordable Quality", "Premium digital marketing should not cost a fortune. We deliver world-class results at prices Nigerian businesses can afford."],
                  ].map(([icon, title, desc]) => (
                    <div key={title} style={styles.gapCard}>
                      <span style={styles.gapIcon}>{icon}</span>
                      <div style={styles.gapTitle}>{title}</div>
                      <div style={styles.gapDesc}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Frameworks Preview */}
            <section style={{ ...styles.section, background: "#0A2342" }}>
              <div style={styles.sectionInner}>
                <div style={{ ...styles.sectionLabel, color: "#1E90FF" }}>Original Marketing Frameworks</div>
                <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>Built From Research. Proven By Results.</h2>
                <div style={styles.fwGrid}>
                  {FRAMEWORKS.map(fw => (
                    <div key={fw.num} style={styles.fwCard}>
                      <div style={styles.fwNum}>{fw.num}</div>
                      <div style={styles.fwTitle}>{fw.title}</div>
                      <div style={styles.fwDesc}>{fw.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section style={styles.ctaSection}>
              <h2 style={styles.ctaTitle}>Ready to Grow Your Business?</h2>
              <p style={styles.ctaSub}>Free 15-minute strategy call. No obligation. Just results.</p>
              <div style={styles.heroButtons}>
                <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" style={styles.btnPrimary}>
                  Book Free Call on WhatsApp
                </a>
                <button onClick={() => setActive("Contact")} style={styles.btnSecondary}>Send Us a Message</button>
              </div>
            </section>
          </div>
        )}

        {/* ── ABOUT ── */}
        {active === "About" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>Our Story</div>
                <h1 style={styles.heroTitle}>Built For The <span style={styles.heroBlue}>Businesses That Matter Most.</span></h1>
                <p style={styles.heroSub}>BILONG DIGITAL HUB was founded by Olawumi Micheal Damilare with one clear mission — to give every Nigerian and African business access to world-class digital marketing, regardless of their size or budget.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.aboutGrid}>
                  <div>
                    <h2 style={styles.sectionTitle}>Our Vision</h2>
                    <p style={styles.aboutText}>To become Africa's most trusted digital marketing agency — known not just for results, but for educating and elevating every business we touch.</p>
                    <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>Our Mission</h2>
                    <p style={styles.aboutText}>To bridge the digital marketing gap for Nigerian and African SMEs by combining education, innovation, and execution in a way no other agency does.</p>
                    <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>Our Pillars</h2>
                    <div style={styles.pillars}>
                      {["Educate", "Innovate", "Elevate", "Connect"].map(p => (
                        <div key={p} style={styles.pillar}>{p}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 style={styles.sectionTitle}>Our Frameworks</h2>
                    {FRAMEWORKS.map(fw => (
                      <div key={fw.num} style={styles.aboutFw}>
                        <div style={styles.aboutFwNum}>{fw.num}</div>
                        <div>
                          <div style={styles.aboutFwTitle}>{fw.title}</div>
                          <div style={styles.gapDesc}>{fw.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── SERVICES ── */}
        {active === "Services" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>What We Offer</div>
                <h1 style={styles.heroTitle}>8 Services. <span style={styles.heroBlue}>One Agency.</span></h1>
                <p style={styles.heroSub}>Everything your business needs to grow digitally — under one roof, at prices that work for Nigerian businesses.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.servicesGrid}>
                  {SERVICES.map(s => (
                    <div key={s.name} style={styles.serviceCard}>
                      <span style={styles.serviceIcon}>{s.icon}</span>
                      <div style={styles.serviceName}>{s.name}</div>
                      <div style={styles.serviceDesc}>{s.desc}</div>
                      <div style={styles.servicePrice}>{s.price}</div>
                      <a href="https://wa.me/2348153687589" target="_blank" style={styles.serviceBtn}>Get Started →</a>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── AI ASSISTANT ── */}
        {active === "AI Assistant" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>🤖 Powered by Claude AI</div>
                <h1 style={styles.heroTitle}>Meet <span style={styles.heroBlue}>BILONG AI</span></h1>
                <p style={styles.heroSub}>Nigeria's first agency AI assistant. Ask any marketing question and get expert answers built on BILONG's original frameworks — free, instant, no sign-up needed.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={{ ...styles.sectionInner, maxWidth: 720 }}>
                <div style={styles.chatBox}>
                  <div style={styles.chatHeader}>
                    <span>🤖</span>
                    <div>
                      <div style={styles.chatHeaderName}>BILONG AI Assistant</div>
                      <div style={styles.chatHeaderSub}>Powered by Claude · Online</div>
                    </div>
                  </div>
                  <div style={styles.chatMessages}>
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{ ...styles.chatMsg, ...(msg.role === "user" ? styles.chatMsgUser : styles.chatMsgAI) }}>
                        {msg.role === "assistant" && <span style={styles.chatAvatar}>🤖</span>}
                        <div style={{ ...styles.chatBubble, ...(msg.role === "user" ? styles.chatBubbleUser : styles.chatBubbleAI) }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div style={styles.chatMsg}>
                        <span style={styles.chatAvatar}>🤖</span>
                        <div style={styles.chatBubbleAI}>Thinking...</div>
                      </div>
                    )}
                  </div>
                  <div style={styles.chatInputRow}>
                    <input
                      style={styles.chatInput}
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendChat()}
                      placeholder="Ask me anything about marketing..."
                    />
                    <button onClick={sendChat} style={styles.chatSend}>Send</button>
                  </div>
                </div>
                <div style={styles.chatSuggestions}>
                  {["How do I get more customers?", "What is the Scale of Preference?", "How much does social media management cost?", "How do I use AI for my business?"].map(q => (
                    <button key={q} onClick={() => { setChatInput(q); }} style={styles.chatSugBtn}>{q}</button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── TRAINING ── */}
        {active === "Training" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>🎓 Learn From Experts</div>
                <h1 style={styles.heroTitle}>We Don't Just Do It. <span style={styles.heroBlue}>We Teach It.</span></h1>
                <p style={styles.heroSub}>No other agency in Nigeria trains you AND executes for you. Our courses take you from zero to confident in digital marketing and AI tools.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.trainingGrid}>
                  {TRAINING.map(t => (
                    <div key={t.title} style={styles.trainingCard}>
                      <div style={styles.trainingPrice}>{t.price}</div>
                      <div style={styles.trainingTitle}>{t.title}</div>
                      <div style={styles.trainingSessions}>{t.sessions}</div>
                      <div style={styles.trainingItems}>
                        {t.items.map(item => (
                          <div key={item} style={styles.trainingItem}>✅ {item}</div>
                        ))}
                      </div>
                      <a href="https://wa.me/2348153687589?text=I want to enroll in the course" target="_blank" style={styles.serviceBtn}>Enroll Now →</a>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── CONTACT ── */}
        {active === "Contact" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>Get In Touch</div>
                <h1 style={styles.heroTitle}>Let's Grow Your <span style={styles.heroBlue}>Business Together.</span></h1>
                <p style={styles.heroSub}>Send us a message or WhatsApp us directly. We respond within 24 hours.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.contactGrid}>
                  <div>
                    <h2 style={styles.sectionTitle}>Send a Message</h2>
                    {["name", "email", "business"].map(field => (
                      <input key={field} style={styles.formInput}
                        placeholder={field === "name" ? "Your Name" : field === "email" ? "Your Email" : "Your Business Name"}
                        value={form[field]}
                        onChange={e => setForm({ ...form, [field]: e.target.value })}
                      />
                    ))}
                    <textarea style={styles.formTextarea}
                      placeholder="Tell us about your business and what you need..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                    <button onClick={sendForm} style={styles.btnPrimary}>Send Message</button>
                    {formStatus === "success" && <div style={styles.formSuccess}>✅ Message sent! We will contact you within 24 hours.</div>}
                    {formStatus === "error" && <div style={styles.formError}>❌ Please fill all fields correctly.</div>}
                  </div>
                  <div>
                    <h2 style={styles.sectionTitle}>Contact Details</h2>
                    {[
                      ["📱", "WhatsApp", "+234 815 368 7589", "https://wa.me/2348153687589"],
                      ["📧", "Email", "bilongdigitalhub@gmail.com", "mailto:bilongdigitalhub@gmail.com"],
                      ["📍", "Location", "Oyo State & Lagos, Nigeria — Serving All Africa", null],
                    ].map(([icon, label, value, link]) => (
                      <div key={label} style={styles.contactItem}>
                        <span style={styles.contactIcon}>{icon}</span>
                        <div>
                          <div style={styles.contactLabel}>{label}</div>
                          {link ? <a href={link} target="_blank" style={styles.contactValue}>{value}</a>
                            : <div style={styles.contactValue}>{value}</div>}
                        </div>
                      </div>
                    ))}
                    <div style={styles.contactWa}>
                      <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" style={styles.btnPrimary}>
                        💬 Chat on WhatsApp Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <div style={styles.navName}>BILONG DIGITAL HUB</div>
            <div style={styles.navSub}>Educate. Innovate. Elevate. Connect.</div>
          </div>
          <div style={styles.footerLinks}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => setActive(link)} style={styles.footerLink}>{link}</button>
            ))}
          </div>
          <div style={styles.footerContact}>
            <div style={{ color: "#A8C8F0", fontSize: 13 }}>© 2026 BILONG DIGITAL HUB</div>
            <div style={{ color: "#A8C8F0", fontSize: 13 }}>Olawumi Micheal Damilare</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" },
  nav: { background: "#0A2342", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 },
  navBrand: { display: "flex", alignItems: "center", gap: 10 },
  navLogo: { fontSize: 28 },
  navName: { color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: 1 },
  navSub: { color: "#A8C8F0", fontSize: 10, letterSpacing: 1 },
  navLinks: { display: "flex", gap: 4 },
  navLink: { background: "none", border: "none", color: "#A8C8F0", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 },
  navLinkActive: { background: "rgba(30,144,255,0.15)", color: "#1E90FF" },
  navCta: { background: "#1E90FF", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700 },
  main: { minHeight: "calc(100vh - 70px)" },
  hero: { background: "linear-gradient(135deg, #071628 0%, #0A2342 60%, #0d2d52 100%)", padding: "80px 24px" },
  heroInner: { maxWidth: 800, margin: "0 auto", textAlign: "center" },
  heroBadge: { display: "inline-block", background: "rgba(30,144,255,0.15)", color: "#1E90FF", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 20, border: "1px solid rgba(30,144,255,0.3)" },
  heroTitle: { fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 },
  heroBlue: { color: "#1E90FF" },
  heroSub: { fontSize: 18, color: "#A8C8F0", lineHeight: 1.7, marginBottom: 32, maxWidth: 640, margin: "0 auto 32px" },
  heroButtons: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { background: "#1E90FF", color: "#fff", padding: "14px 28px", borderRadius: 8, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" },
  btnSecondary: { background: "transparent", color: "#fff", padding: "14px 28px", borderRadius: 8, border: "2px solid rgba(255,255,255,0.3)", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  heroStats: { display: "flex", justifyContent: "center", gap: 40, marginTop: 48 },
  heroStat: { textAlign: "center" },
  heroStatNum: { fontSize: 32, fontWeight: 900, color: "#1E90FF" },
  heroStatLabel: { fontSize: 12, color: "#A8C8F0", marginTop: 4 },
  section: { padding: "64px 24px" },
  sectionInner: { maxWidth: 1200, margin: "0 auto" },
  sectionLabel: { fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#1E90FF", marginBottom: 12 },
  sectionTitle: { fontSize: 36, fontWeight: 800, color: "#0A2342", marginBottom: 32 },
  gapGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 },
  gapCard: { background: "#fff", border: "1px solid #e8edf4", borderRadius: 12, padding: 24, borderLeft: "4px solid #1E90FF" },
  gapIcon: { fontSize: 32, display: "block", marginBottom: 12 },
  gapTitle: { fontSize: 16, fontWeight: 700, color: "#0A2342", marginBottom: 8 },
  gapDesc: { fontSize: 14, color: "#6b7280", lineHeight: 1.6 },
  fwGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  fwCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(30,144,255,0.2)", borderRadius: 12, padding: 24 },
  fwNum: { fontSize: 48, fontWeight: 900, color: "rgba(30,144,255,0.25)", lineHeight: 1, marginBottom: 8 },
  fwTitle: { fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 },
  fwDesc: { fontSize: 13, color: "#A8C8F0", lineHeight: 1.6 },
  ctaSection: { background: "#1E90FF", padding: "64px 24px", textAlign: "center" },
  ctaTitle: { fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 },
  ctaSub: { fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 32 },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 },
  serviceCard: { background: "#fff", border: "1px solid #e8edf4", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 8 },
  serviceIcon: { fontSize: 32 },
  serviceName: { fontSize: 16, fontWeight: 700, color: "#0A2342" },
  serviceDesc: { fontSize: 13, color: "#6b7280", lineHeight: 1.6, flex: 1 },
  servicePrice: { fontSize: 14, fontWeight: 700, color: "#1E90FF" },
  serviceBtn: { background: "#0A2342", color: "#fff", padding: "10px 16px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, textAlign: "center" },
  chatBox: { background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e8edf4", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  chatHeader: { background: "#0A2342", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, fontSize: 24 },
  chatHeaderName: { color: "#fff", fontWeight: 700, fontSize: 15 },
  chatHeaderSub: { color: "#A8C8F0", fontSize: 12 },
  chatMessages: { padding: 20, minHeight: 360, maxHeight: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 },
  chatMsg: { display: "flex", alignItems: "flex-end", gap: 8 },
  chatMsgUser: { flexDirection: "row-reverse" },
  chatMsgAI: { flexDirection: "row" },
  chatAvatar: { fontSize: 24, flexShrink: 0 },
  chatBubble: { maxWidth: "75%", padding: "12px 16px", borderRadius: 12, fontSize: 14, lineHeight: 1.6 },
  chatBubbleAI: { background: "#f0f6ff", color: "#0A2342", borderRadius: "4px 12px 12px 12px" },
  chatBubbleUser: { background: "#1E90FF", color: "#fff", borderRadius: "12px 4px 12px 12px" },
  chatInputRow: { display: "flex", padding: 16, gap: 12, borderTop: "1px solid #e8edf4" },
  chatInput: { flex: 1, padding: "12px 16px", borderRadius: 8, border: "1px solid #e8edf4", fontSize: 14, outline: "none" },
  chatSend: { background: "#1E90FF", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer" },
  chatSuggestions: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 },
  chatSugBtn: { background: "#f0f6ff", color: "#1E90FF", border: "1px solid #1E90FF", padding: "8px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 500 },
  trainingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 },
  trainingCard: { background: "#fff", border: "1px solid #e8edf4", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 10 },
  trainingPrice: { fontSize: 28, fontWeight: 900, color: "#1E90FF" },
  trainingTitle: { fontSize: 15, fontWeight: 700, color: "#0A2342" },
  trainingSessions: { fontSize: 12, color: "#6b7280", fontWeight: 600 },
  trainingItems: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  trainingItem: { fontSize: 13, color: "#374151" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 },
  aboutText: { fontSize: 15, color: "#6b7280", lineHeight: 1.8 },
  pillars: { display: "flex", gap: 12, flexWrap: "wrap" },
  pillar: { background: "#1E90FF", color: "#fff", padding: "8px 20px", borderRadius: 20, fontWeight: 700, fontSize: 14 },
  aboutFw: { display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" },
  aboutFwNum: { fontSize: 36, fontWeight: 900, color: "rgba(30,144,255,0.2)", flexShrink: 0, lineHeight: 1 },
  aboutFwTitle: { fontSize: 15, fontWeight: 700, color: "#0A2342", marginBottom: 6 },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 },
  formInput: { display: "block", width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #e8edf4", fontSize: 14, marginBottom: 12, boxSizing: "border-box" },
  formTextarea: { display: "block", width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #e8edf4", fontSize: 14, marginBottom: 16, minHeight: 120, boxSizing: "border-box" },
  formSuccess: { marginTop: 12, color: "#059669", fontWeight: 600 },
  formError: { marginTop: 12, color: "#dc2626", fontWeight: 600 },
  contactItem: { display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 },
  contactIcon: { fontSize: 28 },
  contactLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#9ca3af", marginBottom: 4 },
  contactValue: { fontSize: 15, color: "#0A2342", fontWeight: 600, textDecoration: "none" },
  contactWa: { marginTop: 32 },
  footer: { background: "#0A2342", padding: "40px 24px" },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 },
  footerBrand: {},
  footerLinks: { display: "flex", gap: 8, flexWrap: "wrap" },
  footerLink: { background: "none", border: "none", color: "#A8C8F0", fontSize: 13, cursor: "pointer" },
  footerContact: { textAlign: "right" },
};

