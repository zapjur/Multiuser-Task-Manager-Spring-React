package com.jpwp.project.backend.dto;

import com.jpwp.project.backend.entities.Task;
import com.jpwp.project.backend.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private Long projectId;
    private LocalDateTime deadline;
    private List<String> assignedUsers;

    public TaskDto(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
        this.projectId = task.getProject().getId();
        this.deadline = task.getDeadline();
        this.assignedUsers = task.getAssignedUsers().stream()
                .map(User::getLogin)
                .collect(Collectors.toList());
    }

}
