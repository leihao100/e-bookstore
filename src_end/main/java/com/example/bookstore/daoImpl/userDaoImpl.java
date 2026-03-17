package com.example.bookstore.daoImpl;

import com.example.bookstore.entity.user;
import com.example.bookstore.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class userDaoImpl implements com.example.bookstore.dao.userDao {

    @Autowired
    userRepository userRepository;

    @Override
    public user findByName(String name){
        return userRepository.findAllByName(name);
    }


    @Override
    public void save(user user){
        userRepository.save(user);
    }

    @Override
    public List<user> getAll(){
        return (List<user>) userRepository.findAll();
    }
}
