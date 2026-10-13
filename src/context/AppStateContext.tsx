"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DurationId, GoalId, LevelId, WeeklyPlan } from "@/data/types";
import { generateWeeklyPlan } from "@/data/schedule";

export interface UserSelection {
  goal: GoalId;
  level: LevelId;
  duration: DurationId;
}

interface PersistedState {
  selection: UserSelection | null;
  completedExerciseKeys: string[];
  completedSessionDays: number[];
}

const STORAGE_KEY = "revo-app-state-v1";

const DEFAULT_STATE: PersistedState = {
  selection: null,
  completedExerciseKeys: [],
  completedSessionDays: [],
};

interface AppStateContextValue {
  hydrated: boolean;
  selection: UserSelection | null;
  plan: WeeklyPlan | null;
  setSelection: (selection: UserSelection) => void;
  resetSelection: () => void;
  toggleExercise: (dayIndex: number, exerciseId: string) => void;
  isExerciseComplete: (dayIndex: number, exerciseId: string) => boolean;
  markSessionComplete: (dayIndex: number) => void;
  isSessionComplete: (dayIndex: number) => boolean;
  stats: {
    totalTrainingDays: number;
    completedSessions: number;
    totalExercises: number;
    completedExercises: number;
    percentage: number;
    streak: number;
  };
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

function exerciseKey(dayIndex: number, exerciseId: string) {
  return `${dayIndex}:${exerciseId}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const setSelection = useCallback((selection: UserSelection) => {
    setState((prev) => ({
      ...prev,
      selection,
      completedExerciseKeys: [],
      completedSessionDays: [],
    }));
  }, []);

  const resetSelection = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const toggleExercise = useCallback((dayIndex: number, exerciseId: string) => {
    setState((prev) => {
      const key = exerciseKey(dayIndex, exerciseId);
      const exists = prev.completedExerciseKeys.includes(key);
      return {
        ...prev,
        completedExerciseKeys: exists
          ? prev.completedExerciseKeys.filter((item) => item !== key)
          : [...prev.completedExerciseKeys, key],
      };
    });
  }, []);

  const isExerciseComplete = useCallback(
    (dayIndex: number, exerciseId: string) =>
      state.completedExerciseKeys.includes(exerciseKey(dayIndex, exerciseId)),
    [state.completedExerciseKeys]
  );

  const markSessionComplete = useCallback((dayIndex: number) => {
    setState((prev) => ({
      ...prev,
      completedSessionDays: prev.completedSessionDays.includes(dayIndex)
        ? prev.completedSessionDays
        : [...prev.completedSessionDays, dayIndex],
    }));
  }, []);

  const isSessionComplete = useCallback(
    (dayIndex: number) => state.completedSessionDays.includes(dayIndex),
    [state.completedSessionDays]
  );

  const plan = useMemo(() => {
    if (!state.selection) return null;
    return generateWeeklyPlan(
      state.selection.goal,
      state.selection.level,
      state.selection.duration
    );
  }, [state.selection]);

  const stats = useMemo(() => {
    const trainingDays = plan ? plan.days.filter((d) => !d.isRest) : [];
    const totalTrainingDays = trainingDays.length;
    const completedSessions = trainingDays.filter((d) =>
      state.completedSessionDays.includes(d.dayIndex)
    ).length;
    const totalExercises = trainingDays.reduce(
      (sum, d) => sum + d.exercises.length,
      0
    );
    const completedExercises = trainingDays.reduce(
      (sum, d) =>
        sum +
        d.exercises.filter((ex) =>
          state.completedExerciseKeys.includes(
            exerciseKey(d.dayIndex, ex.exercise.id)
          )
        ).length,
      0
    );
    const percentage =
      totalExercises === 0
        ? 0
        : Math.round((completedExercises / totalExercises) * 100);

    let streak = 0;
    for (let i = trainingDays.length - 1; i >= 0; i--) {
      if (state.completedSessionDays.includes(trainingDays[i].dayIndex)) {
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
  }, [plan, state.completedSessionDays, state.completedExerciseKeys]);

  const value: AppStateContextValue = {
    hydrated,
    selection: state.selection,
    plan,
    setSelection,
    resetSelection,
    toggleExercise,
    isExerciseComplete,
    markSessionComplete,
    isSessionComplete,
    stats,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
