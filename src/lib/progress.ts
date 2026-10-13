import type { WeeklyPlan } from "@/data/types";

export interface ProgressStats {
  totalTrainingDays: number;
  completedSessions: number;
  totalExercises: number;
  completedExercises: number;
  percentage: number;
  streak: number;
}

export function exerciseKey(dayIndex: number, exerciseId: string) {
  return `${dayIndex}:${exerciseId}`;
}

const EMPTY_STATS: ProgressStats = {
  totalTrainingDays: 0,
  completedSessions: 0,
  totalExercises: 0,
  completedExercises: 0,
  percentage: 0,
  streak: 0,
};

export function computeProgressStats(
  plan: WeeklyPlan | null,
  completedSessionDays: number[],
  completedExerciseKeys: string[]
): ProgressStats {
  if (!plan) return EMPTY_STATS;

  const trainingDays = plan.days.filter((d) => !d.isRest);
  const totalTrainingDays = trainingDays.length;
  const completedSessions = trainingDays.filter((d) =>
    completedSessionDays.includes(d.dayIndex)
  ).length;
  const totalExercises = trainingDays.reduce(
    (sum, d) => sum + d.exercises.length,
    0
  );
  const completedExercises = trainingDays.reduce(
    (sum, d) =>
      sum +
      d.exercises.filter((ex) =>
        completedExerciseKeys.includes(exerciseKey(d.dayIndex, ex.exercise.id))
      ).length,
    0
  );
  const percentage =
    totalExercises === 0
      ? 0
      : Math.round((completedExercises / totalExercises) * 100);

  let streak = 0;
  for (let i = trainingDays.length - 1; i >= 0; i--) {
    if (completedSessionDays.includes(trainingDays[i].dayIndex)) {
      streak++;
    } else {
      break;
    }
  }

  return {
    totalTrainingDays,
    completedSessions,
    totalExercises,
    completedExercises,
    percentage,
    streak,
  };
}
