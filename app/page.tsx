"use client"
import Tab from './Tab';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsUpDown } from 'lucide-react';
import useClickOutside from './useClickOutside';

export default function Home() {

  const [dropOpen, setDropOpen] = useState(false);
  const [boxRef] = useClickOutside(() => setDropOpen(false));

  return (
  <>
    <p className='w-max mx-auto mt-10 text-sm text-neutral-300'>Minimal tab group with dropdown</p>
    <section className="my-8">
      <Tab initial="day">
        <Tab.TabItem value="day">Day</Tab.TabItem>
        <Tab.TabItem value="workweek">
          <div className='flex items-center gap-1 '>
            <span>Work Week</span>
            <span onClick={() => setDropOpen(prev => !prev)} className='rounded-md hover:bg-neutral-700 py-0.5'><ChevronsUpDown size={12}/></span>
            <AnimatePresence>
              {dropOpen?(
                <motion.div 
                  ref={boxRef}
                  initial={{height:0}} 
                  animate={{height:'auto'}} 
                  transition={{
                    ease: [0.32, 0.72, 0, 1],
                    duration: 0.3
                  }}
                  exit={{height:0}} 
                  className='absolute rounded-lg bg-neutral-800 -inset-x-4 top-[calc(100%_+_0.8rem)] overflow-hidden'
                >
                  <div>
                    <ul className='p-1 flex flex-col gap-2'>
                      <li className='px-2 py-1 rounded-lg transition hover:bg-neutral-700/50'>Full Week</li>
                      <li className='px-2 py-1 rounded-lg transition hover:bg-neutral-700/50'>Work Week</li>
                    </ul>
                  </div>
                </motion.div>
              ):null}
            </AnimatePresence>
          </div>
        </Tab.TabItem>
        <Tab.TabItem value="month">Month</Tab.TabItem>
      </Tab>
    </section>
  </>
  );
}


