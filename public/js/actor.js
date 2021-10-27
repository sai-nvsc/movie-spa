$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "actor/all",
        dataType: 'json',
        success: function(data) {
            $.each(data, function(key, value) {
                console.log(value);
                var id = value.id;
                var tr = $("<tr>");
                tr.append($("<td>").html(value.id));
                tr.append($("<td>").html(value.actor_fullname));
                tr.append($("<td>").html(value.actor_notes));
                tr.append($("<td><a href='#' class='editact' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                tr.append($("<td><a href='#' class='deleteact' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                $("#actorbody").append(tr);
            });
        },
        error: function(e) {
            alert('error');
            console.log(e.responseText);
        }
    });
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//


    // ACTOR ADD OR EDIT AJAX CALL
    $("#ActorSubmit").click(function(e) {
        e.preventDefault();

        $("#ActorData").validate({ //ACTOR FORM VALIDATION
            rules: {
                actor_fullname: "required",
                actor_notes: "required",

            },
            messages: {
                actor_fullname: "This field is required",
                actor_notes: "This field is required",
            }
        });
        var data = $("#ActorData").serialize();
        var action = $("#ActorSubmit").attr('data-id');
        console.log(data);
        if ($('#ActorData').valid()) {
            if (action == 'save') { // IF TRUE, NEW ACTOR WILL BE ADDED.
                $.ajax({
                    type: "POST",
                    url: "/actor",
                    data: data,
                    dataType: "json",
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    success: function(response) {
                        console.log(response);
                        $('#Modal').each(function() {
                            $(this).modal('hide');
                        });
                        var tr = $("<tr>");
                        tr.append($("<td>").html(response.id));
                        tr.append($("<td>").html(response.actor_fullname));
                        tr.append($("<td>").html(response.actor_notes));
                        tr.append($("<td><a href='#'><i class='fas fa-edit' style='font-size:36px'></i></a></i></td>"));
                        tr.append($("<td><a href='#' id='delete'><i class='fas fa-eraser' style='font-size:36px;color:red'>"));
                        $('#actorbody').prepend(tr);

                    },
                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            } else { //THE SPECIFIC ACTOR WILL BE UPDATTED
                var id = $('#actorid').val();
                var data = $("#ActorData").serialize();
                console.log(data);

                $.ajax({
                    type: "PUT",
                    url: "actor/" + id,
                    data: data,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    dataType: "json",
                    success: function(response) {
                        $("#Modal").each(function() {
                            $(this).modal('hide');
                        });
                        // $("<div title='Success'>New Data was Added to the Database!</div>").dialog();
                        location.reload();
                    },

                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            }

        }


    });

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

    // SHOW ADD ACTOR MODAL
    $(document).on('click', '#AddActor', function(e) {
        $('#Modal').find('.modal-title').text("Add Actor");
        $('#ActorSubmit').attr('data-id', 'save');
        $('#Modal').modal('show');
    });




    // SHOW EDIT ACTOR MODAL

    $(document).on('click', '.editact', function(e) {
        var id = $(this).attr('id');
        $('#Modal').find('.modal-title').text("Edit Actor"); //CHANGE THE MODAL HEADER
        $('#ActorSubmit').attr('data-id', 'update'); //CHANGE THE FUNCTION OF THE SUBMIT BUTTON
        $('<input>').attr({ type: 'hidden', id: 'actorid', name: 'actor_id', value: id }).appendTo('#Modal');

        $.ajax({ //GET ALL THE DATA OF THE ACTOR TO BE EDITED THROUGH AJAX CALL
            type: "GET",
            url: "/actor/" + id + "/edit",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(response) {
                console.log(response);
                $('#artista').val(response.actor_fullname);
                $('#actor_notes').val(response.actor_notes);
                $('#Modal').modal('show')
            },
            error: function(e) {
                console.log(e.responseText);
            }
        });
    });

    //Dragabble Modal
    $("#Modal").draggable({
        handle: ".modal-header"
    });


    //=================================================================================================================//



    //delete actor

    $("#actorbody").on('click', '.deleteact', function(e) {
        var id = $(this).data('id');
        var $tr = $(this).closest('tr');
        e.preventDefault();

        bootbox.confirm({
            message: "do you want to delete Actor with Id number: " + id + "?",
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
                        url: "/actor/" + id,
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