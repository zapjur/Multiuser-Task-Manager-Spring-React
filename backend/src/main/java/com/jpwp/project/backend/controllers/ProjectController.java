package com.jpwp.project.backend.controllers;

import com.jpwp.project.backend.dto.ProjectDto;
import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

import com.jpwp.project.backend.services.UserService;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getProjectsForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        List<Project> projects = projectRepository.findByUsersContains(currentUser);

        List<ProjectDto> projectDtos = projects.stream()
                .map(ProjectDto::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(projectDtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto) {
        User currentUser = userService.getCurrentUser();

        Project project = new Project();
        project.setTitle(projectDto.getTitle());
        project.setDescription(projectDto.getDescription());
        project.setOwner(currentUser);

        currentUser.addProject(project);
        project = projectRepository.save(project);
        userService.saveUser(currentUser);

        ProjectDto responseDto = new ProjectDto(project);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }



}
