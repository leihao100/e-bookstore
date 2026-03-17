package com.example.bookstore.entity;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public int id;

    public String name;

    public String author;

    public String picture;

    public int valid;

    public int num;

    public int price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public int getValid() {
        return valid;
    }

    public void setValid(int valid) {
        this.valid = valid;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public book(){}
    public book(String name, String author, int price) {
        this.author = author;
        this.name = name;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        book book = (book) o;
        return id == book.id && price == book.price && Objects.equals(name, book.name) && Objects.equals(author, book.author) && Objects.equals(picture, book.picture);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, author, picture, price);
    }
}
