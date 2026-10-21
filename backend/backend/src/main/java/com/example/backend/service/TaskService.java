package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.model.TaskStatus;
import com.example.backend.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Task getTaskById(Long id) {
        return findTask(id);
    }

    @Transactional
    public Task createTask(Task input) {
        Task task = new Task();
        task.setTitle(input.getTitle().trim());
        task.setDescription(normalizeDescription(input.getDescription()));
        task.setStatus(
                input.getStatus() == null ? TaskStatus.TODO : input.getStatus()
        );

        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long id, Task input) {
        Task existing = findTask(id);

        existing.setTitle(input.getTitle().trim());
        existing.setDescription(normalizeDescription(input.getDescription()));
        existing.setStatus(input.getStatus());

        return taskRepository.save(existing);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = findTask(id);
        taskRepository.delete(task);
    }

    private Task findTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Task not found"
                ));
    }

    private String normalizeDescription(String description) {
        if (description == null || description.isBlank()) {
            return null;
        }
        return description.trim();
    }
}
