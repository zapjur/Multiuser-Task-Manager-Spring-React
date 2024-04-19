package com.jpwp.project.backend.controllers;

import com.jpwp.project.backend.dto.ProjectDto;
import com.jpwp.project.backend.dto.UserDto;
import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.repositories.ProjectRepository;
import com.jpwp.project.backend.services.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.jpwp.project.backend.services.UserService;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getProjectsForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        List<Project> projects = projectRepository.findByUsersContains(currentUser);

        List<ProjectDto> projectDtos = projects.stream()
                .map(ProjectDto::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(projectDtos, HttpStatus.OK);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<ProjectDto>> getFavoriteProjectsForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        List<Project> favorites = currentUser.getFavoriteProjects();

        List<ProjectDto> favoritesDtos = favorites.stream()
                .map(ProjectDto::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(favoritesDtos, HttpStatus.OK);
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

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/members/{projectId}")
    public ResponseEntity<?> addMemberToProject(@PathVariable Long projectId, @RequestBody UserDto userDto) {
        try {
            projectService.addMemberToProject(projectId, userDto.getLogin());
            return ResponseEntity.ok().build();
        } catch (UsernameNotFoundException | EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/members/{projectId}")
    public ResponseEntity<?> deleteMemberFromProject(@PathVariable Long projectId, @RequestBody List<String> usersToDelete) {
        projectService.deleteMemberFromProject(projectId, usersToDelete);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/favorites/{projectId}")
    public ResponseEntity<?> addProjectToFavorite(@PathVariable Long projectId) {
        projectService.addProjectToFavorite(projectId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/favorites/{projectId}")
    public ResponseEntity<?> removeProjectToFavorite(@PathVariable Long projectId) {
        projectService.removeProjectFromFavorite(projectId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit/{projectId}")
    public ResponseEntity<ProjectDto> editProject(@PathVariable Long projectId, @RequestBody Map<String, String> projectData) {
        Project project =  projectService.editProject(projectId, projectData);
        ProjectDto responseDto = new ProjectDto(project);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/leave/{projectId}")
    public ResponseEntity<?> leaveProject(@PathVariable Long projectId) {
        projectService.leaveProject(projectId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/invitationCode/{code}")
    public ResponseEntity<?> joinProject(@PathVariable String code) {
        projectService.joinProject(code);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/invitationCode/{projectId}")
    public ResponseEntity<String> getInvitationCode(@PathVariable Long projectId) {

        return ResponseEntity.ok(projectService.getOrGenerateInvitationCode(projectId));
    }

}
