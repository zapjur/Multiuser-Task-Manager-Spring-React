package com.jpwp.project.backend.services;

import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public void addMemberToProject(Long projectId, String username) {
        User user = userRepository.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono użytkownika o nazwie: " + username));

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono projektu o ID: " + projectId));

        project.getUsers().add(user);
        projectRepository.save(project);
    }

    public void deleteProject(Long projectId) {
        User currentUser = userService.getCurrentUser();
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (!project.getOwner().equals(currentUser)) {
            throw new AccessDeniedException("Not authorized to delete this project");
        }

        project.getTasks().forEach(task -> {
            task.getAssignedUsers().forEach(user -> {
                user.getTasks().remove(task);
                userRepository.save(user);
            });
        });

        projectRepository.deleteById(projectId);
    }
}
