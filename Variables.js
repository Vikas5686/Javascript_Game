const convas = document.querySelector('canvas')
const c = convas.getContext('2d')

console.log("variabe")
const body = document.querySelector('body')
const tablular = document.getElementById('tablular')
let spin = document.getElementById('spin')
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
var localscore="javascriptGameV.60"
var notes = localStorage.getItem(localscore)
var Scoring = 0;
let clickFlag = 1;
let baseUrl = "https://scsdffsdfg.onrender.com"
let stoploop = 1;
const x = convas.width / 2
const y = convas.height / 2
let callenemy = 0;
let color = `hsl(${Math.random() * 360},100%,50%)`
let html = ""
let Navbarflag = 1;
let flag = 1;
let friction = 1;
let setLocatstorage;
let  emailflag = localStorage.getItem("email")

//score
score.innerHTML = 0;

//object
var player = new Player(x, y, 10, color)
const defendYellow = new DefendYellow(x, y, 12, 'transparent')

// array
const projectiles = []
const Enemies = []
const particles = []

setInterval(() => {
    clickFlag = 0;
}, 240000);