import { useState } from "react";
import axios from "axios";

const API = "https://bilong-backend.onrender.com";
const NAV_LINKS = ["Home", "About", "Services", "AI Assistant", "Training", "Contact"];

const SERVICES = [
  { icon: "📱", name: "Digital Marketing Service", desc: "Full-scale digital marketing to grow your brand:", items: ["Social Media Management", "Email Marketing", "SEO & Search Optimization", "Website Optimization", "Content Marketing", "Community Management", "Brand Strategy & Voice", "Analytics & Reporting"] },
  { icon: "📣", name: "Paid Advertising", desc: "Strategic ad campaigns built to convert:", items: ["Facebook & Instagram Ads", "Google Ads", "Meta Ads", "Campaign Optimization", "A/B Testing", "Performance Reporting"] },
  { icon: "🌐", name: "Website Development", desc: "Professional websites that work for your business 24/7:", items: ["Business Websites", "E-commerce Stores", "Landing Pages", "Mobile Optimized", "SEO Ready", "Fast & Secure"] },
  { icon: "🤖", name: "AI Training", desc: "Master AI tools to grow and automate your business:", items: ["ChatGPT & Claude Mastery", "AI Content Creation", "Chatbots & Automation", "Workflow Optimization", "AI for Marketing", "Business Productivity with AI"] },
  { icon: "📚", name: "eBook Sales & Publishing", desc: "BILONG sells eBooks that help businesses and individuals learn marketing. We also help you write and publish yours:", items: ["Marketing eBooks for sale", "eBook Writing Assistance", "Professional Formatting", "Cover Design", "Publishing Strategy", "Digital Distribution"] },
  { icon: "💡", name: "Marketing Consultation", desc: "1-on-1 strategy sessions with a clear marketing roadmap:", items: ["Business Analysis", "Marketing Roadmap", "Strategy Planning", "Growth Consulting", "Brand Positioning", "Priority WhatsApp Access"] },
];

const TRAINING = [
  { title: "STARTER PLAN", subtitle: "For beginners with zero experience", items: ["Introduction to Digital Marketing", "Social Media Basics & Content Creation", "Understanding Your Target Audience", "Basic Graphic Design for Marketing", "Introduction to Email Marketing", "How to Build Your Online Presence", "Certificate included"], bestFor: "Complete beginners who want to start their digital marketing journey", featured: false },
  { title: "GROWTH PLAN", subtitle: "For students ready to go deeper and handle real clients", note: "Basic plan will also be covered for students who do not have the basic knowledge", items: ["Everything in Starter Plan PLUS:", "Digital Marketing Strategy & Planning", "Content Marketing & Storytelling", "Email Marketing", "Website Optimization basics (SEO)", "Audience Research & Buyer Persona", "Analytics & Reporting", "Community Management", "Brand Identity & Voice", "How to get and manage clients", "Certificate included"], bestFor: "Students who already know the basics and want to handle real digital marketing work professionally", featured: false },
  { title: "PRO PLAN", subtitle: "For serious students who want to master digital marketing completely", items: ["Everything in Growth Plan PLUS:", "Full Digital Marketing & E-commerce Curriculum", "AI Automation — chatbots, workflows, scheduling tools", "Advanced Paid Advertising — Google Ads, Meta Ads", "Advanced SEO & Website Optimization", "Influencer & Affiliate Marketing", "Marketing Funnels & Sales Strategy", "Real World Case Studies", "Practical Examples & Live Projects", "How to start and run your own digital marketing agency", "Certificate included"], bestFor: "Students who want to become full professional digital marketers or start their own agency", featured: true },
];

const EBOOKS = [
  { title: "Digital Marketing Foundations", desc: "Everything a beginner needs to understand digital marketing, social media, and online business growth.", tag: "Beginner" },
  { title: "Scale of Preference in Marketing", desc: "The original BILONG framework — learn how to speak to your customer's #1 priority and close more sales.", tag: "Framework" },
  { title: "AI Tools for Business Growth", desc: "A practical guide to using ChatGPT, Claude and other AI tools to automate and scale your business.", tag: "AI & Automation" },
];

export default function App() {
  const [active, setActive] = useState("Home");
  const [chatMessages, setChatMessages] = useState([{ role: "assistant", text: "Hi! I'm BILONG AI 👋 Ask me any marketing question — I'm here to help your business grow!" }]);
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
      setChatMessages(prev => [...prev, { role: "assistant", text: "Sorry, I'm having trouble connecting right now. Please WhatsApp us: +234 815 368 7589" }]);
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
    <div style={s.app}>
      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.navBrand}>
            <img src="/bilong_real_logo.jpg" alt="BILONG" style={s.navLogo} />
            <div>
              <div style={s.navName}>BILONG DIGITAL HUB</div>
              <div style={s.navSub}>Your service is our priority</div>
            </div>
          </div>
          <div style={s.navLinks}>
            {NAV_LINKS.map(l => <button key={l} onClick={() => setActive(l)} style={{ ...s.navLink, ...(active === l ? s.navActive : {}) }}>{l}</button>)}
          </div>
          <a href="https://wa.me/2348153687589" target="_blank" style={s.navCta}>WhatsApp Us</a>
        </div>
      </nav>

      <main>
        {/* ── HOME ── */}
        {active === "Home" && <div>
          {/* HERO */}
          <section style={s.hero}>
            <div style={s.heroInner}>
              <div style={s.heroBadge}>🌍 Global Digital Marketing Agency</div>
              <h1 style={s.heroTitle}>Grow Your Business<br/><span style={s.blue}>Anywhere In The World.</span></h1>
              <p style={s.heroSub}>BILONG DIGITAL HUB delivers world-class digital marketing, AI training, website development, eBook publishing and professional training to businesses globally. Every client gets their business promoted on our social media and website throughout our contract.</p>
              <div style={s.btnRow}>
                <button onClick={() => setActive("AI Assistant")} style={s.btnP}>Ask Our AI Assistant</button>
                <button onClick={() => setActive("Services")} style={s.btnS}>See Our Services</button>
              </div>
              <div style={s.stats}>
                {[["6+","Services"],["📚","eBooks"],["🌍","Worldwide"],["🤝","Client-First"]].map(([n,l]) => (
                  <div key={l} style={s.stat}><div style={s.statN}>{n}</div><div style={s.statL}>{l}</div></div>
                ))}
              </div>
            </div>
          </section>

          {/* MARQUEE STRIP */}
          <div style={s.strip}>
            <div style={s.stripInner}>
              {["Digital Marketing","AI Training","Website Development","eBook Publishing","Paid Advertising","Marketing Consultation","Social Media Management","SEO & Optimization"].map(t => (
                <span key={t} style={s.stripItem}>⚡ {t}</span>
              ))}
            </div>
          </div>

          {/* WHY BILONG */}
          <section style={s.section}>
            <div style={s.inner}>
              <div style={s.sectionLabel}>Why Choose BILONG</div>
              <h2 style={s.sectionTitle}>We Put Your Service First. Always.</h2>
              <div style={s.grid3}>
                {[
                  ["🤝","Your Service Is Our Priority","Every client gets dedicated attention, personalised strategy and real results. We treat your business like our own."],
                  ["📢","We Advertise Your Business","Every client who works with us gets their business promoted on BILONG's social media accounts and website throughout our contract."],
                  ["📚","eBooks That Teach","BILONG sells practical marketing eBooks to help businesses and individuals learn and grow at their own pace."],
                  ["🤖","AI-Powered Agency","We use the latest AI tools to deliver faster, smarter results for your business — and teach you how to use them too."],
                  ["🎓","We Train & Deliver","No other agency trains you AND does the work for you. We educate while we execute."],
                  ["🌍","Serving The World","We are not limited to any country or continent. BILONG serves businesses globally with the same quality and care."],
                ].map(([icon,title,desc]) => (
                  <div key={title} style={s.card}>
                    <div style={s.cardIcon}>{icon}</div>
                    <div style={s.cardTitle}>{title}</div>
                    <div style={s.cardDesc}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EBOOKS PREVIEW */}
          <section style={{...s.section, background:"#0A2342"}}>
            <div style={s.inner}>
              <div style={{...s.sectionLabel, color:"#1E90FF"}}>📚 BILONG eBooks</div>
              <h2 style={{...s.sectionTitle, color:"#fff"}}>Learn Marketing. Grow Faster.</h2>
              <div style={s.grid3}>
                {EBOOKS.map(eb => (
                  <div key={eb.title} style={s.ebookCard}>
                    <div style={s.ebookTag}>{eb.tag}</div>
                    <div style={s.ebookTitle}>{eb.title}</div>
                    <div style={s.ebookDesc}>{eb.desc}</div>
                    <a href="https://wa.me/2348153687589?text=I want to buy an eBook" target="_blank" style={s.ebookBtn}>Get This eBook →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={s.cta}>
            <h2 style={s.ctaTitle}>Ready to Grow Your Business?</h2>
            <p style={s.ctaSub}>Free 15-minute strategy call. No obligation. Just results.</p>
            <div style={s.btnRow}>
              <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" style={s.btnP}>Book Free Call on WhatsApp</a>
              <button onClick={() => setActive("Contact")} style={s.btnS}>Send Us a Message</button>
            </div>
          </section>
        </div>}

        {/* ── ABOUT ── */}
        {active === "About" && <div>
          <section style={s.hero}>
            <div style={s.heroInner}>
              <div style={s.heroBadge}>Our Story</div>
              <h1 style={s.heroTitle}>Built For Every Business<br/><span style={s.blue}>That Deserves To Grow.</span></h1>
              <p style={s.heroSub}>BILONG DIGITAL HUB was founded by Olawumi Micheal Damilare with one clear mission — to give every business across the world access to world-class digital marketing, regardless of their size or location.</p>
            </div>
          </section>
          <section style={s.section}>
            <div style={s.inner}>
              <div style={s.twoCol}>
                <div>
                  <h2 style={s.sectionTitle}>Our Vision</h2>
                  <p style={s.bodyText}>To become the world's most trusted digital marketing agency — known not just for results, but for educating and elevating every business we touch.</p>
                  <h2 style={{...s.sectionTitle, marginTop:32}}>Our Mission</h2>
                  <p style={s.bodyText}>To bridge the digital marketing gap for businesses worldwide by combining education, innovation, and execution in a way no other agency does. Every client who comes to BILONG gets their business advertised on our social media and website throughout our contract — because your service is our priority.</p>
                  <h2 style={{...s.sectionTitle, marginTop:32}}>Our Pillars</h2>
                  <div style={s.pillars}>
                    {["Educate","Innovate","Elevate","Connect"].map(p => <div key={p} style={s.pillar}>{p}</div>)}
                  </div>
                </div>
                <div>
                  <h2 style={s.sectionTitle}>What Makes Us Different</h2>
                  {[
                    ["🤝","Your Service Is Our Priority","We treat every client's business like our own — with dedicated focus and personalised strategy."],
                    ["📢","We Advertise For You","Every client's business gets promoted on BILONG's social media and website for the duration of our contract."],
                    ["📚","eBook Publishing & Sales","We sell marketing eBooks and help you write and publish yours professionally."],
                    ["🎓","Education + Execution","We train you AND do the work — unique in the industry."],
                    ["🌍","Global Coverage","Not limited to any country. We serve businesses everywhere."],
                  ].map(([icon,title,desc]) => (
                    <div key={title} style={s.aboutItem}>
                      <span style={{fontSize:24, flexShrink:0}}>{icon}</span>
                      <div><div style={s.aboutItemTitle}>{title}</div><div style={s.cardDesc}>{desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>}

        {/* ── SERVICES ── */}
        {active === "Services" && <div>
          <section style={s.hero}>
            <div style={s.heroInner}>
              <div style={s.heroBadge}>What We Offer</div>
              <h1 style={s.heroTitle}>6 Services. <span style={s.blue}>One Agency.</span></h1>
              <p style={s.heroSub}>Everything your business needs to grow digitally — under one roof, serving businesses worldwide. Contact us on WhatsApp for pricing tailored to your needs.</p>
            </div>
          </section>
          <section style={s.section}>
            <div style={s.inner}>
              <div style={s.grid3}>
                {SERVICES.map(sv => (
                  <div key={sv.name} style={s.serviceCard}>
                    <div style={s.serviceIcon}>{sv.icon}</div>
                    <div style={s.serviceTitle}>{sv.name}</div>
                    <div style={s.cardDesc}>{sv.desc}</div>
                    <ul style={s.serviceList}>
                      {sv.items.map(it => <li key={it} style={s.serviceItem}>✅ {it}</li>)}
                    </ul>
                    <a href="https://wa.me/2348153687589" target="_blank" style={s.serviceBtn}>Get Started →</a>
                  </div>
                ))}
              </div>
              <div style={s.serviceNote}>📞 Contact us on WhatsApp for custom pricing tailored to your business needs and budget.</div>
            </div>
          </section>
        </div>}

        {/* ── AI ASSISTANT ── */}
        {active === "AI Assistant" && <div>
          <section style={s.hero}>
            <div style={s.heroInner}>
              <div style={s.heroBadge}>🤖 AI-Powered Assistant</div>
              <h1 style={s.heroTitle}>Meet <span style={s.blue}>BILONG AI</span></h1>
              <p style={s.heroSub}>Ask any marketing question and get expert answers instantly — free, no sign-up needed.</p>
            </div>
          </section>
          <section style={s.section}>
            <div style={{...s.inner, maxWidth:720}}>
              <div style={s.chatBox}>
                <div style={s.chatHead}>
                  <img src="/bilong_real_logo.jpg" alt="logo" style={{width:40,height:40,borderRadius:8,objectFit:"cover"}}/>
                  <div><div style={s.chatName}>BILONG AI Assistant</div><div style={s.chatSub}>Powered by AI · Online</div></div>
                </div>
                <div style={s.chatMsgs}>
                  {chatMessages.map((m,i) => (
                    <div key={i} style={{...s.chatRow,...(m.role==="user"?s.chatRowUser:s.chatRowAI)}}>
                      {m.role==="assistant" && <img src="/bilong_real_logo.jpg" alt="logo" style={s.chatAv}/>}
                      <div style={{...s.bubble,...(m.role==="user"?s.bubbleUser:s.bubbleAI)}}>{m.text}</div>
                    </div>
                  ))}
                  {chatLoading && <div style={s.chatRow}><img src="/bilong_real_logo.jpg" alt="logo" style={s.chatAv}/><div style={s.bubbleAI}>Thinking...</div></div>}
                </div>
                <div style={s.chatInputRow}>
                  <input style={s.chatIn} value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask me anything about marketing..."/>
                  <button onClick={sendChat} style={s.chatBtn}>Send</button>
                </div>
              </div>
              <div style={s.suggestions}>
                {["How do I get more customers?","What is digital marketing?","How do I grow on social media?","How can AI help my business?"].map(q => (
                  <button key={q} onClick={()=>setChatInput(q)} style={s.sugBtn}>{q}</button>
                ))}
              </div>
            </div>
          </section>
        </div>}

        {/* ── TRAINING ── */}
        {active === "Training" && <div>
          <section style={s.hero}>
            <div style={s.heroInner}>
              <div style={s.heroBadge}>🎓 Professional Training</div>
              <h1 style={s.heroTitle}>We Don't Just Do It. <span style={s.blue}>We Teach It.</span></h1>
              <p style={s.heroSub}>From complete beginner to professional digital marketer. Choose the plan that fits your level. Contact us on WhatsApp for pricing.</p>
            </div>
          </section>
          <section style={s.section}>
            <div style={s.inner}>
              <div style={s.trainingGrid}>
                {TRAINING.map(t => (
                  <div key={t.title} style={{...s.trainingCard,...(t.featured?s.trainingFeatured:{})}}>
                    {t.featured && <div style={s.featuredBadge}>⭐ MOST COMPLETE</div>}
                    <div style={s.trainingTitle}>{t.title}</div>
                    <div style={s.trainingSub}>{t.subtitle}</div>
                    <div style={s.trainingItems}>
                      {t.items.map(it => <div key={it} style={s.trainingItem}>👉 {it}</div>)}
                    </div>
                    {t.note && <div style={s.trainingNote}>📌 Note: {t.note}</div>}
                    <div style={s.trainingBestFor}><strong>Best For:</strong> {t.bestFor}</div>
                    <a href="https://wa.me/2348153687589?text=I want to enroll in the course" target="_blank" style={s.serviceBtn}>Enroll Now →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>}

        {/* ── CONTACT ── */}
        {active === "Contact" && <div>
          <section style={s.hero}>
            <div style={s.heroInner}>
              <div style={s.heroBadge}>Get In Touch</div>
              <h1 style={s.heroTitle}>Let's Grow Your <span style={s.blue}>Business Together.</span></h1>
              <p style={s.heroSub}>Send us a message or WhatsApp us directly. We respond within 24 hours.</p>
            </div>
          </section>
          <section style={s.section}>
            <div style={s.inner}>
              <div style={s.twoCol}>
                <div>
                  <h2 style={s.sectionTitle}>Send a Message</h2>
                  {["name","email","business"].map(f => (
                    <input key={f} style={s.formIn} placeholder={f==="name"?"Your Name":f==="email"?"Your Email":"Your Business Name"} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}/>
                  ))}
                  <textarea style={s.formTa} placeholder="Tell us about your business and what you need..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                  <button onClick={sendForm} style={s.btnP}>Send Message</button>
                  {formStatus==="success" && <div style={s.fSuccess}>✅ Message sent! We will contact you within 24 hours.</div>}
                  {formStatus==="error" && <div style={s.fError}>❌ Please fill all fields correctly.</div>}
                </div>
                <div>
                  <h2 style={s.sectionTitle}>Contact Details</h2>
                  {[["📱","WhatsApp","+234 815 368 7589","https://wa.me/2348153687589"],["📧","Email","bilongdigitalhub@gmail.com","mailto:bilongdigitalhub@gmail.com"],["🌍","Coverage","Serving Businesses Worldwide",null]].map(([icon,label,val,link]) => (
                    <div key={label} style={s.contactItem}>
                      <span style={{fontSize:28}}>{icon}</span>
                      <div><div style={s.contactLabel}>{label}</div>{link?<a href={link} target="_blank" style={s.contactVal}>{val}</a>:<div style={s.contactVal}>{val}</div>}</div>
                    </div>
                  ))}
                  <div style={{marginTop:32}}>
                    <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" style={s.btnP}>💬 Chat on WhatsApp Now</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>}
      </main>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div>
            <img src="/bilong_real_logo.jpg" alt="logo" style={{width:44,height:44,borderRadius:10,marginBottom:8,objectFit:"cover"}}/>
            <div style={s.navName}>BILONG DIGITAL HUB</div>
            <div style={s.navSub}>Educate. Innovate. Elevate. Connect.</div>
            <div style={{color:"#A8C8F0",fontSize:12,marginTop:4}}>Your service is our priority</div>
          </div>
          <div style={s.footerLinks}>
            {NAV_LINKS.map(l => <button key={l} onClick={()=>setActive(l)} style={s.footerLink}>{l}</button>)}
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{color:"#A8C8F0",fontSize:13}}>© 2026 BILONG DIGITAL HUB</div>
            <div style={{color:"#A8C8F0",fontSize:13}}>Olawumi Micheal Damilare</div>
            <div style={{color:"#A8C8F0",fontSize:13}}>🌍 Serving Businesses Worldwide</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const s = {
  app:{minHeight:"100vh",background:"#f0f4f8",fontFamily:"'Segoe UI',sans-serif"},
  nav:{background:"#0A2342",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(0,0,0,0.4)"},
  navInner:{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:72},
  navBrand:{display:"flex",alignItems:"center",gap:12},
  navLogo:{width:46,height:46,borderRadius:10,objectFit:"cover",border:"2px solid rgba(30,144,255,0.4)"},
  navName:{color:"#fff",fontWeight:800,fontSize:16,letterSpacing:1},
  navSub:{color:"#1E90FF",fontSize:10,letterSpacing:1,fontStyle:"italic"},
  navLinks:{display:"flex",gap:4},
  navLink:{background:"none",border:"none",color:"#A8C8F0",padding:"8px 14px",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:500,transition:"all 0.2s"},
  navActive:{background:"rgba(30,144,255,0.15)",color:"#1E90FF"},
  navCta:{background:"linear-gradient(135deg,#1E90FF,#0066cc)",color:"#fff",padding:"10px 22px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:700,boxShadow:"0 4px 14px rgba(30,144,255,0.3)"},
  hero:{background:"linear-gradient(160deg,#050e1f 0%,#0A2342 50%,#0d2d52 100%)",padding:"90px 24px",position:"relative",overflow:"hidden"},
  heroInner:{maxWidth:800,margin:"0 auto",textAlign:"center"},
  heroBadge:{display:"inline-block",background:"rgba(30,144,255,0.15)",color:"#1E90FF",padding:"6px 18px",borderRadius:20,fontSize:13,fontWeight:600,marginBottom:22,border:"1px solid rgba(30,144,255,0.3)"},
  heroTitle:{fontSize:54,fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:20},
  blue:{color:"#1E90FF"},
  heroSub:{fontSize:17,color:"#A8C8F0",lineHeight:1.75,marginBottom:32,maxWidth:640,margin:"0 auto 32px"},
  btnRow:{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"},
  btnP:{background:"linear-gradient(135deg,#1E90FF,#0066cc)",color:"#fff",padding:"14px 30px",borderRadius:8,border:"none",fontSize:15,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"inline-block",boxShadow:"0 4px 14px rgba(30,144,255,0.35)"},
  btnS:{background:"transparent",color:"#fff",padding:"14px 30px",borderRadius:8,border:"2px solid rgba(255,255,255,0.3)",fontSize:15,fontWeight:600,cursor:"pointer"},
  stats:{display:"flex",justifyContent:"center",gap:48,marginTop:52},
  stat:{textAlign:"center"},
  statN:{fontSize:34,fontWeight:900,color:"#1E90FF"},
  statL:{fontSize:12,color:"#A8C8F0",marginTop:4,letterSpacing:1},
  strip:{background:"#1E90FF",padding:"12px 0",overflow:"hidden"},
  stripInner:{display:"flex",gap:0,whiteSpace:"nowrap"},
  stripItem:{color:"#fff",fontWeight:700,fontSize:13,padding:"0 28px",letterSpacing:0.5},
  section:{padding:"72px 24px"},
  inner:{maxWidth:1200,margin:"0 auto"},
  sectionLabel:{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"#1E90FF",marginBottom:12},
  sectionTitle:{fontSize:38,fontWeight:800,color:"#0A2342",marginBottom:36},
  grid3:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:22},
  card:{background:"#fff",border:"1px solid #e2eaf4",borderRadius:14,padding:26,borderTop:"4px solid #1E90FF",boxShadow:"0 2px 12px rgba(10,35,66,0.06)"},
  cardIcon:{fontSize:34,marginBottom:12},
  cardTitle:{fontSize:16,fontWeight:700,color:"#0A2342",marginBottom:8},
  cardDesc:{fontSize:14,color:"#6b7280",lineHeight:1.65},
  ebookCard:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(30,144,255,0.25)",borderRadius:14,padding:26,display:"flex",flexDirection:"column",gap:10},
  ebookTag:{display:"inline-block",background:"#1E90FF",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:10,letterSpacing:1,alignSelf:"flex-start"},
  ebookTitle:{fontSize:16,fontWeight:700,color:"#fff"},
  ebookDesc:{fontSize:13,color:"#A8C8F0",lineHeight:1.6,flex:1},
  ebookBtn:{background:"rgba(255,255,255,0.1)",color:"#1E90FF",padding:"10px 16px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600,border:"1px solid rgba(30,144,255,0.3)",textAlign:"center"},
  cta:{background:"linear-gradient(135deg,#1E90FF,#0055bb)",padding:"72px 24px",textAlign:"center"},
  ctaTitle:{fontSize:42,fontWeight:900,color:"#fff",marginBottom:12},
  ctaSub:{fontSize:18,color:"rgba(255,255,255,0.85)",marginBottom:32},
  twoCol:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52},
  bodyText:{fontSize:15,color:"#6b7280",lineHeight:1.8},
  pillars:{display:"flex",gap:12,flexWrap:"wrap",marginTop:8},
  pillar:{background:"#1E90FF",color:"#fff",padding:"8px 20px",borderRadius:20,fontWeight:700,fontSize:14},
  aboutItem:{display:"flex",gap:14,marginBottom:22,alignItems:"flex-start"},
  aboutItemTitle:{fontSize:15,fontWeight:700,color:"#0A2342",marginBottom:4},
  serviceCard:{background:"#fff",border:"1px solid #e2eaf4",borderRadius:14,padding:26,display:"flex",flexDirection:"column",gap:8,boxShadow:"0 2px 12px rgba(10,35,66,0.06)"},
  serviceIcon:{fontSize:34},
  serviceTitle:{fontSize:16,fontWeight:700,color:"#0A2342"},
  serviceList:{listStyle:"none",padding:0,margin:0,flex:1},
  serviceItem:{fontSize:13,color:"#374151",padding:"3px 0"},
  serviceBtn:{background:"#0A2342",color:"#fff",padding:"10px 16px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600,textAlign:"center",marginTop:8},
  serviceNote:{marginTop:32,background:"#f0f6ff",border:"1px solid rgba(30,144,255,0.3)",borderRadius:10,padding:"16px 20px",fontSize:14,color:"#0A2342",fontWeight:500},
  chatBox:{background:"#fff",borderRadius:16,overflow:"hidden",border:"1px solid #e2eaf4",boxShadow:"0 8px 32px rgba(10,35,66,0.1)"},
  chatHead:{background:"#0A2342",padding:"18px 20px",display:"flex",alignItems:"center",gap:12},
  chatName:{color:"#fff",fontWeight:700,fontSize:15},
  chatSub:{color:"#A8C8F0",fontSize:12},
  chatMsgs:{padding:20,minHeight:360,maxHeight:400,overflowY:"auto",display:"flex",flexDirection:"column",gap:12},
  chatRow:{display:"flex",alignItems:"flex-end",gap:8},
  chatRowUser:{flexDirection:"row-reverse"},
  chatRowAI:{flexDirection:"row"},
  chatAv:{width:32,height:32,borderRadius:8,objectFit:"cover",flexShrink:0},
  bubble:{maxWidth:"75%",padding:"12px 16px",borderRadius:12,fontSize:14,lineHeight:1.6},
  bubbleAI:{background:"#f0f6ff",color:"#0A2342",borderRadius:"4px 12px 12px 12px"},
  bubbleUser:{background:"#1E90FF",color:"#fff",borderRadius:"12px 4px 12px 12px"},
  chatInputRow:{display:"flex",padding:16,gap:12,borderTop:"1px solid #e2eaf4"},
  chatIn:{flex:1,padding:"12px 16px",borderRadius:8,border:"1px solid #e2eaf4",fontSize:14,outline:"none"},
  chatBtn:{background:"#1E90FF",color:"#fff",border:"none",padding:"12px 24px",borderRadius:8,fontWeight:700,cursor:"pointer"},
  suggestions:{display:"flex",flexWrap:"wrap",gap:8,marginTop:16},
  sugBtn:{background:"#f0f6ff",color:"#1E90FF",border:"1px solid rgba(30,144,255,0.3)",padding:"8px 14px",borderRadius:20,fontSize:12,cursor:"pointer",fontWeight:500},
  trainingGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:22},
  trainingCard:{background:"#fff",border:"1px solid #e2eaf4",borderRadius:14,padding:26,display:"flex",flexDirection:"column",gap:10,boxShadow:"0 2px 12px rgba(10,35,66,0.06)"},
  trainingFeatured:{border:"2px solid #1E90FF",background:"#f0f6ff"},
  featuredBadge:{background:"#1E90FF",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20,alignSelf:"flex-start"},
  trainingTitle:{fontSize:22,fontWeight:900,color:"#0A2342"},
  trainingSub:{fontSize:13,color:"#1E90FF",fontWeight:600},
  trainingItems:{flex:1,display:"flex",flexDirection:"column",gap:6},
  trainingItem:{fontSize:13,color:"#374151",lineHeight:1.5},
  trainingNote:{fontSize:12,color:"#92400e",background:"#fffbeb",padding:"8px 12px",borderRadius:6,border:"1px solid #fcd34d"},
  trainingBestFor:{fontSize:13,color:"#6b7280",fontStyle:"italic",padding:"8px 0",borderTop:"1px solid #e2eaf4"},
  formIn:{display:"block",width:"100%",padding:"12px 16px",borderRadius:8,border:"1px solid #e2eaf4",fontSize:14,marginBottom:12,boxSizing:"border-box"},
  formTa:{display:"block",width:"100%",padding:"12px 16px",borderRadius:8,border:"1px solid #e2eaf4",fontSize:14,marginBottom:16,minHeight:120,boxSizing:"border-box"},
  fSuccess:{marginTop:12,color:"#059669",fontWeight:600},
  fError:{marginTop:12,color:"#dc2626",fontWeight:600},
  contactItem:{display:"flex",gap:16,alignItems:"flex-start",marginBottom:24},
  contactLabel:{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#9ca3af",marginBottom:4},
  contactVal:{fontSize:15,color:"#0A2342",fontWeight:600,textDecoration:"none"},
  footer:{background:"#0A2342",padding:"44px 24px",borderTop:"3px solid #1E90FF"},
  footerInner:{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24},
  footerLinks:{display:"flex",gap:8,flexWrap:"wrap"},
  footerLink:{background:"none",border:"none",color:"#A8C8F0",fontSize:13,cursor:"pointer"},
};

