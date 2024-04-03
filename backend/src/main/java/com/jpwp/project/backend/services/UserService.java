package com.jpwp.project.backend.services;


import com.jpwp.project.backend.dto.CredentialsDto;
import com.jpwp.project.backend.dto.SignUpDto;
import com.jpwp.project.backend.dto.UserDto;
import com.jpwp.project.backend.entities.Task;
import com.jpwp.project.backend.entities.User;
import com.jpwp.project.backend.exceptions.AppException;
import com.jpwp.project.backend.mappers.UserMapper;
import com.jpwp.project.backend.repositories.TaskRepository;
import com.jpwp.project.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final TaskRepository taskRepository;

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return userMapper.toUserDto(user);
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if(optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);

        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        return userRepository.findByLogin(currentUserName)
                .orElseThrow(() -> new AppException("Użytkownik nie został znaleziony.", HttpStatus.NOT_FOUND));
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

}
