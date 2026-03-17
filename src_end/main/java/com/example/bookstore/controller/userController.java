package com.example.bookstore.controller;

import com.example.bookstore.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.bookstore.serviceImpl.*;
import com.example.bookstore.service.*;

import java.util.List;

@RestController
@CrossOrigin
public class userController {
    @Autowired
    userService userService;

    @RequestMapping("/allUser")
    public List<user> getAll(){
        return userService.getAll();
    }

    @RequestMapping("/login")
    public int login(String name,String password){
        return userService.login(name, password);
    }

    @RequestMapping("/signup")
    public boolean signup(@RequestParam(name="name")String account, @RequestParam(name="password")String password, @RequestParam(name="type")int type){
        return userService.signup(account, password,type);
    }

    @RequestMapping("/type")
    public int getType(String name){
        return userService.getTypeByName(name);
    }

    @RequestMapping("/valid")
    public void changeValid(String name,int valid){
        userService.changeValid(name, valid);
    }
}
