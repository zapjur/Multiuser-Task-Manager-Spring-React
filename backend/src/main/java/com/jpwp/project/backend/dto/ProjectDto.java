package com.jpwp.project.backend.dto;

import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class ProjectDto {

    private Long id;
    private String title;
    private String description;
    private List<String> users;

    public ProjectDto(Project project) {
        this.id = project.getId();
        this.title = project.getTitle();
        this.description = project.getDescription();
        this.users = project.getUsers().stream()
                .map(User::getLogin)
                .collect(Collectors.toList());
    }

}
