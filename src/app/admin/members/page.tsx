"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Flame, Plus, Search, Trash2 } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import MemberFormModal from "@/components/admin/MemberFormModal";
import { useAdminMembers } from "@/context/AdminMembersContext";
import { GOALS, LEVELS } from "@/data/goals";
import type { GoalId } from "@/data/types";

export default function AdminMembersPage() {
  const { members, addMember, removeMember } = useAdminMembers();
  const [query, setQuery] = useState("");
  const [goalFilter, setGoalFilter] = useState<GoalId | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const matchesQuery =
        !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
      const matchesGoal = goalFilter === "all" || m.goal === goalFilter;
      return matchesQuery && matchesGoal;
    });
  }, [members, query, goalFilter]);

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            Quản lý học viên
          </h1>
          <p className="mt-2 text-sm text-muted">
            {members.length} học viên · theo dõi tiến độ tập luyện của từng người.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} icon={<Plus size={18} />}>
          Thêm học viên
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-surface-border bg-surface p-1">
          <button
            onClick={() => setGoalFilter("all")}
            className={clsx(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              goalFilter === "all"
                ? "bg-accent text-accent-ink"
                : "text-muted hover:text-foreground"
            )}
          >
            Tất cả
          </button>
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoalFilter(g.id)}
              className={clsx(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                goalFilter === g.id
                  ? "bg-accent text-accent-ink"
                  : "text-muted hover:text-foreground"
              )}
            >
              {g.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-surface-border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-surface/60 text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-medium">Học viên</th>
              <th className="px-4 py-3 font-medium">Mục tiêu</th>
              <th className="px-4 py-3 font-medium">Trình độ</th>
              <th className="px-4 py-3 font-medium">Tiến độ</th>
              <th className="px-4 py-3 font-medium">Streak</th>
              <th className="px-4 py-3 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member) => {
              const goal = GOALS.find((g) => g.id === member.goal);
              const level = LEVELS.find((l) => l.id === member.level);
              return (
                <tr key={member.id} className="border-b border-surface-border/60 bg-surface">
                  <td className="px-4 py-3">
                    <Link href={`/admin/members/${member.id}`} className="block">
                      <p className="font-medium leading-tight hover:text-accent">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted">{member.email}</p>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{goal?.title}</td>
                  <td className="px-4 py-3 text-muted">{level?.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${member.stats.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted">
                        {member.stats.percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {member.stats.streak > 0 ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-accent">
                        <Flame size={12} /> {member.stats.streak}
                      </span>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/members/${member.id}`}
                        className="rounded-lg border border-surface-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
                      >
                        Chi tiết
                      </Link>
                      <button
                        onClick={() => setConfirmDeleteId(member.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border text-muted transition-colors hover:border-danger/60 hover:text-danger"
                        aria-label="Xoá"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  Không tìm thấy học viên phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <MemberFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(input) => {
          addMember(input);
          setModalOpen(false);
        }}
      />

      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setConfirmDeleteId(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-surface-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-lg font-semibold">Xoá học viên?</p>
            <p className="mt-2 text-sm text-muted">
              Toàn bộ dữ liệu tiến độ của học viên này sẽ bị xoá khỏi hệ thống.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                Huỷ
              </Button>
              <Button
                variant="secondary"
                className="border-danger/40 text-danger hover:bg-danger/10"
                onClick={() => {
                  removeMember(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                Xoá học viên
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
