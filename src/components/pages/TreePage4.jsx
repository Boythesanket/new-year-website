import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const TreePage4 = () => {

    const snowRef = useRef(null);
    const starRef = useRef(null)
    const treeRef = useRef(null)
    const merryRef = useRef(null)
    const christmasRef = useRef(null)


    const [isDecorated, setIsDecorated] = useState(false);

    useGSAP(() => {
        if (!isDecorated) return;

        // reset
        gsap.set([merryRef.current, christmasRef.current], {
            opacity: 0,
            scale: 0.9,
            filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))',
        })

        const tl = gsap.timeline()

        tl.to(merryRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
        })
            .to(christmasRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
            }, '-=0.3')

        // ✨ Flicker effect
        tl.to([merryRef.current, christmasRef.current], {
            opacity: () => gsap.utils.random(0.6, 1),
            duration: 0.12,
            repeat: 10,
            yoyo: true,
            ease: 'none',
        })

        // 🌟 Soft glow pulse forever
        gsap.to([merryRef.current, christmasRef.current], {
            filter: 'drop-shadow(0 0 25px rgba(255,220,160,0.9))',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })

    }, [isDecorated])


    useGSAP(() => {

        const flakes = gsap.utils.toArray('.snowflake')

        flakes.forEach((flake) => {
            const size = gsap.utils.random(6, 14)
            const duration = gsap.utils.random(6, 12)
            const delay = gsap.utils.random(0, 5)
            const drift = gsap.utils.random(-40, 40)

            gsap.set(flake, {
                x: gsap.utils.random(0, window.innerWidth),
                y: -20,
                width: size,
                height: size,
                opacity: gsap.utils.random(0.4, 0.9),
            })

            gsap.to(flake, {
                y: window.innerHeight + 40,
                x: `+=${drift}`,
                duration,
                delay,
                repeat: -1,
                ease: 'none',
            })
        });

        Draggable.create(starRef.current, {
            type: 'x,y',
            inertia: true,
            onRelease() {
                const star = starRef.current
                const tree = treeRef.current

                const starBox = star.getBoundingClientRect()
                const treeBox = tree.getBoundingClientRect()

                // 🎯 target = top center of tree
                const targetX =
                    treeBox.left + treeBox.width / 2 - starBox.width / 2
                const targetY =
                    treeBox.top + 30 - starBox.height / 2

                const distance = Math.hypot(
                    starBox.left - targetX,
                    starBox.top - targetY
                );

                // ✅ if star is close enough → snap
                if (distance < 140) {
                    gsap.to(star, {
                        x: targetX - starBox.left + gsap.getProperty(star, 'x'),
                        y: targetY - starBox.top + gsap.getProperty(star, 'y'),
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: () => {
                            setIsDecorated(true)
                        }
                    })
                }
            },
        });
    });

    return (
        <div className='w-full h-screen bg-red-500 overflow-hidden relative'>

            {/* ❄️ Snow Layer */}
            <div
                ref={snowRef}
                className='absolute inset-0 pointer-events-none z-10'
            >
                {Array.from({ length: 40 }).map((_, i) => (
                    <span
                        key={i}
                        className='snowflake absolute bg-white rounded-full blur-[0.5px]'
                    />
                ))}
            </div>

            {/* Decorations */}
            <div className='absolute -top-1 gap-6 lg:w-1/2 lg:h-60 w-1/2 h-30 flex'>
                <img className='w-full h-full invert-100' src="../src/assets/images/decor1.png" />
                <img className='w-full h-full rotate-y-180 invert-100' src="../src/assets/images/decor1.png" />
                <img className='w-full h-full invert-100 lg:flex hidden rotate-y-180' src="../src/assets/images/decor1.png" />
                <img className='w-full h-full invert-100 lg:flex hidden rotate-y-180' src="../src/assets/images/decor1.png" />
            </div>

            <div className='absolute lg:hidden -bottom-30 left-0 drop-shadow-red-500 drop-shadow-2xl'>
                <img src="../src/assets/images/decor2.png" />
            </div>

            <div className='absolute lg:left-1/2 lg:bottom-10 lg:-translate-x-1/2 top-1/2 -translate-y-1/2 z-20'>
                <img
                    ref={treeRef}
                    className={`transition-all duration-700 ${isDecorated
                        ? 'drop-shadow-[0_0_40px_rgba(255,200,100,0.8)]'
                        : ''
                        }`}
                    src={
                        isDecorated
                            ? '../src/assets/images/tree-glow.png'
                            : '../src/assets/images/tree.png'
                    }
                />
            </div>
            <div ref={starRef} className='w-20 h-20 lg:w-30 lg:h-30 absolute left-1/2 -translate-x-1/2 top-12'>
                <img className='w-full h-full lg:cursor-grab' src="../src/assets/images/star.png" />
            </div>

            <div ref={merryRef} className='absolute lg:left-100 lg:top-1/2 lg:-translate-y-1/2 top-30 left-1/2 -translate-x-1/2 font-[jersey] opacity-0'>
                <div><h1 className='text-7xl text-white uppercase'>Merry</h1></div>
            </div>
            <div ref={christmasRef} className='absolute bottom-40 z-100 lg:bottom-30 left-1/2 -translate-x-1/2 font-[jersey] lg:right-200 lg:top-1/2 lg:-translate-y-1/2 opacity-0'>
                <div><h1 className='lg:text-9xl text-[4rem] text-white uppercase'>Christmas</h1></div>
            </div>
        </div>
    )
}

export default TreePage4
