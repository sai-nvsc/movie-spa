{{-- Add AND UPDATE Roletype Modal --}}
<div class="modal fade" id="Modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" >
      <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Roles</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <form id="RoleData" action="#" name="Role">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    {{-- Roletype Name --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Role</label>
                        <input type="text" class="form-control" id="role" name="roletype" value="{{ old('genre') }}">
                        {{-- display error  --}}
                        @if ($errors->has('roletype'))
                            <small>{{ $errors->first('roletype') }}</small>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="RoleSubmit" type="submit" data-id="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
