package com.example.bookstore.service;

import com.example.bookstore.entity.user;

import java.util.List;

public interface userService {

    int login(String account, String password);

    user getUserbyName(String name);

    boolean signup(String account, String password, int type);

    int getTypeByName(String name);

    void changeValid(String name, int valid);

    List<user> getAll();
}
