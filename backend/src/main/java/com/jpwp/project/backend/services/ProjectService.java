package com.jpwp.project.backend.services;

import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.repositories.TaskRepository;
import com.jpwp.project.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final UserService userService;

    @Transactional
    public void addMemberToProject(Long projectId, String username) {
        User user = userRepository.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono użytkownika o nazwie: " + username));

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono projektu o ID: " + projectId));

        project.getUsers().add(user);
        projectRepository.save(project);
    }

    @Transactional
    public void deleteMemberFromProject(Long projectId, List<String> usernames) {
        User currentUser = userService.getCurrentUser();
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (!project.getOwner().equals(currentUser)) {
            throw new AccessDeniedException("Not authorized to delete member from this project");
        }

        List<User> usersToRemove = userRepository.findByLoginIn(usernames)
                .orElseThrow(() -> new EntityNotFoundException("Some users not found"));

        usersToRemove.forEach(userToRemove -> {
            project.getTasks().forEach(task -> {
                if(task.getAssignedUsers().contains(userToRemove)) {
                    task.getAssignedUsers().remove(userToRemove);
                    userToRemove.getTasks().remove(task);
                    taskRepository.save(task);
                }
            });

            project.getUsers().remove(userToRemove);
            userRepository.save(userToRemove);
        });

        projectRepository.save(project);
    }

    @Transactional
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

    @Transactional
    public void addProjectToFavorite(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        User currentUser = userService.getCurrentUser();

        currentUser.addFavoriteProject(project);
        userRepository.save(currentUser);
    }

    @Transactional
    public void removeProjectFromFavorite(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        User currentUser = userService.getCurrentUser();

        currentUser.removeFavoriteProject(project);
        userRepository.save(currentUser);
    }

    @Transactional
    public Project editProject(Long projectId, Map<String, String> projectData) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        project.setTitle(projectData.get("title"));
        project.setDescription(projectData.get("description"));

        projectRepository.save(project);

        return project;
    }
}
