package org.example.rest_js.service;



import org.example.rest_js.dto.UserDTO;
import org.example.rest_js.model.Role;
import org.example.rest_js.model.User;
import org.example.rest_js.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    UserServiceImp(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.roleService = roleService;
    this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO toDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setPassword(user.getPassword());
        userDTO.setSername(user.getSername());
        userDTO.setSex(user.getSex());
        userDTO.setRoles(user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList()));
        return userDTO;
    }

    @Override
    public User fromDTO(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setPassword(this.checkPassword(userDTO));
        user.setSername(userDTO.getSername());
        user.setSex(userDTO.getSex());
        user.setRoles(roleService.iterateRoles(userDTO.getRoles()));
        return user;
    }

    @Override
    @Transactional
    public void addUser(UserDTO userDTO) {
        User user = fromDTO(userDTO);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUser(UserDTO userDTO) {
        User user = fromDTO(userDTO);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO getUserById(long id) {
         return this.toDTO(userRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException(String
                         .format("User with id %d not found", id))));

    }

    @Override
    public List<UserDTO> getAllUsers() {
         return userRepository.findAll().stream()
                 .map(this::toDTO)
                 .collect(Collectors.toList());
    }

    @Override
    public User getUserByName(String name) {
        return userRepository.findByName(name).orElseThrow(() -> new RuntimeException(String.format("User with name %s not found", name)));
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return getUserByName(username);
    }

    private String checkPassword(UserDTO userDTO) {
        if (userDTO.getId() == 0 || !passwordEncoder.matches(userDTO.getPassword(),
                this.getUserById(userDTO.getId()).getPassword())) {
           return userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        } else {
           return userDTO.getPassword();
        }
    }
}
