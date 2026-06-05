"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function isOpenInBangkok(): boolean {
  // Bangkok is UTC+7
  const now = new Date();
  const bangkokOffset = 7 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const bangkok = new Date(utcMs + bangkokOffset * 60000);

  const day = bangkok.getDay(); // 0=Sun,1=Mon,...,6=Sat
  const hour = bangkok.getHours();
  const minute = bangkok.getMinutes();
  const time = hour * 60 + minute;

  // Closed Monday (day === 1)
  if (day === 1) return false;

  // Open 11:30–21:00
  return time >= 11 * 60 + 30 && time < 21 * 60;
}

// On dark backgrounds the light-mode colours (#2c5016, #6b6b6b) have < 3:1
// contrast against #1a1a1a. Pass dark=true (footer) to use WCAG AA-safe values:
//   open  → #6ec6a0  (7.8:1 on #1a1a1a)
//   closed → #9a9a9a  (5.7:1 on #1a1a1a)
export default function OpenNowBadge({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("OpenNow");
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenInBangkok());
    const interval = setInterval(() => setOpen(isOpenInBangkok()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (open === null) return null;

  const color = dark
    ? open ? "#6ec6a0" : "#9a9a9a"
    : open ? "#2c5016" : "var(--color-ink-dim)";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      {open ? t("open") : t("closed")}
    </span>
  );
}
