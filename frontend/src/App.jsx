import { useState } from "react";
import axios from "axios";

const API = "https://bilong-backend.onrender.com";

const NAV_LINKS = ["Home", "About", "Services", "AI Assistant", "Training", "Contact"];

const SERVICES = [
  { 
    icon: "📱", 
    name: "Digital Marketing Service", 
    desc: "Full-scale digital marketing solutions to grow your brand online:",
    items: ["Social Media Management", "Email Marketing", "SEO & Search Optimization", "Website Optimization", "Content Marketing", "Community Management", "Brand Strategy & Voice", "Analytics & Reporting"]
  },
  { 
    icon: "📣", 
    name: "Paid Advertising", 
    desc: "Strategic ad campaigns built to convert views into customers:",
    items: ["Facebook & Instagram Ads", "Google Ads", "Meta Ads", "Campaign Optimization", "A/B Testing", "Performance Reporting"]
  },
  { 
    icon: "🌐", 
    name: "Website Development", 
    desc: "Professional websites that represent your brand 24/7:",
    items: ["Business Websites", "E-commerce Stores", "Landing Pages", "Mobile Optimized", "SEO Ready", "Fast & Secure"]
  },
  { 
    icon: "🤖", 
    name: "AI Training", 
    desc: "Master AI tools to grow and automate your business:",
    items: ["ChatGPT & Claude Mastery", "AI Content Creation", "Chatbots & Automation", "Workflow Optimization", "AI for Marketing", "Business Productivity with AI"]
  },
  { 
    icon: "📚", 
    name: "eBook Publishing", 
    desc: "We help you write, publish and market your eBook professionally:",
    items: ["eBook Writing Assistance", "Professional Formatting", "Cover Design", "Publishing Strategy", "Marketing Your eBook", "Digital Distribution"]
  },
  { 
    icon: "💡", 
    name: "Marketing Consultation", 
    desc: "1-on-1 strategy sessions that give your business a clear direction:",
    items: ["Business Analysis", "Marketing Roadmap", "Strategy Planning", "Growth Consulting", "Brand Positioning", "Priority WhatsApp Access"]
  },
];

const TRAINING = [
  { 
    title: "STARTER PLAN", 
    subtitle: "For beginners with zero experience",
    items: [
      "Introduction to Digital Marketing",
      "Social Media Basics & Content Creation",
      "Understanding Your Target Audience",
      "Basic Graphic Design for Marketing",
      "Introduction to Email Marketing",
      "How to Build Your Online Presence",
      "Certificate included"
    ],
    bestFor: "Complete beginners who want to start their digital marketing journey",
    featured: false
  },
  { 
    title: "GROWTH PLAN", 
    subtitle: "For students ready to go deeper and handle real clients",
    note: "Basic plan will also be covered for students who do not have the basic knowledge",
    items: [
      "Everything in Starter Plan PLUS:",
      "Digital Marketing Strategy & Planning",
      "Content Marketing & Storytelling",
      "Email Marketing",
      "Website Optimization basics (SEO)",
      "Audience Research & Buyer Persona",
      "Analytics & Reporting",
      "Community Management",
      "Brand Identity & Voice",
      "How to get and manage clients",
      "Certificate included"
    ],
    bestFor: "Students who already know the basics and want to handle real digital marketing work professionally",
    featured: false
  },
  { 
    title: "PRO PLAN", 
    subtitle: "For serious students who want to master digital marketing completely",
    items: [
      "Everything in Growth Plan PLUS:",
      "Full Digital Marketing & E-commerce Curriculum",
      "AI Automation — chatbots, workflows, scheduling tools",
      "Advanced Paid Advertising — Google Ads, Meta Ads, campaign optimization",
      "Advanced SEO & Website Optimization",
      "Influencer & Affiliate Marketing",
      "Marketing Funnels & Sales Strategy",
      "Real World Case Studies — analyzing real brand campaigns",
      "Practical Examples & Live Projects",
      "How to start and run your own digital marketing agency",
      "Certificate included"
    ],
    bestFor: "Students who want to become full professional digital marketers or start their own agency",
    featured: true
  },
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
    if (!form.name || !form.email || !form.business || !form.message) { setFormStatus("error"); return; }
    try {
      await axios.post(`${API}/api/contact`, form);
      setFormStatus("success");
      setForm({ name: "", email: "", business: "", message: "" });
    } catch { setFormStatus("error"); }
  };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <img src="/bilong_real_logo.jpg" alt="BILONG Logo" style={styles.navLogoImg} />
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
          <a href="https://wa.me/2348153687589" target="_blank" style={styles.navCta}>WhatsApp Us</a>
        </div>
      </nav>

      <main style={styles.main}>

        {active === "Home" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <img src="/bilong_real_logo.jpg" alt="BILONG Logo" style={styles.heroLogo} />
                <div style={styles.heroBadge}>🌍 Global Digital Marketing Agency</div>
                <h1 style={styles.heroTitle}>
                  Grow Your Business<br />
                  <span style={styles.heroBlue}>Anywhere In The World.</span>
                </h1>
                <p style={styles.heroSub}>
                  BILONG DIGITAL HUB delivers world-class digital marketing, AI training, website development, eBook publishing and professional training to businesses globally. We create social media accounts and websites to advertise and support every business that comes to us.
                </p>
                <div style={styles.heroButtons}>
                  <button onClick={() => setActive("AI Assistant")} style={styles.btnPrimary}>Ask Our AI Assistant</button>
                  <button onClick={() => setActive("Services")} style={styles.btnSecondary}>See Our Services</button>
                </div>
                <div style={styles.heroStats}>
                  {[["6+", "Services"], ["📚", "eBooks"], ["🌍", "Worldwide"], ["🤖", "AI-Powered"]].map(([num, label]) => (
                    <div key={label} style={styles.heroStat}>
                      <div style={styles.heroStatNum}>{num}</div>
                      <div style={styles.heroStatLabel}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.sectionLabel}>The Gap We Are Filling</div>
                <h2 style={styles.sectionTitle}>What Most Agencies Are Leaving Behind</h2>
                <div style={styles.gapGrid}>
                  {[
                    ["🏢", "SMEs Are Ignored", "Most agencies chase big brands. BILONG serves every business — small, medium, startup — with the same world-class quality."],
                    ["🤖", "AI For Every Business", "We bring AI tools and training to businesses that need it most, not just big corporations."],
                    ["📚", "Education + Execution", "We don't just do the work — we train you too. No other agency combines teaching and delivering in one package."],
                    ["📱", "Social Media & Website Support", "We create and manage your social media accounts and website to advertise and support your business throughout our contract."],
                    ["🌍", "Serving The World", "We are not limited to any one country or continent. BILONG serves businesses globally."],
                    ["📖", "eBook Publishing", "We help you write and publish your eBook. Your knowledge deserves to reach the world."],
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

            <section style={styles.ctaSection}>
              <h2 style={styles.ctaTitle}>Ready to Grow Your Business?</h2>
              <p style={styles.ctaSub}>Free 15-minute strategy call. No obligation. Just results.</p>
              <div style={styles.heroButtons}>
                <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" style={styles.btnPrimary}>Book Free Call on WhatsApp</a>
                <button onClick={() => setActive("Contact")} style={styles.btnSecondary}>Send Us a Message</button>
              </div>
            </section>
          </div>
        )}

        {active === "About" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>Our Story</div>
                <h1 style={styles.heroTitle}>Built For Every Business<br/><span style={styles.heroBlue}>That Deserves To Grow.</span></h1>
                <p style={styles.heroSub}>BILONG DIGITAL HUB was founded by Olawumi Micheal Damilare with one clear mission — to give every business across the world access to world-class digital marketing, regardless of their size or location.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.aboutGrid}>
                  <div>
                    <h2 style={styles.sectionTitle}>Our Vision</h2>
                    <p style={styles.aboutText}>To become the world's most trusted digital marketing agency — known not just for results, but for educating and elevating every business we touch.</p>
                    <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>Our Mission</h2>
                    <p style={styles.aboutText}>To bridge the digital marketing gap for businesses worldwide by combining education, innovation, and execution in a way no other agency does. We create social media accounts and websites to advertise and support every client throughout our contract.</p>
                    <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>Our Pillars</h2>
                    <div style={styles.pillars}>
                      {["Educate", "Innovate", "Elevate", "Connect"].map(p => (
                        <div key={p} style={styles.pillar}>{p}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 style={styles.sectionTitle}>What Makes Us Different</h2>
                    {[
                      ["🌍", "Global Reach", "We serve businesses worldwide — not limited to any region or country."],
                      ["📚", "eBook Publishing", "We help individuals and businesses write, publish and market their eBooks professionally."],
                      ["🎓", "Education + Execution", "We train you AND do the work for you — unique in the industry."],
                      ["🤖", "AI-Powered Training", "We integrate the latest AI tools to give your business a competitive edge."],
                      ["📱", "Social Media & Website Support", "Every client gets their social media and website managed and promoted throughout our contract."],
                    ].map(([icon, title, desc]) => (
                      <div key={title} style={styles.aboutFw}>
                        <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                        <div>
                          <div style={styles.aboutFwTitle}>{title}</div>
                          <div style={styles.gapDesc}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {active === "Services" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>What We Offer</div>
                <h1 style={styles.heroTitle}>6 Services. <span style={styles.heroBlue}>One Agency.</span></h1>
                <p style={styles.heroSub}>Everything your business needs to grow digitally — under one roof, serving businesses worldwide. Contact us for pricing tailored to your needs.</p>
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
                      <ul style={styles.serviceList}>
                        {s.items.map(item => (
                          <li key={item} style={styles.serviceItem}>✅ {item}</li>
                        ))}
                      </ul>
                      <a href="https://wa.me/2348153687589" target="_blank" style={styles.serviceBtn}>Get Started →</a>
                    </div>
                  ))}
                </div>
                <div style={styles.serviceNote}>
                  📞 Contact us on WhatsApp for custom pricing tailored to your business needs and budget.
                </div>
              </div>
            </section>
          </div>
        )}

        {active === "AI Assistant" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>🤖 AI-Powered Assistant</div>
                <h1 style={styles.heroTitle}>Meet <span style={styles.heroBlue}>BILONG AI</span></h1>
                <p style={styles.heroSub}>Ask any marketing question and get expert answers instantly — free, no sign-up needed.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={{ ...styles.sectionInner, maxWidth: 720 }}>
                <div style={styles.chatBox}>
                  <div style={styles.chatHeader}>
                    <img src="/bilong_real_logo.jpg" alt="logo" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                    <div>
                      <div style={styles.chatHeaderName}>BILONG AI Assistant</div>
                      <div style={styles.chatHeaderSub}>Powered by AI · Online</div>
                    </div>
                  </div>
                  <div style={styles.chatMessages}>
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{ ...styles.chatMsg, ...(msg.role === "user" ? styles.chatMsgUser : styles.chatMsgAI) }}>
                        {msg.role === "assistant" && <img src="/bilong_real_logo.jpg" alt="logo" style={styles.chatAvatar} />}
                        <div style={{ ...styles.chatBubble, ...(msg.role === "user" ? styles.chatBubbleUser : styles.chatBubbleAI) }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div style={styles.chatMsg}>
                        <img src="/bilong_real_logo.jpg" alt="logo" style={styles.chatAvatar} />
                        <div style={styles.chatBubbleAI}>Thinking...</div>
                      </div>
                    )}
                  </div>
                  <div style={styles.chatInputRow}>
                    <input style={styles.chatInput} value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendChat()}
                      placeholder="Ask me anything about marketing..." />
                    <button onClick={sendChat} style={styles.chatSend}>Send</button>
                  </div>
                </div>
                <div style={styles.chatSuggestions}>
                  {["How do I get more customers?", "What is digital marketing?", "How do I grow on social media?", "How can AI help my business?"].map(q => (
                    <button key={q} onClick={() => setChatInput(q)} style={styles.chatSugBtn}>{q}</button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {active === "Training" && (
          <div>
            <section style={styles.hero}>
              <div style={styles.heroInner}>
                <div style={styles.heroBadge}>🎓 Professional Training</div>
                <h1 style={styles.heroTitle}>We Don't Just Do It. <span style={styles.heroBlue}>We Teach It.</span></h1>
                <p style={styles.heroSub}>From complete beginner to professional digital marketer. Choose the plan that fits your level and goals. Contact us on WhatsApp for pricing.</p>
              </div>
            </section>
            <section style={styles.section}>
              <div style={styles.sectionInner}>
                <div style={styles.trainingGrid}>
                  {TRAINING.map((t) => (
                    <div key={t.title} style={{ ...styles.trainingCard, ...(t.featured ? styles.trainingCardFeatured : {}) }}>
                      {t.featured && <div style={styles.trainingBadge}>⭐ MOST COMPLETE</div>}
                      <div style={styles.trainingTitle}>{t.title}</div>
                      <div style={styles.trainingSub}>{t.subtitle}</div>
                      <div style={styles.trainingItems}>
                        {t.items.map(item => (
                          <div key={item} style={styles.trainingItem}>👉 {item}</div>
                        ))}
                      </div>
                      {t.note && <div style={styles.trainingNote}>📌 Note: {t.note}</div>}
                      <div style={styles.trainingBestFor}><strong>Best For:</strong> {t.bestFor}</div>
                      <a href="https://wa.me/2348153687589?text=I want to enroll in the course" target="_blank" style={styles.serviceBtn}>Enroll Now →</a>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

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
                      ["🌍", "Coverage", "Serving Businesses Worldwide", null],
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

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <img src="/bilong_real_logo.jpg" alt="logo" style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 8, objectFit: "cover" }} />
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
            <div style={{ color: "#A8C8F0", fontSize: 13 }}>🌍 Serving Businesses Worldwide</div>
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
  navLogoImg: { width: 44, height: 44, borderRadius: 10, objectFit: "cover" },
  navName: { color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: 1 },
  navSub: { color: "#A8C8F0", fontSize: 10, letterSpacing: 1 },
  navLinks: { display: "flex", gap: 4 },
  navLink: { background: "none", border: "none", color: "#A8C8F0", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 },
  navLinkActive: { background: "rgba(30,144,255,0.15)", color: "#1E90FF" },
  navCta: { background: "#1E90FF", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700 },
  main: { minHeight: "calc(100vh - 70px)" },
  hero: { background: "linear-gradient(135deg, #071628 0%, #0A2342 60%, #0d2d52 100%)", padding: "80px 24px" },
  heroInner: { maxWidth: 800, margin: "0 auto", textAlign: "center" },
  heroLogo: { width: 90, height: 90, borderRadius: 18, objectFit: "cover", marginBottom: 20, border: "2px solid rgba(30,144,255,0.4)" },
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
  ctaSection: { background: "#1E90FF", padding: "64px 24px", textAlign: "center" },
  ctaTitle: { fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 },
  ctaSub: { fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 32 },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 },
  serviceCard: { background: "#fff", border: "1px solid #e8edf4", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 8 },
  serviceIcon: { fontSize: 32 },
  serviceName: { fontSize: 16, fontWeight: 700, color: "#0A2342" },
  serviceDesc: { fontSize: 13, color: "#6b7280", lineHeight: 1.6 },
  serviceList: { listStyle: "none", padding: 0, margin: 0, flex: 1 },
  serviceItem: { fontSize: 13, color: "#374151", padding: "3px 0" },
  serviceBtn: { background: "#0A2342", color: "#fff", padding: "10px 16px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, textAlign: "center", marginTop: 8 },
  serviceNote: { marginTop: 32, background: "#f0f6ff", border: "1px solid #1E90FF", borderRadius: 10, padding: "16px 20px", fontSize: 14, color: "#0A2342", fontWeight: 500 },
  chatBox: { background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e8edf4", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  chatHeader: { background: "#0A2342", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 },
  chatHeaderName: { color: "#fff", fontWeight: 700, fontSize: 15 },
  chatHeaderSub: { color: "#A8C8F0", fontSize: 12 },
  chatMessages: { padding: 20, minHeight: 360, maxHeight: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 },
  chatMsg: { display: "flex", alignItems: "flex-end", gap: 8 },
  chatMsgUser: { flexDirection: "row-reverse" },
  chatMsgAI: { flexDirection: "row" },
  chatAvatar: { width: 32, height: 32, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
  chatBubble: { maxWidth: "75%", padding: "12px 16px", borderRadius: 12, fontSize: 14, lineHeight: 1.6 },
  chatBubbleAI: { background: "#f0f6ff", color: "#0A2342", borderRadius: "4px 12px 12px 12px" },
  chatBubbleUser: { background: "#1E90FF", color: "#fff", borderRadius: "12px 4px 12px 12px" },
  chatInputRow: { display: "flex", padding: 16, gap: 12, borderTop: "1px solid #e8edf4" },
  chatInput: { flex: 1, padding: "12px 16px", borderRadius: 8, border: "1px solid #e8edf4", fontSize: 14, outline: "none" },
  chatSend: { background: "#1E90FF", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer" },
  chatSuggestions: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 },
  chatSugBtn: { background: "#f0f6ff", color: "#1E90FF", border: "1px solid #1E90FF", padding: "8px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 500 },
  trainingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 },
  trainingCard: { background: "#fff", border: "1px solid #e8edf4", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 10 },
  trainingCardFeatured: { border: "2px solid #1E90FF", background: "#f0f6ff" },
  trainingBadge: { background: "#1E90FF", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start" },
  trainingTitle: { fontSize: 22, fontWeight: 900, color: "#0A2342" },
  trainingSub: { fontSize: 13, color: "#1E90FF", fontWeight: 600 },
  trainingItems: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  trainingItem: { fontSize: 13, color: "#374151", lineHeight: 1.5 },
  trainingNote: { fontSize: 12, color: "#f59e0b", background: "#fffbeb", padding: "8px 12px", borderRadius: 6, border: "1px solid #fcd34d" },
  trainingBestFor: { fontSize: 13, color: "#6b7280", fontStyle: "italic", padding: "8px 0", borderTop: "1px solid #e8edf4" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 },
  aboutText: { fontSize: 15, color: "#6b7280", lineHeight: 1.8 },
  pillars: { display: "flex", gap: 12, flexWrap: "wrap" },
  pillar: { background: "#1E90FF", color: "#fff", padding: "8px 20px", borderRadius: 20, fontWeight: 700, fontSize: 14 },
  aboutFw: { display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" },
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

