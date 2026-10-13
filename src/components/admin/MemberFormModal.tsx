"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import { GOALS, LEVELS, DURATIONS } from "@/data/goals";
import type { DurationId, GoalId, LevelId } from "@/data/types";

interface FormState {
  name: string;
  email: string;
  goal: GoalId;
  level: LevelId;
  duration: DurationId;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  goal: "weight-loss",
  level: "beginner",
  duration: 30,
};

export default function MemberFormModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    onSubmit(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-surface-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Thêm học viên</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Họ tên</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="input"
              placeholder="VD: Nguyễn Văn A"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="input"
              placeholder="email@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Mục tiêu</span>
            <select
              value={form.goal}
              onChange={(e) =>
                setForm((p) => ({ ...p, goal: e.target.value as GoalId }))
              }
              className="input"
            >
              {GOALS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Trình độ</span>
              <select
                value={form.level}
                onChange={(e) =>
                  setForm((p) => ({ ...p, level: e.target.value as LevelId }))
                }
                className="input"
              >
                {LEVELS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">
                Thời gian/ngày
              </span>
              <select
                value={form.duration}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    duration: Number(e.target.value) as DurationId,
                  }))
                }
                className="input"
              >
                {DURATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-surface-border pt-5">
            <Button type="button" variant="ghost" onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit">Thêm học viên</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
