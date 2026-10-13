"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import type { Exercise, FocusTag } from "@/data/types";
import {
  EXERCISE_IMAGE_OPTIONS,
  FOCUS_TAG_OPTIONS,
  type ExerciseInput,
} from "@/context/AdminExercisesContext";

const EMPTY_FORM: ExerciseInput = {
  name: "",
  focus: [],
  muscle: "",
  image: EXERCISE_IMAGE_OPTIONS[0],
  videoId: "",
  videoTitle: "",
  cue: "",
  equipment: "Không cần dụng cụ",
};

export default function ExerciseFormModal({
  open,
  onClose,
  onSubmit,
  initial,
  title,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: ExerciseInput) => void;
  initial?: Exercise | null;
  title: string;
}) {
  const [form, setForm] = useState<ExerciseInput>(EMPTY_FORM);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : EMPTY_FORM);
    }
  }, [open, initial]);

  if (!open) return null;

  function toggleFocus(tag: FocusTag) {
    setForm((prev) => ({
      ...prev,
      focus: prev.focus.includes(tag)
        ? prev.focus.filter((t) => t !== tag)
        : [...prev.focus, tag],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.videoId.trim()) return;
    onSubmit(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-surface-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Tên bài tập">
              <input
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="input"
                placeholder="VD: Chống đẩy (Push-up)"
              />
            </Field>
            <Field label="Nhóm cơ">
              <input
                value={form.muscle}
                onChange={(e) => setForm((p) => ({ ...p, muscle: e.target.value }))}
                className="input"
                placeholder="VD: Ngực · Tay sau · Vai"
              />
            </Field>
          </div>

          <Field label="Dụng cụ">
            <input
              value={form.equipment}
              onChange={(e) => setForm((p) => ({ ...p, equipment: e.target.value }))}
              className="input"
              placeholder="VD: Không cần dụng cụ"
            />
          </Field>

          <Field label="Nhóm vận động (Focus)">
            <div className="flex flex-wrap gap-2">
              {FOCUS_TAG_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => toggleFocus(opt.id)}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    form.focus.includes(opt.id)
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-surface-border text-muted hover:text-foreground"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Hình minh hoạ">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {EXERCISE_IMAGE_OPTIONS.map((img) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => setForm((p) => ({ ...p, image: img }))}
                  className={clsx(
                    "relative aspect-square overflow-hidden rounded-lg border-2 transition-colors",
                    form.image === img ? "border-accent" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="YouTube Video ID">
              <input
                required
                value={form.videoId}
                onChange={(e) => setForm((p) => ({ ...p, videoId: e.target.value }))}
                className="input"
                placeholder="VD: I9fsqKE5XHo"
              />
            </Field>
            <Field label="Tiêu đề video">
              <input
                value={form.videoTitle}
                onChange={(e) => setForm((p) => ({ ...p, videoTitle: e.target.value }))}
                className="input"
                placeholder="Tiêu đề hiển thị khi xem video"
              />
            </Field>
          </div>

          <Field label="Hướng dẫn kỹ thuật (cue)">
            <textarea
              value={form.cue}
              onChange={(e) => setForm((p) => ({ ...p, cue: e.target.value }))}
              rows={3}
              className="input resize-none"
              placeholder="Mô tả ngắn cách thực hiện đúng kỹ thuật..."
            />
          </Field>

          <div className="flex justify-end gap-3 border-t border-surface-border pt-5">
            <Button type="button" variant="ghost" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit">Lưu bài tập</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
