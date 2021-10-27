{{-- Add AND UPDATE GENRE Modal --}}
<div class="modal fade" id="Modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" >
      <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Genre</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <form id="GenreData" action="#" name="Genre">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    {{-- GENRE Name --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Genre</label>
                        <input type="text" class="form-control" id="genre" name="genre" value="{{ old('genre') }}">
                        {{-- display error  --}}
                        @if ($errors->has('genre'))
                            <small>{{ $errors->first('genre') }}</small>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="GenreSubmit" type="submit" data-id="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
