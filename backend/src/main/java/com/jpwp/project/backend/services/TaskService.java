package com.jpwp.project.backend.services;

import com.jpwp.project.backend.dto.TaskDto;
import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.Task;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.repositories.TaskRepository;
import com.jpwp.project.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional
    public Task createTask(TaskDto taskDto) {
        Project project = projectRepository.findById(taskDto.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setProject(project);
        task.setDeadline(taskDto.getDeadline());
        List<User> assignedUsers = taskDto.getAssignedUsers().stream()
                .map(login -> userRepository.findByLogin(login)
                        .orElseThrow(() -> new EntityNotFoundException("User not found with login: " + login)))
                .collect(Collectors.toList());
        task.setAssignedUsers(assignedUsers);

        task.getAssignedUsers().forEach(user -> {
            user.getTasks().add(task);
            userRepository.save(user);
        });

        return taskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public List<Task> findTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Transactional
    public void updateTaskStatus(Long taskId, String newStatus) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));
        task.setStatus(newStatus);
        taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long taskId, TaskDto taskDto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDeadline(taskDto.getDeadline());

        List<User> assignedUsers = taskDto.getAssignedUsers().stream()
                .map(login -> userRepository.findByLogin(login)
                        .orElseThrow(() -> new EntityNotFoundException("User not found with login: " + login)))
                .collect(Collectors.toList());
        task.setAssignedUsers(assignedUsers);

        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + taskId));

        Project project = task.getProject();
        project.getTasks().remove(task);
        projectRepository.save(project);

        task.getAssignedUsers().forEach(user -> {
            user.getTasks().remove(task);
            userRepository.save(user);
        });

        taskRepository.deleteById(taskId);
    }

}
