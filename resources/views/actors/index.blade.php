@extends('layouts.master')
@section('body')
    <div class="container">
        <button type="button" class="btn btn-info btn-lg" id="AddActor" >ADD ACTOR <span  class="fas fa-plus-square" aria-hidden="true"></span></button>
@if ($message = Session::get('success'))
@endif

<div id="actortable" class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Actor ID</th>
            <th>Full Name</th>
            <th>Notes</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody id="actorbody">

         </tbody>
      </table>
    </div>
    </div>
    @endsection


    {{-- MODALS --}}
    @include('actors.modals')

    {{-- Custom Javascript for actors --}}
    @section('script')
    <script type=text/javascript src="{{ asset('js/actor.js') }}"></script>
    @endsection
