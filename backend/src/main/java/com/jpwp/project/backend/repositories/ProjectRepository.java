package com.jpwp.project.backend.repositories;

import com.jpwp.project.backend.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
