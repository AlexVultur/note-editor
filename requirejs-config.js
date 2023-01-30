requirejs.config({
   map: {
    "*": { 
      //"jquery": 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.js',//"https://code.jquery.com/jquery-3.6.1.js", 
       "underscore": "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js",
        "jQueryValidate": "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js",
        "jqueryui": 'https://code.jquery.com/ui/1.13.1/jquery-ui.js' ,//"https://code.jquery.com/ui/1.13.2/jquery-ui.js",//"https://ajax.googleapis.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js"
    }
    },
    shim: {
        "jquery": {
            init: function (jQuery) {
                return jQuery.noConflict();
            }
        },
        "jqueryui": {
            exports: "$",
            deps: ['jquery']
        },
        "jQueryValidate": ['jquery'],
         waitSeconds: 15
    }
   
});


