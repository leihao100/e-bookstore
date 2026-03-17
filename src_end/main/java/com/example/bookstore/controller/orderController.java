package com.example.bookstore.controller;
import com.example.bookstore.entity.book;
import com.example.bookstore.entity.orderitem;
import com.example.bookstore.entity.orders;
import com.example.bookstore.entity.user;
import com.example.bookstore.service.orderService;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;


@RestController
public class orderController {

    @Autowired
    orderService orderService;

    class tmp{
        public int id;
        public String time;
        public int cost;
        public String name;
    }

    orderController(){}

    @CrossOrigin
    @RequestMapping("/order")
    public List<tmp> list(String name)  {
        List<tmp> result=new ArrayList<>();
        List<orders> ordersList=orderService.getOrdersByName(name);
        for (com.example.bookstore.entity.orders orders : ordersList) {
            tmp tmp = new tmp();
            tmp.cost = orders.cost;
            tmp.id = orders.id;
            tmp.time = orders.time;
            tmp.name= orders.getUser().getName();
            result.add(tmp);
        }
        return result;
    }
    @CrossOrigin
    @RequestMapping("/orderWithTime")
    public List<tmp> listWithTime(String name,String startDate,String endDate)  {
        List<tmp> result=new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start=LocalDate.parse(startDate,formatter);
        LocalDate end=LocalDate.parse(endDate,formatter);
        List<orders> ordersList=orderService.getOrdersByName(name,start,end);
        for (com.example.bookstore.entity.orders orders : ordersList) {
            tmp tmp = new tmp();
            tmp.cost = orders.cost;
            tmp.id = orders.id;
            tmp.time = orders.time;
            tmp.name= orders.getUser().getName();
            result.add(tmp);
        }
        return result;
    }
    @CrossOrigin
    @RequestMapping("/orderbuy")
    public void addbook(String book,String name) {
        orderService.buyone(book, name);
    }
    @CrossOrigin
    @RequestMapping("/toOrder")
    public void toOrder(String name)  {
        orderService.toOrder(name);
    }

    class detailTmp{
        public book book;
        public int num;
        public int price;
    }
    @CrossOrigin
    @RequestMapping("/orderDetails")
    public List<detailTmp> details(int id){
        List<orderitem>orderitems =orderService.getItemsById(id);
        List<detailTmp> detailTmps=new ArrayList<>();
        for (int i =0; i<orderitems.size();i++){
            detailTmp detailTmp=new detailTmp();
            detailTmp.num=orderitems.get(i).getNum();
            detailTmp.book=orderitems.get(i).getBook();
            detailTmp.price=orderitems.get(i).price;
            detailTmps.add(detailTmp);
        }
        return detailTmps;
    }

    @CrossOrigin
    @RequestMapping("/adminBookSum")
    public List<Pair<book,Integer>> adminBookSum(){
        return orderService.adminBookSales();
    }

    @CrossOrigin
    @RequestMapping("/adminBookSumWithDate")
    public List<Pair<book,Integer>> adminBookSumWithDate(String startDate,String endDate)
    {
        System.out.println("a test");
        System.out.println(startDate);
        System.out.println(endDate);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start=LocalDate.parse(startDate,formatter);
        LocalDate end=LocalDate.parse(endDate,formatter);
        return orderService.adminBookSalesWithDate(start, end);
    }

    @CrossOrigin
    @RequestMapping("/adminUserSum")
    public List<Pair<user,Integer>> adminUserSum(){
        return orderService.adminUserCost();
    }
    @CrossOrigin
    @RequestMapping("/adminUserSumWithDate")
    public List<Pair<user,Integer>> adminUserSumWithDate(String startDate,String endDate)
    {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start=LocalDate.parse(startDate,formatter);
        LocalDate end=LocalDate.parse(endDate,formatter);
        return orderService.adminUserCostWithTime(start, end);
    }
    @CrossOrigin
    @RequestMapping("/userSumWithDate")
    public List<Pair<book,Integer>> UserSumWithDate(String name,String startDate,String endDate)
    {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start=LocalDate.parse(startDate,formatter);
        LocalDate end=LocalDate.parse(endDate,formatter);
        return orderService.userSum(name,start, end);
    }
    @CrossOrigin
    @RequestMapping("/userSum")
    public List<Pair<book,Integer>> UserSumWithDate(String name)
    {
        return orderService.userSum(name);
    }
}
