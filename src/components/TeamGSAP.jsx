import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import '../styles/team-gsap.css'

gsap.registerPlugin(ScrollTrigger)

const teams = [
  { id: 1, q: "Need a Website?", a: "Meet our Developers", image: "/team-devs.jpg", tag: "Engineering" },
  { id: 2, q: "Need Branding?", a: "Meet our Designers", image: "/team-design.jpg", tag: "UI/UX & Identity" },
  { id: 3, q: "Need Growth?", a: "Meet our SEO Experts", image: "/team-seo.jpg", tag: "Organic Search" },
  { id: 4, q: "Need Automation?", a: "Meet our AI Specialists", image: "/team-ai.jpg", tag: "Machine Learning" },
  { id: 5, q: "Need Business Tech?", a: "Meet our Virtual CTO", image: "/team-cto.jpg", tag: "Strategy & Arch" }
]

export default function TeamGSAP() {
  const container = useRef(null)

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const qTexts = gsap.utils.toArray('.tg-q-text')
      const aCards = gsap.utils.toArray('.tg-a-card')

      // Initial state: hide everything except first Q (which will be animated in)
      gsap.set(qTexts, { opacity: 0, y: 50, scale: 0.9 })
      gsap.set(aCards, { opacity: 0, y: 100, scale: 0.95 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: `+=${teams.length * 150}%`, // 150% scroll height per step for a medium pace
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      })

      teams.forEach((team, i) => {
        const q = qTexts[i];
        const a = aCards[i];

        // 1. Q appears
        tl.to(q, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" })
        
        // Short pause to read Q
        tl.to({}, { duration: 0.5 })

        // 2. Q moves up slightly and A appears from bottom
        tl.to(q, { y: -40, scale: 0.95, opacity: 0.7, duration: 1, ease: "power2.inOut" }, `step-${i}`)
        tl.to(a, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, `step-${i}`)

        // Short pause to read A and see image
        tl.to({}, { duration: 1 })

        // 3. Both fade out to make room for next (unless it's the very last step)
        if (i < teams.length - 1) {
          tl.to([q, a], { opacity: 0, y: -100, duration: 1, ease: "power2.in" })
        }
      })
    });
  }, { scope: container })

  return (
    <section ref={container} className="team-gsap-container">
      <div className="tg-noise-overlay"></div>
      <div className="container" style={{ height: '100%', position: 'relative' }}>
        
        <div className="tg-center-wrapper">
          {teams.map((team, i) => (
            <div key={team.id} className={`tg-step tg-step-${i}`} style={{ zIndex: teams.length - i }}>
              
              {/* The Question Text */}
              <div className="tg-q-text">
                <h2 className="tg-question">{team.q}</h2>
              </div>

              {/* The Answer Card / Image */}
              <div className="tg-a-card">
                <div className="tg-a-content">
                  <div className="tg-arrow-circle">
                    <ArrowDown size={24} color="var(--bg)" />
                  </div>
                  <h3 className="tg-answer">{team.a}</h3>
                  <span className="tg-tag">{team.tag}</span>
                </div>
                
                <div className="tg-image-wrap">
                  <img src={team.image} alt={team.a} />
                  <div className="tg-image-grad"></div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
