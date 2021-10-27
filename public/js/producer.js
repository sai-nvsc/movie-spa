$(document).ready(function() {

    // COLLECT ALL PRODUCERS

    $.ajax({
        type: "GET",
        url: "producer/all",
        dataType: "json",
        success: function(response) {
            $.each(response, function(producers, producer) {
                console.log(producer);
                var id = producer.id;
                var tr = $("<tr>");
                tr.append($("<td>").html(producer.id));
                tr.append($("<td>").html(producer.producer_name));
                tr.append($("<td>").html(producer.email));
                tr.append($("<td>").html(producer.website));
                tr.append($("<td><a href='#' class='editprod' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                tr.append($("<td><a href='#' class='deleteprod' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                $("#producerbody").append(tr);
            });
        }
    });



    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $("#ProducerSubmit").on('click', function(e) {
        e.preventDefault();
        $('#ProducerData').validate({

            rules: {
                producer_name: "required",
                email: {
                    required: true,
                    email: true,
                },
                website: {
                    required: true,
                    url: true,
                },

                messages: {
                    producer_name: "This field is required",
                    email: {
                        required: "This field is required",
                        email: "Please enter a valid email address",
                    },
                    website: {
                        required: "This field is required",
                        url: "Please enter a valid URL Format"
                    }
                }
            }
        });

        var valid = $('#ProducerData').valid();

        if ($('#ProducerData').valid()) {
            var data = $("#ProducerData").serialize();
            var action = $("#ProducerSubmit").data('id');
            console.log(data);
            if (action == 'save') {
                $.ajax({
                    type: "POST",
                    url: "/producer",
                    data: data,
                    dataType: "json",
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    success: function(producer) {
                        $('#Modal').each(function() {
                            $(this).modal('hide');
                        });
                        console.log(producer);
                        var id = producer.id;
                        var tr = $("<tr>");
                        tr.append($("<td>").html(producer.id));
                        tr.append($("<td>").html(producer.producer_name));
                        tr.append($("<td>").html(producer.email));
                        tr.append($("<td>").html(producer.website));
                        tr.append($("<td><a href='#' class='editprod' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                        tr.append($("<td><a href='#' class='deleteprod' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                        $("#producerbody").prepend(tr);
                    },
                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            } else {
                var id = $('#producer_id').val();
                var data = $("#ProducerData").serialize();
                var newprod = document.getElementById('prodyuser').value;
                var newprodemail = document.getElementById('prod_email').value;
                var newsite = document.getElementById('prod_site').value;
                console.log(data);

                $.ajax({
                    type: "PUT",
                    url: "producer/" + id,
                    data: data,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    dataType: "json",
                    success: function(response) {
                        $("#Modal").each(function() {
                            $(this).modal('hide');
                        });
                        $(".updating").find('td').eq(1).text(newprod);
                        $(".updating").find('td').eq(2).text(newprodemail);
                        $(".updating").find('td').eq(3).text(newsite);
                        $(".updating").removeClass("updating");
                    },

                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            }
        }



    });


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(document).on('click', '#AddProducer', function(e) {
        $('#Modal').find('.modal-title').text("Add Producer");
        $('#ProducerSubmit').attr('data-id', 'save');
        $('#Modal').modal('show');
    });


    $(document).on('click', '.editprod', function(e) {
        var id = $(this).attr('id');
        var tr = $(this).closest('tr');
        tr.attr("class", "updating");
        $('#Modal').find('.modal-title').text("Edit Actor");
        $('#ProducerSubmit').attr('data-id', 'update');
        console.log(id);
        $('<input>').attr({ type: 'hidden', id: 'producer_id', name: 'producer_id', value: id }).appendTo('#Modal');
        // $('<input>').attr({ type: 'hidden', name: '_token', value: Laravel.csrfToken }).appendTo('#AddActor');
        $.ajax({
            type: "GET",
            url: "/producer/" + id + "/edit",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(response) {
                console.log(response);
                $('#prodyuser').val(response.producer_name);
                $('#prod_email').val(response.email);
                $('#prod_site').val(response.website);
                $('#Modal').modal('show')
                    // $("<div title='Success'>New Data was Added to the Database!</div>").dialog();
            },
            error: function(e) {
                console.log(e.responseText);
                alert('FAILURE TO LOAD THE DATA. See the console for info.');
            }
        });
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#producerbody").on('click', '.deleteprod', function(e) {
        var id = $(this).data('id');
        var $tr = $(this).closest('tr');
        e.preventDefault();

        bootbox.confirm({
            message: "do you want to delete Producer with Id number: " + id + "?",
            buttons: {
                confirm: {
                    label: 'YES',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'NO',
                    className: 'btn-danger'
                }
            },
            callback: function(result) {
                if (result) {
                    $.ajax({
                        type: "DELETE",
                        url: "/producer/" + id,
                        dataType: "json",
                        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                        success: function(response) {
                            console.log(response);

                            $tr.find('td').fadeOut(1000,
                                function() {
                                    $(this).parents('tr:first').remove();
                                });
                        },
                        error: function(e) {
                            alert('yow');
                            console.log(e.responseText);
                        }
                    });
                }

            }
        })
    });
});



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++