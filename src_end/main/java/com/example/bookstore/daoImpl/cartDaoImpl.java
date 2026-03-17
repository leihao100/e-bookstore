package com.example.bookstore.daoImpl;

import com.example.bookstore.entity.cart;
import com.example.bookstore.repository.cartRepository;
import com.example.bookstore.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class cartDaoImpl implements com.example.bookstore.dao.cartDao {
    @Autowired
    cartRepository cartRepository;

    @Autowired
    userRepository userRepository;

    @Override
    public List<cart> findByUserName(String name){
        return (List<cart>) cartRepository.findAllByUser_Name(name);
    }

    @Override
    public void add(cart cart){
        cartRepository.save(cart);
    }

    @Override
    public void deleteByName(String name){
        cartRepository.deleteAllByUser_Id(userRepository.findAllByName(name).getId());
        cartRepository.deleteAllByUser_Name(name);
    }


}
