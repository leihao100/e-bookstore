package com.example.bookstore.daoImpl;

import com.example.bookstore.entity.book;
import com.example.bookstore.repository.bookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class bookDaoImpl implements com.example.bookstore.dao.bookDao {
    @Autowired
    bookRepository bookRepository;

    @Override
    public book findByName(String name){
        return bookRepository.getAllByName(name);
    }

    @Override
    public List<book> getAll(){
        return (List<book>) bookRepository.findAll();
    }

    @Override
    public void addBook(book book){
        bookRepository.save(book);
    }

    @Override
    public void deleteByName(String name){
        bookRepository.deleteAllByName(name);
    }
}
