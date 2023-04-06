let notes =localStorage.getItem("javascript")
function localStorage_access() {
    if (notes == null) {
        convas.style.display = "none"
        container.style.display = "block"
    }
    else {
        container.style.display = "none"
        notes++
        score.innerHTML = notes
        animate();
        spawEnemy()
    }
}