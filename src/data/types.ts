export type GoalId = "weight-loss" | "muscle-gain" | "weight-gain";
export type LevelId = "beginner" | "experienced";
export type DurationId = 15 | 30 | 45 | 60;
export type FocusTag =
  | "push"
  | "pull"
  | "legs"
  | "core"
  | "cardio"
  | "fullbody"
  | "upper"
  | "lower";

export interface Goal {
  id: GoalId;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
}

export interface Level {
  id: LevelId;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Duration {
  id: DurationId;
  label: string;
  helper: string;
}

export interface Exercise {
  id: string;
  name: string;
  focus: FocusTag[];
  muscle: string;
  image: string;
  videoId: string;
  videoTitle: string;
  cue: string;
  equipment: string;
}

export interface ExercisePrescription {
  exercise: Exercise;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface DayFocus {
  key: string;
  label: string;
  tags: FocusTag[];
  isRest: boolean;
}

export interface WorkoutDay {
  dayIndex: number;
  dayLabel: string;
  focusLabel: string;
  isRest: boolean;
  estimatedMinutes: number;
  exercises: ExercisePrescription[];
}

export interface WeeklyPlan {
  goal: Goal;
  level: Level;
  duration: Duration;
  days: WorkoutDay[];
}

export interface Stretch {
  id: string;
  name: string;
  type: "warmup" | "cooldown";
  duration: string;
  image: string;
  cue: string;
}

export interface StretchRoutine {
  id: "warmup" | "cooldown";
  title: string;
  subtitle: string;
  videoId: string;
  videoTitle: string;
  moves: Stretch[];
}

export type BudgetId = "tiet-kiem" | "vua" | "cao-cap";

export interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  price: string;
  budget: BudgetId;
  goals: GoalId[];
  description: string;
  tags: string[];
}
