"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ListChecks,
  PartyPopper,
  Salad,
} from "lucide-react";
import Container from "@/components/Container";
import { Button, LinkButton } from "@/components/Button";
import ExerciseCard from "@/components/app/ExerciseCard";
import { useAppState } from "@/context/AppStateContext";

export default function WorkoutDayPage() {
  const params = useParams<{ day: string }>();
  const router = useRouter();
  const { plan, isExerciseComplete, isSessionComplete, markSessionComplete } =
    useAppState();

  const dayIndex = Number(params.day);
  const day = plan?.days.find((d) => d.dayIndex === dayIndex);

  const completedCount = useMemo(() => {
    if (!day) return 0;
    return day.exercises.filter((ex) => isExerciseComplete(day.dayIndex, ex.exercise.id))
      .length;
  }, [day, isExerciseComplete]);

  if (!plan || !day) {
    return (
      <Container className="py-10">
        <p className="text-muted">Không tìm thấy buổi tập này.</p>
        <Link href="/app/schedule" className="mt-3 inline-block text-accent hover:underline">
          Quay lại lịch tập
        </Link>
      </Container>
    );
  }

  if (day.isRest) {
    return (
      <Container className="py-10 text-center">
        <p className="font-display text-2xl font-bold">{day.dayLabel} là ngày nghỉ</p>
        <p className="mt-2 text-muted">Hãy dành thời gian phục hồi và giãn cơ nhẹ nhàng.</p>
        <LinkButton href="/app/nutrition" className="mt-6">
          Xem gợi ý giãn cơ
        </LinkButton>
      </Container>
    );
  }

  const total = day.exercises.length;
  const sessionDone = isSessionComplete(day.dayIndex);
  const allExercisesDone = completedCount === total;

  return (
    <Container className="py-8 pb-28 sm:py-10 sm:pb-16">
      <Link
        href="/app/schedule"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={15} /> Quay lại lịch tập
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">{day.dayLabel}</p>
          <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
            {day.focusLabel}
          </h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <ListChecks size={15} /> {total} bài tập
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={15} /> ~{day.estimatedMinutes} phút
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-surface-border bg-surface px-4 py-3 text-center">
          <p className="font-display text-xl font-bold text-accent">
            {completedCount}/{total}
          </p>
          <p className="text-[11px] text-muted">bài hoàn thành</p>
        </div>
      </div>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${total === 0 ? 0 : (completedCount / total) * 100}%` }}
        />
      </div>

      <div className="mt-8 space-y-4">
        {day.exercises.map((prescription, index) => (
          <ExerciseCard
            key={prescription.exercise.id}
            prescription={prescription}
            dayIndex={day.dayIndex}
            index={index}
          />
        ))}
      </div>

      {sessionDone ? (
        <div className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-6 text-center">
          <PartyPopper className="mx-auto text-accent" size={28} />
          <p className="mt-2 font-display text-lg font-semibold">
            Buổi tập đã hoàn thành!
          </p>
          <p className="mt-1 text-sm text-muted">
            Đừng quên giãn cơ và bổ sung dinh dưỡng phù hợp nhé.
          </p>
          <LinkButton href="/app/nutrition" className="mt-4" icon={<Salad size={16} />}>
            Giãn cơ & gợi ý món ăn
          </LinkButton>
        </div>
      ) : (
        <div className="fixed inset-x-0 bottom-20 z-30 px-5 sm:static sm:mt-8 sm:px-0 md:bottom-0">
          <div className="mx-auto max-w-6xl">
            <Button
              className="w-full shadow-xl sm:w-auto"
              size="lg"
              disabled={!allExercisesDone}
              onClick={() => markSessionComplete(day.dayIndex)}
              icon={<CheckCircle2 size={18} />}
            >
              {allExercisesDone
                ? "Hoàn thành buổi tập"
                : `Hoàn thành tất cả bài tập (${completedCount}/${total})`}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
