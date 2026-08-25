import LegalPageLayout, {
  LegalContactEmail,
  LegalList,
  LegalParagraph,
  LegalSection,
} from "../components/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy | Active20",
  description:
    "Learn how Active20 collects, uses, and protects your personal information.",
};

const lastUpdated = "August 25, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={lastUpdated}>
      <LegalSection title="Introduction">
        <LegalParagraph>
          Active20 (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
          your privacy and is committed to protecting the personal information you
          share with us. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website, book sessions,
          or interact with our studios and services.
        </LegalParagraph>
        <LegalParagraph>
          By using our website or services, you agree to the collection and use of
          information in accordance with this policy. If you do not agree, please
          discontinue use of our services.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <LegalParagraph>
          We may collect information that you provide directly to us, including:
        </LegalParagraph>
        <LegalList
          items={[
            "Name, email address, phone number, and contact details",
            "Account, membership, and booking information",
            "Health, fitness, and training-related information you choose to share",
            "Payment and billing details processed through secure third-party providers",
            "Communications you send to us, including support requests and feedback",
          ]}
        />
        <LegalParagraph>
          We may also automatically collect certain technical information when you
          visit our website, such as IP address, browser type, device information,
          pages viewed, and usage data through cookies and similar technologies.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <LegalParagraph>
          We use the information we collect for purposes including:
        </LegalParagraph>
        <LegalList
          items={[
            "Providing, operating, and improving our fitness services and studios",
            "Processing bookings, memberships, and payments",
            "Personalising training programmes and customer communications",
            "Responding to inquiries and providing customer support",
            "Sending service-related updates, reminders, and promotional content where permitted",
            "Monitoring website performance, security, and legal compliance",
          ]}
        />
      </LegalSection>

      <LegalSection title="Sharing of Information">
        <LegalParagraph>
          We do not sell your personal information. We may share information with
          trusted service providers who assist us in operating our business, such
          as payment processors, booking platforms, email providers, and analytics
          partners. These providers are required to protect your information and
          use it only for the services they perform on our behalf.
        </LegalParagraph>
        <LegalParagraph>
          We may also disclose information if required by law, to protect our
          rights, or in connection with a business transfer such as a merger or
          acquisition.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Data Security">
        <LegalParagraph>
          We implement reasonable administrative, technical, and organisational
          measures designed to protect your personal information against
          unauthorised access, loss, misuse, or alteration. However, no method of
          transmission over the internet or electronic storage is completely
          secure, and we cannot guarantee absolute security.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Your Rights">
        <LegalParagraph>
          Depending on your location, you may have rights to access, correct,
          update, delete, or restrict the processing of your personal information,
          as well as the right to withdraw consent where processing is based on
          consent. To exercise these rights, please contact us using the details
          below.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Cookies">
        <LegalParagraph>
          Our website may use cookies and similar technologies to enhance your
          experience, analyse traffic, and remember your preferences. You can
          control cookies through your browser settings, though disabling cookies
          may affect certain site functionality.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <LegalParagraph>
          We may update this Privacy Policy from time to time. Any changes will be
          posted on this page with an updated effective date. Your continued use of
          our services after changes are posted constitutes acceptance of the
          revised policy.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Contact Us">
        <LegalParagraph>
          If you have questions about this Privacy Policy or how we handle your
          personal information, please contact us at{" "}
          <LegalContactEmail />.
        </LegalParagraph>
      </LegalSection>
    </LegalPageLayout>
  );
}
