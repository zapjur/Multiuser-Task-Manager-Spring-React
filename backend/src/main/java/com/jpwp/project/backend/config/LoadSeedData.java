package com.jpwp.project.backend.config;

import com.jpwp.project.backend.entities.Project;
import com.jpwp.project.backend.repositories.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadSeedData {

    /*@Bean
    CommandLineRunner initDatabase(ProjectRepository projectRepository) {
        return args -> {

            String projectName = "Projekt JPWP";
            boolean projectExists = projectRepository.findByTitle(projectName).isPresent();

            if (!projectExists) {
                Project project = new Project();
                project.setTitle(projectName);
                project.setDescription("Taka jira lub trello ale lepsze");
                projectRepository.save(project);
            }
        };
    }*/
}
