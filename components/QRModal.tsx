"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X } from "lucide-react";
import { AnimatedModal, useModalFocus } from "@/components/AnimatedModal";

type QRModalProps = {
  open: boolean;
  onClose: () => void;
  url: string;
};

export function QRModal({ open, onClose, url }: QRModalProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const closeButtonRef = useModalFocus(open);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    QRCode.toDataURL(url, {
      margin: 2,
      width: 240,
      color: { dark: "#0b1120", light: "#e8edf4" },
    })
      .then((result) => {
        if (!cancelled) setDataUrl(result);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [open, url]);

  return (
    <AnimatedModal
      open={open}
      onClose={onClose}
      ariaLabelledBy="qr-dialog-title"
      panelClassName="relative z-10 w-full max-w-xs rounded-2xl border border-border bg-card p-5 shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="qr-dialog-title" className="text-sm font-semibold text-foreground">
          Scan to connect
        </h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-active)]/40"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
      <div className="flex justify-center rounded-xl bg-foreground p-3">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`QR code for ${url}`} width={240} height={240} />
        ) : (
          <div className="flex h-[240px] w-[240px] items-center justify-center text-sm text-muted-dark">
            Generating…
          </div>
        )}
      </div>
      <p className="mt-3 truncate text-center text-xs text-foreground-muted">{url}</p>
    </AnimatedModal>
  );
}
