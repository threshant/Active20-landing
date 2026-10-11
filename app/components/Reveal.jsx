"use client";

import { Children, Fragment, isValidElement, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

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

export function TitleReveal({
  as = "h2",
  children,
  className,
  delay = 0,
  ...props
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: false,
    amount: revealViewport.amount,
    margin: revealViewport.margin,
  });
  const MotionTag = motion[as];
  const lines = collectTitleLines(children);
  let wordIndex = 0;

  return (
    <MotionTag ref={ref} className={className} {...props}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {line.map((word, position) => {
            const index = wordIndex;
            wordIndex += 1;
            return (
              <Fragment key={`${lineIndex}-${position}`}>
                {position > 0 ? " " : null}
                <span className="title-reveal-word">
                  <motion.span
                    initial={reduce ? false : { y: "115%" }}
                    animate={reduce || inView ? { y: "0%" } : { y: "115%" }}
                    transition={
                      inView
                        ? {
                            duration: 0.8,
                            delay: delay + index * 0.055,
                            ease: premiumEase,
                          }
                        : { duration: 0 }
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </MotionTag>
  );
}

function collectTitleLines(children) {
  const lines = [[]];

  const walk = (node) => {
    Children.forEach(node, (child) => {
      if (child == null || child === false || child === true) return;

      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/\s+/)
          .filter(Boolean)
          .forEach((word) => lines[lines.length - 1].push(word));
        return;
      }

      if (!isValidElement(child)) return;
      if (child.type === "br") {
        lines.push([]);
        return;
      }

      walk(child.props?.children);
    });
  };

  walk(children);
  return lines.filter((line) => line.length > 0);
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
