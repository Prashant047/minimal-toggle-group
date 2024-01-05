"use client";
import React, {useState, createContext, useContext} from "react";
import { motion } from 'framer-motion';

const TabContext = createContext<{active: string, setActive: (key:string) => void} | null>(null);

function TabContextProvider({children, initial}: {children:React.ReactNode, initial:string}){
  const [active, setActive] = useState(initial);
  return (
    <TabContext.Provider value={{active, setActive}}>
      {children}
    </TabContext.Provider>
  );
}

function useTab() {
  // @ts-ignore
  const { active, setActive } = useContext(TabContext);
  return {
    active, setActive
  };
}

export default function Tab({children, initial}: {children: React.ReactNode, initial:string}){
  return (
    <TabContextProvider initial={initial}>
      <div className="w-max mx-auto p-1 rounded-lg flex justify-start items-center bg-neutral-950 border border-neutral-700">
        {children}
      </div>
    </TabContextProvider>
  );
}

interface TabItemProps {
  children: React.ReactNode
  value?: string
}
Tab.TabItem = ({children, value}:TabItemProps) => {
  const { active, setActive } = useTab();
  const isActive = value === active;

  return (
    <span 
      className={`relative cursor-pointer flex-none text-xs px-2 py-1 ${isActive?'text-neutral-200':'text-neutral-400 hover:text-neutral-300'} `}
      onClick={() => setActive(value)}
    >
      {isActive? (
        <motion.div
          className={`absolute inset-0 bg-neutral-800 rounded-md`}
          layoutId="tabItemBg"
          transition={{
            layout: {ease:"backInOut", duration: 0.3}
          }}
        />
      ):null}
      <div className="relative  z-10">{children}</div>
    </span>
  );
}