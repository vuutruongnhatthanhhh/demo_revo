"use client";

import Image from "next/image";
import clsx from "clsx";
import { Check, Clock3, Repeat } from "lucide-react";
import type { ExercisePrescription } from "@/data/types";
import VideoModal from "@/components/VideoModal";
import { useAppState } from "@/context/AppStateContext";

export default function ExerciseCard({
  prescription,
  dayIndex,
  index,
}: {
  prescription: ExercisePrescription;
  dayIndex: number;
  index: number;
}) {
  const { isExerciseComplete, toggleExercise } = useAppState();
  const { exercise, sets, reps, restSeconds } = prescription;
  const done = isExerciseComplete(dayIndex, exercise.id);

  return (
    <div
      className={clsx(
        "flex gap-4 rounded-2xl border p-4 transition-colors sm:p-5",
        done ? "border-accent/40 bg-accent/5" : "border-surface-border bg-surface"
      )}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <Image src={exercise.image} alt={exercise.name} fill className="object-cover" />
        <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 text-[10px] font-semibold text-foreground">
          {index + 1}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <p className="font-display font-semibold leading-tight">{exercise.name}</p>
          <p className="mt-0.5 text-xs text-muted">{exercise.muscle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Repeat size={13} /> {sets} hiệp × {reps}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} /> Nghỉ {restSeconds}s
          </span>
        </div>

        <div className="flex items-center gap-2">
          <VideoModal
            videoId={exercise.videoId}
            title={exercise.videoTitle}
            triggerClassName="bg-surface-2 text-foreground px-3 py-1.5 text-xs hover:brightness-100 hover:bg-surface-2/70"
            trigger={<span>Xem video</span>}
          />
          <button
            type="button"
            onClick={() => toggleExercise(dayIndex, exercise.id)}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              done
                ? "bg-accent text-accent-ink"
                : "border border-surface-border text-muted hover:border-accent/50 hover:text-foreground"
            )}
          >
            <Check size={13} />
            {done ? "Đã xong" : "Hoàn thành"}
          </button>
        </div>
      </div>
    </div>
  );
}
