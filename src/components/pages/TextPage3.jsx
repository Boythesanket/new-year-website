import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const randomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`

const TextPage3 = () => {

    const para = useRef(null)
    const containerRef = useRef(null)

    useGSAP(() => {
        const text = para.current
        const container = containerRef.current

        // ---- TEXT SCROLL LOGIC ----
        const textWidth = text.scrollWidth
        const viewportWidth = window.innerWidth
        const scrollDistance = textWidth - viewportWidth

        gsap.to(text, {
            x: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: `+=${scrollDistance * 1.6}`,
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
            },
        })

        // ---- RANDOM GRADIENT LOGIC ----
        const gradients = Array.from({ length: 6 }).map(() => ({
            c1: randomColor(),
            c2: randomColor(),
            c3: randomColor(),
        }))

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: `+=${scrollDistance * 1.6}`,
                scrub: true,
            },
        })

        gradients.forEach((g) => {
            tl.to(container, {
                '--c1': g.c1,
                '--c2': g.c2,
                '--c3': g.c3,
                ease: 'none',
                duration: 1,
            })
        })
    })

    return (
        <div
            ref={containerRef}
            className="w-full min-h-screen text-white overflow-hidden"
            style={{
                background: `linear-gradient(180deg, var(--c1), var(--c2), var(--c3))`,
                '--c1': '#0f2027',
                '--c2': '#203a43',
                '--c3': '#2c5364',
            }}
        >
            <div className="w-screen h-screen flex items-center rotate-90 lg:rotate-0">
                <p
                    ref={para}
                    className="
            font-[jersey]
            text-[25vw] lg:text-[20vw]
            whitespace-nowrap
            leading-none
            px-[10vw]
          "
                >
                    Somewhere between letters and time, a friendship happened, and I’m glad it did. ✨
                </p>
            </div>
        </div>
    )
}

export default TextPage3
