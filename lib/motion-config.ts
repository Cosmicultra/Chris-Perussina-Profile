export const modalSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export const modalBackdropTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

export const staggerChild = {
  staggerChildren: 0.05,
};

export const toastSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
};
