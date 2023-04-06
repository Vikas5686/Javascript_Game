const senddata = async (NewUser) => {
    console.log("send data to mongo")
    // const respon = await fetch('http://localhost:3000/register', {
    const respon = await fetch('https://scsdffsdfg.onrender.com/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUser)
    })
    console.log(respon)
    if (respon.status===404||!respon) {
        alert("user already exist")
    }
    else if (respon.status===403) {
        alert("please fill the form")
    }
    else{
        convas.style.display = "block"
        score.style.display = "block"
        document.getElementById("box").style.display = "none";
        animate()
    }
    
}