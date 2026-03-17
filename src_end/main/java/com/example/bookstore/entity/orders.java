package com.example.bookstore.entity;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "orders")
public class orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private user user;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "orders")
    private List<orderitem> orderitemList;

    public String time;


    public int cost=0;

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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public List<orderitem> getOrderitemList() {
        return orderitemList;
    }

    public void setOrderitemList(List<orderitem> orderitemList) {
        this.orderitemList = orderitemList;
    }

    public orders() {
    }
}
