"use client";

import Link from "next/link";
import { ArrowRight, Dumbbell, Flame, TrendingUp, Users } from "lucide-react";
import Container from "@/components/Container";
import { useAdminExercises } from "@/context/AdminExercisesContext";
import { useAdminMembers } from "@/context/AdminMembersContext";
import { GOALS } from "@/data/goals";

export default function AdminOverviewPage() {
  const { exercises } = useAdminExercises();
  const { members } = useAdminMembers();

  const totalMembers = members.length;
  const avgPercentage =
    totalMembers === 0
      ? 0
      : Math.round(
          members.reduce((sum, m) => sum + m.stats.percentage, 0) / totalMembers
        );
  const activeThisWeek = members.filter((m) => m.stats.streak > 0).length;

  const topMembers = [...members]
    .sort((a, b) => b.stats.percentage - a.stats.percentage)
    .slice(0, 5);

  const goalDistribution = GOALS.map((goal) => ({
    goal,
    count: members.filter((m) => m.goal === goal.id).length,
  }));

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Tổng quan quản trị</h1>
      <p className="mt-2 text-sm text-muted">
        Theo dõi nhanh số liệu bài tập và học viên trong hệ thống REVO.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} value={`${totalMembers}`} label="Tổng học viên" />
        <StatCard icon={Dumbbell} value={`${exercises.length}`} label="Tổng bài tập" />
        <StatCard
          icon={TrendingUp}
          value={`${avgPercentage}%`}
          label="Tiến độ trung bình"
        />
        <StatCard
          icon={Flame}
          value={`${activeThisWeek}`}
          label="Học viên đang có streak"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-surface-border bg-surface p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              Học viên tiến độ cao nhất
            </h2>
            <Link
              href="/admin/members"
              className="flex items-center gap-1 text-sm text-accent hover:underline"
            >
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-5 space-y-4">
            {topMembers.map((member) => (
              <Link
                key={member.id}
                href={`/admin/members/${member.id}`}
                className="block"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-muted">{member.stats.percentage}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${member.stats.percentage}%` }}
                  />
                </div>
              </Link>
            ))}
            {topMembers.length === 0 && (
              <p className="text-sm text-muted">Chưa có học viên nào.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold">Phân bổ mục tiêu</h2>
          <div className="mt-5 space-y-4">
            {goalDistribution.map(({ goal, count }) => {
              const pct = totalMembers === 0 ? 0 : Math.round((count / totalMembers) * 100);
              return (
                <div key={goal.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{goal.title}</span>
                    <span className="text-muted">{count} học viên</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-accent-2 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Link
          href="/admin/exercises"
          className="flex items-center justify-between rounded-2xl border border-dashed border-surface-border p-5 transition-colors hover:border-accent/50"
        >
          <div>
            <p className="font-semibold">Quản lý bài tập</p>
            <p className="mt-1 text-sm text-muted">Thêm, sửa, xoá bài tập trong thư viện.</p>
          </div>
          <ArrowRight size={18} className="text-muted" />
        </Link>
        <Link
          href="/admin/members"
          className="flex items-center justify-between rounded-2xl border border-dashed border-surface-border p-5 transition-colors hover:border-accent/50"
        >
          <div>
            <p className="font-semibold">Quản lý học viên</p>
            <p className="mt-1 text-sm text-muted">Theo dõi & cập nhật tiến độ từng người.</p>
          </div>
          <ArrowRight size={18} className="text-muted" />
        </Link>
      </div>
    </Container>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon size={20} />
      </div>
      <p className="mt-4 font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
