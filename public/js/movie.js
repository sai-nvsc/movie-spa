$(document).ready(function() {
    // These are for the dynamically addding rows to edit and create movies.

    var producer_count = 1,
        genre_count = 1,
        cast_count = 1,
        role_count = 1;

    $.ajax({
        type: "GET",
        url: "movie/all",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $.each(data, function(key, value) {
                var id = value.id;
                var tr = $("<tr>");
                tr.append($("<td>").html(value.id));
                tr.append($("<td><img src=" + base_url + 'images/' + value.image + " height='100' width='50' style='float:left'></td>"));
                tr.append($("<td>").html(value.title));
                tr.append($("<td>").html(value.synopsis));
                tr.append($("<td>").html(value.released_date));
                tr.append($("<td>").html(value.film_duration));
                tr.append($("<td><a href='#' class='editmovie' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                tr.append($("<td><a href='#' class='deleteact' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                $("#moviebody").append(tr);
            });
        },
        error: function(e) {
            alert('error');
            console.log(e.responseText);
        }
    });



    // ++++++++++++++++++++++++++++++++++++++++++++++++CUSTOM FUNCTIONS FOR MODAL+++++++++++++++++++++++++++++++++++++++++++++++++++//

    $('#add_producer').on('click', function() { // Function to call to add multiple Producers in Movie Create Modal.

        $.ajax({
            type: "GET",
            url: "producer/all",
            dataType: "json",
            success: function(response) {
                var tr = $("<tr>");
                tr.append($("<td><select name='producer_id[]' id='emptyProdDropDown" + producer_count + "' class='form-control'></select></td>"));
                tr.append($("<td><button class='btn btn-danger' name='remove'>Remove</button></td></tr>"));

                $("#producer").append(tr);
                $.each(response, function(key, value) {
                    $("#emptyProdDropDown" + producer_count).append("<option value=" + value.id + ">" + value.producer_name + "</option>");
                })
                producer_count++;
            }
        });
    });

    $("#add_genre").on('click', function() { // Function to call when adding genre to Movie Modal
        $.ajax({
            type: "GET",
            url: "genre/all",
            dataType: "json",
            success: function(response) {
                var tr = $("<tr>");
                tr.append($("<td><select name='genre_id[]' id='emptyGenreDropDown" + genre_count + "' class='form-control'></select></td>"));
                tr.append($("<td><button class='btn btn-danger' name='remove'>Remove</button></td></tr>"));

                $("#genre").append(tr);
                $.each(response, function(key, value) {
                    $("#emptyGenreDropDown" + genre_count).append("<option value=" + value.id + ">" + value.genre + "</option>");
                })
                genre_count++;
            }
        });
    })


    $("#add_cast").on('click', function() { //funtion to call when adding casts on movie modal
        $.ajax({
            type: "GET",
            url: "movie/getrole-actor",
            dataType: "json",
            success: function(response) {
                //console.log(response['actor']);
                var tr = $("<tr>");
                tr.append($("<td><select name='actor_id[]' id='emptyActorDropDown" + cast_count + "' class='form-control'></select></td>"));
                tr.append($("<td><select name='role_id[]' id='emptyRoleDropDown" + cast_count + "' class='form-control'></select></td>"));
                tr.append($("<input type='text' class='form-control' name='character_name[]'>"));
                tr.append($("<td><button class='btn btn-danger' name='remove'>Remove</button></td></tr>"));
                $("#casts").append(tr);
                $.each(response['actor'], function(key, value) {
                    $("#emptyActorDropDown" + cast_count).append("<option value=" + value.id + ">" + value.actor_fullname + "</option>");
                })
                $.each(response['roles'], function(key, value) {
                    $("#emptyRoleDropDown" + role_count).append("<option value=" + value.id + ">" + value.roletype + "</option>");
                })
                cast_count++;
                role_count++;
            }
        });
    })

    $("#Modal").on('click', '.btn-danger', function() { //Function to call when decreasing a certain number of Genre, Producer or Actors in Movie Modal.
        $(this).parents('tr').remove();
    });




    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//


    // FUNCTION IO CALL WHEN SUBMITNG THE MOVIE FORM
    $("#MovieSubmit").on('click', function(e) {
        e.preventDefault();

        var action = $("#MovieSubmit").attr('data-id');


        if (action == 'save') { //STORING NEW MOVIES
            $('#MovieData').validate({
                rules: {
                    title: "required",
                    poster: {
                        extension: "jpeg|png|jpg",
                        required: true
                    },
                    synopsis: {
                        required: true,
                        minlength: 120,
                        maxlength: 2000
                    },
                    date: {
                        required: true,
                    },
                    film_duration: {
                        required: true,
                    }

                }
            });
            if ($('#MovieData').valid()) {
                alert('yeah');
                $.ajax({
                    type: "POST",
                    url: "/movie",
                    data: new FormData(document.getElementById("MovieData")),
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    success: function(response) {
                        console.log(response);
                        $('#Modal').each(function() {
                            $(this).modal('hide');
                        });
                        var tr = $("<tr>");
                        tr.append($("<td>").html(response.id));
                        tr.append($("<td><img src=" + base_url + 'images/' + response.image + " height='100' width='50' style='float:left'></td>"));
                        tr.append($("<td>").html(response.title));
                        tr.append($("<td>").html(response.synopsis));
                        tr.append($("<td>").html(response.released_date));
                        tr.append($("<td>").html(response.film_duration));
                        tr.append($("<td><a href='#' class='editact' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                        tr.append($("<td><a href='#' class='deleteact' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                        $('#moviebody').prepend(tr);

                    },
                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            }

        } else { // UPDATING MOVIES
            $('#MovieData').validate({
                rules: {
                    title: "required",
                    synopsis: {
                        required: true,
                        minlength: 120,
                        maxlength: 2000
                    },
                    date: {
                        required: true,
                    },
                    film_duration: {
                        required: true,
                    }

                }
            });
            if ($('#MovieData').valid()) {
                var id = $('#movie_id').val();
                var formData = new FormData(document.getElementById("MovieData"));
                $.ajax({
                    type: 'POST',
                    url: '/movie/' + id + '/update',
                    data: formData,
                    processData: false,
                    contentType: false,
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    dataType: "json",
                    success: function(response) {
                        console.log(response);
                        $('#Modal').each(function() {
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

    // SHOW ADD Movie MODAL
    $(document).on('click', '#AddMovie', function(e) {
        $('#Modal').find('.modal-title').text("Add Movie");
        $('#MovieSubmit').attr('data-id', 'save');
        $('#Modal').modal('show');
    });




    // SHOW EDIT movie MODAL

    $(document).on('click', '.editmovie', function(e) {
        var id = $(this).attr('id');
        genre_count = 1;
        cast_count = 1;
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text("Edit Movie");
        $('#MovieSubmit').attr('data-id', 'update');
        console.log(id);
        $('<input>').attr({ type: 'hidden', id: 'movie_id', name: 'movie_id', value: id }).appendTo('#MovieData');

        $.ajax({
            type: "GET",
            url: "/movie/" + id + "/edit",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(response) {
                //console.log(response);
                $('#pamagat').val(response['movies'].title);
                $('#synopsis').val(response['movies'].synopsis);
                $('#date').val(response['movies'].released_date);
                $('#duration').val(response['movies'].film_duration);

                //genre table in edit movie modal


                $.each(response['movies']['genres'], function(key, value) {
                    var tr = $("<tr>");
                    tr.append($("<td><select name='genre_id[]' id='emptyGenreDropDown" + genre_count + "' class='form-control'></select></td>"));
                    tr.append($("<td><button class='btn btn-danger' name='remove'>Remove</button></td></tr>"));
                    $("#genre").append(tr);

                    $.each(response['genre'], function(key, genre) {
                        if (value.genre_id == genre.id) {
                            $("#emptyGenreDropDown" + genre_count).append("<option selected='selected'> value=" + genre.id + ">" + genre.genre + "</option>");
                        } else {
                            $("#emptyGenreDropDown" + genre_count).append("<option value=" + genre.id + ">" + genre.genre + "</option>");
                        }

                    })
                    genre_count++;
                });

                //cast table in edit movie modal

                $.each(response['movies']['actors'], function(key, actorval) {
                    var tr = $("<tr>");
                    tr.append($("<td><select name='actor_id[]' id='emptyActorDropDown" + cast_count + "' class='form-control'></select></td>"));
                    tr.append($("<td><select name='role_id[]' id='emptyRoleDropDown" + cast_count + "' class='form-control'></select></td>"));
                    tr.append($("<input type='text' class='form-control' name='character_name[]' value=" + actorval['pivot'].character_name + ">"));
                    tr.append($("<td><button class='btn btn-danger' name='remove'>Remove</button></td></tr>"));
                    $("#casts").append(tr);
                    $.each(response['actor'], function(key, actor) {
                        if (actorval.actor_id == actor.id) {
                            $("#emptyActorDropDown" + cast_count).append("<option selected='selected' value=" + actor.id + ">" + actor.actor_fullname + "</option>");
                        } else {
                            $("#emptyActorDropDown" + cast_count).append("<option value=" + actor.id + ">" + actor.actor_fullname + "</option>");
                        }

                    });
                    $.each(response['roletype'], function(key, roles) {
                        console.log(actorval['pivot'].role_id);
                        if (actorval['pivot'].role_id == roles.id) {
                            $("#emptyRoleDropDown" + role_count).append("<option selected='selected' value=" + roles.id + ">" + roles.roletype + "</option>");

                        } else {
                            $("#emptyRoleDropDown" + role_count).append("<option value=" + roles.id + ">" + roles.roletype + "</option>");
                        }
                    });

                });

                //producer table in edit movie modal
                $.each(response['movies']['producers'], function(key, prodval) {
                    var tr = $("<tr>");
                    tr.append($("<td><select name='producer_id[]' id='emptyProdDropDown" + producer_count + "' class='form-control'></select></td>"));
                    tr.append($("<td><button class='btn btn-danger' name='remove'>Remove</button></td></tr>"));
                    $("#producer").append(tr);
                    $.each(response['producer'], function(key, producer) {
                        if (prodval.producer_id == producer.id) {
                            $("#emptyProdDropDown" + producer_count).append("<option selected='selected' value=" + producer.id + ">" + producer.producer_name + "</option>");
                        } else {
                            $("#emptyProdDropDown" + producer_count).append("<option value=" + producer.id + ">" + producer.producer_name + "</option>");
                        }
                    });

                });



                // $("<div title='Success'>New Data was Added to the Database!</div>").dialog();

            },
            error: function(e) {
                console.log(e.responseText);
                alert('FAILURE TO LOAD THE DATA. See the console for info.');
            }
        });
    });

    $("#EditSubmit").click(function(e) {
        e.preventDefault();


    });




    $("#Modal").draggable({
        handle: ".modal-header"
    });



    //=================================================================================================================//



    //delete MOVIE

    $("#moviebody").on('click', '.deleteact', function(e) {
        var id = $(this).data('id');
        var $tr = $(this).closest('tr');
        e.preventDefault();

        bootbox.confirm({
            message: "do you want to delete Movie with Id number: " + id + "?",
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
                        url: "/movie/" + id,
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