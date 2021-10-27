{{-- Add AND UPDATE PRODUCER Modal --}}
<div class="modal fade" id="Modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" >
      <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Producer</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <form id="ProducerData" action="#">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    {{-- Prodcuer Name --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Producer Name</label>
                        <input type="text" class="form-control" id="prodyuser" name="producer_name" value="{{ old('producer_name') }}" placeholder="e.g Juan Dela Cruz">
                        {{-- display error  --}}
                        @if ($errors->has('producer_name'))
                            <small>{{ $errors->first('producer_name') }}</small>
                        @endif
                    </div>
                        {{-- Email --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Email</label>
                        <input type="text" class="form-control" id="prod_email" name="email" value="{{ old('email') }}" placeholder="e.g someone@myemail.com">
                        {{-- display error  --}}
                        @if ($errors->has('email'))
                            <small>{{ $errors->first('email') }}</small>
                        @endif
                    </div>

                    {{-- Producer Website --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Website</label>
                        <input type="text" class="form-control" id="prod_site" name="website" value="{{ old('website') }}" placeholder="e.g http://me.com">
                        {{-- display error  --}}
                        @if ($errors->has('website'))
                            <small>{{ $errors->first('website') }}</small>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="ProducerSubmit" type="submit" data-id="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>
