import TaskCard from "./TaskCard";

const columns = [
  { status: "TODO", title: "Todo", color: "todo" },
  { status: "IN_PROGRESS", title: "In Progress", color: "progress" },
  { status: "DONE", title: "Done", color: "done" },
];

export default function TaskBoard({ tasks, onUpdate, onDelete }) {
  return (
    <section className="board" aria-label="Task board">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <section
            className="board-column"
            key={column.status}
            aria-label={`${column.title} tasks`}
          >
            <div className="column-heading">
              <span className={`status-dot ${column.color}`} />
              <h2>{column.title}</h2>
              <span className="task-count">{columnTasks.length}</span>
            </div>

            <div className="column-content">
              {columnTasks.length === 0 ? (
                <p className="empty-state">No tasks here yet.</p>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </section>
        );
      })}
    </section>
  );
}
