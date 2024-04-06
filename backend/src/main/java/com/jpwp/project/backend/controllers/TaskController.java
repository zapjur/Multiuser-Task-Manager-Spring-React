package com.jpwp.project.backend.controllers;

import com.jpwp.project.backend.dto.TaskDto;
import com.jpwp.project.backend.entities.Task;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.services.TaskService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Long taskId, @RequestBody Map<String, String> status) {
        try {
            taskService.updateTaskStatus(taskId, status.get("status"));
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update task");
        }
    }

    @PutMapping("/edit/{taskId}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long taskId, @RequestBody TaskDto taskDto) {
        Task updatedTask = taskService.updateTask(taskId, taskDto);
        return ResponseEntity.ok(new TaskDto(updatedTask));
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }

}
