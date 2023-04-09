alert("For better experience use Crome browser")

function localStorage_access() {
    if (notes == null || emailflag == null) {
        convas.style.display = "none"
        container.style.display = "block"
        localStorage.clear()
        notes = 0;
    }
    else {
        container.style.display = "none"
        score.innerHTML = notes
        notes++
        animate();
        spawEnemy()
    }
}