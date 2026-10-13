"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import { Button } from "@/components/Button";
import { GOALS, LEVELS, DURATIONS } from "@/data/goals";
import type { DurationId, GoalId, LevelId } from "@/data/types";
import { useAppState } from "@/context/AppStateContext";

const STEP_TITLES = [
  "Mục tiêu tập luyện của bạn là gì?",
  "Trình độ tập luyện hiện tại?",
  "Mỗi ngày bạn dành bao nhiêu thời gian?",
];

const STEP_SUBTITLES = [
  "REVO sẽ xây dựng lịch tập phù hợp với mục tiêu bạn chọn.",
  "Giúp REVO điều chỉnh độ khó và khối lượng tập luyện.",
  "Chọn khoảng thời gian bạn có thể tập đều đặn mỗi ngày.",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setSelection } = useAppState();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [level, setLevel] = useState<LevelId | null>(null);
  const [duration, setDuration] = useState<DurationId | null>(null);

  const canNext = step === 0 ? !!goal : step === 1 ? !!level : !!duration;

  function handleNext() {
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }
    if (goal && level && duration) {
      setSelection({ goal, level, duration });
      router.push("/app/dashboard");
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-surface-border/60 px-5 py-4 sm:px-8">
        <Container className="flex items-center justify-between px-0">
          <Logo href="/" />
          <span className="text-sm text-muted">Bước {step + 1}/3</span>
        </Container>
      </header>

      <Container className="py-10 sm:py-14">
        <div className="mx-auto mb-10 flex max-w-xl items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={clsx(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-accent" : "bg-surface-2"
              )}
            />
          ))}
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-fade-up font-display text-3xl font-bold sm:text-4xl">
            {STEP_TITLES[step]}
          </h1>
          <p className="animate-fade-up mt-3 text-muted" style={{ animationDelay: "0.05s" }}>
            {STEP_SUBTITLES[step]}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          {step === 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={clsx(
                    "group relative overflow-hidden rounded-2xl border text-left transition-all",
                    goal === g.id
                      ? "border-accent ring-2 ring-accent/40"
                      : "border-surface-border hover:border-accent/40"
                  )}
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                    {goal === g.id && (
                      <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-ink">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                  <div className="bg-surface p-4">
                    <h3 className="font-display font-semibold">{g.title}</h3>
                    <p className="mt-1 text-xs text-muted">{g.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={clsx(
                    "group relative overflow-hidden rounded-2xl border text-left transition-all",
                    level === l.id
                      ? "border-accent ring-2 ring-accent/40"
                      : "border-surface-border hover:border-accent/40"
                  )}
                >
                  <div className="relative h-40 w-full">
                    <Image src={l.image} alt={l.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                    {level === l.id && (
                      <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-ink">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                  <div className="bg-surface p-5">
                    <h3 className="font-display text-lg font-semibold">{l.title}</h3>
                    <p className="mt-1 text-sm text-muted">{l.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {DURATIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  className={clsx(
                    "flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all",
                    duration === d.id
                      ? "border-accent bg-accent/10 ring-2 ring-accent/30"
                      : "border-surface-border bg-surface hover:border-accent/40"
                  )}
                >
                  <div
                    className={clsx(
                      "flex h-12 w-12 items-center justify-center rounded-full",
                      duration === d.id ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted"
                    )}
                  >
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold">{d.label}</p>
                    <p className="mt-1 text-xs text-muted">{d.helper}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={step === 0 ? "pointer-events-none opacity-0" : ""}
            icon={<ArrowLeft size={16} />}
          >
            Quay lại
          </Button>
          <Button onClick={handleNext} disabled={!canNext} icon={<ArrowRight size={16} />}>
            {step === 2 ? "Xem lịch tập của tôi" : "Tiếp tục"}
          </Button>
        </div>
      </Container>
    </div>
  );
}
