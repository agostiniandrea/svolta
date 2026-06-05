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

export default function OpenNowBadge() {
  const t = useTranslations("OpenNow");
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenInBangkok());
    const interval = setInterval(() => setOpen(isOpenInBangkok()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (open === null) return null;

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
        color: open ? "#2c5016" : "var(--color-ink-dim)",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: open ? "#2c5016" : "var(--color-ink-dim)",
          flexShrink: 0,
        }}
      />
      {open ? t("open") : t("closed")}
    </span>
  );
}
