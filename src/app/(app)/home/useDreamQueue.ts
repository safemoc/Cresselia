"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";

export type DreamTaskStatus = "running" | "done";

export type DreamTask = {
  id: string;
  prompt: string;
  /** 附件数量（仅展示用） */
  attachmentCount: number;
  progress: number;
  status: DreamTaskStatus;
};

type State = { tasks: DreamTask[] };

type Action =
  | { type: "add"; task: DreamTask }
  | { type: "tick" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return { tasks: [...state.tasks, action.task] };
    case "tick": {
      const next = state.tasks.map((t) => {
        if (t.status !== "running") return t;
        const delta = 1 + Math.floor(Math.random() * 3);
        const progress = Math.min(100, t.progress + delta);
        return {
          ...t,
          progress,
          status: progress >= 100 ? "done" : "running",
        } satisfies DreamTask;
      });
      return { tasks: next };
    }
    default:
      return state;
  }
}

export type DreamQueueAggregate = {
  percent: number;
  runningCount: number;
  total: number;
};

export function useDreamQueue() {
  const [state, dispatch] = useReducer(reducer, { tasks: [] });

  useEffect(() => {
    const id = window.setInterval(() => dispatch({ type: "tick" }), 800);
    return () => window.clearInterval(id);
  }, []);

  const tasks = state.tasks;
  const aggregate: DreamQueueAggregate = useMemo(() => {
    if (tasks.length === 0) {
      return { percent: 0, runningCount: 0, total: 0 };
    }
    const runningCount = tasks.filter((t) => t.status === "running").length;
    const sum = tasks.reduce((s, t) => s + t.progress, 0);
    return {
      percent: Math.round(sum / tasks.length),
      runningCount,
      total: tasks.length,
    };
  }, [tasks]);

  const submit = useCallback((prompt: string, attachmentCount: number) => {
    const trimmed = prompt.trim();
    if (!trimmed && attachmentCount === 0) return;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `task-${Date.now()}`;
    dispatch({
      type: "add",
      task: {
        id,
        prompt: trimmed || "（仅附件）",
        attachmentCount,
        progress: 0,
        status: "running",
      },
    });
  }, []);

  return {
    tasks: state.tasks,
    aggregate,
    submit,
  };
}
