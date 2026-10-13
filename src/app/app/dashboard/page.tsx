"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  Flame,
  MoonStar,
  Sparkles,
} from "lucide-react";
import Container from "@/components/Container";
import { LinkButton } from "@/components/Button";
import ProgressRing from "@/components/ProgressRing";
import { useAppState } from "@/context/AppStateContext";

function getTodayIndex() {
  const jsDay = new Date().getDay();
  return (jsDay + 6) % 7;
}

export default function DashboardPage() {
  const { plan, stats, isSessionComplete } = useAppState();

  if (!plan) return null;

  const todayIndex = getTodayIndex();
  const today = plan.days[todayIndex];
  const todayDone = !today.isRest && isSessionComplete(today.dayIndex);

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted">Chào bạn trở lại 👋</p>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          Lịch tập của bạn hôm nay
        </h1>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
          🎯 {plan.goal.title}
        </span>
        <span className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
          📈 {plan.level.title}
        </span>
        <span className="rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-muted">
          ⏱ {plan.duration.label}/ngày
        </span>
        <Link
          href="/app/onboarding"
          className="rounded-full border border-dashed border-surface-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
        >
          Đổi lựa chọn
        </Link>
      </div>

      {/* Today card */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-surface-border">
        <div className="relative h-56 w-full sm:h-72">
          <Image
            src={plan.goal.image}
            alt={today.focusLabel}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/10" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <p className="text-sm font-medium text-accent">
            {today.dayLabel} · Hôm nay
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
            {today.isRest ? "Ngày nghỉ & phục hồi" : today.focusLabel}
          </h2>
          {!today.isRest && (
            <p className="mt-2 text-sm text-muted">
              {today.exercises.length} bài tập · ~{today.estimatedMinutes} phút
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {today.isRest ? (
              <LinkButton href="/app/nutrition" icon={<MoonStar size={18} />}>
                Xem gợi ý giãn cơ & phục hồi
              </LinkButton>
            ) : (
              <LinkButton
                href={`/app/workout/${today.dayIndex}`}
                icon={<ArrowRight size={18} />}
              >
                {todayDone ? "Xem lại buổi tập" : "Bắt đầu tập ngay"}
              </LinkButton>
            )}
            {todayDone && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-2 text-xs font-medium text-accent">
                <CheckCircle2 size={14} /> Đã hoàn thành
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Week strip */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <CalendarDays size={18} className="text-accent" />
            Lịch tuần này
          </h3>
          <Link href="/app/schedule" className="text-sm text-accent hover:underline">
            Xem đầy đủ
          </Link>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {plan.days.map((day) => {
            const isToday = day.dayIndex === todayIndex;
            const done = !day.isRest && isSessionComplete(day.dayIndex);
            const card = (
              <div
                className={clsx(
                  "flex h-32 w-24 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border px-2 text-center transition-colors",
                  isToday
                    ? "border-accent bg-accent/10"
                    : day.isRest
                    ? "border-surface-border bg-surface/50"
                    : "border-surface-border bg-surface hover:border-accent/40"
                )}
              >
                <p className={clsx("text-xs font-semibold", isToday ? "text-accent" : "text-muted")}>
                  {day.dayLabel}
                </p>
                {day.isRest ? (
                  <MoonStar size={18} className="text-muted" />
                ) : done ? (
                  <CheckCircle2 size={18} className="text-accent" />
                ) : (
                  <Dumbbell size={18} className={isToday ? "text-accent" : "text-muted"} />
                )}
                <p className="line-clamp-2 text-[10px] leading-tight text-muted">
                  {day.isRest ? "Nghỉ" : day.focusLabel}
                </p>
              </div>
            );
            return day.isRest ? (
              <div key={day.dayIndex}>{card}</div>
            ) : (
              <Link key={day.dayIndex} href={`/app/workout/${day.dayIndex}`}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats + nutrition teaser */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex items-center gap-6 rounded-2xl border border-surface-border bg-surface p-6">
          <ProgressRing percentage={stats.percentage} size={96} stroke={8} />
          <div>
            <p className="font-display text-lg font-semibold">Tiến độ tuần này</p>
            <p className="mt-1 text-sm text-muted">
              {stats.completedSessions}/{stats.totalTrainingDays} buổi tập ·{" "}
              {stats.completedExercises}/{stats.totalExercises} bài tập
            </p>
            <Link
              href="/app/progress"
              className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              Xem chi tiết <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-5 rounded-2xl border border-surface-border bg-gradient-to-br from-surface to-surface-2 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Flame size={24} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold">
              Chuỗi {stats.streak} buổi liên tiếp
            </p>
            <p className="mt-1 text-sm text-muted">
              Giữ nhịp tập đều đặn để đạt mục tiêu {plan.goal.title.toLowerCase()} nhanh hơn.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-surface-border p-5">
        <div className="flex items-center gap-3">
          <Sparkles size={18} className="text-accent" />
          <p className="text-sm text-muted">
            Đừng quên khởi động & ăn uống hợp lý sau mỗi buổi tập.
          </p>
        </div>
        <Link href="/app/nutrition" className="text-sm font-medium text-accent hover:underline">
          Khám phá
        </Link>
      </div>
    </Container>
  );
}
