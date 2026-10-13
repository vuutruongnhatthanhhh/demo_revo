"use client";

import Link from "next/link";
import clsx from "clsx";
import { CheckCircle2, ChevronRight, Clock3, Dumbbell, MoonStar } from "lucide-react";
import Container from "@/components/Container";
import { useAppState } from "@/context/AppStateContext";

export default function SchedulePage() {
  const { plan, isSessionComplete } = useAppState();
  if (!plan) return null;

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Lịch tập tuần này</h1>
      <p className="mt-2 text-sm text-muted">
        Đề xuất dành riêng cho mục tiêu {plan.goal.title.toLowerCase()} · trình độ{" "}
        {plan.level.title.toLowerCase()} · {plan.duration.label} mỗi buổi.
      </p>

      <div className="mt-8 space-y-4">
        {plan.days.map((day) => {
          const done = !day.isRest && isSessionComplete(day.dayIndex);

          if (day.isRest) {
            return (
              <div
                key={day.dayIndex}
                className="flex items-center justify-between rounded-2xl border border-surface-border bg-surface/40 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-muted">
                    <MoonStar size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted">{day.dayLabel}</p>
                    <p className="text-xs text-muted">Ngày nghỉ ngơi & phục hồi</p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={day.dayIndex}
              href={`/app/workout/${day.dayIndex}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-surface-border bg-surface p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-4">
                <div
                  className={clsx(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    done ? "bg-accent/15 text-accent" : "bg-accent/10 text-accent"
                  )}
                >
                  {done ? <CheckCircle2 size={20} /> : <Dumbbell size={20} />}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {day.dayLabel} · {day.focusLabel}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                    <span>{day.exercises.length} bài tập</span>
                    <span className="flex items-center gap-1">
                      <Clock3 size={12} /> ~{day.estimatedMinutes} phút
                    </span>
                    {done && <span className="text-accent">Đã hoàn thành</span>}
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-muted" />
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
