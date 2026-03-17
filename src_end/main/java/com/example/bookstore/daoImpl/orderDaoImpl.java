package com.example.bookstore.daoImpl;

import com.example.bookstore.entity.*;
import com.example.bookstore.repository.orderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class orderDaoImpl implements com.example.bookstore.dao.orderDao {
    @Autowired
    orderRepository orderRepository;

    @Override
    public List<orders> findByUser(user user){
        return (List<orders>) orderRepository.findAllByUser(user);
    }

    @Override
    public List<orders> findByUserId(int id){
        return (List<orders>) orderRepository.findAllByUser_Id(id);
    }

    @Override
    public List<orders> findAllByName(String name){
        return (List<orders>) orderRepository.findAllByUser_Name(name);
    }

    @Override
    public List<orders> findAll(){return (List<orders>) orderRepository.findAll();}
    @Override
    public List<orderitem> getItemsById(int id) {
        return orderRepository.findAllById(id).getOrderitemList();
    }

    @Override
    public List<orderitem> getAllItem(){
        List<orderitem> orderitems = new ArrayList<>();
        List<orders> orders=(List<orders>)orderRepository.findAll();
        for (int i = 0; i < orders.size(); i++) {
            orderitems.addAll(orders.get(i).getOrderitemList());
        }
        return orderitems;
    }
    @Override
    public void add(orders orders){
        orderRepository.save(orders);
    }


}
