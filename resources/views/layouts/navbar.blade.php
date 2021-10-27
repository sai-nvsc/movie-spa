<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{{ config('app.name') }}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="{{ route('home') }}">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{{ route('movie.index') }}">Movies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{{ route('actor.index') }}">Actors</a>
        </li>
        <div class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Others</a>
            <div class="dropdown-menu">
                <a href="{{ route('genre.index') }}" class="dropdown-item">Genre</a>
                <a href="{{ route('producer.index') }}" class="dropdown-item">Producers</a>
                <a href="{{ route('roles.index') }}" class="dropdown-item">RoleTypes</a>
            </div>
        </div>
      </ul>
    </div>
  </div>
</nav>
