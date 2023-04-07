let notes =localStorage.getItem("javascript")
alert("For better experience use Crome browser")

function localStorage_access() {
    const emailflag=localStorage.getItem("email")
    if (notes == null && emailflag==null) {
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