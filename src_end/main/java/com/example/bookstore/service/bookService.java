package com.example.bookstore.service;

import com.example.bookstore.entity.book;

import java.util.List;

public interface bookService {
    List<book> getAll();

    void addBook(book book);

    book getBook(String name);

    List<book> searchBook(String name);

    void bookDecrease(book book, int num);
}
