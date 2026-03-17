package com.example.bookstore.service;

import com.example.bookstore.entity.book;
import com.example.bookstore.entity.orderitem;
import com.example.bookstore.entity.orders;
import com.example.bookstore.entity.user;
import javafx.util.Pair;

import java.time.LocalDate;
import java.util.List;

public interface orderService {
    List<orders> getOrdersByName(String name, LocalDate startDate, LocalDate endDate);

    List<orders> getOrdersByName(String name);

    List<orderitem> getItemsById(int id);

    void buyone(String bookName, String name);

    void toOrder(String name);

    List<Pair<book, Integer>> adminBookSalesWithDate(LocalDate startDate, LocalDate endDate);

    List<Pair<book, Integer>> adminBookSales();

    List<Pair<book, Integer>> userBookSale(String name);

    List<Pair<user,Integer>> adminUserCost();

    List<Pair<user,Integer>> adminUserCostWithTime(LocalDate startDate, LocalDate endDate);


    List<Pair<book,Integer>> userSum(String username);

    List<Pair<book,Integer>> userSum(String username, LocalDate startDate, LocalDate endDate);
}
