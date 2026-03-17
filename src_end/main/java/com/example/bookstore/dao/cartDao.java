package com.example.bookstore.dao;

import com.example.bookstore.entity.cart;

import java.util.List;

public interface cartDao {
    List<cart> findByUserName(String name);

    void add(cart cart);

    void deleteByName(String name);
}
