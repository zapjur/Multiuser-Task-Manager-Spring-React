package com.jpwp.project.backend.controllers;

import com.jpwp.project.backend.dto.TaskDto;
import com.jpwp.project.backend.entities.Task;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final ProjectRepository projectRepository;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        Task task = taskService.createTask(taskDto);
        return new ResponseEntity<>(new TaskDto(task), HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskDto>> getTasksByProjectId(@PathVariable Long projectId) {
        List<Task> tasks = taskService.findTasksByProjectId(projectId);
        List<TaskDto> taskDtos = tasks.stream()
                .map(TaskDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(taskDtos);
    }

}
