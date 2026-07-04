import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://bilong-backend.onrender.com";
const NAV_LINKS = ["Home", "About", "Services", "AI Assistant", "Training", "Contact"];

const SERVICES = [
  {
    icon: "📱", name: "Digital Marketing Service",
    answer: "Digital marketing service is the management of your brand's online presence across social media, email, SEO, and content platforms. BILONG handles all of this for your business so you can focus on operations while we grow your audience and drive leads.",
    items: ["Social Media Management", "Email Marketing", "SEO & Search Optimization", "Website Optimization", "Content Marketing", "Community Management", "Brand Strategy & Voice", "Analytics & Reporting"]
  },
  {
    icon: "📣", name: "Paid Advertising",
    answer: "Paid advertising means running targeted ad campaigns on platforms like Google, Facebook and Instagram to put your business in front of people actively looking for what you offer. BILONG plans, launches and manages your ads to maximise return on every naira or dollar you spend.",
    items: ["Facebook & Instagram Ads", "Google Ads", "Meta Ads", "Campaign Optimization", "A/B Testing", "Performance Reporting"]
  },
  {
    icon: "🌐", name: "Website Development",
    answer: "Website development is the process of designing and building a professional online presence for your business. BILONG builds fast, mobile-friendly, SEO-ready websites that represent your brand 24 hours a day and convert visitors into customers.",
    items: ["Business Websites", "E-commerce Stores", "Landing Pages", "Mobile Optimized", "SEO Ready", "Fast & Secure"]
  },
  {
    icon: "🤖", name: "AI Training",
    answer: "AI training teaches you and your team how to use artificial intelligence tools like ChatGPT and Claude to save time, create content faster, and automate repetitive tasks in your business. BILONG makes AI practical and accessible for any business owner.",
    items: ["ChatGPT & Claude Mastery", "AI Content Creation", "Chatbots & Automation", "Workflow Optimization", "AI for Marketing", "Business Productivity with AI"]
  },
  {
    icon: "📚", name: "eBook Sales & Publishing",
    answer: "BILONG sells practical marketing eBooks written by our founder to help businesses and individuals learn proven marketing strategies. We also help you write, format, design and publish your own eBook professionally.",
    items: ["Marketing eBooks for Sale", "eBook Writing Assistance", "Professional Formatting", "Cover Design", "Publishing Strategy", "Digital Distribution"]
  },
  {
    icon: "💡", name: "Marketing Consultation",
    answer: "A marketing consultation with BILONG gives your business a clear, personalised roadmap for growth. In a 1-on-1 strategy session, we analyse your current situation and tell you exactly what to do next to attract more customers and grow revenue.",
    items: ["Business Analysis", "Marketing Roadmap", "Strategy Planning", "Growth Consulting", "Brand Positioning", "Priority WhatsApp Access"]
  },
];

const TRAINING = [
  { title: "STARTER PLAN", sub: "For beginners with zero experience", items: ["Introduction to Digital Marketing", "Social Media Basics & Content Creation", "Understanding Your Target Audience", "Basic Graphic Design for Marketing", "Introduction to Email Marketing", "How to Build Your Online Presence", "Certificate included"], best: "Complete beginners starting their digital marketing journey", featured: false },
  { title: "GROWTH PLAN", sub: "For students ready to handle real clients", note: "Basic plan covered for students without prior knowledge", items: ["Everything in Starter PLUS:", "Digital Marketing Strategy & Planning", "Content Marketing & Storytelling", "Email Marketing", "SEO Basics", "Audience Research & Buyer Persona", "Analytics & Reporting", "Community Management", "Brand Identity & Voice", "How to get and manage clients", "Certificate included"], best: "Students who know the basics and want to handle real digital marketing work professionally", featured: false },
  { title: "PRO PLAN", sub: "Master digital marketing completely", items: ["Everything in Growth PLUS:", "Full Digital Marketing & E-commerce", "AI Automation — chatbots, workflows", "Advanced Paid Advertising (Google, Meta)", "Advanced SEO & Website Optimization", "Influencer & Affiliate Marketing", "Marketing Funnels & Sales Strategy", "Real World Case Studies", "Live Projects & Practical Examples", "How to start your own agency", "Certificate included"], best: "Students who want to become professional digital marketers or start their own agency", featured: true },
];

const HOME_FAQS = [
  { q: "What does BILONG DIGITAL HUB do?", a: "BILONG DIGITAL HUB is a full-service digital marketing agency that executes marketing campaigns for businesses worldwide. We handle social media management, paid advertising, website development, SEO, content marketing, AI training, eBook publishing and marketing consultation — all under one roof." },
  { q: "How is BILONG different from other digital marketing agencies?", a: "BILONG is unique because every client's business gets promoted on our own social media accounts and website throughout our contract — at no extra cost. We also sell practical marketing eBooks and offer separate professional training for individuals who want to learn digital marketing themselves." },
  { q: "Does BILONG serve businesses outside Nigeria?", a: "Yes. BILONG DIGITAL HUB serves businesses and students worldwide. We are not limited to any country or continent. We work with clients globally and deliver the same quality and care to every engagement." },
  { q: "How do I get started with BILONG?", a: "The fastest way to get started is to send us a WhatsApp message at +234 815 368 7589. We offer a free 15-minute strategy call where we analyse your business and tell you exactly what digital marketing steps will grow it." },
  { q: "What is the Zero Budget Marketing Principle?", a: "The Zero Budget Marketing Principle is an original BILONG framework developed by our founder Olawumi Micheal Damilare during his time as CMO at Beakick Technology. When the company had zero marketing budget, he used strategic thinking and creativity to grow brand visibility and generate results — proving that the right thinking produces results even without money." },
];

const EBOOKS = [
  { title: "The Marketing Investor", desc: "Learn to treat your brand like a financial investment. Audience equity, fixed-income revenue, leveraged marketing and the Brand Balance Sheet.", tag: "Brand Strategy" },
  { title: "Timeless Marketing", desc: "Reveals 3 marketer types — Rococo (style only), Renaissance (real strategy), Baroque (emotion and conversion). Find out which you are and how to make money.", tag: "Marketing System" },
  { title: "The Clean Brand", desc: "Diagnoses Content Pollution and Brand Contamination in your marketing, then gives you a 6-week system to clean it up and grow without paid ads.", tag: "Brand Health" },
  { title: "The Brand Architecture Blueprint", desc: "Every brand has an Exterior that attracts clients and an Interior that keeps them. Learn how to build both so your business converts and retains consistently.", tag: "Brand Building" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "BILONG DIGITAL HUB",
      "url": "https://bilong-website.vercel.app",
      "logo": "https://bilong-website.vercel.app/bilong_real_logo.jpg",
      "description": "BILONG DIGITAL HUB is a full-service digital marketing agency that executes marketing campaigns for businesses, trains individuals in digital marketing professionally, and sells practical marketing eBooks — serving clients worldwide.",
      "founder": { "@type": "Person", "name": "Olawumi Micheal Damilare" },
      "contactPoint": { "@type": "ContactPoint", "telephone": "+234-815-368-7589", "contactType": "customer service", "availableLanguage": "English" },
      "sameAs": ["https://bilong-website.vercel.app"],
      "slogan": "Your service is our priority"
    },
    {
      "@type": "FAQPage",
      "mainEntity": HOME_FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ]
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@1,700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Lato', sans-serif; background: #F5F5F5; color: #1A1A2E; overflow-x: hidden; }
  .nav { background: #0A2342; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 20px rgba(0,0,0,0.4); width: 100%; }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 12px; }
  .nav-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .nav-logo { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1.5px solid rgba(30,144,255,0.4); }
  .nav-name { color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; line-height: 1.2; }
  .nav-sub { color: #1E90FF; font-size: 9px; font-style: italic; letter-spacing: 0.5px; }
  .nav-links { display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }
  .nav-links::-webkit-scrollbar { display: none; }
  .nav-link { background: none; border: none; color: #A8C8F0; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-family: 'Lato', sans-serif; font-weight: 600; white-space: nowrap; transition: all 0.2s; }
  .nav-link.active { background: rgba(30,144,255,0.15); color: #1E90FF; }
  .nav-cta { background: linear-gradient(135deg, #1E90FF, #0066cc); color: #fff; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 12px; font-family: 'Montserrat', sans-serif; font-weight: 700; white-space: nowrap; flex-shrink: 0; box-shadow: 0 4px 12px rgba(30,144,255,0.3); }
  .hamburger { display: none; flex-direction: column; gap: 4px; cursor: pointer; padding: 8px; background: none; border: none; }
  .hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }
  .mobile-menu { display: none; background: #071628; padding: 12px 16px 16px; flex-direction: column; gap: 4px; }
  .mobile-menu.open { display: flex; }
  .mobile-link { background: none; border: none; color: #A8C8F0; padding: 10px 14px; border-radius: 8px; cursor: pointer; font-size: 14px; font-family: 'Lato', sans-serif; font-weight: 600; text-align: left; }
  .mobile-link.active { background: rgba(30,144,255,0.15); color: #1E90FF; }
  .mobile-wa { display: block; background: #1E90FF; color: #fff; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-size: 14px; font-family: 'Montserrat', sans-serif; font-weight: 700; text-align: center; margin-top: 8px; }
  .hero { background: linear-gradient(160deg, #050e1f 0%, #0A2342 50%, #0d2d52 100%); padding: 60px 16px; text-align: center; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(30,144,255,0.12) 0%, transparent 70%); pointer-events: none; }
  .hero-inner { max-width: 760px; margin: 0 auto; position: relative; z-index: 1; }
  .hero-badge { display: inline-block; background: rgba(30,144,255,0.15); color: #1E90FF; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 20px; border: 1px solid rgba(30,144,255,0.3); font-family: 'Montserrat', sans-serif; }
  .hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px, 6vw, 52px); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 18px; }
  .hero-title span { color: #1E90FF; }
  .hero-sub { font-size: clamp(14px, 3vw, 16px); color: #A8C8F0; line-height: 1.75; margin-bottom: 28px; max-width: 640px; margin-left: auto; margin-right: auto; }
  .answer-box { background: rgba(30,144,255,0.1); border: 1px solid rgba(30,144,255,0.3); border-left: 4px solid #1E90FF; border-radius: 0 10px 10px 0; padding: 16px 20px; margin: 0 auto 24px; max-width: 640px; text-align: left; }
  .answer-box p { font-size: 14px; color: #A8C8F0; line-height: 1.7; }
  .btn-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-p { background: linear-gradient(135deg, #1E90FF, #0066cc); color: #fff; padding: 13px 24px; border-radius: 8px; border: none; font-size: 14px; font-family: 'Montserrat', sans-serif; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(30,144,255,0.35); transition: transform 0.2s; }
  .btn-p:hover { transform: translateY(-2px); }
  .btn-s { background: transparent; color: #fff; padding: 13px 24px; border-radius: 8px; border: 2px solid rgba(255,255,255,0.3); font-size: 14px; font-family: 'Montserrat', sans-serif; font-weight: 600; cursor: pointer; }
  .stats { display: flex; justify-content: center; gap: clamp(20px,5vw,48px); margin-top: 44px; flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-n { font-size: clamp(24px,5vw,34px); font-weight: 900; color: #1E90FF; font-family: 'Montserrat', sans-serif; }
  .stat-l { font-size: 11px; color: #A8C8F0; margin-top: 4px; }
  .strip { background: #1E90FF; padding: 11px 0; overflow: hidden; white-space: nowrap; }
  .strip-track { display: inline-flex; animation: marquee 35s linear infinite; }
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .strip-item { color: #fff; font-weight: 700; font-size: 13px; padding: 0 28px; font-family: 'Montserrat', sans-serif; white-space: nowrap; }
  .section { padding: 56px 16px; background: #fff; }
  .section-gray { padding: 56px 16px; background: #F5F5F5; }
  .section-navy { padding: 56px 16px; background: #0A2342; }
  .inner { max-width: 1200px; margin: 0 auto; }
  .section-label { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #1E90FF; margin-bottom: 10px; font-family: 'Montserrat', sans-serif; }
  .section-title { font-size: clamp(22px,5vw,34px); font-weight: 800; color: #0A2342; margin-bottom: 12px; font-family: 'Montserrat', sans-serif; line-height: 1.2; }
  .section-title-white { font-size: clamp(22px,5vw,34px); font-weight: 800; color: #fff; margin-bottom: 12px; font-family: 'Montserrat', sans-serif; line-height: 1.2; }
  .section-answer { font-size: 15px; color: #6b7280; line-height: 1.7; margin-bottom: 28px; max-width: 760px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
  .card { background: #fff; border: 1px solid #e2eaf4; border-radius: 14px; padding: 24px; border-top: 4px solid #1E90FF; box-shadow: 0 2px 12px rgba(10,35,66,0.06); }
  .card-icon { font-size: 32px; margin-bottom: 12px; display: block; }
  .card-title { font-size: 15px; font-weight: 700; color: #0A2342; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
  .card-desc { font-size: 13px; color: #6b7280; line-height: 1.65; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .service-card { background: #fff; border: 1px solid #e2eaf4; border-radius: 14px; padding: 22px; display: flex; flex-direction: column; box-shadow: 0 2px 12px rgba(10,35,66,0.06); transition: transform 0.2s, box-shadow 0.2s; }
  .service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(10,35,66,0.12); }
  .service-icon { font-size: 32px; margin-bottom: 10px; }
  .service-name { font-size: 15px; font-weight: 700; color: #0A2342; margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
  .service-answer { font-size: 12.5px; color: #6b7280; line-height: 1.6; margin-bottom: 10px; background: #f8faff; border-left: 3px solid #1E90FF; padding: 10px 12px; border-radius: 0 6px 6px 0; }
  .service-list { list-style: none; padding: 0; margin: 0; flex: 1; }
  .service-item { font-size: 12.5px; color: #374151; padding: 3px 0; }
  .service-btn { background: #0A2342; color: #fff; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-family: 'Montserrat', sans-serif; font-weight: 600; text-align: center; margin-top: 14px; display: block; transition: background 0.2s; }
  .service-btn:hover { background: #1E90FF; }
  .service-note { margin-top: 28px; background: #f0f6ff; border: 1px solid rgba(30,144,255,0.3); border-radius: 10px; padding: 16px 20px; font-size: 14px; color: #0A2342; font-weight: 500; }
  .ebook-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(30,144,255,0.25); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 10px; }
  .ebook-tag { display: inline-block; background: #1E90FF; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 10px; align-self: flex-start; font-family: 'Montserrat', sans-serif; }
  .ebook-title { font-size: 15px; font-weight: 700; color: #fff; font-family: 'Montserrat', sans-serif; }
  .ebook-desc { font-size: 13px; color: #A8C8F0; line-height: 1.6; flex: 1; }
  .ebook-btn { background: rgba(255,255,255,0.1); color: #1E90FF; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; border: 1px solid rgba(30,144,255,0.3); text-align: center; }
  .faq-section { padding: 56px 16px; background: #F5F5F5; }
  .faq-item { background: #fff; border: 1px solid #e2eaf4; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
  .faq-q { width: 100%; background: none; border: none; padding: 18px 20px; text-align: left; font-size: 15px; font-weight: 700; color: #0A2342; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: 'Montserrat', sans-serif; }
  .faq-q:hover { background: #f8faff; }
  .faq-arrow { color: #1E90FF; font-size: 18px; font-weight: 700; flex-shrink: 0; }
  .faq-a { padding: 0 20px 16px; font-size: 14px; color: #6b7280; line-height: 1.7; }
  .cta { background: linear-gradient(135deg, #1E90FF, #0055bb); padding: 60px 16px; text-align: center; }
  .cta-title { font-size: clamp(22px,5vw,38px); font-weight: 900; color: #fff; margin-bottom: 12px; font-family: 'Montserrat', sans-serif; }
  .cta-sub { font-size: clamp(14px,3vw,16px); color: rgba(255,255,255,0.85); margin-bottom: 28px; }
  .training-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .training-card { background: #fff; border: 1px solid #e2eaf4; border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 2px 12px rgba(10,35,66,0.06); }
  .training-featured { border: 2px solid #1E90FF; background: #f0f6ff; }
  .training-badge { background: #1E90FF; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; align-self: flex-start; font-family: 'Montserrat', sans-serif; }
  .training-title { font-size: 20px; font-weight: 900; color: #0A2342; font-family: 'Montserrat', sans-serif; }
  .training-sub { font-size: 13px; color: #1E90FF; font-weight: 600; }
  .training-items { flex: 1; display: flex; flex-direction: column; gap: 5px; }
  .training-item { font-size: 13px; color: #374151; line-height: 1.5; }
  .training-note { font-size: 12px; color: #92400e; background: #fffbeb; padding: 8px 12px; border-radius: 6px; border: 1px solid #fcd34d; }
  .training-best { font-size: 12px; color: #6b7280; font-style: italic; padding: 8px 0; border-top: 1px solid #e2eaf4; }
  .body-text { font-size: 15px; color: #6b7280; line-height: 1.8; margin-bottom: 12px; }
  .pillars { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
  .pillar { background: #1E90FF; color: #fff; padding: 7px 18px; border-radius: 20px; font-weight: 700; font-size: 13px; font-family: 'Montserrat', sans-serif; }
  .about-item { display: flex; gap: 14px; margin-bottom: 20px; align-items: flex-start; }
  .about-item-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
  .about-item-title { font-size: 14px; font-weight: 700; color: #0A2342; margin-bottom: 4px; font-family: 'Montserrat', sans-serif; }
  .sub-title { font-size: clamp(18px,4vw,22px); font-weight: 700; color: #0A2342; margin-bottom: 12px; margin-top: 28px; font-family: 'Montserrat', sans-serif; }
  .divider-box { background: #f0f6ff; border-left: 4px solid #1E90FF; border-radius: 0 10px 10px 0; padding: 16px 20px; margin: 20px 0; }
  .divider-box-title { font-size: 13px; font-weight: 700; color: #0A2342; margin-bottom: 6px; font-family: 'Montserrat', sans-serif; }
  .divider-box-text { font-size: 13px; color: #6b7280; line-height: 1.6; }
  .chat-box { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e2eaf4; box-shadow: 0 8px 32px rgba(10,35,66,0.1); }
  .chat-head { background: #0A2342; padding: 16px 18px; display: flex; align-items: center; gap: 12px; }
  .chat-head-logo { width: 38px; height: 38px; border-radius: 8px; object-fit: cover; }
  .chat-head-name { color: #fff; font-weight: 700; font-size: 14px; font-family: 'Montserrat', sans-serif; }
  .chat-head-sub { color: #A8C8F0; font-size: 11px; }
  .chat-msgs { padding: 18px; min-height: 300px; max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .chat-row { display: flex; align-items: flex-end; gap: 8px; }
  .chat-row-user { flex-direction: row-reverse; }
  .chat-av { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
  .bubble { max-width: 78%; padding: 11px 15px; border-radius: 12px; font-size: 13px; line-height: 1.6; }
  .bubble-ai { background: #f0f6ff; color: #0A2342; border-radius: 4px 12px 12px 12px; }
  .bubble-user { background: #1E90FF; color: #fff; border-radius: 12px 4px 12px 12px; }
  .chat-input-row { display: flex; padding: 14px; gap: 10px; border-top: 1px solid #e2eaf4; }
  .chat-in { flex: 1; padding: 11px 14px; border-radius: 8px; border: 1px solid #e2eaf4; font-size: 13px; outline: none; min-width: 0; }
  .chat-btn { background: #1E90FF; color: #fff; border: none; padding: 11px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px; white-space: nowrap; }
  .suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
  .sug-btn { background: #f0f6ff; color: #1E90FF; border: 1px solid rgba(30,144,255,0.3); padding: 7px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; font-weight: 500; }
  .form-in { display: block; width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2eaf4; font-size: 14px; margin-bottom: 12px; box-sizing: border-box; outline: none; }
  .form-ta { display: block; width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2eaf4; font-size: 14px; margin-bottom: 16px; min-height: 110px; box-sizing: border-box; resize: vertical; outline: none; }
  .contact-item { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 22px; }
  .contact-icon { font-size: 26px; flex-shrink: 0; }
  .contact-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #9ca3af; margin-bottom: 4px; font-family: 'Montserrat', sans-serif; }
  .contact-val { font-size: 14px; color: #0A2342; font-weight: 600; text-decoration: none; }
  .f-success { margin-top: 10px; color: #059669; font-weight: 600; font-size: 13px; }
  .f-error { margin-top: 10px; color: #dc2626; font-weight: 600; font-size: 13px; }
  .footer { background: #0A2342; padding: 40px 16px; border-top: 3px solid #1E90FF; }
  .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px; align-items: start; }
  .footer-logo { width: 42px; height: 42px; border-radius: 10px; margin-bottom: 8px; object-fit: cover; }
  .footer-name { color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 15px; }
  .footer-sub { color: #1E90FF; font-size: 11px; font-style: italic; margin-top: 2px; }
  .footer-tagline { color: #A8C8F0; font-size: 12px; margin-top: 6px; font-style: italic; font-family: 'Playfair Display', serif; }
  .footer-links { display: flex; flex-direction: column; gap: 4px; }
  .footer-link { background: none; border: none; color: #A8C8F0; font-size: 13px; cursor: pointer; text-align: left; padding: 4px 0; }
  .footer-link:hover { color: #1E90FF; }
  .footer-info { color: #A8C8F0; font-size: 12px; line-height: 1.8; }
  .footer-copy { color: rgba(168,200,240,0.6); font-size: 11px; margin-top: 8px; }
  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr; gap: 28px; }
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .hamburger { display: flex; }
  }
`;

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm BILONG AI 👋 Ask me any marketing question — I'm here to help your business grow!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0); }, [active]);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatMessages(p => [...p, { role: "user", text: msg }]);
    setChatInput(""); setChatLoading(true);
    try {
      const res = await axios.post(`${API}/api/chat`, { message: msg });
      setChatMessages(p => [...p, { role: "assistant", text: res.data.response }]);
    } catch {
      setChatMessages(p => [...p, { role: "assistant", text: "Sorry, I'm having trouble connecting. WhatsApp us: +234 815 368 7589" }]);
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

  const navigate = (page) => { setActive(page); setMenuOpen(false); };
  const stripItems = ["Digital Marketing","AI Training","Website Development","eBook Publishing","Paid Advertising","Marketing Consultation","Social Media Management","SEO & Optimization","Email Marketing","Brand Strategy"];

  return (
    <>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />

      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <img src="/bilong_real_logo.jpg" alt="BILONG DIGITAL HUB logo" className="nav-logo"/>
            <div>
              <div className="nav-name">BILONG DIGITAL HUB</div>
              <div className="nav-sub">Your service is our priority</div>
            </div>
          </div>
          <div className="nav-links">
            {NAV_LINKS.map(l => <button key={l} onClick={() => navigate(l)} className={`nav-link${active===l?" active":""}`}>{l}</button>)}
          </div>
          <a href="https://wa.me/2348153687589" target="_blank" className="nav-cta">WhatsApp Us</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation menu">
            <span/><span/><span/>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen?" open":""}`}>
          {NAV_LINKS.map(l => <button key={l} onClick={() => navigate(l)} className={`mobile-link${active===l?" active":""}`}>{l}</button>)}
          <a href="https://wa.me/2348153687589" target="_blank" className="mobile-wa">💬 WhatsApp Us</a>
        </div>
      </nav>

      <main>
        {active==="Home" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">🌍 Global Digital Marketing Agency</div>
              <h1 className="hero-title">Grow Your Business<br/><span>Anywhere In The World.</span></h1>
              <div className="answer-box">
                <p><strong style={{color:"#1E90FF"}}>What is BILONG DIGITAL HUB?</strong> BILONG DIGITAL HUB is a full-service digital marketing agency founded by Olawumi Micheal Damilare that executes marketing campaigns for businesses, trains individuals who want to learn digital marketing professionally, and sells practical marketing eBooks — serving clients and students worldwide.</p>
              </div>
              <div className="btn-row">
                <button onClick={() => navigate("AI Assistant")} className="btn-p">Ask Our AI Assistant</button>
                <button onClick={() => navigate("Services")} className="btn-s">See Our Services</button>
              </div>
              <div className="stats">
                {[["6+","Services"],["4","eBooks"],["🌍","Worldwide"],["🤝","Client-First"]].map(([n,l]) => (
                  <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
                ))}
              </div>
            </div>
          </section>

          <div className="strip">
            <div className="strip-track">
              {[...stripItems,...stripItems].map((t,i) => <span key={i} className="strip-item">⚡ {t}</span>)}
            </div>
          </div>

          <section className="section">
            <div className="inner">
              <div className="section-label">Why Choose BILONG</div>
              <h2 className="section-title">What makes BILONG DIGITAL HUB different from other agencies?</h2>
              <p className="section-answer">BILONG DIGITAL HUB is different because we execute your marketing, promote your business on our own social media platforms, train individuals who want to learn digital marketing, and sell practical eBooks — all in one place. We serve businesses worldwide with the same quality regardless of size or location.</p>
              <div className="grid-3">
                {[
                  ["🎯","We Execute For Clients","Businesses hire BILONG to handle their digital marketing completely — social media, ads, websites, SEO, AI tools and more. We deliver results, not reports."],
                  ["📢","We Advertise Every Client","Every business that works with BILONG gets promoted on our social media accounts and website throughout our contract — at no extra cost."],
                  ["🎓","We Train Individuals","Individuals who want to learn digital marketing professionally enroll in our Starter, Growth or Pro training plans. This is a separate service from client execution."],
                  ["📚","eBooks That Teach","BILONG sells 4 original marketing eBooks for businesses and individuals to learn proven strategies at their own pace. Written by our founder from real experience."],
                  ["🤖","AI-Powered Delivery","We use and teach the latest AI tools — delivering faster, smarter results for every client and training students how to use AI in their own business."],
                  ["🌍","Serving The World","Not limited to any country or continent. BILONG serves businesses globally with the same quality and care as any client, anywhere."],
                ].map(([icon,title,desc]) => (
                  <div key={title} className="card">
                    <span className="card-icon">{icon}</span>
                    <div className="card-title">{title}</div>
                    <div className="card-desc">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-navy">
            <div className="inner">
              <div className="section-label" style={{color:"#1E90FF"}}>📚 BILONG eBooks</div>
              <h2 className="section-title-white">What marketing eBooks does BILONG sell?</h2>
              <p style={{color:"#A8C8F0",fontSize:14,marginBottom:28,lineHeight:1.7}}>BILONG DIGITAL HUB has published 4 original marketing eBooks written by founder Olawumi Micheal Damilare, available on Selar, Gumroad and Amazon KDP. Each book contains practical frameworks developed from real marketing experience.</p>
              <div className="grid-3">
                {EBOOKS.map(eb => (
                  <div key={eb.title} className="ebook-card">
                    <span className="ebook-tag">{eb.tag}</span>
                    <div className="ebook-title">{eb.title}</div>
                    <div className="ebook-desc">{eb.desc}</div>
                    <a href="https://wa.me/2348153687589?text=I want to buy an eBook" target="_blank" className="ebook-btn">Get This eBook →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="faq-section">
            <div className="inner">
              <div className="section-label">Common Questions</div>
              <h2 className="section-title">Frequently Asked Questions About BILONG DIGITAL HUB</h2>
              <p className="section-answer">Find answers to the most common questions businesses and students ask about BILONG DIGITAL HUB's services, training, and eBooks.</p>
              {HOME_FAQS.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                    <span>{faq.q}</span>
                    <span className="faq-arrow">{openFaq===i?"−":"+"}</span>
                  </button>
                  {openFaq===i && <div className="faq-a">{faq.a}</div>}
                </div>
              ))}
            </div>
          </section>

          <section className="cta">
            <h2 className="cta-title">Ready to Grow Your Business?</h2>
            <p className="cta-sub">Free 15-minute strategy call. No obligation. Just results.</p>
            <div className="btn-row">
              <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" className="btn-p">Book Free Call on WhatsApp</a>
              <button onClick={() => navigate("Contact")} className="btn-s" style={{color:"#fff",borderColor:"rgba(255,255,255,0.4)"}}>Send Us a Message</button>
            </div>
          </section>
        </>}

        {active==="About" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">Our Story</div>
              <h1 className="hero-title">Who founded <span>BILONG DIGITAL HUB?</span></h1>
              <div className="answer-box">
                <p>BILONG DIGITAL HUB was founded by <strong style={{color:"#1E90FF"}}>Olawumi Micheal Damilare</strong> with one mission — to give every business and individual across the world access to world-class digital marketing services and education, regardless of their size, budget, or location.</p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="inner">
              <div className="two-col">
                <div>
                  <div className="section-label">Our Vision</div>
                  <h2 className="section-title">What is BILONG's vision?</h2>
                  <p className="body-text">To become the world's most trusted digital marketing agency — known for executing results, educating professionals, and elevating every business we touch.</p>
                  <div className="section-label" style={{marginTop:24}}>Our Mission</div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"#0A2342",marginBottom:8,fontFamily:"'Montserrat',sans-serif"}}>What is BILONG's mission?</h3>
                  <p className="body-text">To bridge the digital marketing gap for businesses worldwide. We execute marketing for clients, train individuals who want to learn digital marketing, sell practical eBooks, and promote every client's business on our platforms throughout our contract.</p>
                  <div className="divider-box" style={{marginTop:20}}>
                    <div className="divider-box-title">⚡ Zero Budget Marketing Principle</div>
                    <div className="divider-box-text">As CMO at Beakick Technology, our founder delivered strong marketing results with zero budget — using strategic thinking instead of spending. This became BILONG's founding principle: you don't need a big budget to produce big results. You need the right thinking.</div>
                  </div>
                  <div className="section-label" style={{marginTop:24}}>Our Pillars</div>
                  <div className="pillars">
                    {["Educate","Innovate","Elevate","Connect"].map(p => <div key={p} className="pillar">{p}</div>)}
                  </div>
                </div>
                <div>
                  <div className="section-label">What Makes Us Different</div>
                  {[
                    ["🎯","We Execute & Deliver","Clients pay BILONG to handle their digital marketing completely — we deliver real results."],
                    ["📢","We Advertise Every Client","Every client's business is promoted on BILONG's social media and website for the full contract duration."],
                    ["🎓","Professional Training","We train individuals who want to learn digital marketing — separate from our client services."],
                    ["📚","eBook Publishing & Sales","We sell 4 original marketing eBooks and help you write and publish yours professionally."],
                    ["🤖","AI-Powered","We use and teach the latest AI tools — delivering smarter results for every client."],
                    ["🌍","Global Coverage","We serve businesses and students everywhere in the world."],
                  ].map(([icon,title,desc]) => (
                    <div key={title} className="about-item">
                      <span className="about-item-icon">{icon}</span>
                      <div><div className="about-item-title">{title}</div><div className="card-desc">{desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>}

        {active==="Services" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">What We Offer</div>
              <h1 className="hero-title">What digital marketing services <span>does BILONG offer?</span></h1>
              <div className="answer-box">
                <p>BILONG DIGITAL HUB offers 6 core digital marketing services for businesses worldwide: Digital Marketing, Paid Advertising, Website Development, AI Training, eBook Publishing, and Marketing Consultation. Contact us on WhatsApp for pricing tailored to your needs.</p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="inner">
              <div className="divider-box" style={{marginBottom:28}}>
                <div className="divider-box-title">📌 These services are for businesses (clients)</div>
                <div className="divider-box-text">These are services BILONG executes for you. You pay BILONG to handle your digital marketing. Training is a separate service — see the Training page if you want to learn digital marketing yourself.</div>
              </div>
              <div className="grid-3">
                {SERVICES.map(sv => (
                  <div key={sv.name} className="service-card">
                    <div className="service-icon">{sv.icon}</div>
                    <h3 className="service-name">{sv.name}</h3>
                    <p className="service-answer">{sv.answer}</p>
                    <ul className="service-list">
                      {sv.items.map(it => <li key={it} className="service-item">✅ {it}</li>)}
                    </ul>
                    <a href="https://wa.me/2348153687589" target="_blank" className="service-btn">Get Started →</a>
                  </div>
                ))}
              </div>
              <div className="service-note">📞 Contact us on WhatsApp for custom pricing. Every client's business gets promoted on BILONG's social media and website throughout our contract.</div>
            </div>
          </section>
        </>}

        {active==="AI Assistant" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">🤖 AI-Powered Assistant</div>
              <h1 className="hero-title">What is <span>BILONG AI?</span></h1>
              <div className="answer-box">
                <p>BILONG AI is a free AI-powered marketing assistant that answers any marketing, business or digital strategy question instantly. You can ask about social media, SEO, advertising, content, eCommerce or any marketing topic — and get expert answers in seconds. No sign-up needed.</p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="inner" style={{maxWidth:700}}>
              <div className="chat-box">
                <div className="chat-head">
                  <img src="/bilong_real_logo.jpg" alt="BILONG AI logo" className="chat-head-logo"/>
                  <div>
                    <div className="chat-head-name">BILONG AI Assistant</div>
                    <div className="chat-head-sub">Powered by AI · Online</div>
                  </div>
                </div>
                <div className="chat-msgs">
                  {chatMessages.map((m,i) => (
                    <div key={i} className={`chat-row${m.role==="user"?" chat-row-user":""}`}>
                      {m.role==="assistant" && <img src="/bilong_real_logo.jpg" alt="BILONG AI" className="chat-av"/>}
                      <div className={`bubble${m.role==="user"?" bubble-user":" bubble-ai"}`}>{m.text}</div>
                    </div>
                  ))}
                  {chatLoading && <div className="chat-row"><img src="/bilong_real_logo.jpg" alt="BILONG AI" className="chat-av"/><div className="bubble bubble-ai">Thinking...</div></div>}
                </div>
                <div className="chat-input-row">
                  <input className="chat-in" value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Ask me anything about marketing..."/>
                  <button onClick={sendChat} className="chat-btn">Send</button>
                </div>
              </div>
              <div className="suggestions">
                {["How do I get more customers?","What is digital marketing?","How do I grow on social media?","How can AI help my business?"].map(q => (
                  <button key={q} onClick={()=>setChatInput(q)} className="sug-btn">{q}</button>
                ))}
              </div>
            </div>
          </section>
        </>}

        {active==="Training" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">🎓 Professional Training</div>
              <h1 className="hero-title">How do I learn <span>digital marketing?</span></h1>
              <div className="answer-box">
                <p>BILONG DIGITAL HUB offers professional digital marketing training for individuals who want to learn the skill from scratch. We have 3 plans — Starter (beginner), Growth (intermediate), and Pro (advanced) — designed to take you from zero knowledge to professional digital marketer. Contact us on WhatsApp for pricing.</p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="inner">
              <div className="divider-box" style={{marginBottom:28}}>
                <div className="divider-box-title">📌 Training is for individuals (students) only</div>
                <div className="divider-box-text">These training plans are for <strong>individuals who want to learn digital marketing</strong>. If you are a business owner who wants BILONG to handle your marketing for you, see our Services page instead.</div>
              </div>
              <div className="training-grid">
                {TRAINING.map(t => (
                  <div key={t.title} className={`training-card${t.featured?" training-featured":""}`}>
                    {t.featured && <div className="training-badge">⭐ MOST COMPLETE</div>}
                    <h3 className="training-title">{t.title}</h3>
                    <div className="training-sub">{t.sub}</div>
                    <div className="training-items">
                      {t.items.map(it => <div key={it} className="training-item">👉 {it}</div>)}
                    </div>
                    {t.note && <div className="training-note">📌 Note: {t.note}</div>}
                    <div className="training-best"><strong>Best For:</strong> {t.best}</div>
                    <a href="https://wa.me/2348153687589?text=I want to enroll in the training" target="_blank" className="service-btn">Enroll Now →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>}

        {active==="Contact" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">Get In Touch</div>
              <h1 className="hero-title">How do I contact <span>BILONG DIGITAL HUB?</span></h1>
              <div className="answer-box">
                <p>You can contact BILONG DIGITAL HUB via WhatsApp at +234 815 368 7589, by email at bilongdigitalhub@gmail.com, or by filling in the contact form below. We respond within 24 hours to all enquiries.</p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="inner">
              <div className="two-col">
                <div>
                  <h2 className="sub-title">Send a Message</h2>
                  {["name","email","business"].map(f => (
                    <input key={f} className="form-in" placeholder={f==="name"?"Your Name":f==="email"?"Your Email":"Your Business Name"} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})}/>
                  ))}
                  <textarea className="form-ta" placeholder="Tell us about your business and what you need..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                  <button onClick={sendForm} className="btn-p">Send Message</button>
                  {formStatus==="success" && <div className="f-success">✅ Message sent! We will contact you within 24 hours.</div>}
                  {formStatus==="error" && <div className="f-error">❌ Please fill all fields correctly.</div>}
                </div>
                <div>
                  <h2 className="sub-title">Contact Details</h2>
                  {[["📱","WhatsApp","+234 815 368 7589","https://wa.me/2348153687589"],["📧","Email","bilongdigitalhub@gmail.com","mailto:bilongdigitalhub@gmail.com"],["🌍","Coverage","Serving Businesses Worldwide",null]].map(([icon,label,val,link]) => (
                    <div key={label} className="contact-item">
                      <span className="contact-icon">{icon}</span>
                      <div>
                        <div className="contact-label">{label}</div>
                        {link?<a href={link} target="_blank" className="contact-val">{val}</a>:<div className="contact-val">{val}</div>}
                      </div>
                    </div>
                  ))}
                  <div style={{marginTop:24}}>
                    <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" className="btn-p">💬 Chat on WhatsApp Now</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <img src="/bilong_real_logo.jpg" alt="BILONG DIGITAL HUB" className="footer-logo"/>
            <div className="footer-name">BILONG DIGITAL HUB</div>
            <div className="footer-sub">Educate. Innovate. Elevate. Connect.</div>
            <div className="footer-tagline">"Your service is our priority"</div>
          </div>
          <div>
            <div className="footer-name" style={{marginBottom:10,fontSize:13}}>Navigation</div>
            <div className="footer-links">
              {NAV_LINKS.map(l => <button key={l} onClick={()=>navigate(l)} className="footer-link">{l}</button>)}
            </div>
          </div>
          <div>
            <div className="footer-name" style={{marginBottom:10,fontSize:13}}>Contact Us</div>
            <div className="footer-info">
              <div>📱 +234 815 368 7589</div>
              <div>📧 bilongdigitalhub@gmail.com</div>
              <div>🌍 Serving Businesses Worldwide</div>
            </div>
            <div className="footer-copy">© 2026 BILONG DIGITAL HUB<br/>Olawumi Micheal Damilare</div>
          </div>
        </div>
      </footer>
    </>
  );
}

