package com.jpwp.project.backend.repositories;


import com.jpwp.project.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findByLogin(String login);
}
