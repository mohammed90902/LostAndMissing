export function formatDate(iso: string, language: "en" | "fr" = "en") {
  return new Date(iso).toLocaleDateString(language === "fr" ? "fr-CA" : "en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/St_Johns",
  });
}

export function timeAgo(iso: string, now = Date.now(), language: "en" | "fr" = "en") {
  const s = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  if (s < 60) return language === "fr" ? "à l'instant" : "just now";
  if (s < 3600)
    return language === "fr" ? `il y a ${Math.floor(s / 60)} min` : `${Math.floor(s / 60)} min ago`;
  if (s < 86400)
    return language === "fr" ? `il y a ${Math.floor(s / 3600)} h` : `${Math.floor(s / 3600)} h ago`;
  const days = Math.floor(s / 86400);
  if (days < 30)
    return language === "fr"
      ? `il y a ${days} jour${days === 1 ? "" : "s"}`
      : `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(iso, language);
}

export function formatTime(iso: string, language: "en" | "fr" = "en") {
  return new Date(iso).toLocaleString(language === "fr" ? "fr-CA" : "en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const todayISODate = () => new Date().toISOString().slice(0, 10);
