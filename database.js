var config = require('./config.js');
var mysql = require('mysql');
var pool = mysql.createPool(config);

exports.executeQuery=function(sql, params, callback){
    pool.getConnection(function(connectionError, connection){
        if(connectionError){
            callback(connectionError, null);
        }else{
            connection.query(sql, params, function(queryError, results){
                connection.release();
                callback(queryError, results);
            });
        }
    });
};