package de.fhdortmund.seelab.springbootexample.services;

import de.fhdortmund.seelab.springbootexample.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User createUser(User user);
    void deleteUser(long userId);
}
