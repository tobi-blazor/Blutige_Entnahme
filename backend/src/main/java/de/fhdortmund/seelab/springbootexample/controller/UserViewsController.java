package de.fhdortmund.seelab.springbootexample.controller;

import de.fhdortmund.seelab.springbootexample.entities.User;
import de.fhdortmund.seelab.springbootexample.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class UserViewsController {

    private UserService userService;

    @GetMapping("/createUser")
    public String createUser(Model model) {
        User user = new User();
        model.addAttribute("user", user);

        return "create_user";
    }

    @PostMapping("/createUser")
    public String createUser(@ModelAttribute User user, Model model) {
        model.addAttribute("user", user);

        userService.createUser(user);

        return "redirect:/";
    }

    @GetMapping("/")
    public String showUsers(Model model) {
        List<User> users = userService.getAllUsers();
        if (users != null) model.addAttribute("users", users);
        return "index";
    }

    @RequestMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/";
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
