package com.example.bookstore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.bookstore.entity.*;

public interface userRepository extends CrudRepository<user,Long>{
    user findByName(String name);

    user findAllByName(String name);

}
