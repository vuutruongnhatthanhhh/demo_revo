"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import ExerciseFormModal from "@/components/admin/ExerciseFormModal";
import { useAdminExercises } from "@/context/AdminExercisesContext";
import { FOCUS_TAG_OPTIONS, type ExerciseInput } from "@/context/AdminExercisesContext";
import type { Exercise } from "@/data/types";

export default function AdminExercisesPage() {
  const { exercises, addExercise, updateExercise, removeExercise } =
    useAdminExercises();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Exercise | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exercises;
    return exercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q)
    );
  }, [exercises, query]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(ex: Exercise) {
    setEditing(ex);
    setModalOpen(true);
  }

  function handleSubmit(input: ExerciseInput) {
    if (editing) {
      updateExercise(editing.id, input);
    } else {
      addExercise(input);
    }
    setModalOpen(false);
  }

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            Quản lý bài tập
          </h1>
          <p className="mt-2 text-sm text-muted">
            {exercises.length} bài tập trong thư viện. Thêm, sửa hoặc xoá bài tập
            hiển thị cho học viên.
          </p>
        </div>
        <Button onClick={openCreate} icon={<Plus size={18} />}>
          Thêm bài tập
        </Button>
      </div>

      <div className="relative mt-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên hoặc nhóm cơ..."
          className="input pl-10"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-surface-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-surface/60 text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-4 py-3 font-medium">Bài tập</th>
              <th className="px-4 py-3 font-medium">Nhóm vận động</th>
              <th className="px-4 py-3 font-medium">Dụng cụ</th>
              <th className="px-4 py-3 font-medium text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ex) => (
              <tr key={ex.id} className="border-b border-surface-border/60 bg-surface">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image src={ex.image} alt={ex.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium leading-tight">{ex.name}</p>
                      <p className="text-xs text-muted">{ex.muscle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {ex.focus.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted"
                      >
                        {FOCUS_TAG_OPTIONS.find((o) => o.id === tag)?.label ?? tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{ex.equipment}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(ex)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border text-muted transition-colors hover:text-foreground"
                      aria-label="Sửa"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(ex.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border text-muted transition-colors hover:border-danger/60 hover:text-danger"
                      aria-label="Xoá"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-muted">
                  Không tìm thấy bài tập phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ExerciseFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
        title={editing ? "Sửa bài tập" : "Thêm bài tập mới"}
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
            <p className="font-display text-lg font-semibold">Xoá bài tập?</p>
            <p className="mt-2 text-sm text-muted">
              Bài tập sẽ không còn hiển thị trong lịch tập của học viên. Hành động
              này không thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                Huỷ
              </Button>
              <Button
                variant="secondary"
                className="border-danger/40 text-danger hover:bg-danger/10"
                onClick={() => {
                  removeExercise(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                Xoá bài tập
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
