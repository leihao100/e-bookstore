package com.example.bookstore.controller;

import com.example.bookstore.entity.book;
import com.example.bookstore.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.bookstore.entity.*;

import java.util.List;

@RestController
@CrossOrigin
public class cartController {
    @Autowired
    private cartService cartService;

    @Autowired
    private userService userService;

    @Autowired
    private bookService bookService;
    @RequestMapping("/cart")
    List<cart> getCart(String name){
    return cartService.getCart(name);
    }

    @RequestMapping("/addcart")
    public void addToCart(String name,String user,int num) {
        book book=bookService.getBook(name);
        user thisuser=userService.getUserbyName(user);
        cartService.addCart(book,user,num);
    }

}
