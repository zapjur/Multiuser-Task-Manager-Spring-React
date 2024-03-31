package com.jpwp.project.backend.dto;

import com.jpwp.project.backend.entities.Task;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private Long selectedProjectId;

    public TaskDto(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
        this.selectedProjectId = task.getProject().getId();
    }

}
