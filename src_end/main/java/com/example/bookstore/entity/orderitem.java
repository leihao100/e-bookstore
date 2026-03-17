package com.example.bookstore.entity;

import javax.persistence.*;

@Entity
public class orderitem {
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Id
    public int id;

    @ManyToOne
    @JoinColumn(name = "orders_id")
    public orders orders;

    @OneToOne
    @JoinColumn(name = "book_id")
    public book book;

    public int num;

    public int price;


    public com.example.bookstore.entity.book getBook() {
        return book;
    }

    public void setBook(com.example.bookstore.entity.book book) {
        this.book = book;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice() {
        this.price = getBook().getPrice()*getNum();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public com.example.bookstore.entity.orders getOrders() {
        return orders;
    }

    public void setOrders(com.example.bookstore.entity.orders orders) {
        this.orders = orders;
    }

    public orderitem(){}
}
