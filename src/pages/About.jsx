import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/inner-pages.css'

export default function About() {
  return (
    <div className="inner-page">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="page-eyebrow">About Us</span>
              <h1 className="page-title">Engineering the future<br />of digital experiences.</h1>
              <p className="page-subtitle">We are a collective of engineers, designers, and strategists building scalable, high-performance digital ecosystems for forward-thinking brands.</p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="page-section page-section-alt">
          <div className="container document-content">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2>Our Mission</h2>
              <p>At MediaLoop Technologies, our mission is to bridge the gap between complex engineering and beautiful design. We believe that software shouldn't just work—it should feel effortless, scale infinitely, and leave a lasting impression.</p>
              
              <h2>The MediaLoop Standard</h2>
              <p>We don't do "good enough". Every line of code, every pixel, and every animation is crafted with intent. From AI-driven automation pipelines to high-conversion web applications, our standards are uncompromising.</p>
              
              <ul>
                <li><strong>Performance First:</strong> Sub-second load times and 60fps animations.</li>
                <li><strong>Scalable Architecture:</strong> Built to handle tomorrow's traffic, today.</li>
                <li><strong>Design Excellence:</strong> Editorial, pixel-perfect interfaces that build trust.</li>
              </ul>
              
              <h2>Global Reach, Local Precision</h2>
              <p>With hubs in Surat, India and Dubai, UAE, we deliver world-class engineering to global enterprises while maintaining the agility and precision of a boutique studio.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
