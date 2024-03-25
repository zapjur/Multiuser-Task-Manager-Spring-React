package com.jpwp.project.backend.repositories;

import com.jpwp.project.backend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
