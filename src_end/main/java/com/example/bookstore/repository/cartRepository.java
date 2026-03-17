package com.example.bookstore.repository;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.bookstore.entity.*;
@Repository
public interface cartRepository extends CrudRepository<cart,Long> {
    void deleteAllByUser_Id(int user_id);

    void deleteAllByUser_Name(String name);

    Iterable<cart> findAllByUser_Name(String name);

}
