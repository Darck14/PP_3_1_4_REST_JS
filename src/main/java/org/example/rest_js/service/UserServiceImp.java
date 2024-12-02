package org.example.rest_js.service;



import org.example.rest_js.model.User;
import org.example.rest_js.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    @Autowired
    UserServiceImp(UserRepository userRepository) {
    this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void addUser(User user) {
        System.out.println("Received JSON: " + user.toString());
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException(String.format("User with id %d not found", id)));

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByName(String name) {
        return userRepository.findByName(name).orElseThrow(() -> new RuntimeException(String.format("User with name %s not found", name)));
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return getUserByName(username);
    }
}
