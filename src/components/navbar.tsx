"use client";

import { useState } from "react";
import SideBar from "./sidebar";
import { Logo, Menu } from "./icons";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-neutral-200 px-3 py-4 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <Logo />
            <h2 className="text-base font-bold leading-6 tracking-[-0.96px] text-neutral-900">
              Chat AI
            </h2>
          </div>

          <button onClick={() => setOpen(!open)}>
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: open ? "0%" : "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={(event, info) => {
                const target = event.target as HTMLElement;
                if (info.offset.x > 0) {
                  target.style.transform = "translateX(0px)";
                }
              }}
              onDragEnd={(event, info) => {
                if (info.offset.x < -50) {
                  setOpen(false);
                }
              }}
              className="fixed left-0 top-0 z-50 h-full bg-white lg:hidden"
              style={{ width: "90%", overflow: "hidden" }}
            >
              <SideBar open={open} setOpen={setOpen} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setOpen(false)}
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
