import Image from "next/image";
import Link from "next/link";
import { TitleReveal } from "./Reveal";

const FOOTER_LINKS = [
  [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Active20" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#training", label: "Training" },
    { href: "/#faq", label: "FAQs" },
  ],
  [
    { href: "/book-trial", label: "Book a trial" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/terms", label: "Terms and conditions" },
  ],
];

export default function Footer2() {
  return (
    <section className="site-close" aria-labelledby="trial-cta-title">
      <div className="trial-cta">
        <div className="trial-cta-copy">
          <TitleReveal id="trial-cta-title">
            Still thinking about it?
            <br />
            Book a trial
          </TitleReveal>
          <p>
            Meet your certified coach, try EMS training, and find the style
            that fits your goals.
          </p>
          <Link href="/book-trial" className="trial-cta-button">
            Book a trial
          </Link>
        </div>
      </div>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-main">
            <div className="site-footer-brand">
              <Link href="/" aria-label="Active20 home">
                <Image
                  src="/images/logo.png"
                  alt="Active20"
                  width={252}
                  height={48}
                  className="site-footer-logo"
                />
              </Link>
              <p>
                Coach-guided EMS training for a focused full-body workout in
                just 20 minutes.
              </p>
              <a className="site-footer-mail" href="mailto:team@active20.com">
                <Mail />
                team@active20.com
              </a>
            </div>

            <div className="site-footer-links">
              {FOOTER_LINKS.map((column) => (
                <nav key={column[0].href} aria-label={column[0].label}>
                  {column.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              ))}
            </div>
          </div>

          <div className="site-footer-bottom">
            <p>© 2026 Active20. All rights reserved.</p>
            <p>Twenty minutes. Full-body focus.</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

function Mail() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
      <rect
        x="1.4"
        y="3"
        width="12.2"
        height="9"
        rx="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M2 4.2 7.5 8.1 13 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
