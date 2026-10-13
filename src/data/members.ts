import { generateWeeklyPlan } from "./schedule";
import type { DurationId, GoalId, LevelId } from "./types";

interface MemberSeed {
  id: string;
  name: string;
  email: string;
  goal: GoalId;
  level: LevelId;
  duration: DurationId;
  joinedAt: string;
  lastActiveAt: string;
  fullyCompletedDayIndices: number[];
  partiallyCompletedDayIndices: number[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  goal: GoalId;
  level: LevelId;
  duration: DurationId;
  joinedAt: string;
  lastActiveAt: string;
  completedSessionDays: number[];
  completedExerciseKeys: string[];
}

const MEMBER_SEEDS: MemberSeed[] = [
  {
    id: "m1",
    name: "Nguyễn Minh Anh",
    email: "minhanh.nguyen@example.com",
    goal: "weight-loss",
    level: "beginner",
    duration: 30,
    joinedAt: "2026-09-01",
    lastActiveAt: "2026-10-12",
    fullyCompletedDayIndices: [0, 2],
    partiallyCompletedDayIndices: [3],
  },
  {
    id: "m2",
    name: "Trần Quốc Bảo",
    email: "quocbao.tran@example.com",
    goal: "muscle-gain",
    level: "experienced",
    duration: 45,
    joinedAt: "2026-08-15",
    lastActiveAt: "2026-10-13",
    fullyCompletedDayIndices: [0, 1, 2],
    partiallyCompletedDayIndices: [4],
  },
  {
    id: "m3",
    name: "Lê Thị Cẩm",
    email: "camle@example.com",
    goal: "weight-gain",
    level: "beginner",
    duration: 30,
    joinedAt: "2026-09-20",
    lastActiveAt: "2026-09-20",
    fullyCompletedDayIndices: [],
    partiallyCompletedDayIndices: [],
  },
  {
    id: "m4",
    name: "Phạm Hữu Đức",
    email: "huuduc.pham@example.com",
    goal: "weight-loss",
    level: "experienced",
    duration: 60,
    joinedAt: "2026-07-10",
    lastActiveAt: "2026-10-13",
    fullyCompletedDayIndices: [0, 1, 2, 4, 5],
    partiallyCompletedDayIndices: [],
  },
  {
    id: "m5",
    name: "Hoàng Thị Em",
    email: "thiem.hoang@example.com",
    goal: "muscle-gain",
    level: "beginner",
    duration: 15,
    joinedAt: "2026-09-05",
    lastActiveAt: "2026-10-08",
    fullyCompletedDayIndices: [0],
    partiallyCompletedDayIndices: [2],
  },
  {
    id: "m6",
    name: "Vũ Đình Phát",
    email: "dinhphat.vu@example.com",
    goal: "weight-gain",
    level: "experienced",
    duration: 45,
    joinedAt: "2026-06-01",
    lastActiveAt: "2026-10-11",
    fullyCompletedDayIndices: [0, 1],
    partiallyCompletedDayIndices: [2, 4],
  },
  {
    id: "m7",
    name: "Đặng Ngọc Giang",
    email: "ngocgiang.dang@example.com",
    goal: "weight-loss",
    level: "beginner",
    duration: 15,
    joinedAt: "2026-10-01",
    lastActiveAt: "2026-10-10",
    fullyCompletedDayIndices: [0],
    partiallyCompletedDayIndices: [],
  },
  {
    id: "m8",
    name: "Bùi Thanh Hà",
    email: "thanhha.bui@example.com",
    goal: "muscle-gain",
    level: "experienced",
    duration: 60,
    joinedAt: "2026-05-20",
    lastActiveAt: "2026-10-13",
    fullyCompletedDayIndices: [0, 1, 2, 4, 5],
    partiallyCompletedDayIndices: [],
  },
  {
    id: "m9",
    name: "Ngô Văn Khánh",
    email: "vankhanh.ngo@example.com",
    goal: "weight-gain",
    level: "beginner",
    duration: 30,
    joinedAt: "2026-09-28",
    lastActiveAt: "2026-10-05",
    fullyCompletedDayIndices: [],
    partiallyCompletedDayIndices: [0],
  },
  {
    id: "m10",
    name: "Đỗ Minh Lan",
    email: "minhlan.do@example.com",
    goal: "weight-loss",
    level: "experienced",
    duration: 30,
    joinedAt: "2026-08-01",
    lastActiveAt: "2026-10-09",
    fullyCompletedDayIndices: [0, 2],
    partiallyCompletedDayIndices: [1, 4],
  },
];

function buildMember(seed: MemberSeed): Member {
  const plan = generateWeeklyPlan(seed.goal, seed.level, seed.duration);
  const trainingDays = plan.days.filter((d) => !d.isRest);
  const completedExerciseKeys: string[] = [];

  trainingDays.forEach((day) => {
    if (seed.fullyCompletedDayIndices.includes(day.dayIndex)) {
      day.exercises.forEach((ex) =>
        completedExerciseKeys.push(`${day.dayIndex}:${ex.exercise.id}`)
      );
    } else if (seed.partiallyCompletedDayIndices.includes(day.dayIndex)) {
      const half = Math.ceil(day.exercises.length / 2);
      day.exercises
        .slice(0, half)
        .forEach((ex) =>
          completedExerciseKeys.push(`${day.dayIndex}:${ex.exercise.id}`)
        );
    }
  });

  return {
    id: seed.id,
    name: seed.name,
    email: seed.email,
    goal: seed.goal,
    level: seed.level,
    duration: seed.duration,
    joinedAt: seed.joinedAt,
    lastActiveAt: seed.lastActiveAt,
    completedSessionDays: [...seed.fullyCompletedDayIndices],
    completedExerciseKeys,
  };
}

export const MEMBERS: Member[] = MEMBER_SEEDS.map(buildMember);
