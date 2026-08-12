"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Footer2 from "./components/Footer2";
import STitle from "./components/STitle";

export default function HomePage() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main className="landing-shell">
      <div className="page-width">
        <header
          className={`topbar${isNavScrolled ? " topbar--scrolled" : ""}${
            isMobileMenuOpen ? " topbar--menu-open" : ""
          }`}
        >
          <div className="topbar-inner">
            <a href="#" className="brand" aria-label="Active20">
              <Image
                src="/images/logo.png"
                alt="Active20"
                className="brand-logo"
                width={252}
                height={48}
                priority
              />
            </a>

            <button
              type="button"
              className="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-controls="primary-nav"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>

            <nav id="primary-nav" className="topnav" aria-label="Primary">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                HOW IT WORKS
              </a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                FRANCHIS
              </a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                ABOUT US
              </a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                OUR STUDIOS
              </a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                FAQS
              </a>
              <a
                href="#"
                className="pill-cta topnav-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BOOK A TRIAL
              </a>
            </nav>
          </div>
        </header>

        <section className="hero">
          <Image
            src="/images/holders/hero.png"
            alt="Athlete in EMS suit"
            className="hero-bg"
            width={0}
            height={0}
            sizes="100vw"
            priority
          />
          <div className="hero-copy">
            <h1>
              ADVANCED
              <br />
              FITNESS
              <br />
              CLUB
            </h1>
            <p>
              Fully personalised training designed to unlock your body&apos;s
              full potential. Achieve your fitness goals faster, smarter, and
              more efficiently.
            </p>
            <a href="#" className="dark-cta">
              BOOK A TRIAL
            </a>
          </div>
          <div className="hero-fade" />
        </section>

        <STitle
          sectionClassName="intro"
          description={
            <>
              Experience one of the world&apos;s most effective full-body
              workouts. ACTIVE20&apos;s advanced
              <span className="intro-highlight">
                {" "}
                Electro-Muscle Stimulation (EMS)
              </span>{" "}
              technology delivers the benefits of up to a 90-minute conventional
              workout in just 20 minutes.
            </>
          }
        />

        <section className="card-row">
          <article className="mini-card">
            <Image
              src="/images/holders/gentle-on-joints.webp"
              alt="Gentle on joints"
              fill
              sizes="(max-width: 900px) 33vw, 360px"
              style={{ objectFit: "cover" }}
            />
            <h3>GENTLE ON JOINTS</h3>
          </article>
          <article className="mini-card">
            <Image
              src="/images/holders/powerful-on-muscles.webp"
              alt="Powerful on muscles"
              fill
              sizes="(max-width: 900px) 33vw, 360px"
              style={{ objectFit: "cover" }}
            />
            <h3>POWERFUL ON MUSCLES</h3>
          </article>
          <article className="mini-card">
            <img
              src="/images/content-placeholder.svg"
              alt="Science backed results"
            />
            <h3>SCIENCE BACKED RESULTS</h3>
          </article>
        </section>

        <section className="how-it-works-section">
          <STitle
            sectionClassName="work-section"
            title="HOW DOES IT WORK"
            description="During an ACTIVE20 session, low-impact electrical impulses activate multiple muscle groups at once while you move through simple, guided exercises with your coach. This creates deeper, more complete muscle contractions, delivering a full-body workout in just 20 minutes with minimal joint stress."
          />

          <div className="banner-image">
            <Image
              src="/images/holders/how-it-works.webp"
              alt="Battle rope training"
              width={0}
              height={0}
              sizes="100vw"
            />
            <span className="play-ring" aria-hidden="true" />
          </div>
        </section>

        <section className="advanced-fitness-section">
          <STitle
            sectionClassName="section-title-only"
            title="ADVANCED FITNESS FOR EVERY BODY"
          />

          <div className="feature-banner">
            <img
              src="/images/holders/advance-fitness.webp"
              alt="Strength training with age"
            />
            <span>Those Building Strength with Age</span>
          </div>
        </section>

        <section className="ems-tech-section">
          <STitle
            sectionClassName="work-section ems-copy"
            title="THE EMS TECH"
            description="Wear a state-of-the-art EMS suit connected to a tablet-controlled system and guided by your certified coach. Every session is personalised in real time, with intensity, muscle activation, and training programmes precisely adjusted to match your body, fitness level, and goals."
          />

          <div className="tech-grid">
            <Image
              src="/images/holders/ems-tech1.webp"
              alt="EMS module close-up"
              width={0}
              height={0}
              sizes="(max-width: 900px) 33vw, 370px"
            />
            <Image
              src="/images/holders/ems-tech-2.webp"
              alt="EMS console"
              width={0}
              height={0}
              sizes="(max-width: 900px) 45vw, 540px"
            />
            <Image
              src="/images/holders/ems-tech-3.webp"
              alt="Resistance and EMS suit"
              width={0}
              height={0}
              sizes="(max-width: 900px) 33vw, 370px"
            />
            <Image
              src="/images/holders/ems-tech-4.webp"
              alt="EMS suit"
              width={0}
              height={0}
              sizes="(max-width: 900px) 33vw, 370px"
            />
          </div>
        </section>

        <section className="testimonials-section">
          <STitle
            sectionClassName="section-title-only testimonials-title"
            title="REAL PEOPLE. REAL PROGRESS."
          />

          <div className="quotes-row">
            <button
              type="button"
              className="arrow-btn"
              aria-label="Previous testimonial"
            >
              &lt;
            </button>
            <article className="quote-card">
              <p>
                &quot;Active 20 completely changed my perspective. The workouts
                are quick, challenging, and incredibly effective. After just a
                few weeks, I felt stronger, and noticed visible improvements in
                my fitness.&quot;
              </p>
              <strong>Sushant, Age 37</strong>
            </article>
            <article className="quote-card">
              <p>
                &quot;Active 20 completely changed my perspective. The workouts
                are quick, challenging, and incredibly effective. After just a
                few weeks, I felt stronger, and noticed visible improvements in
                my fitness.&quot;
              </p>
              <strong>Ananya, Age 28</strong>
            </article>
            <article className="quote-card">
              <p>
                &quot;Active 20 completely changed my perspective. The workouts
                are quick, challenging, and incredibly effective. After just a
                few weeks, I felt stronger, and noticed visible improvements in
                my fitness.&quot;
              </p>
              <strong>Girish, Age 52</strong>
            </article>
            <button
              type="button"
              className="arrow-btn"
              aria-label="Next testimonial"
            >
              &gt;
            </button>
          </div>
        </section>

        <Footer2 />
      </div>
    </main>
  );
}
