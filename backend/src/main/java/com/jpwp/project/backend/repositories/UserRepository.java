package com.jpwp.project.backend.repositories;


import com.jpwp.project.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);
    @Query("SELECT u FROM User u WHERE u.login IN :logins")
    Optional<List<User>> findByLoginIn(List<String> logins);
}
