package com.example.bookstore.entity;

import javax.persistence.*;
import com.example.bookstore.entity.*;
@Entity
@Table(name = "cart")
public class cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private user user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private book book;
    public int num;
    public int totalprice;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public com.example.bookstore.entity.user getUser() {
        return user;
    }

    public void setUser(com.example.bookstore.entity.user user) {
        this.user = user;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public int getTotalprice() {
        return totalprice;
    }

    public void setTotalprice() {
        this.totalprice = getBook().getPrice()*getNum();
    }

    public cart(){}

    public com.example.bookstore.entity.book getBook() {
        return book;
    }

    public void setBook(com.example.bookstore.entity.book book) {
        this.book = book;
    }
}
