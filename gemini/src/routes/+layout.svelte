<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    var { children } = $props();

</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <span class="navbar-brand" href="#">Gemini</span>
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
        </div>

    </div>
</nav>

<div class="container mb-3">
    {@render children()}
</div>
