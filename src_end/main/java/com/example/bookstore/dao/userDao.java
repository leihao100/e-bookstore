package com.example.bookstore.dao;

import com.example.bookstore.entity.user;

import java.util.List;

public interface userDao {
    user findByName(String name);

    void save(user user);

    List<user> getAll();
}
