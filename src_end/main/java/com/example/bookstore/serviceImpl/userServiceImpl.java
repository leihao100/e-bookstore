package com.example.bookstore.serviceImpl;

import com.example.bookstore.dao.userDao;
import com.example.bookstore.entity.user;
import com.example.bookstore.entity.userAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class userServiceImpl implements com.example.bookstore.service.userService {
    @Autowired
    userDao userDao;

    @Override
    public int login(String account, String password){
        user user=userDao.findByName(account);
        if (user==null)return 0;
        if (user.getValid()==0) return 1;
        userAuth userAuth=user.getUserAuth();
        if (Objects.equals(password, userAuth.getPassword())){
            return 2;
        }
        return 0;
    }
    @Override
    public user getUserbyName(String name){
        return userDao.findByName(name);
    }

    @Override
    public boolean signup(String account, String password, int type){
        if (userDao.findByName(account)!=null){
            return false;
        }
        user user=new user();
        user.setName(account);
        user.setValid(1);
        userAuth userAuth=new userAuth();
        userAuth.setPassword(password);
        userAuth.setType(type);
        user.setUserAuth(userAuth);
        System.out.println(account);
        userDao.save(user);

        return true;
    }


    @Override
    public int getTypeByName(String name){
        user user=userDao.findByName(name);
        if (user==null) return -1;
        else return user.getUserAuth().getType();
    }

    @Override
    public void changeValid(String name,int valid){
        user user=userDao.findByName(name);
        user.setValid(valid);
        userDao.save(user);
    }

    @Override
    public List<user> getAll(){
        return userDao.getAll();
    }
}
