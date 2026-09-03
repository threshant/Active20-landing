"use client";

import { RevealItem, RevealStagger } from "./Reveal";

export default function STitle({
  title,
  description,
  sectionClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  return (
    <RevealStagger as="section" className={sectionClassName} stagger={0.12}>
      {title ? (
        <RevealItem as="h2" className={titleClassName || undefined}>
          {title}
        </RevealItem>
      ) : null}
      {description ? (
        <RevealItem as="p" className={descriptionClassName || undefined}>
          {description}
        </RevealItem>
      ) : null}
    </RevealStagger>
  );
}
