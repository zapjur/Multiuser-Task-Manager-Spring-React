package com.jpwp.project.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "app_user")
@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

    @ManyToMany(mappedBy = "users")
    private List<Project> projects = new ArrayList<>();

    @ManyToMany(mappedBy = "assignedUsers")
    private List<Task> tasks = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_favorite_projects",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> favoriteProjects = new ArrayList<>();

    public void addProject(Project project) {
        this.projects.add(project);
        project.getUsers().add(this);
    }

    public void addFavoriteProject(Project project) {
        this.favoriteProjects.add(project);
    }

    public void removeFavoriteProject(Project project) {
        this.favoriteProjects.remove(project);
    }


}
