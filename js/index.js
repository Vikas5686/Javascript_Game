loginbtn.addEventListener('click', async () => {
    const NewUser = {
        name: name.value,
        country: Country.value,
        email: email.value.slice(0, email.value.indexOf(' ')),
        Score: notes,
    }
    // SET THE USER ON THE DATABASE
    await senddata(NewUser)
    //GENERELISE THE LOCAL STORAGE
    setLocatstorage = NewUser.email
    localStorage.setItem('email', setLocatstorage)
    clickFlag = 1;
})


// OPERATION ON CLICK ANYWHERE
addEventListener('click', (event) => {
    color = `hsl(${Math.random() * 360},100%,50%)`
    const angle = Math.atan2(
        event.clientY - convas.height / 2,
        event.clientX - convas.width / 2
    )
    let velocity;
    if (flag) {
        velocity = {
            x: Math.cos(angle) * 12,
            y: Math.sin(angle) * 12
        }
    }
    else {
        velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
    }
    // DIFFERENT COLOR PLAYER OBJECT UPDATE
    player = new Player(x, y, 10, color)
    projectiles.push(
        new Projectile(convas.width / 2, convas.height / 2, 5, color, velocity)
    )

    clickFlag = 1;
})

navbutton.addEventListener('click', () => {
    stoploop = 0;
    tab = document.getElementsByTagName('tr')
    for (let i = 1; i < tab.length; i++) {
        console.log(tab[i].Score)
        tab[i].remove();
    }
    cancelAnimationFrame(animatedId)
    let emailflag2 = localStorage.getItem('id')//please do not remove this line
    emailflag2=JSON.parse(emailflag2)
    UpdateDataServer(emailflag2, notes)
})

closeNav.addEventListener('click', () => {
    console.log("click")
    stoploop = 1;
    requestAnimationFrame(animate)
})

localStorage_access()