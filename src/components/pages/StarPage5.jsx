import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import stick from '/src/assets/images/stick.png';
import { useState } from 'react';

const StarPage5 = () => {

    const containerRef = useRef(null);

    const [sticks, setSticks] = useState([
        { id: 1, src: stick, className: 'top-10 left-10 lg:top-20 lg:left-50' },
        { id: 2, src: stick, className: 'top-50 right-10 lg:top-100 lg:right-70' },
        { id: 3, src: stick, className: 'bottom-80 left-10 lg:bottom-30 lg:left-50' },
        { id: 4, src: stick, className: 'bottom-30 right-10 lg:top-20 lg:right-70' },
    ]);

    const [wishBox, setWishBox] = useState([]);

    const wishes = [
        "i’m really glad we became friends 🤍",
        "this friendship feels easy and nice 🌱",
        "having you around makes moments lighter ✨",
        "this connection genuinely makes me smile 😊",
        "i’m happy this friendship exists 🤍",

        "some friendships just feel comfortable 🌼",
        "you bring good energy into simple moments ✨",
        "this is one of those friendships that feels good 😊",
        "i always enjoy our conversations 🤍",
        "knowing you has been really nice 🌱",

        "this friendship feels warm and natural ✨",
        "i truly appreciate having you as a friend 🤍",
        "some connections don’t need effort to feel right 🌼",
        "this is a friendship i value a lot 😊",
        "i’m quietly grateful for this connection 🤍",

        "you make small moments feel nicer ✨",
        "this friendship adds something good to my days 🌱",
        "i’m glad our paths crossed 🤍",
        "this connection feels meaningful and calm 😊",
        "happy to have you around ✨"
    ];

    useGSAP(() => {
        gsap.from('.stick', {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine'
        });
    }, { scope: containerRef });

    const removeStick = (id, el) => {
        const stickRect = el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];

        gsap.to(el, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2',
            onComplete: () => {
                setSticks(prev => prev.filter(stick => stick.id !== id));

                setWishBox(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: randomWish,
                        x: stickRect.left - containerRect.left + stickRect.width / 2,
                        y: stickRect.top - containerRect.top
                    }
                ]);

            }
        });
    }

    return (
        <>
            <div ref={containerRef} className='w-full h-screen lg:bg-[url(../src/assets/images/backpage55.jpg)] object-cover bg-cover bg-[url(../src/assets/images/backpage5.jpg)] opacity-90 relative'>

                {sticks.map((item) => (
                    <div
                        key={item.id}
                        className={`stick w-30 h-35 lg:w-50 lg:h-50 absolute ${item.className}`}
                    >
                        <img src={item.src}
                            className="w-full h-full cursor-pointer"
                            onClick={(e) => removeStick(item.id, e.currentTarget)}
                        />

                    </div>
                ))}

                {wishBox.map((box) => (
                    <div
                        key={box.id}
                        className="absolute w-30 z-50 px-4 py-2 bg-white/90 text-[1rem] rounded-xl shadow-lg font-[Rubik] lg:text-2xl"
                        style={{
                            left: box.x + 10,
                            top: box.y + 150,
                            transform: 'translate(-50%, -120%)'
                        }}
                        ref={(el) => {
                            if (el) {
                                gsap.fromTo(
                                    el,
                                    { scale: 0.6, opacity: 0 },
                                    { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
                                );
                            }
                        }}
                    >
                        {box.text}
                    </div>
                ))}





            </div>
        </>
    )
}

export default StarPage5