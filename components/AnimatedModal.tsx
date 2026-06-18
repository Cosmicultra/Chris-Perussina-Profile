"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { modalBackdropTransition, modalSpring } from "@/lib/motion-config";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type AnimatedModalProps = {
  open: boolean;
  onClose: () => void;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  children: ReactNode;
  panelClassName?: string;
};

export function AnimatedModal({
  open,
  onClose,
  ariaLabelledBy,
  ariaLabel,
  children,
  panelClassName = "relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl",
}: AnimatedModalProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const instant = prefersReducedMotion;

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <motion.button
            type="button"
            className="absolute inset-0 bg-navy/75 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={instant ? { duration: 0 } : modalBackdropTransition}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabel}
            className={panelClassName}
            initial={instant ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={instant ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={instant ? { duration: 0 } : modalSpring}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function useModalFocus(open: boolean) {
  const focusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) focusRef.current?.focus();
  }, [open]);

  return focusRef;
}
