package com.jpwp.project.backend.services;

import com.jpwp.project.backend.dto.TaskDto;
import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.Task;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.repositories.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public Task createTask(TaskDto taskDto) {
        Project project = projectRepository.findById(taskDto.getSelectedProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStatus(taskDto.getStatus());
        task.setProject(project);

        return taskRepository.save(task);
    }

    public List<Task> findTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

}
