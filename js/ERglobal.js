/**
 * File Name: ERglobal.js
 *
 * Revision History:
 *       Elias Roro, 2019-02-06 : Created
 */

function ERBtnSave_click() {
    //doValidate_ERAddForm();
    ERaddFeedback();
}

function ERBtnUpdate_click() {
    //doValidate_EREditForm();
    ERupdateFeedback();
}

function ERBtnDelete_click() {
    //doValidate_EREditForm();
    ERdeleteFeedback();
}

function ERBtnSaveDefaults_click() {
    localStorage.setItem('Default', $("#ERDefaultReviewerEmail").val());
    alert("Default reviewer Email saved to local storage");
}

function ERBtnClearDatabase_click() {
    localStorage.clear();
    ERclearDatabase();
}

function ERAddFeedbackPage_show() {
    console.info("ERAddFeedbackPage show");
    showAddFeedbackPage();
    ERupdateTypesDropdown();
}

function ERViewFeedbackPage_show(){
    console.info("ERViewFeedbackPage show");
    showViewFeedbackPage();
}

function EREditFeedbackPage_show() {
    console.info("EREditFeedbackPage show");
    ERshowCurrentReview();
}

function init() {
    // hide ratings division
    $("#ERRatingsValue").hide();
    $("#EREditRatingsValue").hide();

    // rating toggle functions
    // $(function () {
    // $("#ERRating").click(function () {
    // if ($(this).is(":checked")) {
    // $("#ERRatingsValue").show();
    // } else {
    // $("#ERRatingsValue").hide();
    // }
    // });
    // });
    // $(function () {
    // $("#EREditRating").click(function () {
    // if ($(this).is(":checked")) {
    // $("#EREditRatingsValue").show();
    // } else {
    // $("#EREditRatingsValue").hide();
    // }
    // });
    // });

    // // rating average calculation functions
    // $(function () {
    // $("#ERFoodQuality, #ERService, #ERValue").on("keydown keyup click", ERAverage);
    // function ERAverage() {
    // var quality = parseInt($("#ERFoodQuality").val());
    // var service = parseInt($("#ERService").val());
    // var value = parseInt($("#ERValue").val());
    // var average = (quality + service + value ) * 100 / 15;
    // $("#EROverallRating").val(average + '%');
    // }
    // });
    // $(function () {
    // $("#EREditRating, #EREditService, #EREditValue").on("keydown keyup click", EREditAverage);
    // function EREditAverage() {
    // var quality = parseInt($("#EREditRating").val());
    // var service = parseInt($("#EREditService").val());
    // var value = parseInt($("#EREditValue").val());
    // var average = (quality + service + value ) * 100 / 15;
    // $("#EREditOverallRating").val(average + '%');
    // }
    // });


    // set event handlers
    $("#ERBtnSave").on("click", ERBtnSave_click);
    $("#ERBtnUpdate").on("click", ERBtnUpdate_click);
    $("#ERBtnDelete").on("click", ERBtnDelete_click);
    $("#ERBtnSaveDefaults").on("click", ERBtnSaveDefaults_click);
    $("#ERBtnClearDatabase").on("click", ERBtnClearDatabase_click);
    // A3 Task 4: Modify ‘Add Feedback’ page
    $("#ERAddReviewPage").on("pageshow", ERAddFeedbackPage_show);
    $("#ERViewFeedbackPage").on("pageshow", ERViewFeedbackPage_show);
    $("#EREditFeedbackPage").on("pageshow", EREditFeedbackPage_show);

    $("#ERDefaultReviewerEmail").val("eroro6882@conestogac.on.ca");
}

function initDB() {
    try {
        DB.ERCreateDatabase();
        if (db) {
            console.info("Creating Tables....");
            DB.ERCreateTables();
        }
        else {
            console.error("Error: cannot create Db. can not proceed.");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). can not proceed.");
    }

}
$(function() {
    init();
    initDB();
});