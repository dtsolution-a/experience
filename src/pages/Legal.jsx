import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

const content = {
  privacy: (
    <>
      <h2>Privacy Policy</h2>
      <p>Last updated: July 2026</p>
      <p>At MediaLoop Technologies ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by MediaLoop.</p>
      
      <h3>1. Information We Collect</h3>
      <p>We collect information you provide directly to us when you use our services, request a consultation, or interact with our website. This may include your name, email address, phone number, and company details.</p>
      
      <h3>2. How We Use Your Information</h3>
      <p>We use the information we collect primarily to provide, maintain, and improve our services, as well as to communicate with you regarding your projects and inquiries.</p>
      
      <h3>3. Data Security</h3>
      <p>We implement appropriate technical and organisational measures to protect the personal data that we collect and process about you. The measures we use are designed to provide a level of security appropriate to the risk of processing your personal information.</p>
    </>
  ),
  terms: (
    <>
      <h2>Terms of Service</h2>
      <p>Last updated: July 2026</p>
      <p>By accessing or using the services provided by MediaLoop Technologies, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.</p>
      
      <h3>1. Intellectual Property</h3>
      <p>The Service and its original content, features, and functionality are and will remain the exclusive property of MediaLoop Technologies and its licensors.</p>
      
      <h3>2. Client Responsibilities</h3>
      <p>You agree to provide accurate and complete information necessary for the execution of your projects. Delays in providing such information may impact project timelines.</p>
      
      <h3>3. Limitation of Liability</h3>
      <p>In no event shall MediaLoop Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
    </>
  ),
  cookies: (
    <>
      <h2>Cookie Policy</h2>
      <p>Last updated: July 2026</p>
      <p>This Cookie Policy explains how MediaLoop Technologies uses cookies and similar technologies to recognise you when you visit our website. It explains what these technologies are and why we use them.</p>
      
      <h3>1. What are cookies?</h3>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      
      <h3>2. Why do we use cookies?</h3>
      <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>
    </>
  )
}

export default function Legal() {
  const { hash } = useLocation()
  const [activeTab, setActiveTab] = useState('privacy')

  useEffect(() => {
    if (hash === '#terms') setActiveTab('terms')
    else if (hash === '#cookies') setActiveTab('cookies')
    else setActiveTab('privacy')
  }, [hash])

  return (
    <div className="inner-page noise">
      <Navbar />
      
      <main>
        <section className="page-hero" style={{ paddingBottom: '30px' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="page-title" style={{ fontSize: '64px' }}>Legal Hub</h1>
            </motion.div>
          </div>
        </section>

        <section className="page-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="container document-content">
            <div className="legal-tabs">
              <button className={`legal-tab ${activeTab === 'privacy' ? 'active' : ''}`} onClick={() => setActiveTab('privacy')}>Privacy Policy</button>
              <button className={`legal-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>Terms of Service</button>
              <button className={`legal-tab ${activeTab === 'cookies' ? 'active' : ''}`} onClick={() => setActiveTab('cookies')}>Cookie Policy</button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="elevated-card"
                style={{ padding: '60px', marginTop: '20px' }}
              >
                {content[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
