<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>@yield('title')</title>
        @include('layouts.head')
        <script>var base_url="{{ asset('/') }}";</script>
        @yield('additional_sripts');
    </head>
    <body>
        {{-- @include('layouts.navbar') --}}
        <div class="container">
            @include('layouts.navbar')
        </div>
        @yield('body')
        @yield('script')
    </body>
</html>
