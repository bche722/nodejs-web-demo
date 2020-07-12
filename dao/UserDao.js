var database = require('../database');
var User = require('../model/User');

//Create
exports.InsertUser = function(user, callback){
    var params = [];
    var sql = 'INSERT INTO user (ID, NAME, PASSWORD) VALUES (?, ?, ?)';
    params.push(user.id);
    params.push(user.name);
    params.push(user.password);
    database.executeQuery(sql, params, function(error, results){
        if (error){
            callback(error, null);
        } else {
            if(results.affectedRows>0){
                callback(null, user);
            } else {
                callback("InsertFailed", null);
            }
        }
    });
};

//Read
exports.FindUserById = function(user,callback){
    var params = [];    
    var sql = 'SELECT * FROM user WHERE ID = ?';
    params.push(user.id);
    database.executeQuery(sql, params, function(error, results){
        if (error){
            callback(error, null);
        } else if (results.length == 0){
            callback("UserNotFound", null);
        } else {
            var result = new User(results[0].NAME,results[0].PASSWORD);
            result.id = results[0].ID;
            callback(null, result);
        }
    });
};

exports.FindUserByName = function(user,callback){
    var params = [];    
    var sql = 'SELECT * FROM user WHERE NAME = ?';
    params.push(user.name);
    database.executeQuery(sql, params, function(error, results){
        if (error){
            callback(error, null);
        } else if (results.length == 0){
            callback("UserNotFound", null);
        } else {
            var result = new User(results[0].NAME,results[0].PASSWORD);
            result.id = results[0].ID;
            callback(null, result);
        }
    });
};

//Update
exports.UpdateUser = function(user, callback){
    var params = [];
    var sql = 'UPDATE user SET NAME=?,PASSWORD=? WHERE ID=?';
    params.push(user.name);
    params.push(user.password);
    params.push(user.id);
    database.executeQuery(sql, params, function(error, results){
        if (error){
            callback(error, null);
        } else {
            console.log(results);
            if(results.affectedRows>0){
                callback(null, user);
            } else {
                callback("UpdateFailed", null);
            }
        }
    });
};

//Delete
exports.DeleteUser = function(user,callback){
    var params = [];
    var sql = 'DELETE FROM user WHERE ID = ?';
    params.push(user.id);
    database.executeQuery(sql,params,function(error, results){
        if (error){
            callback(error, null);
        } else {
            console.log(results);
            if(results.affectedRows>0){
                callback(null, user);
            } else {
                callback("DeleteFailed", null);
            }
        }
    });
};



