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
import type { DurationId, GoalId, LevelId } from "@/data/types";
import type { Member } from "@/data/members";
import { MEMBERS } from "@/data/members";
import { generateWeeklyPlan } from "@/data/schedule";
import { computeProgressStats, type ProgressStats } from "@/lib/progress";

const STORAGE_KEY = "revo-admin-members-v1";

export interface MemberWithStats extends Member {
  stats: ProgressStats;
}

interface NewMemberInput {
  name: string;
  email: string;
  goal: GoalId;
  level: LevelId;
  duration: DurationId;
}

interface AdminMembersContextValue {
  hydrated: boolean;
  members: MemberWithStats[];
  addMember: (input: NewMemberInput) => void;
  removeMember: (id: string) => void;
  toggleSessionComplete: (id: string, dayIndex: number) => void;
  resetProgress: (id: string) => void;
  getMember: (id: string) => MemberWithStats | undefined;
}

const AdminMembersContext = createContext<AdminMembersContextValue | null>(null);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function AdminMembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(MEMBERS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setMembers(JSON.parse(raw) as Member[]);
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members, hydrated]);

  const addMember = useCallback((input: NewMemberInput) => {
    const id = `m-${Date.now().toString(36)}`;
    const newMember: Member = {
      id,
      name: input.name,
      email: input.email,
      goal: input.goal,
      level: input.level,
      duration: input.duration,
      joinedAt: todayISO(),
      lastActiveAt: todayISO(),
      completedSessionDays: [],
      completedExerciseKeys: [],
    };
    setMembers((prev) => [newMember, ...prev]);
  }, []);

  const removeMember = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleSessionComplete = useCallback((id: string, dayIndex: number) => {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== id) return member;
        const plan = generateWeeklyPlan(member.goal, member.level, member.duration);
        const day = plan.days.find((d) => d.dayIndex === dayIndex);
        if (!day || day.isRest) return member;

        const isDone = member.completedSessionDays.includes(dayIndex);
        const dayKeys = day.exercises.map((ex) => `${dayIndex}:${ex.exercise.id}`);

        if (isDone) {
          return {
            ...member,
            completedSessionDays: member.completedSessionDays.filter(
              (d) => d !== dayIndex
            ),
            completedExerciseKeys: member.completedExerciseKeys.filter(
              (key) => !dayKeys.includes(key)
            ),
            lastActiveAt: todayISO(),
          };
        }

        return {
          ...member,
          completedSessionDays: [...member.completedSessionDays, dayIndex],
          completedExerciseKeys: Array.from(
            new Set([...member.completedExerciseKeys, ...dayKeys])
          ),
          lastActiveAt: todayISO(),
        };
      })
    );
  }, []);

  const resetProgress = useCallback((id: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, completedSessionDays: [], completedExerciseKeys: [] }
          : member
      )
    );
  }, []);

  const membersWithStats = useMemo<MemberWithStats[]>(
    () =>
      members.map((member) => {
        const plan = generateWeeklyPlan(member.goal, member.level, member.duration);
        const stats = computeProgressStats(
          plan,
          member.completedSessionDays,
          member.completedExerciseKeys
        );
        return { ...member, stats };
      }),
    [members]
  );

  const getMember = useCallback(
    (id: string) => membersWithStats.find((m) => m.id === id),
    [membersWithStats]
  );

  const value: AdminMembersContextValue = {
    hydrated,
    members: membersWithStats,
    addMember,
    removeMember,
    toggleSessionComplete,
    resetProgress,
    getMember,
  };

  return (
    <AdminMembersContext.Provider value={value}>
      {children}
    </AdminMembersContext.Provider>
  );
}

export function useAdminMembers() {
  const ctx = useContext(AdminMembersContext);
  if (!ctx) {
    throw new Error("useAdminMembers must be used within AdminMembersProvider");
  }
  return ctx;
}
