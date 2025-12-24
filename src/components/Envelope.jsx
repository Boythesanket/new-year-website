import React, { useRef } from 'react'
import '../index.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Envelope = () => {

  const lidRef = useRef(null);
  const letter = useRef(null);
  const letterAnime = useRef(null);

  useGSAP(() => {
    gsap.from(letterAnime.current, {
      y: 220,
      opacity: 0,
      ease: 'back.inOut',
      delay: 0.3
    });
  });

  const opened = useRef(false);

  const letterOpen = () => {
    if (opened.current) return;
    opened.current = true;

    gsap.to(lidRef.current, {
      rotateX: 180,
      duration: 1,
      ease: 'power2.inOut'
    });

    gsap.to(letterAnime.current, {
      y: 140,
      ease: 'sine'
    });
  }

  const letterRead = (e) => {
    e.stopPropagation();
    if (!opened.current) return;
    gsap.to(letter.current, {
      y: -300,
      duration: 1,
      zIndex: 10,
      ease: 'power2.inOut',
    });

  }

  return (

    <>
      <div className='w-full h-screen flex items-center justify-center'>

        {/* wrapper */}
        <div
          onClick={letterOpen}
          ref={letterAnime}
          className='lg:w-1/3 w-90 lg:h-80 h-60 bg-neutral-400 relative flex justify-center items-center z-0 cursor-pointer'>
          {/* lid one */}
          <div ref={lidRef} className='lid one'></div>
          {/* lid two */}
          <div className='lid two'></div>
          {/* envelope */}
          <div className='absolute h-full w-full top-0 left-0 border-t-transparent border-r-neutral-300 border-b-neutral-200 border-l-neutral-300 border-120 lg:border-160 border-solid z-3 pointer-events-none'></div>
          {/* letter */}
          <div ref={letter} onClick={letterRead} className='absolute h-full lg:h-[85%] top-0 w-[90%] bg-neutral-200 rounded-2xl z-2 cursor-pointer overflow-hidden'>

            {/* para */}
            <div id="letterContent" className="p-6 h-full overflow-y-auto">
              <div className="bg-[#fffaf5] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#f1e6d8] relative">

                <div className='w-15 h-15 absolute top-0 right-0'>
                  <img loading='lazy' className='w-full h-full' src="https://static.slowly.app/stamp/along-with-you.png" />
                </div>

                <p className="text-lg leading-relaxed text-center font-[Rubik] text-[#3a3a3a] space-y-4">
                  <span className="block text-2xl mb-2">Hey,</span>

                  <span className="block">
                    This all started with a letter on <span className="italic">Slowly</span>.<br />
                    Words sent without hurry,<br />
                    read without rush.
                  </span>

                  <span className="block">
                    I didn’t know then<br />
                    how much a simple exchange of thoughts<br />
                    could turn into something meaningful.
                  </span>

                  <span className="block">
                    So this is my letter now.<br />
                    A small <span className="font-medium">thank you</span><br />
                    for the conversations,<br />
                    the patience,<br />
                    and the presence.
                  </span>

                  <span className="block">
                    Here’s to more moments,<br />
                    more words,<br />
                    and more time.
                  </span>

                  <span className="block mt-6 text-sm text-[#6b6b6b]">
                    — always sent with care ♡
                  </span>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Envelope