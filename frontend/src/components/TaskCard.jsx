import { useState } from "react";

const statuses = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function changeStatus(status) {
    setBusy(true);
    setError("");

    try {
      await onUpdate(task.id, { status });
    } catch (err) {
      setError(err.message || "Unable to update status.");
    } finally {
      setBusy(false);
    }
  }

  async function saveEdit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Title cannot be empty.");
      return;
    }

    if (cleanTitle.length > 120 || description.length > 2000) {
      setError("Title or description is too long.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      await onUpdate(task.id, {
        title: cleanTitle,
        description: description.trim(),
      });

      setEditing(false);
    } catch (err) {
      setError(err.message || "Unable to save changes.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteTask() {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    setBusy(true);
    setError("");

    try {
      await onDelete(task.id);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="task-card">
      {editing ? (
        <form onSubmit={saveEdit} className="edit-form">
          <label htmlFor={`title-${task.id}`}>Title</label>
          <input
            id={`title-${task.id}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            required
          />

          <label htmlFor={`description-${task.id}`}>Description</label>
          <textarea
            id={`description-${task.id}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={2000}
            rows={3}
          />

          <div className="card-actions">
            <button type="submit" disabled={busy}>
              Save
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setTitle(task.title);
                setDescription(task.description || "");
                setEditing(false);
                setError("");
              }}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <p className="task-date">
            Created{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "just now"}
          </p>

          <div className="card-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditing(true)}
              disabled={busy}
            >
              Edit
            </button>

            <button
              type="button"
              className="danger-button"
              onClick={deleteTask}
              disabled={busy}
            >
              Delete
            </button>
          </div>

          <label htmlFor={`status-${task.id}`} className="status-label">
            Move task
          </label>

          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(e) => changeStatus(e.target.value)}
            disabled={busy}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </>
      )}

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      {busy && (
        <p className="muted" role="status">
          Saving...
        </p>
      )}
    </article>
  );
}
