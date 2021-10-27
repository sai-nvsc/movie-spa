@extends('layouts.master')
@section('body')
    <div class="container">
        <button type="button" class="btn btn-info btn-lg" id="AddRole" >ADD ROLES <span  class="fas fa-plus-square" aria-hidden="true"></span></button>
{{-- @if ($message = Session::get('success'))
 <div class="alert alert-success alert-block" id="alert">
@endif --}}

<div id="actortable" class="table-responsive">
    <table class="table table-striped table-hover" id="genre-table">
        <thead>
          <tr>
            <th>Role Type ID</th>
            <th>Role Type</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody id="rolesbody">

        </tbody>
      </table>
    </div>
    </div>
    @endsection


    {{-- MODALS --}}
    @include('roletypes.modals')

    {{-- Custom Javascript for actors --}}
    @section('script')
    <script type=text/javascript src="{{ asset('js/roles.js') }}"></script>
    @endsection
