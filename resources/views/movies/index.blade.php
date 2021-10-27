   @extends('layouts.master')
@section('body')
    <div class="container">
        <button type="button" class="btn btn-info btn-lg" id="AddMovie" >ADD MOVIE <span  class="fas fa-plus-square" aria-hidden="true"></span></button>
@if ($message = Session::get('success'))
 <div class="alert alert-success alert-block" id="alert">
 {{-- <button type="button" class="close" data-dismiss="alert">×</button>
         <strong>{{ $message }}</strong>
 </div> --}}
@endif

<div id="actortable" class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Movie ID</th>
                <th>Poster</th>
                <th>Title</th>
                <th>Synopsis</th>
                <th>Released Date</th>
                <th>Duration</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody id="moviebody">

        </tbody>
      </table>
    </div>
    </div>
    @endsection


    {{-- MODALS --}}
    @include('movies.modals')

    {{-- Custom Javascript for actors --}}
    @section('script')
    <script type=text/javascript src="{{ asset('js/movie.js') }}"></script>
    @endsection
