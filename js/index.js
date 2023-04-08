const convas = document.querySelector('canvas')
const c = convas.getContext('2d')

const body = document.querySelector('body')
const nav = document.querySelector('nav')
const navbutton = document.getElementById("navbutton")
const closeNav = document.getElementById("closeNav")
const container = document.getElementById("container")
const name = document.getElementById("name")
const email = document.getElementById("email")
const Country = document.getElementById("Country")
const score = document.querySelector('.navbar-brand')
const loginbtn = document.querySelector('.login')
let animatedId

convas.width = window.screen.availWidth
convas.height = window.screen.availHeight
nav.style.border = '1px solid cyan'

//variable
// let baseUrl="https://localhost:3000"
let clickFlag=1;
setInterval(() => {
    clickFlag=0;
}, 30000);
let baseUrl="https://scsdffsdfg.onrender.com"
let stoploop=1;
const x = convas.width / 2
const y = convas.height / 2
let callenemy = 0;
let color = `hsl(${Math.random() * 360},100%,50%)`
let html = ""
let Navbarflag = 1;
let flag = 1;
const Scoring = 0;
let friction = 1;
let setLocatstorage;

//score
score.innerHTML = 0;

//object
let player = new Player(x, y, 10, color)
const defendYellow = new DefendYellow(x, y, 12, 'transparent')

// array
const projectiles = []
const Enemies = []
const particles = []

// event
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