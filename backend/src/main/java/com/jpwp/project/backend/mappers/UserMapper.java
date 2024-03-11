package com.jpwp.project.backend.mappers;

import com.jpwp.project.backend.dto.SignUpDto;
import com.jpwp.project.backend.dto.UserDto;
import com.jpwp.project.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto userDto);
}
