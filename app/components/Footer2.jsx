import MapBackground from "./MapBackground";

export default function Footer2() {
  return (
    <section className="relative -mx-[calc(50vw-50%)] flex w-screen flex-col overflow-hidden bg-transparent px-4 pb-0 pt-[clamp(3rem,7vw,5.5rem)] max-[899px]:pt-[2.2rem]">
      <MapBackground />

      <div className="relative z-[2] mx-auto w-full max-w-[48rem] text-center max-[899px]:max-w-[22rem]">
        <h2 className="m-0 text-[clamp(1.55rem,4.2vw,3.05rem)] leading-none tracking-[0.015em] text-[#80c5d5] [font-family:var(--font-new-science-extended)] max-[899px]:text-[clamp(1.3rem,8.2vw,2rem)]">
          FIND A STUDIO NEAR YOU TODAY
        </h2>
        <p className="mx-auto mt-[clamp(0.55rem,1.2vw,0.9rem)] max-w-[34rem] text-[clamp(0.68rem,1.02vw,0.9rem)] leading-[1.35] text-[#aebfc9] [font-family:var(--font-familjen)] max-[899px]:max-w-[18rem]">
          Get moving with ACTIVE20. Fast, personalised sessions designed to fit
          your lifestyle and goals.
        </p>
        <a
          href="#"
          className="mt-[clamp(0.8rem,1.5vw,1rem)] inline-flex min-h-[clamp(2rem,2.5vw,2.5rem)] items-center justify-center rounded-full bg-[#e8fb76] px-[1.2rem] py-[0.5rem] text-[clamp(0.66rem,0.86vw,0.82rem)] font-bold tracking-[0.06em] text-[#111]"
          aria-label="Find a studio"
        >
          FIND A STUDIO
        </a>
      </div>

      <nav
        className="relative z-[2] mt-[clamp(2rem,4vw,3rem)] flex flex-wrap justify-center gap-[clamp(0.9rem,2.4vw,1.8rem)] max-[899px]:mt-[1.3rem] max-[899px]:gap-x-[1rem] max-[899px]:gap-y-[0.6rem]"
        aria-label="Footer links"
      >
        <a
          href="#"
          className="text-[clamp(0.68rem,0.9vw,0.84rem)] text-[#a9b2b9]"
        >
          Home
        </a>
        <a
          href="#"
          className="text-[clamp(0.68rem,0.9vw,0.84rem)] text-[#a9b2b9]"
        >
          About
        </a>
        <a
          href="#"
          className="text-[clamp(0.68rem,0.9vw,0.84rem)] text-[#a9b2b9]"
        >
          Feature
        </a>
        <a
          href="#"
          className="text-[clamp(0.68rem,0.9vw,0.84rem)] text-[#a9b2b9]"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-[clamp(0.68rem,0.9vw,0.84rem)] text-[#a9b2b9]"
        >
          Blog
        </a>
      </nav>

      <p
        className="relative z-[2] mt-auto w-full max-w-full overflow-hidden whitespace-nowrap px-[clamp(0.25rem,1vw,0.8rem)] pt-[clamp(1rem,2.2vw,2rem)] text-center text-[clamp(2rem,12.4vw,11rem)] font-extrabold leading-[0.84] tracking-[clamp(0rem,0.04vw,0.05rem)] text-[rgba(210,223,234,0.2)] max-[899px]:mt-[1.15rem] max-[899px]:text-[clamp(1.7rem,11.6vw,5.2rem)] max-[899px]:tracking-[0]"
        aria-hidden="true"
      >
        ACTIVE20
      </p>
    </section>
  );
}
