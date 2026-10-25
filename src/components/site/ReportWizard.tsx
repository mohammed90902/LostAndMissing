import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { DemoNote, PageHeader } from "@/components/site/Common";
import { Button, buttonVariants } from "@/components/ui/button";
import { CATEGORIES, CONTACT_METHODS, LOCATIONS } from "@/lib/catalog";
import { todayISODate } from "@/lib/format";
import { actions } from "@/lib/store";
import type { Category, ContactMethod, ItemKind } from "@/lib/types";
import {
  fileToDataUrl,
  type ReportDraft,
  type ReportErrors,
  validatePhoto,
  validateReport,
} from "@/lib/validation";

const emptyDraft = (): ReportDraft => ({
  title: "",
  category: "",
  date: todayISODate(),
  dateApproximate: false,
  location: "",
  description: "",
  privateDetails: "",
  heldAt: "",
  contactMethod: "in_app",
});

export function ReportLandingPage() {
  return (
    <>
      <PageHeader
        title="Report an item"
        intro="A few details can help someone recognize a lost item or safely return one."
      />
      <div className="container-app grid gap-5 py-10 md:grid-cols-2">
        <Link
          to="/report/lost"
          className="group border border-lost/30 bg-lost-soft p-6 transition-colors hover:border-lost"
        >
          <p className="text-sm font-bold uppercase text-lost">I lost something</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold">Help me find it</h2>
          <p className="mt-2 text-muted-foreground">
            Describe it, where you last saw it, and what makes it yours.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-bold text-lost">
            Start a lost report{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          to="/report/found"
          className="group border border-found/30 bg-found-soft p-6 transition-colors hover:border-found"
        >
          <p className="text-sm font-bold uppercase text-found">I found something</p>
          <h2 className="mt-3 font-display text-2xl font-extrabold">Help it get home</h2>
          <p className="mt-2 text-muted-foreground">
            Share a general area and how the owner can safely claim it.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-bold text-found">
            Start a found report{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <DemoNote className="md:col-span-2">
          Do not post exact addresses, serial numbers, full names on IDs, or other details someone
          could use to falsely claim an item.
        </DemoNote>
      </div>
    </>
  );
}

export function ReportWizard({ kind }: { kind: ItemKind }) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [draft, setDraft] = useState<ReportDraft>(emptyDraft);
  const [errors, setErrors] = useState<ReportErrors>({});
  const [savingPhoto, setSavingPhoto] = useState(false);
  const today = todayISODate();
  const heading = kind === "lost" ? "Report a lost item" : "Report a found item";

  function update<K extends keyof ReportDraft>(key: K, value: ReportDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function nextStep() {
    const currentErrors = validateReport(draft, step, today);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length) return;
    if (step < 3) setStep((current) => (current + 1) as 1 | 2 | 3);
  }

  async function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const error = validatePhoto(file);
    if (error) {
      setErrors((current) => ({ ...current, image: error }));
      event.target.value = "";
      return;
    }
    setSavingPhoto(true);
    try {
      update("image", await fileToDataUrl(file));
    } catch {
      setErrors((current) => ({
        ...current,
        image: "That photo could not be read. Please try another.",
      }));
    } finally {
      setSavingPhoto(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const allErrors = {
      ...validateReport(draft, 1, today),
      ...validateReport(draft, 2, today),
      ...validateReport(draft, 3, today),
    };
    setErrors(allErrors);
    if (Object.keys(allErrors).length) {
      setStep(
        allErrors.title || allErrors.category ? 1 : allErrors.date || allErrors.location ? 2 : 3,
      );
      return;
    }
    const listing = actions.addListing({
      kind,
      title: draft.title.trim(),
      category: draft.category as Category,
      description: draft.description.trim(),
      location: draft.location,
      date: new Date(`${draft.date}T12:00:00`).toISOString(),
      dateApproximate: draft.dateApproximate,
      privateDetails: draft.privateDetails.trim() || undefined,
      heldAt: kind === "found" ? draft.heldAt.trim() || undefined : undefined,
      contactMethod: draft.contactMethod as ContactMethod,
      image: draft.image,
    });
    toast.success("Your report has been posted");
    navigate({ to: "/items/$id", params: { id: listing.id } });
  }

  return (
    <>
      <PageHeader
        title={heading}
        intro="Your report is saved in this browser. You can update its status later from My reports."
      >
        <Link to="/report" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft /> Change report type
        </Link>
      </PageHeader>
      <div className="container-app max-w-3xl py-8">
        <ol className="mb-7 grid grid-cols-3 border-y" aria-label="Report steps">
          {["Item", "When & where", "Details"].map((label, index) => {
            const number = index + 1;
            return (
              <li
                key={label}
                className={`border-b-2 px-2 py-3 text-center text-sm font-bold ${step === number ? "border-primary text-primary" : step > number ? "border-success text-success" : "border-transparent text-muted-foreground"}`}
                aria-current={step === number ? "step" : undefined}
              >
                {step > number && <Check className="mr-1 inline size-4" />}
                {label}
              </li>
            );
          })}
        </ol>
        <form onSubmit={submit} noValidate className="surface space-y-6 p-5 sm:p-8">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="report-title" className="field-label">
                  What are you reporting?
                </label>
                <input
                  id="report-title"
                  value={draft.title}
                  onChange={(event) => update("title", event.target.value)}
                  maxLength={80}
                  autoFocus
                  aria-invalid={Boolean(errors.title)}
                  className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
                  placeholder={
                    kind === "lost"
                      ? "e.g. Blue canvas tote bag"
                      : "e.g. Silver keyring with two keys"
                  }
                />
                {errors.title && <FieldError>{errors.title}</FieldError>}
              </div>
              <div>
                <label htmlFor="report-category" className="field-label">
                  Category
                </label>
                <select
                  id="report-category"
                  value={draft.category}
                  onChange={(event) => update("category", event.target.value)}
                  aria-invalid={Boolean(errors.category)}
                  className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
                >
                  <option value="">Choose a category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && <FieldError>{errors.category}</FieldError>}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label htmlFor="report-date" className="field-label">
                  When was it {kind === "lost" ? "lost" : "found"}?
                </label>
                <input
                  id="report-date"
                  type="date"
                  value={draft.date}
                  max={today}
                  onChange={(event) => update("date", event.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
                />
                {errors.date && <FieldError>{errors.date}</FieldError>}
              </div>
              <label className="flex min-h-11 items-center gap-3">
                <input
                  type="checkbox"
                  checked={draft.dateApproximate}
                  onChange={(event) => update("dateApproximate", event.target.checked)}
                  className="size-5 accent-primary"
                />
                The date is approximate
              </label>
              <div>
                <label htmlFor="report-location" className="field-label">
                  General area
                </label>
                <select
                  id="report-location"
                  value={draft.location}
                  onChange={(event) => update("location", event.target.value)}
                  aria-invalid={Boolean(errors.location)}
                  className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
                >
                  <option value="">Choose an area</option>
                  {LOCATIONS.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
                {errors.location && <FieldError>{errors.location}</FieldError>}
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a neighbourhood or public place, not an exact address.
                </p>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <label htmlFor="report-description" className="field-label">
                  Describe the item
                </label>
                <textarea
                  id="report-description"
                  value={draft.description}
                  onChange={(event) => update("description", event.target.value)}
                  maxLength={600}
                  rows={5}
                  aria-invalid={Boolean(errors.description)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Colour, shape, brand, or other visible details"
                />
                {errors.description && <FieldError>{errors.description}</FieldError>}
                <p className="mt-1 text-right text-sm text-muted-foreground">
                  {draft.description.length}/600
                </p>
              </div>
              {kind === "found" && (
                <div>
                  <label htmlFor="held-at" className="field-label">
                    Where is it being kept?{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="held-at"
                    value={draft.heldAt}
                    onChange={(event) => update("heldAt", event.target.value)}
                    maxLength={120}
                    className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3"
                    placeholder="e.g. Handed in to the library front desk"
                  />
                </div>
              )}
              <div>
                <label htmlFor="private-details" className="field-label">
                  Private identifying detail{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="private-details"
                  value={draft.privateDetails}
                  onChange={(event) => update("privateDetails", event.target.value)}
                  maxLength={300}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="A detail only the true owner would know"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  This is not shown on the public report.
                </p>
              </div>
              <div>
                <span className="field-label">
                  Add a photo{" "}
                  <span className="font-normal text-muted-foreground">(optional, 8 MB max)</span>
                </span>
                <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-md border border-dashed p-4 hover:bg-muted">
                  <ImagePlus className="size-6 text-primary" />
                  <span className="min-w-0 flex-1">
                    {savingPhoto
                      ? "Preparing photo…"
                      : draft.image
                        ? "Photo attached"
                        : "Choose a photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={selectPhoto}
                    className="sr-only"
                  />
                </label>
                {errors.image && <FieldError>{errors.image}</FieldError>}
                {draft.image && (
                  <img
                    src={draft.image}
                    alt="Preview of selected report photo"
                    className="mt-3 max-h-48 rounded-md object-contain"
                  />
                )}
              </div>
              <fieldset>
                <legend className="field-label">How can someone contact you?</legend>
                <div className="mt-2 space-y-2">
                  {CONTACT_METHODS.map((method) => (
                    <label
                      key={method.value}
                      className="flex cursor-pointer items-start gap-3 rounded-md border p-3 hover:bg-muted"
                    >
                      <input
                        type="radio"
                        name="contact-method"
                        value={method.value}
                        checked={draft.contactMethod === method.value}
                        onChange={(event) => update("contactMethod", event.target.value)}
                        className="mt-1 size-4 accent-primary"
                      />
                      <span>
                        <span className="block font-semibold">{method.label}</span>
                        <span className="block text-sm text-muted-foreground">{method.hint}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.contactMethod && <FieldError>{errors.contactMethod}</FieldError>}
              </fieldset>
              <DemoNote>
                Never include full contact information or security details in your public
                description. You can coordinate privately through messages.
              </DemoNote>
            </>
          )}
          <div className="flex flex-wrap justify-between gap-3 border-t pt-5">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((current) => (current - 1) as 1 | 2 | 3)}
              >
                <ArrowLeft /> Back
              </Button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Continue <ArrowRight />
              </Button>
            ) : (
              <Button type="submit" disabled={savingPhoto}>
                Post report <Check />
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

function FieldError({ children }: { children: string }) {
  return (
    <p className="mt-1 text-sm font-semibold text-destructive" role="alert">
      {children}
    </p>
  );
}
