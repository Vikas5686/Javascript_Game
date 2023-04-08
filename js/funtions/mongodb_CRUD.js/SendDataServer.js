const senddata = async (NewUser) => {
    const respon = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUser)
    })
    if (respon.status===404||!respon) {
        alert("Email already exist")
    }
    else if (respon.status===403) {
        alert("Please fill the form")
    }
    else{
        convas.style.display = "block"
        score.style.display = "block"
        document.getElementById("box").style.display = "none";
        animate()
        spawEnemy();
    }
    
}