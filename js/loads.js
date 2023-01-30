define(['underscore', 'jquery'], function (_) {
    'use strict';
    let test;
    function postData(options) {
        let sendData = JSON.stringify(options.dataSend);
        $.ajax({
            url: 'data/editdata.php',
            contentType: "application/json;charset=UTF-8",
            type: 'POST',
            dataType: 'json',
            data: sendData,
            success: function (res) {
                console.log(res);
            }
        });
    };
    return test = {
            getSample: $.ajax({
                url: './template/sample.html'
            }),
            getData: $.ajax({
                url: './data/data.json',
                dataType: 'text'
            }),
            postData: postData
        }
    



});