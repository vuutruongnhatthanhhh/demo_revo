"use client";

import { useEffect, useState } from "react";
import { PlayCircle, X } from "lucide-react";
import clsx from "clsx";

export default function VideoModal({
  videoId,
  title,
  trigger,
  triggerClassName,
}: {
  videoId: string;
  title: string;
  trigger?: React.ReactNode;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-ink font-semibold px-4 py-2.5 text-sm transition-transform active:scale-95 hover:brightness-110",
          triggerClassName
        )}
      >
        {trigger ?? (
          <>
            <PlayCircle size={18} />
            Xem video hướng dẫn
          </>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-up"
          style={{ animationDuration: "0.2s" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-surface border border-surface-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
              <p className="text-sm font-medium text-foreground line-clamp-1 pr-4">
                {title}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-foreground transition-colors"
                aria-label="Đóng video"
              >
                <X size={16} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
