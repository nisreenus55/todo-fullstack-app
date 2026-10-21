import { useCallback, useEffect, useState } from "react";
import { taskApi } from "./api/taskApi";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleCreate(taskData) {
    setError("");

    try {
      const created = await taskApi.create(taskData);
      setTasks((current) => [...current, created]);
    } catch (err) {
      setError(err.message || "Unable to create task.");
      throw err;
    }
  }

  async function handleUpdate(id, changes) {
    const current = tasks.find((task) => task.id === id);
    if (!current) return;

    // PUT sends the complete updated representation.
    const updatedTask = { ...current, ...changes };
    setError("");

    try {
      const saved = await taskApi.update(id, updatedTask);

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? saved : task)),
      );
    } catch (err) {
      setError(err.message || "Unable to update task.");
      throw err;
    }
  }

  async function handleDelete(id) {
    setError("");

    try {
      await taskApi.delete(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message || "Unable to delete task.");
    }
  }

  const completedCount = tasks.filter((task) => task.status === "DONE").length;

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">PLAN · BUILD · DELIVER</p>
          <h1>Task Board</h1>
          <p className="subtitle">
            Keep your projects moving, one task at a time.
          </p>
        </div>

        <div className="stats">
          <span>{tasks.length} total tasks</span>
          <span>{completedCount} completed</span>
        </div>
      </header>

      <TaskForm onCreate={handleCreate} />

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button
            className="text-button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <p className="loading" role="status">
          Loading tasks...
        </p>
      ) : (
        <TaskBoard
          tasks={tasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      <footer className="app-footer">
        Built with React, Spring Boot & PostgreSQL
      </footer>
    </main>
  );
}
