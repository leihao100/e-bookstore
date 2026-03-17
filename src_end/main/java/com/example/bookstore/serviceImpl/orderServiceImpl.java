package com.example.bookstore.serviceImpl;

import com.example.bookstore.dao.orderDao;
import com.example.bookstore.entity.*;
import com.example.bookstore.service.*;
import com.example.bookstore.service.userService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class orderServiceImpl implements orderService {
    @Autowired
    orderDao orderDao;

    @Autowired
    cartService cartService;

    @Autowired
    userService userService;

    @Autowired
    bookService bookService;

    @Override
    public List<orders> getOrdersByName(String name, LocalDate startDate, LocalDate endDate){
        user user=userService.getUserbyName(name);
        List<orders> orders;
        List<orders> result=new ArrayList<>();
        if (user.getUserAuth().getType()>1){
            orders=orderDao.findAll();
        }else {
            orders=orderDao.findAllByName(name);
        }
        for (orders order:orders
             ) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDate date = LocalDate.parse(order.getTime(), formatter);
            if (date.isAfter(startDate)&&date.isBefore(endDate)){
                result.add(order);
            }
        }
        return result;
    }
    @Override
    public List<orders> getOrdersByName(String name){
        user user=userService.getUserbyName(name);
        List<orders> orders;
        List<orders> result=new ArrayList<>();
        if (user.getUserAuth().getType()>1){
            orders=orderDao.findAll();
        }else {
            orders=orderDao.findAllByName(name);
        }
        return orders;
    }
    @Override
    public List<orderitem> getItemsById(int id){
        return orderDao.getItemsById(id);
    }
    @Override
    public void buyone(String bookName, String name){
        user user=userService.getUserbyName(name);
        book book=bookService.getBook(bookName);
        orderitem orderitem=new orderitem();
        orders orders=new orders();
        List<orderitem> orderitems=new ArrayList<>();
        orderitem.setBook(book);
        orderitem.setNum(1);
        orderitem.setPrice();
        orderitem.setOrders(orders);
        orderitems.add(orderitem);
        orders.setUser(user);
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String datetime = tempDate.format(new java.util.Date());
        orders.setTime(datetime);
        orders.setUser(user);
        orders.setOrderitemList(orderitems);
        orders.setCost(book.price);
        orderDao.add(orders);
        bookService.bookDecrease(book,1);
    }

    @Override
    public void toOrder(String name){//name 为用户name
        System.out.println("user's name is"+name);
        SimpleDateFormat tempDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String datetime = tempDate.format(new java.util.Date());
        List<cart> cart=cartService.getCart(name);
        user user=userService.getUserbyName(name);
        System.out.println("user's name is"+name);
        orders orders=new orders();
        int totalcost=0;
        List<orderitem> orderitems=new ArrayList<>();
        for (int i = 0; i < cart.size(); i++) {
            orderitem orderitem=new orderitem();
            orderitem.setBook(cart.get(i).getBook());
            orderitem.setNum(cart.get(i).getNum());
            orderitem.setPrice();
            orderitem.setOrders(orders);
            totalcost += orderitem.getPrice();
            orderitems.add(orderitem);
            bookService.bookDecrease(cart.get(i).getBook(),cart.get(i).getNum());
        }
        System.out.println("total="+totalcost);
        orders.setCost(totalcost);
        orders.setTime(datetime);
        orders.setUser(user);
        orders.setOrderitemList(orderitems);
        System.out.println("ordertotal="+orders.getCost());
        orderDao.add(orders);
        cartService.clearByName(name);
    }

    @Override
    public List<Pair<book, Integer>> adminBookSalesWithDate(LocalDate startDate, LocalDate endDate){
        List<orders> orders=orderDao.findAll();
        List<Pair<book, Integer>> result=new ArrayList<>();
        List<orders> finalOrders=new ArrayList<>();
        for (orders order:orders) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDate date = LocalDate.parse(order.getTime(), formatter);
            if (date.isAfter(startDate)&&date.isBefore(endDate)){
                finalOrders.add(order);
            }
        }
        List<orderitem> orderitems=new ArrayList<>();
        for (orders order:finalOrders
             ) {
            orderitems.addAll(order.getOrderitemList());
        }
        for (com.example.bookstore.entity.orderitem orderitem : orderitems) {
            Pair<book, Integer> tmp = new Pair<>(orderitem.getBook(), orderitem.getNum());
            result.add(tmp);
        }
        Map<book,Integer> map=new HashMap<>();
        for (Pair<book, Integer> pair: result){
            book book = pair.getKey();
            int num=pair.getValue();
            if (map.containsKey(book)){
                num+=map.get(book);
                map.put(book,num);
            }else {
                map.put(book,num);
            }
        }
        List<Pair<book, Integer>> merged=new ArrayList<>();
        for (Map.Entry<book,Integer> entry: map.entrySet()) {
            merged.add(new Pair<>(entry.getKey(),entry.getValue()));
        }
        Comparator<Pair<book, Integer>> comparator= Comparator.comparing(Pair::getValue);
        merged.sort(comparator.reversed());
        return merged;
    }

    @Override
    public List<Pair<book, Integer>> adminBookSales(){
        List<Pair<book, Integer>> result=new ArrayList<>();
        List<orderitem> orderitems=orderDao.getAllItem();
        for (com.example.bookstore.entity.orderitem orderitem : orderitems) {
            Pair<book, Integer> tmp = new Pair<>(orderitem.getBook(), orderitem.getNum());
            result.add(tmp);
        }
        Map<book,Integer> map=new HashMap<>();
        for (Pair<book, Integer> pair: result){
            book book = pair.getKey();
            int num=pair.getValue();
            if (map.containsKey(book)){
                num+=map.get(book);
                map.put(book,num);
            }else {
                map.put(book,num);
            }
        }
        List<Pair<book, Integer>> merged=new ArrayList<>();
        for (Map.Entry<book,Integer> entry: map.entrySet()) {
            merged.add(new Pair<>(entry.getKey(),entry.getValue()));
        }
        Comparator<Pair<book, Integer>> comparator= Comparator.comparing(Pair::getValue);
        merged.sort(comparator.reversed());
        return merged;
    }

    @Override
    public List<Pair<book, Integer>> userBookSale(String name){
        List<Pair<book, Integer>> result=new ArrayList<>();

        List<orderitem> orderitems=new ArrayList<>();
        List<orders> orders=orderDao.findAllByName(name);
        for (orders order :orders) {
            orderitems.addAll(orderDao.getItemsById(order.getId()));
        }
        for (com.example.bookstore.entity.orderitem orderitem : orderitems) {
            Pair<book, Integer> tmp = new Pair<>(orderitem.getBook(), orderitem.getNum());
            result.add(tmp);
        }
        Map<book,Integer> map=new HashMap<>();
        for (Pair<book, Integer> pair: result){
            book book = pair.getKey();
            int num=pair.getValue();
            if (map.containsKey(book)){
                num+=map.get(book);
                map.put(book,num);
            }else {
                map.put(book,num);
            }
        }
        List<Pair<book, Integer>> merged=new ArrayList<>();
        for (Map.Entry<book,Integer> entry: map.entrySet()) {
            merged.add(new Pair<>(entry.getKey(),entry.getValue()));
        }
        Comparator<Pair<book, Integer>> comparator= Comparator.comparing(Pair::getValue);
        merged.sort(comparator.reversed());
        return merged;
    }

    @Override
    public List<Pair<user,Integer>> adminUserCost(){
        List<Pair<user,Integer>> result =new ArrayList<>();
        List<user> users =userService.getAll();
        for (user user:users) {
            List<orders> ordersList=orderDao.findByUser(user);
            int sum=0;
            for (orders order :
                    ordersList) {
                sum+= order.cost;
            }
            result.add(new Pair<>(user,sum));
        }
        Comparator<Pair<user, Integer>> comparator= Comparator.comparing(Pair::getValue);
        result.sort(comparator.reversed());
        return result;
    }

    @Override
    public List<Pair<user,Integer>> adminUserCostWithTime(LocalDate startDate, LocalDate endDate){
        List<Pair<user,Integer>> result =new ArrayList<>();
        List<user> users =userService.getAll();
        for (user user:users) {
            List<orders> ordersList=orderDao.findByUser(user);
            int sum=0;
            for (orders order :
                    ordersList) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDate date = LocalDate.parse(order.getTime(), formatter);
                if (date.isAfter(startDate)&&date.isBefore(endDate)){
                    sum+= order.cost;
                }
            }
            result.add(new Pair<>(user,sum));
        }
        Comparator<Pair<user, Integer>> comparator= Comparator.comparing(Pair::getValue);
        result.sort(comparator.reversed());
        return result;
    }
    @Override
    public List<Pair<book,Integer>> userSum(String username){
        List<orders> orders=orderDao.findAllByName(username);
        List<orderitem> orderitemList=new ArrayList<>();
        for (orders order:orders
             ) {
            orderitemList.addAll(order.getOrderitemList());
        }
        Map<book,Integer> map=new HashMap<>();
        for (orderitem orderitem:orderitemList
             ) {
            book book=orderitem.getBook();
            int num=orderitem.getNum();
            if (map.containsKey(book)){
                num+=map.get(book);
                map.put(book,num);
            }else {
                map.put(book,num);
            }
        }
        List<Pair<book, Integer>> merged=new ArrayList<>();
        for (Map.Entry<book,Integer> entry: map.entrySet()) {
            merged.add(new Pair<>(entry.getKey(),entry.getValue()));
        }
        Comparator<Pair<book, Integer>> comparator= Comparator.comparing(Pair::getValue);
        merged.sort(comparator.reversed());
        return merged;
    }

    @Override
    public List<Pair<book,Integer>> userSum(String username, LocalDate startDate, LocalDate endDate){
        List<orders> orders=orderDao.findAllByName(username);
        List<orderitem> orderitemList=new ArrayList<>();
        for (orders order:orders
        ) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDate date = LocalDate.parse(order.getTime(), formatter);
            if (date.isAfter(startDate)&&date.isBefore(endDate)){
                orderitemList.addAll(order.getOrderitemList());
            }
        }
        Map<book,Integer> map=new HashMap<>();
        for (orderitem orderitem:orderitemList
        ) {
            book book=orderitem.getBook();
            int num=orderitem.getNum();
            if (map.containsKey(book)){
                num+=map.get(book);
                map.put(book,num);
            }else {
                map.put(book,num);
            }
        }
        List<Pair<book, Integer>> merged=new ArrayList<>();
        for (Map.Entry<book,Integer> entry: map.entrySet()) {
            merged.add(new Pair<>(entry.getKey(),entry.getValue()));
        }
        Comparator<Pair<book, Integer>> comparator= Comparator.comparing(Pair::getValue);
        merged.sort(comparator.reversed());
        return merged;
    }
}
