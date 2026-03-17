package com.example.bookstore.service;

import com.example.bookstore.entity.book;
import com.example.bookstore.entity.cart;

import java.util.List;

public interface cartService {
    List<cart> getCart(String name);

    void addCart(book book, String name, int num);


    void clearByName(String name);
}
