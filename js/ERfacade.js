/**
 * File Name: ERfacade.js
 *
 * Revision History:
 *       Elias Roro, 2019-03-31 : Created
 */

function showAddFeedbackPage(){
    var defaultEmail = localStorage.getItem("Default");
    $("#ERReviewerEmail").val(defaultEmail);

    ERupdateTypesDropdown();

    ERgetReviews();
}

function showViewFeedbackPage(){
    ERgetReviews();

}

function ERclearDatabase() {
    if (confirm('Really want to clear database?')) {
        DB.ERDropTables();
    }
}

function ERupdateFeedback() {
    if (doValidate_EREditForm()) {
        var UserName = $("#EREditUserName").val();
        var typeId = $("#EREditType").val();
        var reviewerEmail = $("#EREditReviewerEmail").val();
        var reviewerComments = $("#EREditReviewerComments").val();
        var reviewDate = $("#EREditReviewDate").val();
        // var hasRating = $("#EREditRating").prop("checked");
        // var rating1 = $("#EREditRating").val();
        // var rating2 = $("#EREditService").val();
        // var rating3 = $("#EREditValue").val();
        var id = localStorage.getItem("id");
        var options = [UserName, typeId, reviewerEmail, reviewerComments, reviewDate, id];

        // if (hasRating == true)
        // options = [UserName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];
        // else
        //options = [UserName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, id];

        function callback() {
            console.info("Success: Record updated successfully");
            $(location).prop('href', '#ERViewFeedbackPage');
            alert("Feedback Updated successfully");
        }

        Review.ERupdate(options, callback);
    }
    else{
        console.info("validation failed");
    }
}

function ERdeleteFeedback() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Success: Record deleted successfully");
        $(location).prop('href', '#ERViewFeedbackPage');
        alert("Feedback Deleted successfully");
    }
    Review.ERdelete(options, callback);
}

function ERshowCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        /*
            console.info("id : " + row['id']);
            console.info("UserName : " + row['UserName']);
            console.info("typeId : " + row['typeId']);
            console.info("reviewerEmail : " + row['reviewerEmail']);
            console.info("reviewerComments : " + row['reviewerComments']);
            console.info("reviewDate : " + row['reviewDate']);
            console.info("hasRating : " + row['hasRating']);
            console.info("rating1 : " + row['rating1']);
            console.info("rating2 : " + row['rating2']);
            console.info("rating3 : " + row['rating3']);
        * */
        $("#EREditUserName").val(row['UserName']);
        $("#EREditType").val(row['typeId']);
        $("#EREditReviewerEmail").val(row['reviewerEmail']);
        $("textarea#EREditReviewerComments").val(row['reviewerComments']);
        $("#EREditReviewDate").val(row['reviewDate']);

        // if (row['hasRating'] == 'true') {
        // $("#EREditRating").prop('checked', true).checkboxradio( "refresh" );
        // $("#EREditRating").val(row['rating1']);
        // $("#EREditService").val(row['rating2']);
        // $("#EREditValue").val(row['rating3']);
        // $("#EREditRatingsValue").show();
        // } else {
        // $("#EREditRating").prop('checked', false).checkboxradio( "refresh" );
        // $("#EREditRatingsValue").hide();
        // $("#EREditRating").val(0);
        // $("#EREditService").val(0);
        // $("#EREditValue").val(0);
        // }
    }
    Review.ERselect(options, callback);
}

function ERgetReviews() {
    var options = [];
    function callback(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            // var row = results.rows.item(i);   //both will work
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

            console.info("id : " + row['id']);
            console.info("UserName : " + row['UserName']);
            console.info("typeId : " + row['typeId']);
            console.info("reviewerEmail : " + row['reviewerEmail']);
            console.info("reviewerComments : " + row['reviewerComments']);
            console.info("reviewDate : " + row['reviewDate']);
            // console.info("hasRating : " + row['hasRating']);
            // console.info("rating1 : " + row['rating1']);
            // console.info("rating2 : " + row['rating2']);
            // console.info("rating3 : " + row['rating3']);

            // var overallRating = 0;
            // if(row['hasRating'] == "true")
            // {
            // overallRating = (row['rating1'] + row['rating2'] + row['rating3'] ) * 100 / 15;
            // }
            htmlCode += "<li>" +
                "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "User Name: " + row['UserName'] +
                "<p>" +
                "Reviewer Email: " + row['reviewerEmail'] + "<br/>" +
                "Comments: " + row['reviewerComments'] + "<br/>" +
                // "Overall Rating: " + overallRating +
                "</p></a></li>";
        }
        var lv = $("#ERListView");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#EREditFeedbackPage');
        }
        $("#ERListView a").on("click", clickHandler);
    }
    Review.ERselectAll(options, callback);
}

function ERaddFeedback(){
    //1.Test Validate
    if (doValidate_ERAddForm()){
        console.info("validation is successful");
        //2.If Validation is successful then fetch the info from the input controls
        var UserName = $("#ERUserName").val();
        var typeId = $("#ERType").val();
        var reviewerEmail = $("#ERReviewerEmail").val();
        var reviewerComments = $("#ERReviewerComments").val();
        var reviewDate = $("#ERReviewDate").val();
        // var hasRating = $("#ERRating").prop("checked");
        // var rating1 = $("#ERFoodQuality").val();
        // var rating2 = $("#ERService").val();
        // var rating3 = $("#ERValue").val();
        var options;

        // if(hasRating == true)
        // options = [UserName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3];
        // else
        options = [UserName, typeId, reviewerEmail, reviewerComments, reviewDate];

        //3. insert into the table by calling DataAccessLayer DAL function and supplying input
        function callback(){
            console.info("Success: record inserted successfully");
            alert("New Feedback Added");
        }
        Review.ERinsert(options, callback);
    }
    else{
        console.info("validation failed");
    }
}

function ERupdateTypesDropdown(){
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";
        var selectedID = 0;
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            //var row = results.rows.item(i);   //both will work
            console.info("id : " + row['id']);
            console.info("Name : " + row['name']);

            if(row['name'] === "Others")
            {
                htmlCode += "<option id=\""+row['name']+"\" name=\""+row['name']+"\" value="+ (i +1) +" selected>"+row['name']+"</option>";
                selectedID = row['id'];
            }
            else
                htmlCode += "<option id=\""+row['name']+"\" name=\""+row['name']+"\" value="+ (i +1) + ">"+row['name']+"</option>";

        }

        $("#ERType").html(htmlCode);
        $("#ERType").val(selectedID).change();
    }
    Type.ERselectAll(options, callback);
}