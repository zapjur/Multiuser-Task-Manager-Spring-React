package com.jpwp.project.backend.repositories;

import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByTitle(String title);
    List<Project> findAllByOwner(User owner);
    List<Project> findByUsersContains(User user);


}
