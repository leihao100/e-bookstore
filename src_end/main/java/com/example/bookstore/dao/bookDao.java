package com.example.bookstore.dao;

import com.example.bookstore.entity.book;

import java.util.List;

public interface bookDao {
    book findByName(String name);

    List<book> getAll();

    void addBook(book book);

    void deleteByName(String name);
}
