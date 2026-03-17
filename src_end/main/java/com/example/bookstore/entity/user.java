package com.example.bookstore.entity;

import javax.persistence.*;
import com.example.bookstore.entity.*;
import org.springframework.web.bind.annotation.Mapping;

import java.util.ArrayList;
import java.util.List;

@Entity
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public int valid;

    public String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userAuth_id")
    public userAuth userAuth;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public userAuth getUserAuth() {
        return userAuth;
    }

    public void setUserAuth(userAuth userAuth) {
        this.userAuth = userAuth;
    }

    public int getValid() {
        return valid;
    }

    public void setValid(int valid) {
        this.valid = valid;
    }
}
