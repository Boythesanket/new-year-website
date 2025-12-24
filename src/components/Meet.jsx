import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useState } from 'react'
import Envelope from './Envelope'
import { useEffect } from 'react'
gsap.registerPlugin(ScrollTrigger)

const Meet = ({ onNext }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3000); // ⏱ 3 seconds (change if you want)

    return () => clearTimeout(timer);
  }, [onNext]);

  const bar = useRef(null);
  const [show, setShow] = useState(false);

  useGSAP(() => {
    gsap.from(bar.current, {
      scale: 0,
      ease: 'sine.inOut',
      opacity: 0,
      delay: 0.8,
      scrollTrigger: {
        trigger: bar.current,
        start: 'top 55%'
      }
    });
  });

  function btnCode() {
    bar.current.style.display = 'none';
    setShow(true);
  }

  return (
    <>
      <div
        className='w-full h-screen bg-cover bg-[url(src/assets/images/mob-back.png)] lg:bg-[url(src/assets/images/back.png)] relative'>

        {/* notification bar */}

        <div ref={bar} className='bar w-full lg:w-1/4 min-h-55 left-1/2 -translate-x-1/2 absolute -translate-y-1/2 top-1/2 pt-10 flex justify-center items-center'>

          {/* bell icon */}
          <div className='w-20 absolute z-10 -top-1'>
            <img src="src/assets/images/bell.png" />
          </div>

          <div className='w-[90%] p-3 h-full bg-gray-500 rounded-3xl drop-shadow-black drop-shadow-lg flex cursor-pointer relative justify-center items-center'>

            <div className='text-center mt-10 flex flex-col gap-2'>

              <div className='text-4xl font-bold text-zinc-300 font-[Rubik]'>
                <h1>Notification</h1>
              </div>
              <div className='text-xl text-zinc-300 font-[Rubik]'>
                <h1>New letter received</h1>
              </div>
              <div>
                <button
                  onClick={btnCode}
                  className='bg-blue-300 px-8 py-3 text-zinc-100 rounded-3xl active:scale-95 cursor-pointer outline-0'>Open</button>
              </div>

            </div>
          </div>


        </div>

        {show && <Envelope />}

      </div>

    </>
  )
}

export default Meet