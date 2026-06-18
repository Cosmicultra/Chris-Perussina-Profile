"use client";

import { AnimatePresence, motion } from "motion/react";
import { ToastContextProvider, useToastState } from "@/lib/toast-context";
import { toastSpring } from "@/lib/motion-config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { message, showToast } = useToastState();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ToastContextProvider showToast={showToast}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-[max(5.5rem,env(safe-area-inset-bottom))] z-[70] flex justify-center px-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {message ? (
            <motion.div
              key={message}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={prefersReducedMotion ? { duration: 0 } : toastSpring}
              className="rounded-full border border-border bg-card/95 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur-md"
            >
              {message}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ToastContextProvider>
  );
}
