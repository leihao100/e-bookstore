package com.example.bookstore.serviceImpl;

import com.example.bookstore.dao.bookDao;
import com.example.bookstore.entity.book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class bookServiceImpl implements com.example.bookstore.service.bookService {
    @Autowired
    bookDao bookDao;

    @Override
    public List<book> getAll(){
        List<book> bookList=new ArrayList<>();
        List<book> oldbookList=bookDao.getAll();
        for (int i =0 ;i <oldbookList.size(); ++i){
            if (oldbookList.get(i).getValid()==1){
                bookList.add(oldbookList.get(i));
            }
        }
        return bookList;
    }

    @Override
    public void addBook(book book){
        bookDao.addBook(book);
    }

    @Override
    public book getBook(String name){
        return bookDao.findByName(name);
    }
    @Override
    public List<book> searchBook(String name){
        List<book> result=new ArrayList<>();
        List<book> all=bookDao.getAll();
        for (book book:all
             ) {
            if (book.name.contains(name)){
                result.add(book);
            }
        }
        return result;
    }


    @Override
    public void bookDecrease(book book, int num){
        if (book==null){
            return;
        }
        book.setNum(book.getNum()-num);
        bookDao.addBook(book);
    }
}
