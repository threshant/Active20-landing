"use client";

import { motion, useReducedMotion } from "framer-motion";

export const premiumEase = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const revealViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
};

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.8,
  variants = fadeUp,
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ duration, delay, ease: premiumEase }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealStagger({
  as = "div",
  children,
  className,
  stagger = 0.1,
  delay = 0,
  ...props
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  as = "div",
  children,
  className,
  variants = fadeUp,
  ...props
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      transition={{ duration: 0.75, ease: premiumEase }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
