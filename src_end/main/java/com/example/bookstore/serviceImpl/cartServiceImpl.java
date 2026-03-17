package com.example.bookstore.serviceImpl;

import com.example.bookstore.entity.book;
import com.example.bookstore.entity.cart;
import com.example.bookstore.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class cartServiceImpl implements com.example.bookstore.service.cartService {

    @Autowired
    com.example.bookstore.dao.cartDao cartDao;

    @Autowired
    com.example.bookstore.dao.userDao userDao;

    @Override
    public List<cart> getCart(String name){
        return cartDao.findByUserName(name);
    }

    @Override
    public void addCart(book book, String name, int num){
        List<cart> target=getCart(name);
        for (int i=0;i<target.size();i++){
            if (target.get(i).getBook()==book){
                cart newcart=target.get(i);
                newcart.setNum(newcart.getNum()+1);
                newcart.setTotalprice();
                cartDao.add(newcart);
                return;
            }
        }
        //新增
        {
            cart cart = new cart();
            cart.setBook(book);
            System.out.println("this is name:"+name);
            user user = userDao.findByName(name);
            System.out.println(user);
            cart.setUser(user);
            cart.setNum(num);
            cart.setTotalprice();
            cartDao.add(cart);
        }
    }

    @Override
    public void clearByName(String name){
        cartDao.deleteByName(name);
    }

}
