/**
 * File Name: ERfeedbackDAL.js
 *
 * Revision History:
 *       Sabbir Ahmed, 2019-04-14 : Created
 */
var Review = {
    ERinsert: function(options,callBack){
        function txFunction(tx) {
            var sql = "INSERT INTO review (UserName, typeId, reviewerEmail, reviewerComments, reviewDate) VALUES(?,?,?,?,?);";
            tx.executeSql(sql,options,callBack,errorHandler)
        }
        function successTransaction() {
            console.info("Success: insert transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    ERdelete: function(options,callBack){
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql,options,callBack,errorHandler)
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);

    },
    ERselectAll: function(options,callBack){
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql,options,callBack,errorHandler)
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    ERselect: function(options,callBack){
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql,options,callBack,errorHandler)
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    ERupdate: function(options, callBack){
        function txFunction(tx) {
            var sql = "UPDATE review SET UserName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=? WHERE id=?;";
            tx.executeSql(sql,options,callBack,errorHandler)
        }
        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    }
};

var Type = {
    ERselectAll: function(options,callBack){
        function txFunction(tx) {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql,options,callBack,errorHandler)
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    }
};
