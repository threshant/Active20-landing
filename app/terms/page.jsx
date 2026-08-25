import LegalPageLayout, {
  LegalContactEmail,
  LegalList,
  LegalParagraph,
  LegalSection,
} from "../components/LegalPageLayout";

export const metadata = {
  title: "Terms and Conditions | Active20",
  description:
    "Read the terms and conditions governing your use of Active20 services and website.",
};

const lastUpdated = "August 25, 2026";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions" lastUpdated={lastUpdated}>
      <LegalSection title="Acceptance of Terms">
        <LegalParagraph>
          These Terms and Conditions (&quot;Terms&quot;) govern your access to and
          use of the Active20 website, studios, programmes, and related services
          (collectively, the &quot;Services&quot;). By accessing or using our
          Services, you agree to be bound by these Terms. If you do not agree, you
          must not use our Services.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Services">
        <LegalParagraph>
          Active20 provides advanced fitness training services, including
          Electro-Muscle Stimulation (EMS) sessions, coaching, and studio-based
          programmes. Session availability, formats, and pricing may vary by
          location and are subject to change.
        </LegalParagraph>
        <LegalParagraph>
          We reserve the right to modify, suspend, or discontinue any part of the
          Services at any time without prior notice, except where required by
          applicable law.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Membership and Booking">
        <LegalParagraph>
          Bookings, memberships, and trial sessions are subject to studio capacity,
          scheduling, and eligibility requirements. You agree to provide accurate
          information when registering or booking and to keep your account details
          up to date.
        </LegalParagraph>
        <LegalParagraph>
          Missed sessions, late cancellations, and no-shows may be subject to
          studio-specific policies, including fees or forfeiture of sessions, as
          communicated at the time of booking or membership enrolment.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Health and Safety">
        <LegalParagraph>
          You acknowledge that physical training and EMS sessions involve inherent
          risks. You represent that you are physically able to participate and
          that you have disclosed any relevant medical conditions, injuries, or
          concerns to your coach.
        </LegalParagraph>
        <LegalParagraph>
          Active20 does not provide medical advice. You should consult a qualified
          healthcare professional before beginning any new exercise programme,
          especially if you are pregnant, recovering from injury, or have a medical
          condition.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Payments and Refunds">
        <LegalParagraph>
          Fees for memberships, packages, and individual sessions are due as stated
          at the time of purchase. Payments may be processed through third-party
          payment providers subject to their terms.
        </LegalParagraph>
        <LegalParagraph>
          Refund and cancellation policies vary by product and studio location.
          Unless otherwise required by law, purchases are generally non-refundable
          once services have been delivered or sessions have expired.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="User Conduct">
        <LegalParagraph>
          When using our Services, you agree not to:
        </LegalParagraph>
        <LegalList
          items={[
            "Provide false, misleading, or incomplete information",
            "Interfere with the operation or security of our website or studios",
            "Harass, abuse, or harm staff, coaches, or other members",
            "Use our Services for any unlawful or unauthorised purpose",
            "Copy, reproduce, or exploit our content without permission",
          ]}
        />
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <LegalParagraph>
          All content on the Active20 website and within our studios—including
          branding, logos, text, images, videos, and training materials—is owned by
          or licensed to Active20 and is protected by applicable intellectual
          property laws. You may not use our content without prior written consent.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <LegalParagraph>
          To the fullest extent permitted by law, Active20 and its affiliates,
          directors, employees, and partners shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from your
          use of the Services.
        </LegalParagraph>
        <LegalParagraph>
          Our total liability for any claim relating to the Services shall not
          exceed the amount you paid to Active20 for the specific service giving
          rise to the claim during the twelve (12) months preceding the event.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Governing Law">
        <LegalParagraph>
          These Terms shall be governed by and construed in accordance with the
          laws applicable in the jurisdiction in which the relevant Active20 studio
          or entity operates, without regard to conflict of law principles.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <LegalParagraph>
          We may revise these Terms at any time by posting an updated version on
          this page. Material changes will be indicated by updating the &quot;Last
          updated&quot; date. Your continued use of the Services after changes
          become effective constitutes acceptance of the revised Terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Contact Us">
        <LegalParagraph>
          For questions about these Terms and Conditions, please contact us at{" "}
          <LegalContactEmail />.
        </LegalParagraph>
      </LegalSection>
    </LegalPageLayout>
  );
}
