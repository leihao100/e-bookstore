package com.example.bookstore.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.bookstore.entity.book;
@Repository
public interface bookRepository extends CrudRepository<book,Long> {
    book getAllByName(String name);
    void deleteAllByName(String name);
}
