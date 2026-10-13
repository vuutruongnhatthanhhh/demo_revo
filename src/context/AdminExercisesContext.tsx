"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Exercise, FocusTag } from "@/data/types";
import { EXERCISES } from "@/data/exercises";

const STORAGE_KEY = "revo-admin-exercises-v1";

export const EXERCISE_IMAGE_OPTIONS = [
  "/images/exercises/pushup.jpg",
  "/images/exercises/plank.jpg",
  "/images/exercises/lunge.jpg",
  "/images/exercises/squat.jpg",
  "/images/exercises/jumping-jack.jpg",
  "/images/exercises/dumbbell-row.jpg",
  "/images/exercises/kettlebell-swing.jpg",
  "/images/exercises/mountain-climber.jpg",
  "/images/exercises/burpee.jpg",
  "/images/exercises/shoulder-press.jpg",
  "/images/exercises/deadlift.jpg",
  "/images/exercises/bicycle-crunch.jpg",
];

export const FOCUS_TAG_OPTIONS: { id: FocusTag; label: string }[] = [
  { id: "push", label: "Đẩy" },
  { id: "pull", label: "Kéo" },
  { id: "legs", label: "Chân" },
  { id: "core", label: "Core" },
  { id: "cardio", label: "Cardio" },
  { id: "fullbody", label: "Toàn thân" },
  { id: "upper", label: "Thân trên" },
  { id: "lower", label: "Thân dưới" },
];

export type ExerciseInput = Omit<Exercise, "id"> & { id?: string };

interface AdminExercisesContextValue {
  hydrated: boolean;
  exercises: Exercise[];
  addExercise: (input: ExerciseInput) => void;
  updateExercise: (id: string, input: ExerciseInput) => void;
  removeExercise: (id: string) => void;
  getExercise: (id: string) => Exercise | undefined;
}

const AdminExercisesContext = createContext<AdminExercisesContextValue | null>(
  null
);

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminExercisesProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setExercises(JSON.parse(raw) as Exercise[]);
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  }, [exercises, hydrated]);

  const addExercise = useCallback((input: ExerciseInput) => {
    setExercises((prev) => {
      const base = slugify(input.name) || `bai-tap-${prev.length + 1}`;
      let id = base;
      let suffix = 1;
      while (prev.some((ex) => ex.id === id)) {
        id = `${base}-${suffix++}`;
      }
      return [...prev, { ...input, id }];
    });
  }, []);

  const updateExercise = useCallback((id: string, input: ExerciseInput) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...input, id } : ex))
    );
  }, []);

  const removeExercise = useCallback((id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  }, []);

  const getExercise = useCallback(
    (id: string) => exercises.find((ex) => ex.id === id),
    [exercises]
  );

  const value: AdminExercisesContextValue = {
    hydrated,
    exercises,
    addExercise,
    updateExercise,
    removeExercise,
    getExercise,
  };

  return (
    <AdminExercisesContext.Provider value={value}>
      {children}
    </AdminExercisesContext.Provider>
  );
}

export function useAdminExercises() {
  const ctx = useContext(AdminExercisesContext);
  if (!ctx) {
    throw new Error(
      "useAdminExercises must be used within AdminExercisesProvider"
    );
  }
  return ctx;
}
