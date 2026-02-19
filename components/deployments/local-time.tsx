"use client";

import { useEffect, useState } from "react";

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
};

interface LocalTimeProps {
  timestamp: number;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}

export function LocalTime({ timestamp, options, className }: LocalTimeProps) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    setFormatted(new Date(timestamp).toLocaleString("en-US", opts));
  }, [timestamp, options]);

  if (formatted === null) {
    return <span className={className}>—</span>;
  }

  return (
    <time dateTime={new Date(timestamp).toISOString()} className={className}>
      {formatted}
    </time>
  );
}
