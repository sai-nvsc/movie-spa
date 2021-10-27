{{-- Add AND UPDATE Actor Modal --}}
<div class="modal fade" id="Modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" >
      <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Actor</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <form id="ActorData" action="#">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    {{-- Actor Full Name --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Actor Full Name</label>
                        <input type="text" class="form-control" id="artista" name="actor_fullname" value="{{ old('name') }}">
                        {{-- display error  --}}
                        @if ($errors->has('actor_fullname'))
                            <small>{{ $errors->first('actor_fullname') }}</small>
                        @endif
                    </div>
                        {{-- Actor Notes --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Actor Notes</label>
                        <input type="text" class="form-control" id="actor_notes" name="actor_notes" value="{{ old('note') }}">
                        {{-- display error  --}}
                        @if ($errors->has('note'))
                            <small>{{ $errors->first('note') }}</small>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="ActorSubmit" type="submit" data-id="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
