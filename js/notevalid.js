define(["underscore", "jQueryValidate"], function (_) {
    'use strict';
   let testValid;
    let validData;

    function setValidate(validOpt) {
        return validData = validOpt.dataLet;
    };

    //validate Title
    $.validator.addMethod(
        'validtitle',
        function (value, element, params) {
            return !(_.find(validData, function (obj) {
                return obj.title === value
            }))
        },
        'This header already exists.'
    );

    //Validate TextNote
    $.validator.addMethod(
        'validtext',
        function (value, element, params) {
            return !(_.find(validData, function (obj) {
                return obj.textNode === value
            }))
        },
        'A note with this text already exists'
    );
    
    return testValid = {
        validmess: {
            rules: {
                title: {
                    required: true,
                    validtitle: true
                },
                textcard: {
                    required: true,
                    validtext: true
                }
            }
        },
        setValidate: setValidate
    }



});