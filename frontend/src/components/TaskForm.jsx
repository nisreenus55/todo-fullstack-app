import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Please enter a task title.");
      return;
    }

    if (cleanTitle.length > 120 || description.length > 2000) {
      setError("Title or description exceeds the allowed length.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onCreate({
        title: cleanTitle,
        description: description.trim(),
        status: "TODO",
      });

      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Unable to save task.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-panel">
      <div className="section-heading">
        <h2>Create a task</h2>
        <span className="muted">Start with your next priority</span>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          placeholder="e.g. Build the login page"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          required
        />

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          placeholder="What needs to be done?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
          rows={3}
        />

        {error && <p className="field-error">{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Adding..." : "+ Add task"}
        </button>
      </form>
    </section>
  );
}
