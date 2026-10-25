import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleHelp, MapPin, ShieldCheck } from "lucide-react";
import { PageHeader, Prose } from "@/components/site/Common";
import { buttonVariants } from "@/components/ui/button";
import { CITY } from "@/lib/catalog";

export type InfoPageKey = "about" | "contact" | "faq" | "help" | "how" | "privacy" | "safety";

const TITLES: Record<InfoPageKey, { title: string; intro: string }> = {
  about: {
    title: "About FindBack",
    intro: "A community lost-and-found concept, starting in St. John's.",
  },
  contact: {
    title: "Contact",
    intro: "A clear note about how to reach the people behind this prototype.",
  },
  faq: {
    title: "Questions & answers",
    intro: "The basics of finding, reporting, and returning an item.",
  },
  help: {
    title: "FindBack help",
    intro: "Get from a report to a safe return, one step at a time.",
  },
  how: {
    title: "How FindBack works",
    intro: "Post a useful report, compare possible matches, then coordinate carefully.",
  },
  privacy: {
    title: "Privacy notes",
    intro: "What this local prototype stores, and what it does not do.",
  },
  safety: {
    title: "Safety guidelines",
    intro: "Protect personal information and make returns in a safe way.",
  },
};

export function InfoPage({ page }: { page: InfoPageKey }) {
  const { title, intro } = TITLES[page];
  return (
    <>
      <PageHeader
        eyebrow={page === "safety" ? "Your safety comes first" : undefined}
        title={title}
        intro={intro}
      />
      {page === "about" && <AboutContent />}
      {page === "how" && <HowContent />}
      {page === "help" && <HelpContent />}
      {page === "faq" && <FaqContent />}
      {page === "safety" && <SafetyContent />}
      {page === "privacy" && <PrivacyContent />}
      {page === "contact" && <ContactContent />}
    </>
  );
}

function AboutContent() {
  return (
    <Prose>
      <p>
        FindBack is a local lost-and-found prototype designed to help neighbours connect around
        missing belongings. The sample board is set in {CITY} and includes example reports, matches,
        and conversations.
      </p>
      <p>
        The current version runs entirely in your browser. It demonstrates the user experience but
        does not publish reports to a shared service or connect people across devices.
      </p>
      <p>
        Useful reports share a clear description and a general area while keeping a private
        identifying detail for the real owner to confirm.
      </p>
      <Link to="/browse" className={buttonVariants()}>
        Browse reports <ArrowRight />
      </Link>
    </Prose>
  );
}

function HowContent() {
  return (
    <Prose>
      <ol className="space-y-5">
        {[
          [
            "Search first",
            "Browse recent reports by type, category, area, or keywords before creating a duplicate.",
          ],
          [
            "Post the essentials",
            "Choose lost or found, add a date and general location, then describe visible details.",
          ],
          [
            "Compare possible matches",
            "FindBack scores reports using item category, area, dates, and shared description words.",
          ],
          [
            "Verify and arrange safely",
            "Message privately, ask the owner to describe a detail that is not public, and meet in a staffed public place.",
          ],
        ].map(([heading, body], index) => (
          <li key={heading} className="ml-0 list-none border-l-4 border-primary pl-4">
            <span className="text-sm font-bold text-primary">STEP {index + 1}</span>
            <h2 className="mt-1">{heading}</h2>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p>
        Matching suggestions are only leads. They cannot confirm that two reports describe the same
        item.
      </p>
      <Link to="/report" className={buttonVariants()}>
        Report an item <ArrowRight />
      </Link>
    </Prose>
  );
}

function HelpContent() {
  return (
    <Prose>
      <p>
        Start with a search across open reports. If you do not see the item, post a report with the
        closest date and a neighbourhood or public landmark.
      </p>
      <h2>Writing a useful report</h2>
      <ul>
        <li>Use a clear item name and select the closest category.</li>
        <li>Share colour, shape, and visible features.</li>
        <li>Keep a serial number, engraving, or other proof of ownership private.</li>
      </ul>
      <h2>Updating your report</h2>
      <p>
        Sign in with a demo profile, open My reports, and change the status when the item has been
        returned or is no longer available.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/browse" className={buttonVariants({ variant: "outline" })}>
          Search reports
        </Link>
        <Link to="/safety" className={buttonVariants()}>
          Safety guidelines <ArrowRight />
        </Link>
      </div>
    </Prose>
  );
}

function FaqContent() {
  const questions = [
    [
      "Are these reports visible to everyone?",
      "In this prototype, reports are stored in your browser only. They are not sent to a shared website or visible to other users.",
    ],
    [
      "How are possible matches chosen?",
      "The demo compares category, general location, date proximity, colour words, and other shared description words. Scores are suggestions, not proof.",
    ],
    [
      "Can I post an exact address?",
      "No. Use a general neighbourhood or public place. Never put a home address, full ID number, password, or access code in a report.",
    ],
    [
      "Can I use real contact details?",
      "Avoid entering sensitive personal information. The demo does not send messages or email, but local browser data can still be seen by someone with access to this device.",
    ],
    [
      "Will my report appear on another device?",
      "No. This version has no shared backend. Its demo reports and profile remain in the current browser.",
    ],
  ];
  return (
    <Prose>
      <div className="space-y-3">
        {questions.map(([question, answer]) => (
          <details key={question} className="rounded-md border bg-card px-4 py-3">
            <summary className="cursor-pointer font-bold">{question}</summary>
            <p className="mt-3 text-muted-foreground">{answer}</p>
          </details>
        ))}
      </div>
      <Link to="/safety" className={buttonVariants({ className: "mt-6" })}>
        <ShieldCheck /> Safety guidelines
      </Link>
    </Prose>
  );
}

function SafetyContent() {
  return (
    <Prose>
      <div className="border-l-4 border-warning bg-warning-soft p-4">
        <p className="font-bold">A possible match is not proof of ownership.</p>
        <p className="mt-1">
          Keep one or two identifying details private and ask the claimant to describe them before
          arranging a return.
        </p>
      </div>
      <h2>Keep details private</h2>
      <ul>
        <li>
          Do not post full names from IDs, account numbers, serial numbers, passwords, or exact
          addresses.
        </li>
        <li>
          Use the in-app demo messages only for testing; they are saved on this device and are not a
          secure service.
        </li>
        <li>
          Do not share verification codes, payment details, or personal documents with someone
          claiming an item.
        </li>
      </ul>
      <h2>Plan a safe handoff</h2>
      <ul>
        <li>
          Choose a busy, well-lit public place during open hours, such as a staffed service desk.
        </li>
        <li>
          Bring someone with you if that feels safer, and tell a trusted person where you are going.
        </li>
        <li>
          For valuable property, consider handing it to local police, campus security, or the
          venue's official lost-and-found.
        </li>
      </ul>
      <h2>Trust your instincts</h2>
      <p>
        Stop communicating if someone pressures you, asks for money, or insists on meeting somewhere
        isolated. Contact local emergency services if you feel in immediate danger.
      </p>
    </Prose>
  );
}

function PrivacyContent() {
  return (
    <Prose>
      <p>
        This repository currently contains a frontend demo, not a connected account or listing
        service. The app stores demo profiles, reports, saved items, preferences, and messages in
        your browser's local storage.
      </p>
      <h2>What that means</h2>
      <ul>
        <li>Nothing is sent to a FindBack backend by this prototype.</li>
        <li>
          Local browser data may be visible to other people who use the same browser profile or
          device.
        </li>
        <li>
          Clearing site data or using Reset demo data removes or replaces the local demo state.
        </li>
        <li>Demo sign-in does not verify an email address or create a secure account.</li>
      </ul>
      <h2>Before real launch</h2>
      <p>
        A production service would need a privacy notice describing its actual storage, retention,
        security, and deletion practices. Do not use this prototype for sensitive personal
        information.
      </p>
    </Prose>
  );
}

function ContactContent() {
  return (
    <Prose>
      <div className="flex items-start gap-3 border-l-4 border-primary bg-secondary p-4">
        <CircleHelp className="mt-1 size-5 shrink-0 text-primary" />
        <p>
          This prototype does not have a support inbox or send contact forms. No one will receive a
          message submitted here.
        </p>
      </div>
      <h2>Need help with the demo?</h2>
      <p>
        Use the built-in help pages for reporting and safety guidance. If you are trying out the
        product, sample conversations and reports stay in this browser.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/help" className={buttonVariants({ variant: "outline" })}>
          Help centre
        </Link>
        <Link to="/browse" className={buttonVariants()}>
          <MapPin /> Browse reports
        </Link>
      </div>
    </Prose>
  );
}
