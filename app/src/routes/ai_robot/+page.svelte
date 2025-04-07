<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import * as THREE from "three";

    var s_RenderArea = $state();

    const [WIDTH, HEIGHT] = [600 * 1.4, 600];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xbbff44 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    renderer.setAnimationLoop(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    });

    onMount(() => {
        s_RenderArea.innerHTML = "";
        s_RenderArea.appendChild(renderer.domElement);
    });
</script>

<div bind:this={s_RenderArea}></div>
