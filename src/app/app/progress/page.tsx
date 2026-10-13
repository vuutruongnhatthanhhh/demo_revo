"use client";

import Link from "next/link";
import clsx from "clsx";
import { CheckCircle2, Flame, ListChecks, Target } from "lucide-react";
import Container from "@/components/Container";
import ProgressRing from "@/components/ProgressRing";
import { useAppState } from "@/context/AppStateContext";

export default function ProgressPage() {
  const { plan, stats, isExerciseComplete, isSessionComplete } = useAppState();
  if (!plan) return null;

  const trainingDays = plan.days.filter((d) => !d.isRest);

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Tiến độ tập luyện</h1>
      <p className="mt-2 text-sm text-muted">
        Theo dõi quá trình luyện tập của bạn trong tuần với mục tiêu{" "}
        {plan.goal.title.toLowerCase()}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-surface-border bg-surface p-6 sm:col-span-1">
          <ProgressRing percentage={stats.percentage} size={128} stroke={10} />
          <p className="text-sm text-muted">Tổng tiến độ tuần này</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-3">
          <StatCard
            icon={ListChecks}
            value={`${stats.completedSessions}/${stats.totalTrainingDays}`}
            label="Buổi tập hoàn thành"
          />
          <StatCard
            icon={Target}
            value={`${stats.completedExercises}/${stats.totalExercises}`}
            label="Bài tập đã tập"
          />
          <StatCard
            icon={Flame}
            value={`${stats.streak}`}
            label="Buổi liên tiếp (streak)"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">Chi tiết theo buổi</h2>
        <div className="mt-4 space-y-3">
          {trainingDays.map((day) => {
            const done = day.exercises.filter((ex) =>
              isExerciseComplete(day.dayIndex, ex.exercise.id)
            ).length;
            const total = day.exercises.length;
            const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
            const sessionDone = isSessionComplete(day.dayIndex);

            return (
              <Link
                key={day.dayIndex}
                href={`/app/workout/${day.dayIndex}`}
                className="block rounded-2xl border border-surface-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {day.dayLabel} · {day.focusLabel}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {done}/{total} bài tập
                    </p>
                  </div>
                  {sessionDone ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent">
                      <CheckCircle2 size={13} /> Hoàn thành
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-muted">{percentage}%</span>
                  )}
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={clsx(
                      "h-full rounded-full transition-all duration-500",
                      sessionDone ? "bg-accent" : "bg-accent/60"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Target;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-surface-border bg-surface p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon size={18} />
      </div>
      <p className="font-display text-xl font-bold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
