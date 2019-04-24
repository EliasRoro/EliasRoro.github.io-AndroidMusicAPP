/**
 * File Name: ERutil.js
 *
 * Revision History:
 *       Sabbir Ahmed, 2019-04-14 : Created
 */
function doValidate_ERAddForm() {
    var form = $("#ERAddForm");
    form.validate({
        rules: {
            ERUserName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            ERReviewerEmail: {
                required: true,
                emailCheck: true
            },
            ERReviewDate: {
                required: true
            }
            // ERFoodQuality: {
            // required: true,
            // ratingCheck: true
            // },
            // ERService: {
            // required: true,
            // ratingCheck: true

            // },
            // ERValue: {
            // required: true,
            // ratingCheck: true
            // }
        },
        messages: {
            ERUserName: {
                required: "You must enter user name",
                minlength: "Length must be 2-20 characters long",
                maxlength: "Length must be 2-20 characters long"

            },
            ERReviewerEmail: {
                required: "Please enter Email",
                emailCheck: "Please enter valid email"

            },
            ERReviewDate: {
                required: "Review date is required"
            }
            // ERFoodQuality: {
            // required: "Food Quality is required ",
            // ratingCheck: "Value must be 0-5"
            // },
            // ERService: {
            // required: "Service rate is required",
            // ratingCheck: "Value must be 0-5"
            // },
            // ERValue: {
            // required: "Value is required",
            // ratingCheck: "Value must be 0-5"
            // }
        }
    });
    return form.valid();
}

function doValidate_EREditForm() {
    var form = $("#EREditForm");
    form.validate({
        rules: {
            EREditUserName: {
                required: true,
                minlength: 2,
                maxlength : 20
            },
            EREditReviewerEmail:{
                required: true,
                emailCheck: true
            },
            EREditReviewDate:{
                required:true
            }
            // EREditRating:{
            // required: true,
            // ratingCheck : true
            // },
            // EREditService:{
            // required:true,
            // ratingCheck: true

            // },
            // EREditValue:{
            // required:true,
            // ratingCheck: true
            // }

        },
        messages: {
            EREditUserName: {
                required: "You must enter User name",
                minlength: "Length must be 2-20 characters long",
                maxlength: "Length must be 2-20 characters long"
            },
            EREditReviewerEmail:{
                required: "Please enter Email",
                emailCheck: "Please enter valid email"

            },
            EREditReviewDate:{
                required: "Review date is required"
            }
            // EREditRating:{
            // required: "Food Quality is required ",
            // ratingCheck: "Value must be 0-5"
            // },
            // EREditService: {
            // required:"Service rate is required",
            // ratingCheck: "Value must be 0-5"
            // },
            // EREditValue: {
            // required: "Value is required",
            // ratingCheck: "Value must be 0-5"
            // }
        }
    });
    return form.valid();
}

$.validator.addMethod("emailCheck",
    function (value, element) {
        var regex = /^[0-9a-zA-Z]+([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]+([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/;
        return this.optional(element) || regex.test(value);
    },
    "validator for email check");

$.validator.addMethod("ratingCheck",
    function (value, element) {
        var regex = /^[0-5]$/;
        return this.optional(element) || regex.test(value);
    },
    "validator for Food Quality check");
