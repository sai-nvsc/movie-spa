@extends('layouts.master')
@section('body')
    <div class="container">
        <button type="button" class="btn btn-info btn-lg" id="AddGenre" >ADD GENRE <span  class="fas fa-plus-square" aria-hidden="true"></span></button>
@if ($message = Session::get('success'))
 <div class="alert alert-success alert-block" id="alert">
@endif

<div id="actortable" class="table-responsive">
    <table class="table table-striped table-hover" id="genre-table">
        <thead>
          <tr>
            <th>Genre ID</th>
            <th>Genre</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody id="genrebody">

        </tbody>
      </table>
    </div>
    </div>

    @endsection


    {{-- MODALS --}}
    @include('genres.modals')

    {{-- Custom Javascript for actors --}}
    @section('script')
    <script type=text/javascript src="{{ asset('js/genre.js') }}"></script>
    @endsection
