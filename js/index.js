loginbtn.addEventListener('click', async () => {
    const NewUser = {
        name: name.value,
        country: Country.value,
        email: email.value,
        Score: notes,
    }
    console.log(NewUser)
    await senddata(NewUser)
    setLocatstorage=email.value
    localStorage.setItem('email',setLocatstorage)
    console.log(setLocatstorage)
    clickFlag=1;
})

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
            x: Math.cos(angle) * 7,
            y: Math.sin(angle) * 7
        }
    }
    player = new Player(x, y, 10, color)
    projectiles.push(
        new Projectile(convas.width / 2, convas.height / 2, 5, color, velocity)
    )
 
    clickFlag=1;
})

navbutton.addEventListener('click', async() => {
    stoploop=0;
    tab=document.getElementsByTagName('tr')
   for (let i = 1; i < tab.length; i++) {
    console.log(tab[i].Score)
     tab[i].remove();
   }
    console.log("nav click")
    cancelAnimationFrame(animatedId)
    const emailLocal=localStorage.getItem("email")
    console.log(emailLocal+" and "+notes)
   await UpdateDataServer(emailLocal,notes)
})

closeNav.addEventListener('click', () => {
    stoploop=1;
        requestAnimationFrame(animate)
})

localStorage_access()