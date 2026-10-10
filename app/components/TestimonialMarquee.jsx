const TESTIMONIALS = [
  {
    id: "sushant",
    quote:
      "Active20 made training feel easy to stick with. The workouts are fast, focused, and I noticed meaningful strength gains within weeks. It finally fits my schedule without compromising results.",
    name: "Sushant, Age 37",
    initials: "SU",
  },
  {
    id: "ananya",
    quote:
      "The coaching and EMS pairing has been incredible. I get a full-body session in just 20 minutes and still feel challenged every time. Recovery is smoother and my energy is better all week.",
    name: "Ananya, Age 28",
    initials: "AN",
  },
  {
    id: "girish",
    quote:
      "I expected it to be a trend, but the progress has been very real. The sessions are efficient, my posture improved, and I feel stronger without putting unnecessary stress on my joints.",
    name: "Girish, Age 52",
    initials: "GI",
  },
  {
    id: "rahul",
    quote:
      "Active20 keeps me consistent in a way no gym plan ever did. Short sessions, expert guidance, and visible improvement made it easy to build a routine I actually enjoy.",
    name: "Rahul, Age 41",
    initials: "RK",
  },
  {
    id: "meera",
    quote:
      "I joined with lower back concerns and was surprised by how controlled every movement felt. My coach adjusted intensity each week, and I can now train consistently without flare-ups.",
    name: "Meera, Age 46",
    initials: "ME",
  },
  {
    id: "arjun",
    quote:
      "As a founder, time is always tight. Active20 gave me a practical routine that actually fits my calendar. The 20-minute format is efficient, and the strength improvements are clear.",
    name: "Arjun, Age 34",
    initials: "AR",
  },
  {
    id: "naina",
    quote:
      "I wanted better muscle tone without long gym sessions. Within the first month, I noticed better definition and stamina. The structure keeps me motivated week after week.",
    name: "Naina, Age 31",
    initials: "NA",
  },
  {
    id: "dev",
    quote:
      "From day one, the coaching felt premium and personal. The session quality is consistent, the effort feels focused, and recovery has been far better than my old routine.",
    name: "Dev, Age 39",
    initials: "DE",
  },
  {
    id: "isha",
    quote:
      "I came in looking for a smarter routine, and the accountability here made all the difference. The sessions are short, progress is measurable, and I feel stronger in daily life.",
    name: "Isha, Age 33",
    initials: "IS",
  },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(145deg, #e8fb76 0%, #8fd4cf 100%)",
  "linear-gradient(160deg, #d9f6ea 0%, #7ec8d6 100%)",
  "linear-gradient(200deg, #f4f8c8 0%, #9fd0e2 100%)",
  "linear-gradient(145deg, #e7eef3 0%, #b7d4c8 100%)",
  "linear-gradient(180deg, #e8fb76 0%, #b7e3c4 100%)",
  "linear-gradient(145deg, #dceef6 0%, #8ec4d4 100%)",
  "linear-gradient(210deg, #f6f3d2 0%, #8ec9c4 100%)",
  "linear-gradient(145deg, #e4f6ef 0%, #7eb8c9 100%)",
  "linear-gradient(160deg, #eef6d8 0%, #a9d0d4 100%)",
];

function memberIdentity(name) {
  const match = /^(.+?),\s*Age\s+(\d+)\s*$/.exec(name);
  if (!match) {
    return { displayName: name, ageLabel: null };
  }
  return { displayName: match[1], ageLabel: `Age ${match[2]}` };
}

function Stars() {
  return (
    <div className="testimonial-card-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className="testimonial-star"
          viewBox="0 0 20 20"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M10 1.55 12.47 6.9l5.86.52-4.46 3.84 1.38 5.74L10 14.16 4.75 17l1.38-5.74L1.67 7.42l5.86-.52L10 1.55Z"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  const { displayName, ageLabel } = memberIdentity(testimonial.name);

  return (
    <article className="testimonial-card">
      <header className="testimonial-card-header">
        <span
          className="testimonial-card-avatar"
          style={{ backgroundImage: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
          aria-hidden="true"
        >
          {testimonial.initials}
        </span>
        <div>
          <strong className="testimonial-card-name">
            {displayName}
            {ageLabel ? (
              <span className="testimonial-card-age">{ageLabel}</span>
            ) : null}
          </strong>
          <span className="testimonial-card-role">Active20 Member</span>
        </div>
      </header>
      <p className="testimonial-card-quote">{testimonial.quote}</p>
      <Stars />
    </article>
  );
}

function MarqueeRow({ testimonials, direction }) {
  const copies = [testimonials, testimonials];

  return (
    <div className="testimonial-marquee-viewport">
      <div
        className="testimonial-marquee-track"
        data-direction={direction}
      >
        {copies.map((copy, copyIndex) => (
          <div
            key={copyIndex}
            className="testimonial-marquee-group"
            aria-hidden={copyIndex === 1 ? "true" : undefined}
          >
            {copy.map((testimonial) => (
              <TestimonialCard
                key={`${testimonial.id}-${copyIndex}`}
                testimonial={testimonial}
                index={TESTIMONIALS.findIndex((item) => item.id === testimonial.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialMarquee() {
  const topRow = TESTIMONIALS.filter((_, index) => index % 2 === 0);
  const bottomRow = TESTIMONIALS.filter((_, index) => index % 2 === 1);

  return (
    <section className="testimonial-marquee" aria-labelledby="testimonials-heading">
      <header className="testimonial-marquee-heading">
        <p className="testimonial-marquee-eyebrow">Testimonials</p>
        <h2 id="testimonials-heading" className="testimonial-marquee-title">
          REAL PEOPLE. REAL PROGRESS.
        </h2>
      </header>
      <div className="testimonial-marquee-bleed">
        <div className="testimonial-marquee-rows" tabIndex={0}>
          <MarqueeRow testimonials={topRow} direction="left" />
          <MarqueeRow testimonials={bottomRow} direction="right" />
        </div>
      </div>
    </section>
  );
}
