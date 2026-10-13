"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Flame, Timer, Wallet } from "lucide-react";
import Container from "@/components/Container";
import VideoModal from "@/components/VideoModal";
import { STRETCH_ROUTINES } from "@/data/stretches";
import { MEALS, BUDGETS } from "@/data/meals";
import type { BudgetId } from "@/data/types";
import { useAppState } from "@/context/AppStateContext";

export default function NutritionPage() {
  const { plan } = useAppState();
  const [budget, setBudget] = useState<BudgetId>("vua");

  const filteredMeals = useMemo(() => {
    if (!plan) return [];
    const byGoal = MEALS.filter((meal) => meal.goals.includes(plan.goal.id));
    const byBudget = byGoal.filter((meal) => meal.budget === budget);
    return byBudget.length > 0 ? byBudget : byGoal;
  }, [plan, budget]);

  if (!plan) return null;

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">
        Sau mỗi buổi tập
      </h1>
      <p className="mt-2 text-sm text-muted">
        Giãn cơ đúng cách và ăn uống hợp lý giúp bạn phục hồi nhanh và đạt mục
        tiêu {plan.goal.title.toLowerCase()} hiệu quả hơn.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Khởi động & Giãn cơ</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {STRETCH_ROUTINES.map((routine) => (
            <div
              key={routine.id}
              className="rounded-2xl border border-surface-border bg-surface p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display font-semibold">{routine.title}</p>
                  <p className="mt-1 text-xs text-muted">{routine.subtitle}</p>
                </div>
                <VideoModal
                  videoId={routine.videoId}
                  title={routine.videoTitle}
                  triggerClassName="shrink-0"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {routine.moves.map((move) => (
                  <div key={move.id} className="text-center">
                    <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                      <Image src={move.image} alt={move.name} fill className="object-cover" />
                    </div>
                    <p className="mt-2 line-clamp-2 text-[11px] font-medium leading-tight">
                      {move.name}
                    </p>
                    <p className="text-[10px] text-muted">{move.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">Gợi ý dinh dưỡng</h2>
          <div className="flex items-center gap-1 rounded-full border border-surface-border bg-surface p-1">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBudget(b.id)}
                className={clsx(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  budget === b.id
                    ? "bg-accent text-accent-ink"
                    : "text-muted hover:text-foreground"
                )}
              >
                <Wallet size={12} />
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">
          Gợi ý món ăn phù hợp với mục tiêu {plan.goal.title.toLowerCase()} và ngân
          sách bạn chọn.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="overflow-hidden rounded-2xl border border-surface-border bg-surface"
            >
              <div className="relative h-36 w-full">
                <Image src={meal.image} alt={meal.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="font-display font-semibold leading-tight">{meal.name}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {meal.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Flame size={12} /> {meal.calories} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer size={12} /> {meal.price}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {meal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
