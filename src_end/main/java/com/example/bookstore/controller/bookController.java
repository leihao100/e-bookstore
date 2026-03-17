package com.example.bookstore.controller;
import com.example.bookstore.entity.book;
import com.example.bookstore.service.bookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class bookController {

    @Autowired
    bookService bookService;

    @CrossOrigin
    @RequestMapping("/books")
    public List<book> getbooks()  {
        return bookService.getAll();
    }

    @CrossOrigin
    @RequestMapping("/")
    public book getBookByName(String name){
        return bookService.getBook(name);
    }

    @CrossOrigin
    @RequestMapping("/editBook")
    public void editBook(String name, int price,String author,int valid,int num){
        System.out.println("try to edit");
        book book=bookService.getBook(name);
        if (book==null){
            book=new book();
            book.setName(name);
        }
        book.setAuthor(author);
        book.setPrice(price);
        book.setValid(valid);
        book.setNum(num);
        System.out.println(book.id+book.name+book.price);
        bookService.addBook(book);
    }

    @CrossOrigin
    @RequestMapping("/searchBook")
    public List<book> search(String name){
        System.out.println(name);
        List<book> result=new ArrayList<>();
        if (name==null|| name.equals("")){
            return bookService.getAll();
        }
        return bookService.searchBook(name);
    }

    @CrossOrigin
    @RequestMapping("/addBook")
    public void add(String name,int price,int num,String author,String picture){
        book book=new book();
        book.setNum(num);
        book.setAuthor(author);
        book.setName(name);
        book.setPrice(price);
        book.setValid(1);
        book.setPicture(picture);
        bookService.addBook(book);
    }
}

