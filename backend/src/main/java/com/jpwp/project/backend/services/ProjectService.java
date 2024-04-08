package com.jpwp.project.backend.services;

import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.mapstruct.control.MappingControl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

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

        project.getUsers().forEach(user -> {
            user.getProjects().remove(project);
            userRepository.save(user);
        });

        projectRepository.deleteById(projectId);
    }

    public void addProjectToFavorite(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        User currentUser = userService.getCurrentUser();

        currentUser.addFavoriteProject(project);
        userRepository.save(currentUser);
    }

    public void removeProjectFromFavorite(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        User currentUser = userService.getCurrentUser();

        currentUser.removeFavoriteProject(project);
        userRepository.save(currentUser);
    }

    public Project editProject(Long projectId, Map<String, String> projectData) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        project.setTitle(projectData.get("title"));
        project.setDescription(projectData.get("description"));

        projectRepository.save(project);

        return project;
    }
}
