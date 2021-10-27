{{-- Add AND UPDATE Movie Modal --}}
<div class="modal fade" id="Modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" >
      <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Movie</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <form id="MovieData" action="#" enctype="multipart/form-data">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    {{-- Film Title --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Movie Title</label>
                        <input type="text" class="form-control" id="pamagat" name="title" value="{{ old('title') }}">
                        {{-- display error  --}}
                        @if ($errors->has('title'))
                            <small>{{ $errors->first('title') }}</small>
                        @endif
                    </div>
                        {{-- Movie Poster --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Movie Poster</label>
                        <input type="file" class="form-control" id="poster" name="poster" value="{{ old('poster') }}">
                        {{-- display error  --}}
                        @if ($errors->has('poster'))
                            <small>{{ $errors->first('poster') }}</small>
                        @endif
                    </div>
                    {{-- Movie Synopsis --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Movie Synopsis</label>
                        <textarea class="form-control" id="synopsis" name="synopsis" value="{{ old('synopsis') }}"></textarea>
                        {{-- display error  --}}
                        @if ($errors->has('synopsis'))
                            <small>{{ $errors->first('synopsis') }}</small>
                        @endif
                    </div>

                    <div class="form-group">
                        <input type="button" class="btn btn-success pull-right" id="add_genre" name="add" value="Add Genre">
                        <table class="table table-bordered table-striped", id="genre_table">
                            <thead>
                                <tr>
                                    <th>Genre</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="genre">
                            </tbody>
                        </table>
                    </div>

                    <div class="form-group">
                        <input type="button" class="btn btn-success pull-right" id="add_cast" name="add" value="Add Actor to Film">
                        <table class="table table-bordered table-striped", id="casts_table">
                            <thead>
                                <tr>
                                    <th>Actor</th>
                                    <th>Role</th>
                                    <th>As</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="casts">
                            </tbody>
                        </table>
                    </div>

                    {{-- Movie Release Date --}}
                    <div class="form-group">
                        <label for="name" class="control-label">Movie Release Date</label>
                        <input type="date" class="form-control" id="date" name="released_date" value="{{ old('date') }}">
                        {{-- display error  --}}
                        @if ($errors->has('date'))
                            <small>{{ $errors->first('date') }}</small>
                        @endif
                    </div>

                    <div class="form-group">
                        <input type="button" class="btn btn-success pull-right" id="add_producer" name="add" value="Add Producer to Film">
                        <table class="table table-bordered table-striped", id="producer_table">
                            <thead>
                                <tr>
                                    <th>Producer Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="producer">
                            </tbody>
                        </table>
                    </div>


                    <div class="form-group">
                        <label for="duration" class="control-label">Movie Run Time</label>
                        <input type="text" class="form-control" id="duration" name="film_duration" value="{{ old('duration') }}">
                        {{-- display error  --}}
                        @if ($errors->has('duration'))
                            <small>{{ $errors->first('duration') }}</small>
                        @endif
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button id="MovieSubmit" type="submit" data-id="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>



{{-- ************************************************************************************************************************************** --}}
