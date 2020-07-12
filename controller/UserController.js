var express = require('express');
var url = require('url');
var UserDao = require('../dao/UserDao');
var User = require('../model/User');

//Create
exports.doSignUp = function(req,res){
    var params = url.parse(req.url, true).query;
    var user = new User(params.username,params.password);
    
    UserDao.FindUserByName(user, function(error, result){
        if(error){
            //Factory Pattern should be used to handle error and exception, should be implemented in next version
            if (error == "UserNotFound"){
                UserDao.InsertUser(user, function(InsertError, result){
                    if(InsertError){
                        res.render('message', {title: 'Error', message: InsertError});
                        console.log(InsertError)
                    } else {
                        res.render('message', {title: 'success', message: 'success'});
                    }
                });
            }else{
                res.render('message', {title: 'Error', message: error});
                console.log(error);
            }
        } else {
            res.render('message', {title: 'User already exists', message: 'User already exists'});
        }
    });
};

//Read
exports.doSignIn = function(req,res){
    var params = url.parse(req.url, true).query;
    var user = new User(params.username, params.password);
    
    UserDao.FindUserByName(user, function(error, result){
        if (error) {
            res.render('message', {title: 'Error', message: error});
            console.log(error);
        } else {
            if (user.password == result.password) {
                res.render('message', {title: 'Login Successed', message: 'Login Successed'});
            } else {
                res.render('message', {title: 'Wrong Password', message: 'Wrong Password'});
            }
        }
    });
};
//Update
exports.doUpdate = function(req,res){
    var params = url.parse(req.url, true).query;
    var user = new User(params.username, params.password);
    //User password should be checked, should be implemented in next version
    UserDao.FindUserByName(user, function(error, result){
        if (error) {
            res.render('message', {title: 'Error', message: error});
            console.log(error);
        } else {
            user.id = result.id;
            UserDao.UpdateUser(user, function(updateError, result){
                if(updateError){
                    res.render('message', {title: 'Error', message: updateError});
                    console.log(updateError);
                }else{
                    res.render('message', {title: 'success', message: 'success'});
                }
            });
        }
    });
};
//Delete
exports.doDelete = function(req,res){
    var params = url.parse(req.url, true).query;
    var user = new User(params.username, params.password);
    //User password should be checked, should be implemented in next version
    UserDao.FindUserByName(user, function(error, result){
        if (error) {
            res.render('message', {title: 'Error', message: error});
            console.log(error);
        } else {
            user.id = result.id;
            UserDao.DeleteUser(user, function(deleteError, result){
                if(deleteError){
                    res.render('message', {title: 'Error', message: deleteError});
                    console.log(deleteError);
                }else{
                    res.render('message', {title: 'success', message: 'success'});
                }
            });
        }
    });
};