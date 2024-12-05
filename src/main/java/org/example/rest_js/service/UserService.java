package org.example.rest_js.service;

import org.example.rest_js.dto.UserDTO;
import org.example.rest_js.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    void addUser(UserDTO userDTO);

    void updateUser(UserDTO userDTO);

    void deleteUserById(long id);

    UserDTO getUserById(long id);

    List<UserDTO> getAllUsers();

    User getUserByName(String name);

    UserDetails loadUserByUsername(String username);

    UserDTO toDTO(User user);

    User fromDTO(UserDTO userDTO);


}
