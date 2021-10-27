$(document).ready(function() {

    // COLLECT ALL PRODUCERS
    $.ajax({
        type: "GET",
        url: "genre/all",
        dataType: "json",
        success: function(response) {
            $.each(response, function(genres, genre) {
                console.log(genre);
                var id = genre.id;
                var tr = $("<tr>");
                tr.append($("<td>").html(genre.id));
                tr.append($("<td>").html(genre.genre));
                tr.append($("<td><a href='#' class='editgenre' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                tr.append($("<td><a href='#' class='deletegenre' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                $("#genrebody").append(tr);
            });

        },
        error: function(e) {
            console.log(e.responseText);
        }
    });



    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    $("#GenreSubmit").click(function(e) { // FORM VALIDATION
        e.preventDefault();
        $("#GenreData").validate({
            rules: {
                genre: "required",
            },
            messages: {
                genre: "This field is required"
            }
        });

        if ($('#GenreData').valid()) {
            var data = $("#GenreData").serialize();
            var action = $("#GenreSubmit").data('id');
            console.log(data);
            if (action == 'save') { //IF TRUE, NEW GENRE WILL BW ADDED
                $.ajax({
                    type: "POST",
                    url: "/genre",
                    data: data,
                    dataType: "json",
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    success: function(genre) {
                        $('#Modal').each(function() {
                            $(this).modal('hide');
                        });
                        console.log(genre);
                        var id = genre.id;
                        var tr = $("<tr>");
                        $("#GenreData").trigger("reset");
                        tr.append($("<td>").html(id));
                        tr.append($("<td>").html(genre.genre));
                        tr.append($("<td><a href='#' class='editgenre' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                        tr.append($("<td><a href='#' class='deletegenre' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                        tr.append($("<td>").html(""));
                        $('#genrebody').prepend(tr);
                    },

                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            } else { //GENRE WILL BE UPDATED


                if ($("#GenreData").valid()) {
                    var id = $('#genre_id').val();
                    var data = $("#GenreData").serialize();
                    var newtext = document.getElementById('genre').value;
                    console.log(newtext);

                    $.ajax({
                        type: "PUT",
                        url: "genre/" + id,
                        data: data,
                        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                        dataType: "json",
                        success: function(response) {
                            $("#Modal").each(function() {
                                $(this).modal('hide');
                            });

                            console.log(response);
                            $(".updating").find('td').eq(1).text(newtext);
                            $(".updating").removeClass("updating");
                            // $("<div title='Success'>New Data was Added to the Database!</div>").dialog();
                            // location.reload();
                        },

                        error: function(e) {
                            console.log(e.responseText);
                        }
                    });
                }

            }
        }



    });


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $(document).on('click', '#AddGenre', function(e) { //SHOW MODAL
        $('#Modal').find('.modal-title').text("Add Genre");
        $('#GenreSubmit').attr('data-id', 'save');
        $('#Modal').modal('show');
    });

    $("#Modal").on("hidden.bs.modal", function() {
        $("#GenreData").trigger("reset");
        $("#GenreData").validate().resetForm();
    });

    $(document).on('click', '.editgenre', function(e) { //EDIT SENRE MODAL
        var id = $(this).attr('id');
        var tr = $(this).closest('tr');
        tr.attr("class", "updating");
        // alert(tr.attr('class'));
        $('#Modal').find('.modal-title').text("Edit Genre");
        $('#GenreSubmit').attr('data-id', 'update');
        console.log(id);
        $('<input>').attr({ type: 'hidden', id: 'genre_id', name: 'genre_id', value: id }).appendTo('#Modal');
        // $('<input>').attr({ type: 'hidden', name: '_token', value: Laravel.csrfToken }).appendTo('#AddActor');
        $.ajax({
            type: "GET",
            url: "/genre/" + id + "/edit",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(response) {
                console.log(response);
                $('#genre').val(response.genre);
                $('#Modal').modal('show')
            },
            error: function(e) {
                console.log(e.responseText);
                alert('FAILURE TO LOAD THE DATA. See the console for info.');
            }
        });
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#genrebody").on('click', '.deletegenre', function(e) {
        var id = $(this).data('id');
        var $tr = $(this).closest('tr');
        e.preventDefault();

        bootbox.confirm({
            message: "do you want to delete Genre with Id number: " + id + "?",
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
                        url: "/genre/" + id,
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


//Dragabble Modal
$("#Modal").draggable({
    handle: ".modal-header"
});



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//