import Image from "next/image";
import Link from "next/link";

export default function Footer2() {
  return (
    <>
      <section className="trial-cta" aria-labelledby="trial-cta-title">
        <svg className="trial-cta-mark trial-cta-mark-left" viewBox="0 0 64 48" aria-hidden="true">
          <path d="M8 36c8-17 21-23 39-19M39 9l9 8-11 4" />
        </svg>
        <div className="trial-cta-copy">
          <h2 id="trial-cta-title">BOOK YOUR 30-MINUTE TRIAL</h2>
          <p>
            Meet your certified coach, try EMS training, and find the training
            style that fits your goals.
          </p>
          <Link href="/book-trial" className="trial-cta-button">
            Book a trial
          </Link>
        </div>
        <svg className="trial-cta-mark trial-cta-mark-right" viewBox="0 0 64 48" aria-hidden="true">
          <path d="M56 12c-8 17-21 23-39 19M25 39l-9-8 11-4" />
        </svg>
      </section>

      <footer className="site-footer">
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
              Coach-guided EMS training for a focused full-body workout in just
              20 minutes.
            </p>
          </div>

          <div className="site-footer-links">
            <nav aria-label="Explore">
              <h3>Explore</h3>
              <Link href="/#about">About Active20</Link>
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#training">Training</Link>
            </nav>
            <nav aria-label="Get started">
              <h3>Get started</h3>
              <Link href="/book-trial">Book a trial</Link>
              <Link href="/#testimonials">Testimonials</Link>
              <Link href="/">Home</Link>
            </nav>
            <nav aria-label="Legal">
              <h3>Legal</h3>
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/terms">Terms and conditions</Link>
            </nav>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Active20. All rights reserved.</p>
          <p>Twenty minutes. Full-body focus.</p>
        </div>
      </footer>
    </>
  );
}
