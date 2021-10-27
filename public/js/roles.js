$(document).ready(function() {

    // COLLECT ALL PRODUCERS
    $.ajax({
        type: "GET",
        url: "roles/all",
        dataType: "json",
        success: function(response) {
            $.each(response, function(roles, role) {
                console.log(role);
                var id = role.id;
                var tr = $("<tr>");
                tr.append($("<td>").html(role.id));
                tr.append($("<td>").html(role.roletype));
                tr.append($("<td><a href='#' class='editrole' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                tr.append($("<td><a href='#' class='deleterole' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                $("#rolesbody").append(tr);
            });

            //For Sortable Table and Pagination, I used the JQuery DataTables
            //Note: The Data still came from returned json data from the controller.
            // $("#genre-table").DataTable();
        },
        error: function(e) {
            console.log(e.responseText);
        }
    });



    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $("#RoleSubmit").click(function(e) {
        e.preventDefault();
        $('#RoleData').validate({
            rules: {
                roletype: "required",
            },
            messages: {
                roletype: "This field is required"
            }
        });

        if ($('#RoleData').valid()) {

            var data = $("#RoleData").serialize();
            var action = $("#RoleSubmit").data('id');
            console.log(data);
            if (action == 'save') {
                $.ajax({
                    type: "POST",
                    url: "/roles",
                    data: data,
                    dataType: "json",
                    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    success: function(role) {
                        $('#Modal').each(function() {
                            $(this).modal('hide');
                        });
                        console.log(role);
                        var id = role.id;
                        var tr = $("<tr>");
                        $("#RoleData").trigger("reset");
                        tr.append($("<td>").html(id));
                        tr.append($("<td>").html(role.roletype));
                        tr.append($("<td><a href='#' class='editrole' id=" + id + " ><i class='fas fa-edit' style='font-size:36px'></i></a></td>"));
                        tr.append($("<td><a href='#' class='deleterole' data-id=" + id + "><i class = 'fas fa-eraser'style = 'font-size:36px;color:red' ></i></a></td> "));
                        $('#rolesbody').prepend(tr);
                    },

                    error: function(e) {
                        console.log(e.responseText);
                    }
                });
            } else {
                var id = $('#role_id').val();
                var data = $("#RoleData").serialize();
                var newtext = document.getElementById('role').value;
                console.log(newtext);

                $.ajax({
                    type: "PUT",
                    url: "roles/" + id,
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


    });


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(document).on('click', '#AddRole', function(e) {
        $('#Modal').find('.modal-title').text("Add Role");
        $('#RoleSubmit').attr('data-id', 'save');
        $('#Modal').modal('show');
    });



    $(document).on('click', '.editrole', function(e) {
        var id = $(this).attr('id');
        var tr = $(this).closest('tr');
        tr.attr("class", "updating");
        // alert(tr.attr('class'));
        $('#Modal').find('.modal-title').text("Edit Role");
        $('#RoleSubmit').attr('data-id', 'update');
        console.log(id);
        $('<input>').attr({ type: 'hidden', id: 'role_id', name: 'role_id', value: id }).appendTo('#Modal');
        $.ajax({
            type: "GET",
            url: "/roles/" + id + "/edit",
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(response) {
                console.log(response);
                $('#role').val(response.roletype);
                $('#Modal').modal('show')
            },
            error: function(e) {
                console.log(e.responseText);
                alert('FAILURE TO LOAD THE DATA. See the console for info.');
            }
        });
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $("#rolesbody").on('click', '.deleterole', function(e) {
        var id = $(this).data('id');
        var $tr = $(this).closest('tr');
        e.preventDefault();

        bootbox.confirm({
            message: "do you want to delete Role with Id number: " + id + "?",
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
                        url: "/roles/" + id,
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