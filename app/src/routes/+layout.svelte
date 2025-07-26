<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    var { children } = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary mb-2">
    <div class="container">
        <span class="navbar-brand" href="#">SvelteKit and AI</span>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/image_recognition"
                        >Image Recognition</a
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/object_detection"
                        >Object Detection</a
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/rock_paper_scissors"
                        >Rock Paper Scissors</a
                    >
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/speech">Speech</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/translation">Translation</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/app_generation">App Generation</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container mb-3">
    {@render children()}
</div>
