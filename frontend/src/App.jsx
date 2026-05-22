import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://bilong-backend.onrender.com";
const NAV_LINKS = ["Home", "About", "Services", "AI Assistant", "Training", "Contact"];

const SERVICES = [
  { icon: "📱", name: "Digital Marketing Service", items: ["Social Media Management", "Email Marketing", "SEO & Search Optimization", "Website Optimization", "Content Marketing", "Community Management", "Brand Strategy & Voice", "Analytics & Reporting"] },
  { icon: "📣", name: "Paid Advertising", items: ["Facebook & Instagram Ads", "Google Ads", "Meta Ads", "Campaign Optimization", "A/B Testing", "Performance Reporting"] },
  { icon: "🌐", name: "Website Development", items: ["Business Websites", "E-commerce Stores", "Landing Pages", "Mobile Optimized", "SEO Ready", "Fast & Secure"] },
  { icon: "🤖", name: "AI Training", items: ["ChatGPT & Claude Mastery", "AI Content Creation", "Chatbots & Automation", "Workflow Optimization", "AI for Marketing", "Business Productivity with AI"] },
  { icon: "📚", name: "eBook Sales & Publishing", items: ["Marketing eBooks for Sale", "eBook Writing Assistance", "Professional Formatting", "Cover Design", "Publishing Strategy", "Digital Distribution"] },
  { icon: "💡", name: "Marketing Consultation", items: ["Business Analysis", "Marketing Roadmap", "Strategy Planning", "Growth Consulting", "Brand Positioning", "Priority WhatsApp Access"] },
];

const TRAINING = [
  { title: "STARTER", sub: "For beginners with zero experience", items: ["Introduction to Digital Marketing", "Social Media Basics & Content Creation", "Understanding Your Target Audience", "Basic Graphic Design for Marketing", "Introduction to Email Marketing", "How to Build Your Online Presence", "Certificate included"], best: "Complete beginners starting their digital marketing journey", featured: false },
  { title: "GROWTH", sub: "For students ready to handle real clients", note: "Basic plan covered for students without prior knowledge", items: ["Everything in Starter PLUS:", "Digital Marketing Strategy & Planning", "Content Marketing & Storytelling", "Email Marketing", "SEO Basics", "Audience Research & Buyer Persona", "Analytics & Reporting", "Community Management", "Brand Identity & Voice", "How to get and manage clients", "Certificate included"], best: "Students who know basics and want to handle real digital marketing work", featured: false },
  { title: "PRO", sub: "Master digital marketing completely", items: ["Everything in Growth PLUS:", "Full Digital Marketing & E-commerce", "AI Automation — chatbots, workflows", "Advanced Paid Advertising (Google, Meta)", "Advanced SEO & Website Optimization", "Influencer & Affiliate Marketing", "Marketing Funnels & Sales Strategy", "Real World Case Studies", "Live Projects & Practical Examples", "How to start your own agency", "Certificate included"], best: "Students who want to become professional digital marketers or start their own agency", featured: true },
];

const EBOOKS = [
  { title: "Digital Marketing Foundations", desc: "Everything a beginner needs — social media, online business, and digital marketing basics.", tag: "Beginner" },
  { title: "Scale of Preference in Marketing", desc: "The original BILONG framework — speak to your customer's #1 priority and close more sales.", tag: "Framework" },
  { title: "AI Tools for Business Growth", desc: "A practical guide to using ChatGPT, Claude and AI tools to automate and scale your business.", tag: "AI & Automation" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@1,700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Lato', sans-serif;
    background: #F5F5F5;
    color: #1A1A2E;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    background: #0A2342;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 20px rgba(0,0,0,0.4);
    width: 100%;
  }
  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    gap: 12px;
  }
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .nav-logo {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
    border: 1.5px solid rgba(30,144,255,0.4);
  }
  .nav-name {
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 1.2;
  }
  .nav-sub {
    color: #1E90FF;
    font-size: 9px;
    font-style: italic;
    letter-spacing: 0.5px;
  }
  .nav-links {
    display: flex;
    gap: 2px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .nav-links::-webkit-scrollbar { display: none; }
  .nav-link {
    background: none;
    border: none;
    color: #A8C8F0;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .nav-link.active {
    background: rgba(30,144,255,0.15);
    color: #1E90FF;
  }
  .nav-cta {
    background: linear-gradient(135deg, #1E90FF, #0066cc);
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(30,144,255,0.3);
  }
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    padding: 8px;
    background: none;
    border: none;
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s;
  }
  .mobile-menu {
    display: none;
    background: #071628;
    padding: 12px 16px 16px;
    flex-direction: column;
    gap: 4px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-link {
    background: none;
    border: none;
    color: #A8C8F0;
    padding: 10px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-align: left;
  }
  .mobile-link.active {
    background: rgba(30,144,255,0.15);
    color: #1E90FF;
  }
  .mobile-wa {
    display: block;
    background: #1E90FF;
    color: #fff;
    padding: 12px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    text-align: center;
    margin-top: 8px;
  }

  /* HERO */
  .hero {
    background: linear-gradient(160deg, #050e1f 0%, #0A2342 50%, #0d2d52 100%);
    padding: 60px 16px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(30,144,255,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-inner {
    max-width: 760px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .hero-badge {
    display: inline-block;
    background: rgba(30,144,255,0.15);
    color: #1E90FF;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 20px;
    border: 1px solid rgba(30,144,255,0.3);
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.5px;
  }
  .hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(28px, 6vw, 52px);
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 18px;
  }
  .hero-title span { color: #1E90FF; }
  .hero-sub {
    font-size: clamp(14px, 3vw, 17px);
    color: #A8C8F0;
    line-height: 1.75;
    margin-bottom: 28px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0;
  }
  .btn-p {
    background: linear-gradient(135deg, #1E90FF, #0066cc);
    color: #fff;
    padding: 13px 24px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 14px rgba(30,144,255,0.35);
    transition: transform 0.2s;
  }
  .btn-p:hover { transform: translateY(-2px); }
  .btn-s {
    background: transparent;
    color: #fff;
    padding: 13px 24px;
    border-radius: 8px;
    border: 2px solid rgba(255,255,255,0.3);
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-s:hover { border-color: #1E90FF; color: #1E90FF; }
  .stats {
    display: flex;
    justify-content: center;
    gap: clamp(20px, 5vw, 48px);
    margin-top: 44px;
    flex-wrap: wrap;
  }
  .stat { text-align: center; }
  .stat-n {
    font-size: clamp(24px, 5vw, 34px);
    font-weight: 900;
    color: #1E90FF;
    font-family: 'Montserrat', sans-serif;
  }
  .stat-l {
    font-size: 11px;
    color: #A8C8F0;
    margin-top: 4px;
    letter-spacing: 0.5px;
    font-family: 'Lato', sans-serif;
  }

  /* STRIP */
  .strip {
    background: #1E90FF;
    padding: 11px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .strip-inner {
    display: inline-flex;
    animation: scroll 30s linear infinite;
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .strip-item {
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    padding: 0 28px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.5px;
  }

  /* SECTIONS */
  .section { padding: 56px 16px; }
  .section-navy { background: #0A2342; padding: 56px 16px; }
  .section-gray { background: #F5F5F5; padding: 56px 16px; }
  .inner { max-width: 1200px; margin: 0 auto; }
  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #1E90FF;
    margin-bottom: 10px;
    font-family: 'Montserrat', sans-serif;
  }
  .section-title {
    font-size: clamp(24px, 5vw, 36px);
    font-weight: 800;
    color: #0A2342;
    margin-bottom: 28px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.2;
  }
  .section-title-white {
    font-size: clamp(24px, 5vw, 36px);
    font-weight: 800;
    color: #fff;
    margin-bottom: 28px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.2;
  }

  /* CARDS GRID */
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
  }
  .card {
    background: #fff;
    border: 1px solid #e2eaf4;
    border-radius: 14px;
    padding: 24px;
    border-top: 4px solid #1E90FF;
    box-shadow: 0 2px 12px rgba(10,35,66,0.06);
  }
  .card-icon { font-size: 32px; margin-bottom: 12px; display: block; }
  .card-title {
    font-size: 15px;
    font-weight: 700;
    color: #0A2342;
    margin-bottom: 8px;
    font-family: 'Montserrat', sans-serif;
  }
  .card-desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.65;
  }

  /* SERVICE CARDS */
  .service-card {
    background: #fff;
    border: 1px solid #e2eaf4;
    border-radius: 14px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px rgba(10,35,66,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(10,35,66,0.12);
  }
  .service-icon { font-size: 32px; margin-bottom: 10px; }
  .service-name {
    font-size: 15px;
    font-weight: 700;
    color: #0A2342;
    margin-bottom: 12px;
    font-family: 'Montserrat', sans-serif;
  }
  .service-list { list-style: none; padding: 0; margin: 0; flex: 1; }
  .service-item {
    font-size: 12.5px;
    color: #374151;
    padding: 3px 0;
    font-family: 'Lato', sans-serif;
  }
  .service-btn {
    background: #0A2342;
    color: #fff;
    padding: 10px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 13px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-align: center;
    margin-top: 14px;
    display: block;
    transition: background 0.2s;
  }
  .service-btn:hover { background: #1E90FF; }
  .service-note {
    margin-top: 28px;
    background: #f0f6ff;
    border: 1px solid rgba(30,144,255,0.3);
    border-radius: 10px;
    padding: 16px 20px;
    font-size: 14px;
    color: #0A2342;
    font-weight: 500;
    font-family: 'Lato', sans-serif;
  }

  /* EBOOK CARDS */
  .ebook-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(30,144,255,0.25);
    border-radius: 14px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ebook-tag {
    display: inline-block;
    background: #1E90FF;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 10px;
    letter-spacing: 0.5px;
    align-self: flex-start;
    font-family: 'Montserrat', sans-serif;
  }
  .ebook-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
  }
  .ebook-desc {
    font-size: 13px;
    color: #A8C8F0;
    line-height: 1.6;
    flex: 1;
  }
  .ebook-btn {
    background: rgba(255,255,255,0.1);
    color: #1E90FF;
    padding: 10px 16px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid rgba(30,144,255,0.3);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    transition: background 0.2s;
  }
  .ebook-btn:hover { background: rgba(30,144,255,0.2); }

  /* CTA */
  .cta {
    background: linear-gradient(135deg, #1E90FF, #0055bb);
    padding: 60px 16px;
    text-align: center;
  }
  .cta-title {
    font-size: clamp(24px, 5vw, 40px);
    font-weight: 900;
    color: #fff;
    margin-bottom: 12px;
    font-family: 'Montserrat', sans-serif;
  }
  .cta-sub {
    font-size: clamp(14px, 3vw, 17px);
    color: rgba(255,255,255,0.85);
    margin-bottom: 28px;
  }

  /* TWO COL */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr; gap: 28px; }
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .hamburger { display: flex; }
  }

  /* TRAINING */
  .training-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .training-card {
    background: #fff;
    border: 1px solid #e2eaf4;
    border-radius: 14px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 2px 12px rgba(10,35,66,0.06);
  }
  .training-featured {
    border: 2px solid #1E90FF;
    background: #f0f6ff;
  }
  .training-badge {
    background: #1E90FF;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
    align-self: flex-start;
    font-family: 'Montserrat', sans-serif;
  }
  .training-title {
    font-size: 20px;
    font-weight: 900;
    color: #0A2342;
    font-family: 'Montserrat', sans-serif;
  }
  .training-sub {
    font-size: 13px;
    color: #1E90FF;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
  }
  .training-items { flex: 1; display: flex; flex-direction: column; gap: 5px; }
  .training-item { font-size: 13px; color: #374151; line-height: 1.5; }
  .training-note {
    font-size: 12px;
    color: #92400e;
    background: #fffbeb;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #fcd34d;
  }
  .training-best {
    font-size: 12px;
    color: #6b7280;
    font-style: italic;
    padding: 8px 0;
    border-top: 1px solid #e2eaf4;
  }

  /* ABOUT */
  .body-text {
    font-size: 15px;
    color: #6b7280;
    line-height: 1.8;
    margin-bottom: 12px;
    font-family: 'Lato', sans-serif;
  }
  .pillars { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
  .pillar {
    background: #1E90FF;
    color: #fff;
    padding: 7px 18px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 13px;
    font-family: 'Montserrat', sans-serif;
  }
  .about-item { display: flex; gap: 14px; margin-bottom: 20px; align-items: flex-start; }
  .about-item-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
  .about-item-title {
    font-size: 14px;
    font-weight: 700;
    color: #0A2342;
    margin-bottom: 4px;
    font-family: 'Montserrat', sans-serif;
  }
  .sub-title {
    font-size: clamp(18px, 4vw, 22px);
    font-weight: 700;
    color: #0A2342;
    margin-bottom: 12px;
    margin-top: 28px;
    font-family: 'Montserrat', sans-serif;
  }
  .sub-title-blue {
    font-size: clamp(18px, 4vw, 22px);
    font-weight: 700;
    color: #1E90FF;
    margin-bottom: 12px;
    margin-top: 28px;
    font-family: 'Montserrat', sans-serif;
  }

  /* CHAT */
  .chat-box {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2eaf4;
    box-shadow: 0 8px 32px rgba(10,35,66,0.1);
  }
  .chat-head {
    background: #0A2342;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .chat-head-logo { width: 38px; height: 38px; border-radius: 8px; object-fit: cover; }
  .chat-head-name { color: #fff; font-weight: 700; font-size: 14px; font-family: 'Montserrat', sans-serif; }
  .chat-head-sub { color: #A8C8F0; font-size: 11px; }
  .chat-msgs {
    padding: 18px;
    min-height: 300px;
    max-height: 380px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .chat-row { display: flex; align-items: flex-end; gap: 8px; }
  .chat-row-user { flex-direction: row-reverse; }
  .chat-av { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
  .bubble {
    max-width: 78%;
    padding: 11px 15px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.6;
    font-family: 'Lato', sans-serif;
  }
  .bubble-ai { background: #f0f6ff; color: #0A2342; border-radius: 4px 12px 12px 12px; }
  .bubble-user { background: #1E90FF; color: #fff; border-radius: 12px 4px 12px 12px; }
  .chat-input-row {
    display: flex;
    padding: 14px;
    gap: 10px;
    border-top: 1px solid #e2eaf4;
  }
  .chat-in {
    flex: 1;
    padding: 11px 14px;
    border-radius: 8px;
    border: 1px solid #e2eaf4;
    font-size: 13px;
    outline: none;
    font-family: 'Lato', sans-serif;
    min-width: 0;
  }
  .chat-btn {
    background: #1E90FF;
    color: #fff;
    border: none;
    padding: 11px 20px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    white-space: nowrap;
  }
  .suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
  .sug-btn {
    background: #f0f6ff;
    color: #1E90FF;
    border: 1px solid rgba(30,144,255,0.3);
    padding: 7px 12px;
    border-radius: 20px;
    font-size: 11px;
    cursor: pointer;
    font-weight: 500;
    font-family: 'Lato', sans-serif;
  }

  /* CONTACT */
  .form-in {
    display: block;
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #e2eaf4;
    font-size: 14px;
    margin-bottom: 12px;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    outline: none;
  }
  .form-ta {
    display: block;
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #e2eaf4;
    font-size: 14px;
    margin-bottom: 16px;
    min-height: 110px;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    resize: vertical;
    outline: none;
  }
  .contact-item { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 22px; }
  .contact-icon { font-size: 26px; flex-shrink: 0; }
  .contact-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 4px;
    font-family: 'Montserrat', sans-serif;
  }
  .contact-val { font-size: 14px; color: #0A2342; font-weight: 600; text-decoration: none; font-family: 'Lato', sans-serif; }
  .f-success { margin-top: 10px; color: #059669; font-weight: 600; font-size: 13px; }
  .f-error { margin-top: 10px; color: #dc2626; font-weight: 600; font-size: 13px; }

  /* FOOTER */
  .footer {
    background: #0A2342;
    padding: 40px 16px;
    border-top: 3px solid #1E90FF;
  }
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 28px;
    align-items: start;
  }
  .footer-logo { width: 42px; height: 42px; border-radius: 10px; margin-bottom: 8px; object-fit: cover; }
  .footer-name { color: #fff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 15px; }
  .footer-sub { color: #1E90FF; font-size: 11px; font-style: italic; margin-top: 2px; }
  .footer-tagline { color: #A8C8F0; font-size: 12px; margin-top: 6px; font-style: italic; font-family: 'Playfair Display', serif; }
  .footer-links { display: flex; flex-direction: column; gap: 4px; }
  .footer-link { background: none; border: none; color: #A8C8F0; font-size: 13px; cursor: pointer; text-align: left; padding: 4px 0; font-family: 'Lato', sans-serif; }
  .footer-link:hover { color: #1E90FF; }
  .footer-info { color: #A8C8F0; font-size: 12px; line-height: 1.8; font-family: 'Lato', sans-serif; }
  .footer-copy { color: rgba(168,200,240,0.6); font-size: 11px; margin-top: 8px; }
`;

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm BILONG AI 👋 Ask me any marketing question — I'm here to help your business grow!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [active]);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatMessages(p => [...p, { role: "user", text: msg }]);
    setChatInput("");
    setChatLoading(true);
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

  const stripItems = ["Digital Marketing", "AI Training", "Website Development", "eBook Publishing", "Paid Advertising", "Marketing Consultation", "Social Media Management", "SEO & Optimization"];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <img src="/bilong_real_logo.jpg" alt="BILONG" className="nav-logo" />
            <div>
              <div className="nav-name">BILONG DIGITAL HUB</div>
              <div className="nav-sub">Your service is our priority</div>
            </div>
          </div>
          <div className="nav-links">
            {NAV_LINKS.map(l => <button key={l} onClick={() => navigate(l)} className={`nav-link${active===l?" active":""}`}>{l}</button>)}
          </div>
          <a href="https://wa.me/2348153687589" target="_blank" className="nav-cta">WhatsApp Us</a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className={`mobile-menu${menuOpen?" open":""}`}>
          {NAV_LINKS.map(l => <button key={l} onClick={() => navigate(l)} className={`mobile-link${active===l?" active":""}`}>{l}</button>)}
          <a href="https://wa.me/2348153687589" target="_blank" className="mobile-wa">💬 WhatsApp Us</a>
        </div>
      </nav>

      <main>
        {/* ── HOME ── */}
        {active === "Home" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">🌍 Global Digital Marketing Agency</div>
              <h1 className="hero-title">Grow Your Business<br/><span>Anywhere In The World.</span></h1>
              <p className="hero-sub">BILONG DIGITAL HUB delivers world-class digital marketing, AI training, website development, eBook publishing and professional training to businesses globally. Every client gets their business promoted on our social media and website throughout our contract.</p>
              <div className="btn-row">
                <button onClick={() => navigate("AI Assistant")} className="btn-p">Ask Our AI Assistant</button>
                <button onClick={() => navigate("Services")} className="btn-s">See Our Services</button>
              </div>
              <div className="stats">
                {[["6+","Services"],["📚","eBooks"],["🌍","Worldwide"],["🤝","Client-First"]].map(([n,l]) => (
                  <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
                ))}
              </div>
            </div>
          </section>

          <div className="strip">
            <div className="strip-inner">
              {[...stripItems,...stripItems].map((t,i) => <span key={i} className="strip-item">⚡ {t}</span>)}
            </div>
          </div>

          <section className="section" style={{background:"#fff"}}>
            <div className="inner">
              <div className="section-label">Why Choose BILONG</div>
              <h2 className="section-title">We Put Your Service First. Always.</h2>
              <div className="grid-3">
                {[
                  ["🤝","Your Service Is Our Priority","Every client gets dedicated attention and personalised strategy. We treat your business like our own."],
                  ["📢","We Advertise Your Business","Every client who works with us gets their business promoted on BILONG's social media and website throughout our contract."],
                  ["📚","eBooks That Teach","BILONG sells practical marketing eBooks to help businesses and individuals learn and grow at their own pace."],
                  ["🤖","AI-Powered Agency","We use and teach the latest AI tools to deliver faster, smarter results for your business."],
                  ["🎓","We Train & Deliver","No other agency trains you AND does the work for you. We educate while we execute."],
                  ["🌍","Serving The World","We are not limited to any country or continent. BILONG serves businesses globally with the same quality and care."],
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
              <h2 className="section-title-white">Learn Marketing. Grow Faster.</h2>
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

          <section className="cta">
            <h2 className="cta-title">Ready to Grow Your Business?</h2>
            <p className="cta-sub">Free 15-minute strategy call. No obligation. Just results.</p>
            <div className="btn-row">
              <a href="https://wa.me/2348153687589?text=Hello%20I%20want%20to%20grow%20my%20business" target="_blank" className="btn-p">Book Free Call on WhatsApp</a>
              <button onClick={() => navigate("Contact")} className="btn-s" style={{color:"#fff",borderColor:"rgba(255,255,255,0.4)"}}>Send Us a Message</button>
            </div>
          </section>
        </>}

        {/* ── ABOUT ── */}
        {active === "About" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">Our Story</div>
              <h1 className="hero-title">Built For Every Business<br/><span>That Deserves To Grow.</span></h1>
              <p className="hero-sub">BILONG DIGITAL HUB was founded by Olawumi Micheal Damilare with one clear mission — to give every business across the world access to world-class digital marketing, regardless of their size or location.</p>
            </div>
          </section>
          <section className="section" style={{background:"#fff"}}>
            <div className="inner">
              <div className="two-col">
                <div>
                  <div className="section-label">Our Vision</div>
                  <p className="body-text">To become the world's most trusted digital marketing agency — known not just for results, but for educating and elevating every business we touch.</p>
                  <div className="section-label" style={{marginTop:24}}>Our Mission</div>
                  <p className="body-text">To bridge the digital marketing gap for businesses worldwide by combining education, innovation, and execution in a way no other agency does. Every client who comes to BILONG gets their business advertised on our social media and website throughout our contract.</p>
                  <div className="section-label" style={{marginTop:24}}>Our Pillars</div>
                  <div className="pillars">
                    {["Educate","Innovate","Elevate","Connect"].map(p => <div key={p} className="pillar">{p}</div>)}
                  </div>
                </div>
                <div>
                  <div className="section-label">What Makes Us Different</div>
                  {[
                    ["🤝","Your Service Is Our Priority","We treat every client's business like our own — dedicated focus and personalised strategy."],
                    ["📢","We Advertise For You","Every client's business gets promoted on BILONG's social media and website for the duration of our contract."],
                    ["📚","eBook Publishing & Sales","We sell marketing eBooks and help you write and publish yours professionally."],
                    ["🎓","Education + Execution","We train you AND do the work — unique in the industry."],
                    ["🌍","Global Coverage","Not limited to any country. We serve businesses everywhere."],
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

        {/* ── SERVICES ── */}
        {active === "Services" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">What We Offer</div>
              <h1 className="hero-title">6 Services. <span>One Agency.</span></h1>
              <p className="hero-sub">Everything your business needs to grow digitally — under one roof, serving businesses worldwide. Contact us for pricing tailored to your needs.</p>
            </div>
          </section>
          <section className="section" style={{background:"#fff"}}>
            <div className="inner">
              <div className="grid-3">
                {SERVICES.map(sv => (
                  <div key={sv.name} className="service-card">
                    <div className="service-icon">{sv.icon}</div>
                    <div className="service-name">{sv.name}</div>
                    <ul className="service-list">
                      {sv.items.map(it => <li key={it} className="service-item">✅ {it}</li>)}
                    </ul>
                    <a href="https://wa.me/2348153687589" target="_blank" className="service-btn">Get Started →</a>
                  </div>
                ))}
              </div>
              <div className="service-note">📞 Contact us on WhatsApp for custom pricing tailored to your business needs and budget.</div>
            </div>
          </section>
        </>}

        {/* ── AI ASSISTANT ── */}
        {active === "AI Assistant" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">🤖 AI-Powered Assistant</div>
              <h1 className="hero-title">Meet <span>BILONG AI</span></h1>
              <p className="hero-sub">Ask any marketing question and get expert answers instantly — free, no sign-up needed.</p>
            </div>
          </section>
          <section className="section" style={{background:"#fff"}}>
            <div className="inner" style={{maxWidth:700}}>
              <div className="chat-box">
                <div className="chat-head">
                  <img src="/bilong_real_logo.jpg" alt="logo" className="chat-head-logo"/>
                  <div>
                    <div className="chat-head-name">BILONG AI Assistant</div>
                    <div className="chat-head-sub">Powered by AI · Online</div>
                  </div>
                </div>
                <div className="chat-msgs">
                  {chatMessages.map((m,i) => (
                    <div key={i} className={`chat-row${m.role==="user"?" chat-row-user":""}`}>
                      {m.role==="assistant" && <img src="/bilong_real_logo.jpg" alt="logo" className="chat-av"/>}
                      <div className={`bubble${m.role==="user"?" bubble-user":" bubble-ai"}`}>{m.text}</div>
                    </div>
                  ))}
                  {chatLoading && <div className="chat-row"><img src="/bilong_real_logo.jpg" alt="logo" className="chat-av"/><div className="bubble bubble-ai">Thinking...</div></div>}
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

        {/* ── TRAINING ── */}
        {active === "Training" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">🎓 Professional Training</div>
              <h1 className="hero-title">We Don't Just Do It. <span>We Teach It.</span></h1>
              <p className="hero-sub">From complete beginner to professional digital marketer. Choose your plan. Contact us on WhatsApp for pricing.</p>
            </div>
          </section>
          <section className="section" style={{background:"#fff"}}>
            <div className="inner">
              <div className="training-grid">
                {TRAINING.map(t => (
                  <div key={t.title} className={`training-card${t.featured?" training-featured":""}`}>
                    {t.featured && <div className="training-badge">⭐ MOST COMPLETE</div>}
                    <div className="training-title">{t.title}</div>
                    <div className="training-sub">{t.sub}</div>
                    <div className="training-items">
                      {t.items.map(it => <div key={it} className="training-item">👉 {it}</div>)}
                    </div>
                    {t.note && <div className="training-note">📌 Note: {t.note}</div>}
                    <div className="training-best"><strong>Best For:</strong> {t.best}</div>
                    <a href="https://wa.me/2348153687589?text=I want to enroll in the course" target="_blank" className="service-btn">Enroll Now →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>}

        {/* ── CONTACT ── */}
        {active === "Contact" && <>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-badge">Get In Touch</div>
              <h1 className="hero-title">Let's Grow Your <span>Business Together.</span></h1>
              <p className="hero-sub">Send us a message or WhatsApp us directly. We respond within 24 hours.</p>
            </div>
          </section>
          <section className="section" style={{background:"#fff"}}>
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <img src="/bilong_real_logo.jpg" alt="logo" className="footer-logo"/>
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

