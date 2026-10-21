package com.example.backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

@Entity
@Table(name = "tasks")
public class Task {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank(message = "Title is required")
        @Size(max = 120, message = "Title cannot exceed 120 characters")
        @Column(nullable = false, length = 120)
        private String title;

        @Size(max = 2000, message = "Description cannot exceed 2000 characters")
        @Column(length = 2000)
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false, length = 20)
        private TaskStatus status = TaskStatus.TODO;

        @Column(nullable = false, updatable = false)
        private Instant createdAt;

        public Task() {
        }

        @PrePersist
        protected void onCreate() {
            if (createdAt == null) {
                createdAt = Instant.now();
            }
            if (status == null) {
                status = TaskStatus.TODO;
            }
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public TaskStatus getStatus() {
            return status;
        }

        public void setStatus(TaskStatus status) {
            this.status = status;
        }

        public Instant getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(Instant createdAt) {
            this.createdAt = createdAt;
        }
}
