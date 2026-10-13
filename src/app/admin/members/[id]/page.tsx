"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Mail,
  RotateCcw,
  Trash2,
} from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import ProgressRing from "@/components/ProgressRing";
import { useAdminMembers } from "@/context/AdminMembersContext";
import { generateWeeklyPlan } from "@/data/schedule";

export default function AdminMemberDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getMember, toggleSessionComplete, resetProgress, removeMember } =
    useAdminMembers();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const member = getMember(params.id);

  if (!member) {
    return (
      <Container className="py-10">
        <p className="text-muted">Không tìm thấy học viên này.</p>
        <Link href="/admin/members" className="mt-3 inline-block text-accent hover:underline">
          Quay lại danh sách
        </Link>
      </Container>
    );
  }

  const plan = generateWeeklyPlan(member.goal, member.level, member.duration);

  return (
    <Container className="py-8 sm:py-10">
      <Link
        href="/admin/members"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={15} /> Quay lại danh sách học viên
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{member.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Mail size={14} /> {member.email}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
              🎯 {plan.goal.title}
            </span>
            <span className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
              📈 {plan.level.title}
            </span>
            <span className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
              ⏱ {plan.duration.label}/ngày
            </span>
            <span className="flex items-center gap-1 rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
              <CalendarClock size={12} /> Tham gia {member.joinedAt}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={() => resetProgress(member.id)}
          >
            Đặt lại tiến độ
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="border-danger/40 text-danger hover:bg-danger/10"
            icon={<Trash2 size={14} />}
            onClick={() => setConfirmDelete(true)}
          >
            Xoá học viên
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex items-center justify-center gap-5 rounded-2xl border border-surface-border bg-surface p-6 sm:col-span-1">
          <ProgressRing percentage={member.stats.percentage} size={104} stroke={9} />
          <div>
            <p className="text-sm font-semibold">Tiến độ tuần</p>
            <p className="mt-1 text-xs text-muted">
              {member.stats.completedExercises}/{member.stats.totalExercises} bài tập
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-surface-border bg-surface p-6">
          <p className="font-display text-2xl font-bold">
            {member.stats.completedSessions}/{member.stats.totalTrainingDays}
          </p>
          <p className="mt-1 text-sm text-muted">Buổi tập hoàn thành</p>
        </div>
        <div className="rounded-2xl border border-surface-border bg-surface p-6">
          <p className="font-display text-2xl font-bold">{member.stats.streak}</p>
          <p className="mt-1 text-sm text-muted">Chuỗi buổi liên tiếp (streak)</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">Lịch tập &amp; tiến độ</h2>
        <p className="mt-1 text-sm text-muted">
          Bấm vào một buổi tập để đánh dấu hoàn thành / chưa hoàn thành thay cho học
          viên.
        </p>
        <div className="mt-4 space-y-3">
          {plan.days.map((day) => {
            if (day.isRest) {
              return (
                <div
                  key={day.dayIndex}
                  className="flex items-center gap-4 rounded-2xl border border-surface-border bg-surface/40 p-4"
                >
                  <span className="text-sm font-semibold text-muted">
                    {day.dayLabel}
                  </span>
                  <span className="text-xs text-muted">Ngày nghỉ</span>
                </div>
              );
            }

            const done = member.completedSessionDays.includes(day.dayIndex);

            return (
              <button
                key={day.dayIndex}
                onClick={() => toggleSessionComplete(member.id, day.dayIndex)}
                className={clsx(
                  "flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors",
                  done
                    ? "border-accent/40 bg-accent/10"
                    : "border-surface-border bg-surface hover:border-accent/30"
                )}
              >
                <div>
                  <p className="text-sm font-semibold">
                    {day.dayLabel} · {day.focusLabel}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                    <span>{day.exercises.length} bài tập</span>
                    <span className="flex items-center gap-1">
                      <Clock3 size={12} /> ~{day.estimatedMinutes} phút
                    </span>
                  </div>
                </div>
                <span
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                    done
                      ? "bg-accent text-accent-ink"
                      : "border border-surface-border text-muted"
                  )}
                >
                  <CheckCircle2 size={13} />
                  {done ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setConfirmDelete(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-surface-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-lg font-semibold">Xoá học viên?</p>
            <p className="mt-2 text-sm text-muted">
              Toàn bộ dữ liệu tiến độ của {member.name} sẽ bị xoá khỏi hệ thống.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                Huỷ
              </Button>
              <Button
                variant="secondary"
                className="border-danger/40 text-danger hover:bg-danger/10"
                onClick={() => {
                  removeMember(member.id);
                  router.push("/admin/members");
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
