package com.example.bookstore.repository;

import com.example.bookstore.entity.*;
import org.springframework.data.repository.CrudRepository;

public interface orderRepository extends CrudRepository<orders,Long> {

    Iterable<orders> findAllByUser_Name(String name);

    void deleteAllByUser_Name(String name);

    Iterable<orders> findAllByUser_Id(int id);

    Iterable<orders> findAllByUser(user user);

    orders findAllById(int id);
}
