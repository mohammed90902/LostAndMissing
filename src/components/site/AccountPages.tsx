import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, LogIn, MessageCircle, Send, Settings2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { DemoNote, EmptyState, PageHeader } from "@/components/site/Common";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatTime } from "@/lib/format";
import { isEmail } from "@/lib/validation";
import { actions, useAppState } from "@/lib/store";

export function SignInPage() {
  const { user } = useAppState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    actions.signIn(name.trim(), email.trim());
    toast.success("Demo profile ready");
    navigate({ to: "/profile" });
  }

  if (user) {
    return (
      <div className="container-app max-w-xl py-12">
        <EmptyState
          icon={UserRound}
          title={`You're signed in as ${user.name}`}
          action={
            <Link to="/profile" className={buttonVariants()}>
              View profile
            </Link>
          }
        >
          This is a local demo profile. It is saved only in this browser.
        </EmptyState>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Sign in to FindBack"
        intro="Create a local demo profile to manage reports and messages."
      />
      <div className="container-app max-w-xl py-8">
        <DemoNote className="mb-5">
          This prototype does not verify your identity or send credentials to a server. Use any
          email-shaped address for the local demo.
        </DemoNote>
        <form onSubmit={submit} className="surface space-y-5 p-5 sm:p-7">
          <div>
            <label htmlFor="signin-name" className="field-label">
              Name <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <input
              id="signin-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={50}
              autoComplete="name"
              className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
              placeholder="How should we address you?"
            />
          </div>
          <div>
            <label htmlFor="signin-email" className="field-label">
              Email
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
              placeholder="you@example.com"
            />
            {error && (
              <p className="mt-1 text-sm font-semibold text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            <LogIn /> Continue with demo profile
          </Button>
        </form>
      </div>
    </>
  );
}

export function ProfilePage() {
  const { user, listings, conversations } = useAppState();
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
      setError("Enter a valid email address.");
      return;
    }
    actions.updateProfile({ name: name.trim() || "FindBack member", email: email.trim() });
    toast.success("Profile updated");
    setError("");
  }

  return (
    <>
      <PageHeader title="Your profile" intro="Update the name and email used in this local demo." />
      <div className="container-app grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <form onSubmit={saveProfile} className="surface space-y-5 p-5 sm:p-7">
          <div>
            <label htmlFor="profile-name" className="field-label">
              Name
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
              Email
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
            <Check /> Save changes
          </Button>
        </form>
        <aside className="surface p-5">
          <p className="font-display text-lg font-bold">Your activity</p>
          <dl className="mt-4 divide-y">
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Reports</dt>
              <dd className="font-bold">{mine}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Conversations</dt>
              <dd className="font-bold">{conversations.length}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Joined</dt>
              <dd className="font-bold">
                {new Date(user.joinedAt).toLocaleDateString("en-CA", {
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
            View my reports <ArrowRight className="size-4" />
          </Link>
        </aside>
      </div>
    </>
  );
}

function SignInPrompt() {
  return (
    <div className="container-app max-w-xl py-12">
      <EmptyState
        icon={UserRound}
        title="Sign in to view your profile"
        action={
          <Link to="/signin" className={buttonVariants()}>
            Create demo profile
          </Link>
        }
      >
        This prototype keeps profile information in this browser only.
      </EmptyState>
    </div>
  );
}

export function SettingsPage() {
  const { preferences } = useAppState();
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
        title="Settings"
        intro="Choose how the local prototype behaves in this browser."
      />
      <div className="container-app max-w-3xl space-y-4 py-8">
        <DemoNote>
          These settings are stored locally and do not control real email delivery or notifications.
        </DemoNote>
        <div className="surface divide-y px-5">
          {settings.map((setting) => (
            <label
              key={setting.key}
              className="flex min-h-20 cursor-pointer items-center justify-between gap-5 py-4"
            >
              <span>
                <span className="block font-bold">{setting.title}</span>
                <span className="block text-sm text-muted-foreground">{setting.description}</span>
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
            <span className="block font-bold">Reset demo data</span>
            <span className="text-sm text-muted-foreground">
              Restore the original sample reports and preferences.
            </span>
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              actions.resetDemo();
              toast.success("Demo data reset");
            }}
          >
            Reset
          </Button>
        </section>
        <Link to="/privacy" className="inline-flex items-center gap-2 text-primary underline">
          <Settings2 className="size-4" /> Read the demo privacy notes
        </Link>
      </div>
    </>
  );
}

export function MessagesPage() {
  const { conversations, listings } = useAppState();
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
        title="Messages"
        intro="Coordinate a safe return without sharing personal details publicly."
      />
      <div className="container-app py-8">
        <DemoNote className="mb-5">
          Messages are stored only in this browser. This is not a private or server-backed messaging
          service.
        </DemoNote>
        {conversations.length ? (
          <section
            className="grid overflow-hidden rounded-lg border bg-card md:min-h-136 md:grid-cols-[17rem_minmax(0,1fr)]"
            aria-label="Conversations"
          >
            <nav className="border-b md:border-b-0 md:border-r" aria-label="Conversation list">
              <h2 className="border-b px-4 py-3 font-bold">Your conversations</h2>
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
                          {item?.title ?? "Report no longer available"}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {latest?.body ?? "No messages yet"}
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
                        {listing.title}
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
                        selected.blocked ? "Conversation unblocked" : "Conversation blocked",
                      );
                    }}
                  >
                    {selected.blocked ? "Unblock" : "Block"}
                  </Button>
                </header>
                <ol className="flex-1 space-y-3 overflow-y-auto p-4" aria-label="Messages">
                  {selected.messages.map((message) => (
                    <li
                      key={message.id}
                      className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${message.fromMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p className="whitespace-pre-wrap wrap-break-word">{message.body}</p>
                        <time className="mt-1 block text-right text-xs opacity-70">
                          {formatTime(message.sentAt)}
                        </time>
                      </div>
                    </li>
                  ))}
                  {selected.messages.length === 0 && (
                    <li className="py-10 text-center text-muted-foreground">
                      Start with a polite question about the report.
                    </li>
                  )}
                </ol>
                <form onSubmit={send} className="flex gap-2 border-t p-3">
                  <label htmlFor="message-draft" className="sr-only">
                    Write a message
                  </label>
                  <input
                    id="message-draft"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    disabled={selected.blocked}
                    maxLength={1000}
                    placeholder={
                      selected.blocked ? "This conversation is blocked" : "Write a message"
                    }
                    className="h-12 min-w-0 flex-1 rounded-md border border-input bg-background px-3"
                  />
                  <Button
                    type="submit"
                    disabled={!draft.trim() || selected.blocked}
                    aria-label="Send message"
                  >
                    <Send />
                  </Button>
                </form>
              </div>
            ) : null}
          </section>
        ) : (
          <EmptyState icon={MessageCircle} title="No conversations yet">
            Open a report and choose “Message reporter” to start a conversation.
          </EmptyState>
        )}
      </div>
    </>
  );
}
