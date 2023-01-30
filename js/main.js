require(['js/loads', 'js/dialogui', 'js/notevalid', 'underscore', 'jquery'], function (dataSample, dialogui, valid, _) {

    $(document).ready(function () {
        let sample,
            data,
            now = new Date(),
            findText,
            findTitle;

        dataSample.getSample.done(function (dSample) {
            sample = _.template(dSample);
            console.log(sample);
            dataSample.getData.done(function (getData) {
                if (getData) {
                    data = JSON.parse(getData);
                } else {
                    data = [];
                }
                _.each(data, function (itemdata) {
                    $('#note').before(sample(itemdata));
                    $('.card-note:not("#note") textarea, .card-note:not("#note") .saveEdit').attr('disabled', true);
                    $('.card-note .saveEdit').hide();
                });
                saveNotes();
                editNotes();
                deleteNotes();
            });
        });

        // Saved note

        function saveNotes() {
            $('.row .add').on('click', function () {
                let dataObject = {};
                dataObject.idNode = data.length + 1;

                dataObject.title = $(this).closest('.card').find('.text-header').val();
                dataObject.textNode = $(this).closest('.card').find('.text-card').val();
                dataObject.date = now.toLocaleString();
                console.log(dataObject);

                findText = _.find(data, function (obj) {
                    return obj.textNode === dataObject.textNode;
                });
                findTitle = _.find(data, function (obj) {
                    return obj.title === dataObject.title;
                });
                console.log('findText', findText);
                console.log('findTitle', findTitle);
                if ((findText) && (findTitle) && (data.length > 0)) {
                    //  dialogui.messExists.dialog();
                    dialogui.messExists();
                } else {
                    data.push(dataObject);
                    $('.row #note').before(sample(dataObject));
                    $('.card-note:not("#note") textarea, .card-note:not("#note") .saveEdit').attr('disabled', true);
                    $('.card-note:not("#note") .saveEdit').hide();
                    dataSample.postData({
                        dataSend: data
                    });

                    $(this).closest('#note').find('.text-header').val('');
                    $(this).closest('#note').find('.text-card').val('');
                    //   dialogui.messAdded.dialog();
                    dialogui.messAdded();
                }
            });
        }

        //Edit note

        function editNotes() {
            $('.row').on('click', '.edit', function () {
                let element = $(this).closest('.card');
                element.find('.text-header').attr('disabled', false);
                element.find('.text-card').attr('disabled', false);
                element.find('.saveEdit').show().attr('disabled', false);
                element.on('click', ".text-header", function () {
                    valid.setValidate({
                        dataLet: data
                    });
                    element.validate(valid.validmess);
                });
                let idcard = $(this).closest('.col-md-3').attr('id');
                element.on('click', ".saveEdit", function () {
                    if (element.find('label').text() == '') {
                        _.forEach(data, function (el) {
                            if (el.idNode == idcard) {
                                el.title = element.find('.text-header').val();
                                el.textNode = element.find('.text-card').val();
                                el.date = now.toLocaleString();
                            }
                        });
                        dataSample.postData({
                            dataSend: data
                        });
                        element.find('.text-header').attr('disabled', true);
                        element.find('.text-card').attr('disabled', true);
                        element.find('.saveEdit').hide().attr('disabled', true);
                        dialogui.messSaved();
                    } else {
                        dialogui.messExists();
                    }
                });
            });
        }

        //Delete note

        function deleteNotes() {
            $('.row').on('click', '.del-notes', function () {
                let idDeleteItem = $(this).closest('.col-md-3').attr('id'),
                    delNote = $(this).closest('.col-md-3');
                dialogui.messDelete();
                $('.ui-dialog-buttonset .ui-button:contains("Delete items")').on('click', function () {
                    data = _.reject(data, function (o) {
                        return o.idNode == idDeleteItem;
                    });
                    dataSample.postData({
                        dataSend: data
                    });
                    delNote.remove();
                });
            });
        }

    });
});