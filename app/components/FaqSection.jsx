"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What happens at my first visit?",
    answer:
      "Your first visit takes 30 minutes. You meet your coach, get a complimentary body composition scan, and try a sample of Strength, Endurance, and Performance training.",
  },
  {
    question: "What should I bring?",
    answer:
      "Nothing to train in. We provide a sterilized EMS suit, so gym clothes are not needed.",
  },
  {
    question: "How long is a workout?",
    answer:
      "A coached EMS session is 20 minutes. Low-impact impulses activate multiple muscle groups while you move through simple, guided exercises.",
  },
  {
    question: "Is it hard on your joints?",
    answer:
      "The effort stays in the muscle. You get a full session without the pounding of a conventional workout, and your coach adjusts the intensity to you.",
  },
  {
    question: "How should I prepare?",
    answer:
      "Stay hydrated and skip intense workouts for 24 to 48 hours before your visit.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="faq-band scroll-mt-24"
    >
      <div className="faq-band-inner">
        <div className="faq-intro">
          <p className="faq-kicker">FAQ /</p>
          <h2 id="faq-title">Questions, answered</h2>
          <p>
            Still unsure about something? Write to{" "}
            <a href="mailto:team@active20.com">team@active20.com</a> and
            we&apos;ll talk it through.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.question} className="faq-item">
                <h3 className="faq-question">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((current) => (current === index ? null : index))
                    }
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-panel"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
