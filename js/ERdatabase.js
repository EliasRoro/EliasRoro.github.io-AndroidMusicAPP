/**
 /**
 * File Name: ERdatabase.js
 *
 * Revision History:
 *       Elias Roro, 2019-03-31 : Created
 */

<!--tx = Transaction-->
function errorHandler (tx,error)
{
    console.log("SQL error: " + tx + " (" + error.code +") " + error.message);
}
var db;
var DB ={
    ERCreateDatabase: function(){
        var shortName = "ElReviewDB";
        var version = "1.0";
        var displayName = "DB for ElReview DB app";
        var dbSize = 2 * 1024 * 1024;
        function dbCreateSuccess() {
            console.info(("Success: Database created Successfully."))
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    ERCreateTables: function(){
        function txFunction(tx) {
            var options = [];
            // step-1.	Declare sql for drop table, then  call executeSql()
            var sql = "DROP TABLE IF EXISTS type;";
            function successDrop() {
                console.info("Success: dropping table friend successful");
            }
            tx.executeSql(sql,options,successDrop,errorHandler);

            // step-2.	Declare sql for create table ‘type’, then call executeSql() again.
            sql = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            function successCreateTypeTable() {
                console.info("Success: type table created successfully");
            }
            tx.executeSql(sql,options,successCreateTypeTable, errorHandler);

            // step-3to5.	Declare sql for insert 1st, 2nd, and 3rd row to ‘type’, then call executeSql() again.
            sql = "INSERT INTO type(name) VALUES(?);";
            function callBack(){
                console.info("Success: record inserted successfully");
            }
            var names = [["Male"],["Female"],["Others"]];
            for(var i=0; i<3; i++) {
                tx.executeSql(sql,names[i],callBack,errorHandler);
            }

            // step-6.	Declare sql for create table ‘review, then call executeSql() again.
            sql = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "UserName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                // "hasRating VARCHAR(1)," +
                // "rating1 INTEGER," +
                // "rating2 INTEGER," +
                // "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            function successCreateReviewTable() {
                console.info("Success: type table created successfully");
            }
            tx.executeSql(sql,options,successCreateReviewTable, errorHandler);
        }
        function successCreateTables() {
            console.info(("Success: Table created Successfully."))
        }
        db.transaction(txFunction, errorHandler, successCreateTables);
    },
    ERDropTables: function(){
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS review";
            var options = [];
            function successDrop() {
                console.info("Success: dropping table friend successful");
                alert("Database cleared");
            }
            tx.executeSql(sql,options,successDrop,errorHandler);
        }
        function successTransaction() {
            console.info("Success?: Drop table transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


