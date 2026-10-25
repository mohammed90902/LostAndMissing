import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, LogIn, MessageCircle, Send, Settings2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { DemoNote, EmptyState, PageHeader } from "@/components/site/Common";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatTime } from "@/lib/format";
import { isEmail } from "@/lib/validation";
import { actions, useAppState } from "@/lib/store";
import { localizeDemoMessage, localizeListing, useI18n } from "@/lib/i18n";

export function SignInPage() {
  const { user } = useAppState();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEmail(email)) {
      setError(t("Enter a valid email address."));
      return;
    }
    actions.signIn(name.trim(), email.trim());
    toast.success(t("Demo profile ready"));
    navigate({ to: "/profile" });
  }

  if (user) {
    return (
      <div className="container-app max-w-xl py-12">
        <EmptyState
          icon={UserRound}
          title={`${t("You're signed in as")} ${user.name}`}
          action={
            <Link to="/profile" className={buttonVariants()}>
              {t("View profile")}
            </Link>
          }
        >
          {t("This is a local demo profile. It is saved only in this browser.")}
        </EmptyState>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={t("Sign in to FindBack")}
        intro={t("Create a local demo profile to manage reports and messages.")}
      />
      <div className="container-app max-w-xl py-8">
        <DemoNote className="mb-5">
          {t(
            "This prototype does not verify your identity or send credentials to a server. Use any email-shaped address for the local demo.",
          )}
        </DemoNote>
        <form onSubmit={submit} className="surface space-y-5 p-5 sm:p-7">
          <div>
            <label htmlFor="signin-name" className="field-label">
              {t("Name")}{" "}
              <span className="font-normal text-muted-foreground">{t("(optional)")}</span>
            </label>
            <input
              id="signin-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={50}
              autoComplete="name"
              className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
              placeholder={t("How should we address you?")}
            />
          </div>
          <div>
            <label htmlFor="signin-email" className="field-label">
              {t("Email")}
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              autoComplete="email"
              required
              aria-invalid={Boolean(error)}
              className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
              placeholder={t("you@example.com")}
            />
            {error && (
              <p className="mt-1 text-sm font-semibold text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            <LogIn /> {t("Continue with demo profile")}
          </Button>
        </form>
      </div>
    </>
  );
}

export function ProfilePage() {
  const { user, listings, conversations } = useAppState();
  const { language, t } = useI18n();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [error, setError] = useState("");
  const mine = user ? listings.filter((listing) => listing.ownerId === user.id).length : 0;

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user?.name, user?.email]);

  if (!user) return <SignInPrompt />;

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEmail(email)) {
      setError(t("Enter a valid email address."));
      return;
    }
    actions.updateProfile({ name: name.trim() || "FindBack member", email: email.trim() });
    toast.success(t("Profile updated"));
    setError("");
  }

  return (
    <>
      <PageHeader
        title={t("Your profile")}
        intro={t("Update the name and email used in this local demo.")}
      />
      <div className="container-app grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <form onSubmit={saveProfile} className="surface space-y-5 p-5 sm:p-7">
          <div>
            <label htmlFor="profile-name" className="field-label">
              {t("Name")}
            </label>
            <input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={50}
              className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
            />
          </div>
          <div>
            <label htmlFor="profile-email" className="field-label">
              {t("Email")}
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
            />
            {error && (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
          <Button type="submit">
            <Check /> {t("Save changes")}
          </Button>
        </form>
        <aside className="surface p-5">
          <p className="font-display text-lg font-bold">{t("Your activity")}</p>
          <dl className="mt-4 divide-y">
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">{t("Reports")}</dt>
              <dd className="font-bold">{mine}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">{t("Conversations")}</dt>
              <dd className="font-bold">{conversations.length}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">{t("Joined")}</dt>
              <dd className="font-bold">
                {new Date(user.joinedAt).toLocaleDateString(language === "fr" ? "fr-CA" : "en-CA", {
                  month: "short",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>
          <Link
            to="/my-reports"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-primary underline"
          >
            {t("View my reports")} <ArrowRight className="size-4" />
          </Link>
        </aside>
      </div>
    </>
  );
}

function SignInPrompt() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader
        title={t("Your profile")}
        intro={t("Sign in to manage your reports and demo profile.")}
      />
      <div className="container-app max-w-xl py-8">
        <EmptyState
          icon={UserRound}
          title={t("Sign in to view your profile")}
          action={
            <Link to="/signin" className={buttonVariants()}>
              {t("Create demo profile")}
            </Link>
          }
        >
          {t("This prototype keeps profile information in this browser only.")}
        </EmptyState>
      </div>
    </>
  );
}

export function SettingsPage() {
  const { preferences } = useAppState();
  const { t } = useI18n();
  const settings = [
    {
      key: "emailUpdates" as const,
      title: "Email updates",
      description: "Allow the demo to show email update preferences.",
    },
    {
      key: "matchAlerts" as const,
      title: "Possible match alerts",
      description: "Keep match alerts enabled for this local prototype.",
    },
    {
      key: "largeText" as const,
      title: "Larger text",
      description: "Increase the text size across the app.",
    },
  ];
  return (
    <>
      <PageHeader
        title={t("Settings")}
        intro={t("Choose how the local prototype behaves in this browser.")}
      />
      <div className="container-app max-w-3xl space-y-4 py-8">
        <DemoNote>
          {t(
            "These settings are stored locally and do not control real email delivery or notifications.",
          )}
        </DemoNote>
        <div className="surface divide-y px-5">
          {settings.map((setting) => (
            <label
              key={setting.key}
              className="flex min-h-20 cursor-pointer items-center justify-between gap-5 py-4"
            >
              <span>
                <span className="block font-bold">{t(setting.title)}</span>
                <span className="block text-sm text-muted-foreground">
                  {t(setting.description)}
                </span>
              </span>
              <input
                type="checkbox"
                checked={preferences[setting.key]}
                onChange={(event) =>
                  actions.updatePreferences({ [setting.key]: event.target.checked })
                }
                className="size-5 shrink-0 accent-primary"
              />
            </label>
          ))}
        </div>
        <section className="surface flex items-center justify-between gap-4 p-5">
          <span>
            <span className="block font-bold">{t("Reset demo data")}</span>
            <span className="text-sm text-muted-foreground">
              {t("Restore the original sample reports and preferences.")}
            </span>
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              actions.resetDemo();
              toast.success(t("Demo data reset"));
            }}
          >
            {t("Reset")}
          </Button>
        </section>
        <Link to="/privacy" className="inline-flex items-center gap-2 text-primary underline">
          <Settings2 className="size-4" /> {t("Read the demo privacy notes")}
        </Link>
      </div>
    </>
  );
}

export function MessagesPage() {
  const { conversations, listings } = useAppState();
  const { language, t } = useI18n();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const selected =
    conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const listing = selected ? listings.find((item) => item.id === selected.listingId) : undefined;

  useEffect(() => {
    if (selected?.unread) actions.markRead(selected.id);
  }, [selected?.id, selected?.unread]);

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!selected || !body || selected.blocked) return;
    actions.sendMessage(selected.id, body);
    setDraft("");
  }

  return (
    <>
      <PageHeader
        title={t("Messages")}
        intro={t("Coordinate a safe return without sharing personal details publicly.")}
      />
      <div className="container-app py-8">
        <DemoNote className="mb-5">
          {t(
            "Messages are stored only in this browser. This is not a private or server-backed messaging service.",
          )}
        </DemoNote>
        {conversations.length ? (
          <section
            className="grid overflow-hidden rounded-lg border bg-card md:min-h-136 md:grid-cols-[17rem_minmax(0,1fr)]"
            aria-label={t("Conversations")}
          >
            <nav className="border-b md:border-b-0 md:border-r" aria-label={t("Conversation list")}>
              <h2 className="border-b px-4 py-3 font-bold">{t("Your conversations")}</h2>
              <ul className="max-h-64 overflow-y-auto md:max-h-136">
                {conversations.map((conversation) => {
                  const item = listings.find((report) => report.id === conversation.listingId);
                  const latest = conversation.messages.at(-1);
                  return (
                    <li key={conversation.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(conversation.id);
                          setDraft("");
                        }}
                        aria-current={selected?.id === conversation.id ? "true" : undefined}
                        className={`w-full border-b px-4 py-3 text-left hover:bg-muted ${selected?.id === conversation.id ? "bg-secondary" : ""}`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate font-bold">{conversation.otherName}</span>
                          {conversation.unread > 0 && (
                            <span className="grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                              {conversation.unread}
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block truncate text-sm text-muted-foreground">
                          {item
                            ? localizeListing(item, language).title
                            : t("Report no longer available")}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {latest
                            ? localizeDemoMessage(latest.id, latest.body, language)
                            : t("No messages yet")}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            {selected ? (
              <div className="flex min-h-104 min-w-0 flex-col">
                <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-bold">{selected.otherName}</h2>
                    {listing && (
                      <Link
                        to="/items/$id"
                        params={{ id: listing.id }}
                        className="truncate text-sm text-primary underline"
                      >
                        {localizeListing(listing, language).title}
                      </Link>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      actions.setBlocked(selected.id, !selected.blocked);
                      toast.success(
                        t(selected.blocked ? "Conversation unblocked" : "Conversation blocked"),
                      );
                    }}
                  >
                    {t(selected.blocked ? "Unblock" : "Block")}
                  </Button>
                </header>
                <ol className="flex-1 space-y-3 overflow-y-auto p-4" aria-label={t("Messages")}>
                  {selected.messages.map((message) => (
                    <li
                      key={message.id}
                      className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${message.fromMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p className="whitespace-pre-wrap wrap-break-word">
                          {localizeDemoMessage(message.id, message.body, language)}
                        </p>
                        <time className="mt-1 block text-right text-xs opacity-70">
                          {formatTime(message.sentAt, language)}
                        </time>
                      </div>
                    </li>
                  ))}
                  {selected.messages.length === 0 && (
                    <li className="py-10 text-center text-muted-foreground">
                      {t("Start with a polite question about the report.")}
                    </li>
                  )}
                </ol>
                <form onSubmit={send} className="flex gap-2 border-t p-3">
                  <label htmlFor="message-draft" className="sr-only">
                    {t("Write a message")}
                  </label>
                  <input
                    id="message-draft"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    disabled={selected.blocked}
                    maxLength={1000}
                    placeholder={
                      selected.blocked ? t("This conversation is blocked") : t("Write a message")
                    }
                    className="h-12 min-w-0 flex-1 rounded-md border border-input bg-background px-3"
                  />
                  <Button
                    type="submit"
                    disabled={!draft.trim() || selected.blocked}
                    aria-label={t("Send message")}
                  >
                    <Send />
                  </Button>
                </form>
              </div>
            ) : null}
          </section>
        ) : (
          <EmptyState icon={MessageCircle} title={t("No conversations yet")}>
            {t("Open a report and choose “Message reporter” to start a conversation.")}
          </EmptyState>
        )}
      </div>
    </>
  );
}
