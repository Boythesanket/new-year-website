import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const gradients = [
    'linear-gradient(135deg, #ff0057, #ff7a00)',
    'linear-gradient(135deg, #00f260, #0575e6)',
    'linear-gradient(135deg, #8e2de2, #ff0080)',
    'linear-gradient(135deg, #ff512f, #dd2476)',
    'linear-gradient(135deg, #1fa2ff, #12d8fa)',
    'linear-gradient(135deg, #f7971e, #ffd200)',
    'linear-gradient(135deg, #ff3cac, #784ba0)',
    'linear-gradient(135deg, #00c6ff, #f0f)',
]

const EMOJIS = ['💖', '💗', '💘', '✨', '🌟', '💫', '🫶']

const FlyingTextPage6 = () => {
    const sectionRef = useRef(null)
    const textRef = useRef(null)
    const emojiLayerRef = useRef(null)

    /* ============================
       SCROLL TEXT + GRADIENT
    ============================ */
    useGSAP(() => {
        const text = textRef.current
        const container = sectionRef.current
        if (!text || !container) return

        gsap.set(container, {
            backgroundImage: gradients[Math.floor(Math.random() * gradients.length)],
        })

        const scrollDistance = text.scrollHeight - window.innerHeight
        let lastProgress = 0
        let activeTween = null

        gsap.to(text, {
            y: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: `+=${scrollDistance}`,
                scrub: 1.2,
                pin: true,

                onUpdate: (self) => {
                    const delta = Math.abs(self.progress - lastProgress)
                    if (delta > 0.055) {
                        lastProgress = self.progress
                        if (activeTween) activeTween.kill()

                        activeTween = gsap.to(container, {
                            backgroundImage:
                                gradients[Math.floor(Math.random() * gradients.length)],
                            duration: 0.25,
                            ease: 'power1.out',
                        })
                    }
                },
            },
        })
    })

    /* ============================
       💖 EMOJI FLOATING MAGIC
    ============================ */
    useGSAP(() => {
        const layer = emojiLayerRef.current
        if (!layer) return

        const spawnEmoji = () => {
            const emoji = document.createElement('span')
            emoji.innerText = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

            emoji.style.position = 'absolute'
            emoji.style.left = `${Math.random() * 100}%`
            emoji.style.bottom = '-40px'
            emoji.style.fontSize = `${Math.random() * 20 + 20}px`
            emoji.style.filter = 'drop-shadow(0 0 10px rgba(255,255,255,0.8))'
            emoji.style.pointerEvents = 'none'

            layer.appendChild(emoji)

            gsap.fromTo(
                emoji,
                {
                    opacity: 0,
                    y: 0,
                    rotate: -10,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: -window.innerHeight - 100,
                    rotate: gsap.utils.random(-30, 30),
                    scale: 1.2,
                    duration: gsap.utils.random(6, 10),
                    ease: 'none',
                    onComplete: () => emoji.remove(),
                }
            )
        }

        // spawn continuously
        gsap.timeline({ repeat: -1 }).call(spawnEmoji).to({}, { duration: 0.5 })
    })

    return (
        <div
            ref={sectionRef}
            className='relative w-full h-screen overflow-hidden p-10 font-[acme] text-4xl text-white'
        >
            {/* 💖 emoji layer */}
            <div
                ref={emojiLayerRef}
                className="absolute inset-0 pointer-events-none z-10"
            />

            {/* text layer */}
            <div ref={textRef} className='relative h-full w-full z-20'>
                <div className='absolute left-10 top-70'>
                    <p>another year is ending.</p>
                </div>

                <div className='absolute -bottom-[5em] right-10'>
                    <p>and somehow,</p>
                </div>

                <div className='absolute -bottom-[20em] right-40'>
                    <p>you made it here.</p>
                </div>

                <div className='absolute -bottom-[40em] right-10'>
                    <p>not because everything <br />was easy,</p>
                </div>

                <div className='absolute -bottom-[60em] right-10'>
                    <p>but because you kept going.</p>
                </div>

                <div className='absolute -bottom-[80em] right-1'>
                    <p>2026 doesn’t need big promises.</p>
                </div>

                <div className='absolute -bottom-[100em] right-10'>
                    <p>just gentle days,</p>
                </div>

                <div className='absolute -bottom-[130em] right-10'>
                    <p>honest moments,</p>
                </div>

                <div className='absolute -bottom-[150em] right-20'>
                    <p>and reasons to smile.</p>
                </div>

                <div className='absolute -bottom-[180em] left-20'>
                    <p>step into it <br />at your own pace.</p>
                </div>

                <div className='absolute -bottom-[190em] left-20'>
                    <p>😁</p>
                </div>
                
            </div>
        </div>
    )
}

export default FlyingTextPage6
