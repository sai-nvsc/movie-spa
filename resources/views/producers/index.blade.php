@extends('layouts.master')
@section('body')
    <div class="container">
        <button type="button" class="btn btn-info btn-lg" id="AddProducer" >ADD PRODUCER <span  class="fas fa-plus-square" aria-hidden="true"></span></button>
@if ($message = Session::get('success'))
 <div class="alert alert-success alert-block" id="alert">
@endif

<div id="actortable" class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Producer ID</th>
            <th>Producer Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody id="producerbody">

        </tbody>
      </table>
    </div>
    </div>
    @endsection


    {{-- MODALS --}}
    @include('producers.modals')

    {{-- Custom Javascript for actors --}}
    @section('script')
    <script type=text/javascript src="{{ asset('js/producer.js') }}"></script>
    @endsection
