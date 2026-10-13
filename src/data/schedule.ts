import { EXERCISES } from "./exercises";
import type {
  DurationId,
  Exercise,
  ExercisePrescription,
  FocusTag,
  GoalId,
  LevelId,
  WeeklyPlan,
  WorkoutDay,
} from "./types";
import { GOALS, LEVELS, DURATIONS } from "./goals";

const DAY_LABELS = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

interface DayTemplate {
  label: string;
  tags: FocusTag[] | null;
}

const PLAN_TEMPLATES: Record<GoalId, Record<LevelId, DayTemplate[]>> = {
  "weight-loss": {
    beginner: [
      { label: "Toàn thân & Cardio", tags: ["fullbody", "cardio"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Core & Cardio", tags: ["core", "cardio"] },
      { label: "Toàn thân & Cardio", tags: ["fullbody", "cardio"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Cardio HIIT", tags: ["cardio", "legs"] },
      { label: "Nghỉ ngơi", tags: null },
    ],
    experienced: [
      { label: "Cardio HIIT toàn thân", tags: ["cardio", "fullbody"] },
      { label: "Core & Cardio", tags: ["core", "cardio"] },
      { label: "Toàn thân cường độ cao", tags: ["fullbody", "legs"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Cardio HIIT toàn thân", tags: ["cardio", "fullbody"] },
      { label: "Core & Cardio", tags: ["core", "cardio"] },
      { label: "Nghỉ ngơi", tags: null },
    ],
  },
  "muscle-gain": {
    beginner: [
      { label: "Đẩy: Ngực - Vai - Tay sau", tags: ["push", "upper"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Kéo: Lưng - Tay trước", tags: ["pull", "upper"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Chân & Mông", tags: ["legs", "lower"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Nghỉ ngơi", tags: null },
    ],
    experienced: [
      { label: "Đẩy: Ngực - Vai - Tay sau", tags: ["push", "upper"] },
      { label: "Kéo: Lưng - Tay trước", tags: ["pull", "upper"] },
      { label: "Chân & Mông", tags: ["legs", "lower"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Toàn thân sức mạnh", tags: ["fullbody", "push", "pull"] },
      { label: "Core & Cardio nhẹ", tags: ["core", "cardio"] },
      { label: "Nghỉ ngơi", tags: null },
    ],
  },
  "weight-gain": {
    beginner: [
      { label: "Toàn thân sức mạnh", tags: ["fullbody", "legs"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Đẩy & Kéo cơ bản", tags: ["push", "pull"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Chân & Mông", tags: ["legs", "lower"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Nghỉ ngơi", tags: null },
    ],
    experienced: [
      { label: "Đẩy: Ngực - Vai - Tay sau", tags: ["push", "upper"] },
      { label: "Kéo: Lưng - Tay trước", tags: ["pull", "upper"] },
      { label: "Chân & Mông sức mạnh", tags: ["legs", "lower"] },
      { label: "Nghỉ ngơi", tags: null },
      { label: "Toàn thân khối lượng cao", tags: ["fullbody", "legs"] },
      { label: "Đẩy & Kéo bổ trợ", tags: ["push", "pull"] },
      { label: "Nghỉ ngơi", tags: null },
    ],
  },
};

const EXERCISE_COUNT_BY_DURATION: Record<DurationId, number> = {
  15: 3,
  30: 4,
  45: 6,
  60: 8,
};

function pickExercises(tags: FocusTag[], count: number, offset: number): Exercise[] {
  const pool = EXERCISES.filter((exercise) =>
    exercise.focus.some((tag) => tags.includes(tag))
  );
  const source = pool.length > 0 ? pool : EXERCISES;
  const result: Exercise[] = [];
  for (let i = 0; i < count; i++) {
    const exercise = source[(offset + i) % source.length];
    if (!result.find((item) => item.id === exercise.id)) {
      result.push(exercise);
    } else {
      const fallback = source[(offset + i + 1) % source.length];
      if (!result.find((item) => item.id === fallback.id)) {
        result.push(fallback);
      }
    }
  }
  return result;
}

function buildPrescription(
  exercise: Exercise,
  level: LevelId,
  goal: GoalId
): ExercisePrescription {
  const isCardio = exercise.focus.includes("cardio");
  const isCore = exercise.focus.includes("core");

  if (goal === "weight-loss") {
    return {
      exercise,
      sets: level === "beginner" ? 3 : 4,
      reps: isCardio || isCore ? (level === "beginner" ? "30 giây" : "45 giây") : "15-20 lần",
      restSeconds: level === "beginner" ? 30 : 20,
    };
  }

  if (goal === "muscle-gain") {
    return {
      exercise,
      sets: level === "beginner" ? 3 : 4,
      reps: level === "beginner" ? "10-12 lần" : "8-10 lần",
      restSeconds: level === "beginner" ? 60 : 45,
    };
  }

  return {
    exercise,
    sets: level === "beginner" ? 3 : 4,
    reps: level === "beginner" ? "12 lần" : "10 lần",
    restSeconds: level === "beginner" ? 60 : 50,
  };
}

export function generateWeeklyPlan(
  goalId: GoalId,
  levelId: LevelId,
  durationId: DurationId
): WeeklyPlan {
  const goal = GOALS.find((g) => g.id === goalId)!;
  const level = LEVELS.find((l) => l.id === levelId)!;
  const duration = DURATIONS.find((d) => d.id === durationId)!;
  const template = PLAN_TEMPLATES[goalId][levelId];
  const exerciseCount = EXERCISE_COUNT_BY_DURATION[durationId];

  const days: WorkoutDay[] = template.map((day, index) => {
    if (!day.tags) {
      return {
        dayIndex: index,
        dayLabel: DAY_LABELS[index],
        focusLabel: day.label,
        isRest: true,
        estimatedMinutes: 0,
        exercises: [],
      };
    }

    const picked = pickExercises(day.tags, exerciseCount, index * 2);
    const exercises = picked.map((exercise) =>
      buildPrescription(exercise, levelId, goalId)
    );

    return {
      dayIndex: index,
      dayLabel: DAY_LABELS[index],
      focusLabel: day.label,
      isRest: false,
      estimatedMinutes: durationId,
      exercises,
    };
  });

  return { goal, level, duration, days };
}
