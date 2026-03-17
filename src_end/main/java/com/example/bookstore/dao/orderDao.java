package com.example.bookstore.dao;

import com.example.bookstore.entity.*;

import java.util.List;

public interface orderDao {
    List<orders> findByUser(user user);

    List<orders> findByUserId(int id);

    List<orders> findAllByName(String name);

    List<orders> findAll();

    List<orderitem> getItemsById(int id);

    List<orderitem> getAllItem();

    void add(orders orders);


}
