export const MAX_PHOTO_MB = 8;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validatePhoto(file: File): string | null {
  if (!PHOTO_TYPES.includes(file.type)) return "Please choose a photo (JPG, PNG, WEBP or GIF).";
  if (file.size > MAX_PHOTO_MB * 1024 * 1024) return `That photo is too large. Please choose one under ${MAX_PHOTO_MB} MB.`;
  return null;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export interface ReportDraft {
  title: string;
  category: string;
  date: string;
  dateApproximate: boolean;
  location: string;
  description: string;
  privateDetails: string;
  heldAt: string;
  contactMethod: string;
  image?: string;
}

export type ReportErrors = Partial<Record<keyof ReportDraft, string>>;

/** Validates one step of the report flow. Step 1: what, step 2: where/when, step 3: details. */
export function validateReport(d: ReportDraft, step: 1 | 2 | 3, today: string): ReportErrors {
  const e: ReportErrors = {};
  if (step === 1) {
    if (d.title.trim().length < 3) e.title = "Please describe the item in at least 3 characters.";
    if (d.title.length > 80) e.title = "Please keep the name under 80 characters.";
    if (!d.category) e.category = "Please choose a category.";
  }
  if (step === 2) {
    if (!d.date) e.date = "Please choose a date.";
    else if (d.date > today) e.date = "The date can't be in the future.";
    if (!d.location) e.location = "Please choose a general area.";
  }
  if (step === 3) {
    if (d.description.trim().length < 10) e.description = "Please add a short description (at least 10 characters).";
    if (d.description.length > 600) e.description = "Please keep the description under 600 characters.";
    if (!d.contactMethod) e.contactMethod = "Please choose how you'd like to be contacted.";
  }
  return e;
}

/** Shrinks a photo to a small JPEG data URL so demo listings survive a page reload. */
export function fileToDataUrl(file: File, max = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };
    img.src = url;
  });
}
