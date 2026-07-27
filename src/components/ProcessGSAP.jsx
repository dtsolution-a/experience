import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/process-gsap.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We dive deep into your business logic, market position, and technical constraints to map out a foolproof architecture.', image: '/process-1.jpg' },
  { num: '02', title: 'Design & Prototyping', desc: 'Our design team crafts editorial, premium interfaces in Figma, validating user flows before a single line of code is written.', image: '/process-2.jpg' },
  { num: '03', title: 'Engineering & QA', desc: 'We build using modern stacks (Next.js, Node, PyTorch) with uncompromising standards for performance and security.', image: '/process-3.jpg' },
  { num: '04', title: 'Launch & Scale', desc: 'Seamless deployment, monitoring, and iterative scaling to ensure the platform grows with your business.', image: '/process-4.jpg' },
]

export default function ProcessGSAP() {
  const container = useRef(null)
  
  useGSAP(() => {
    // Media query to disable pinning on mobile (optional, but good UX practice)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const stepElements = gsap.utils.toArray('.pg-step')
      const imageWrappers = gsap.utils.toArray('.pg-image-wrapper')
      const images = gsap.utils.toArray('.pg-image-wrapper img')

      // Set initial states
      gsap.set(stepElements.slice(1), { opacity: 0, y: 50, filter: 'blur(10px)' })
      gsap.set(imageWrappers.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(images.slice(1), { scale: 1.3, yPercent: 20 })

      // Create a master timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: `+=${steps.length * 100}%`,
          pin: true,
          scrub: 1, // smooth scrubbing
          anticipatePin: 1
        }
      })

      // Loop through each step starting from the second one (index 1)
      stepElements.forEach((step, i) => {
        if (i === 0) return; // Skip first as it's already visible

        const prevStep = stepElements[i - 1]
        const currImageWrap = imageWrappers[i]
        const currImage = images[i]
        const prevImageWrap = imageWrappers[i - 1]

        // Animate previous step out
        tl.to(prevStep, { opacity: 0, y: -50, filter: 'blur(10px)', duration: 1 }, i)
        
        // Animate current step in
        tl.to(step, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, i)

        // Animate current image mask reveal (unmasking from bottom to top)
        tl.to(currImageWrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, i)
        
        // Parallax image within the mask (scaling down and moving up)
        tl.to(currImage, { scale: 1, yPercent: 0, duration: 1, ease: 'power2.out' }, i)
        
        // Optional: darken or scale previous image slightly to push it back
        tl.to(prevImageWrap, { scale: 0.95, filter: 'brightness(0.5)', duration: 1 }, i)
      })
    });
  }, { scope: container })

  return (
    <section ref={container} className="process-gsap-container">
      <div className="container" style={{ height: '100%' }}>
        <div className="pg-layout">
          
          {/* LEFT: Text Content */}
          <div className="pg-left">
            <span className="page-eyebrow">How We Work</span>
            <h2 className="pg-title">The MediaLoop Process</h2>
            
            <div className="pg-steps-wrapper">
              {steps.map((step, i) => (
                <div key={i} className={`pg-step pg-step-${i}`}>
                  <div className="pg-step-num">{step.num}</div>
                  <h3 className="pg-step-title">{step.title}</h3>
                  <p className="pg-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Images */}
          <div className="pg-right">
            <div className="pg-images-stack">
              {steps.map((step, i) => (
                <div key={i} className={`pg-image-wrapper pg-image-${i}`} style={{ zIndex: i }}>
                  <img src={step.image} alt={step.title} />
                  <div className="pg-image-overlay"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
