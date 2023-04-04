console.log("every thing is fine")
const convas = document.querySelector('canvas')
const c = convas.getContext('2d')

const body = document.querySelector('body')
const nav = document.querySelector('nav')
const navbutton = document.getElementById("navbutton")
const closeNav = document.getElementById("closeNav")
const container = document.getElementById("container")
const name = document.getElementById("name")
const Gender = document.getElementById("Gender")
const Country = document.getElementById("Country")
const score = document.querySelector('.navbar-brand')
const loginbtn = document.querySelector('.login')
let animatedId

convas.width = window.screen.availWidth
convas.height = window.screen.availHeight
nav.style.border = '1px solid cyan'

//variable
const x = convas.width / 2
const y = convas.height / 2
let color = `hsl(${Math.random() * 360},100%,50%)`
let html = ""
let Navbarflag = 1;
let flag = 1;
let notes = localStorage.getItem('javascriptgame')
const Scoring = 0;
let friction = 1;
// class
class Player {
    constructor(x, y, radious, color) {
        this.x = x;
        this.y = y;
        this.radious = radious;
        this.color = color;
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class DefendYellow {
    constructor(x, y, radious, color) {
        this.x = x;
        this.y = y;
        this.radious = radious;
        this.color = color;
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radious, color, velecity) {
        this.x = x;
        this.y = y;
        this.radious = radious;
        this.color = color;
        this.velecity = velecity;
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velecity.x
        this.y = this.y + this.velecity.y
    }
}
class Enemy {
    constructor(x, y, radious, color, velecity) {
        this.x = x;
        this.y = y;
        this.radious = radious;
        this.color = color;
        this.velecity = velecity;
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velecity.x
        this.y = this.y + this.velecity.y
    }
}

class Particle {
    constructor(x, y, radious, color, velecity) {
        this.x = x;
        this.y = y;
        this.radious = radious;
        this.color = color;
        this.velecity = velecity;
        this.alpha = 1
    }
    draw() {
        c.save()
        c.globalAlpha = 1
        c.beginPath()
        c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    update() {
        this.draw()
        this.velecity.x *= friction
        this.velecity.y *= friction
        this.x = this.x + this.velecity.x
        this.y = this.y + this.velecity.y
        this.alpha -= 0.0021;
    }
}


//score
score.innerHTML = 0;

//object
let player = new Player(x, y, 10, color)
const defendYellow = new DefendYellow(x, y, 12, 'transparent')

// array
const projectiles = []
const Enemies = []
const particles = []


//funtion defining
const add = async () => {
    console.log("send data from mongo")
    const respon = await fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUser)
    })
    console.log(respon)
}

function spawEnemy() {
    console.log("enemy")
    setInterval(() => {
        const radious = Math.random() * 30 + 10;
        const x = Math.random() < 0.5 ? 0 - radious : convas.width + 100
        const y = Math.random() < 0.5 ? 0 - radious : convas.height + 100
        const color1 = `hsl(${Math.random() * 360},100%,50%)`
        const angle = Math.atan2(
            convas.height / 2 - y,
            convas.width / 2 - x
        )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        Enemies.push(
            new Enemy(x, y, radious, color1, velocity)
        )
    }, 3000)
}

const get = async () => {
    console.log("get data from mongo")
    const respon = await fetch('http://localhost:3000/getrequist', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await respon.json();
    data.forEach((element, i) => {
        html += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${element.name}</td>
        <td>${element.country}</td>
        <td>${element.score}</td>
        </tr>
        `
    })
    const tablular = document.getElementById('tablular')
    tablular.innerHTML = html
}

function animate() {
    console.log("animation call")
    animatedId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0 ,0 ,0 ,0.1)'
    c.fillRect(0, 0, convas.width, convas.height)
    player.draw()
    defendYellow.draw()
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })
    projectiles.forEach((x) => {
        x.update()
    })
    Enemies.forEach((e, eindex) => {
        e.update()
        const dist = Math.hypot(player.x - e.x, player.y - e.y)
        if (dist - e.radious - player.radious < 1) {
            cancelAnimationFrame(animatedId)
        }
        const dist2 = Math.hypot(defendYellow.x - e.x, defendYellow.y - e.y)
        if (dist2 - e.radious - defendYellow.radious < 1) {
            // play2()

            for (let i = 0; i < e.radious; i++) {
                particles.push(
                    new Particle(defendYellow.x, defendYellow.y, Math.random() * 2, e.color, {
                        x: Math.random() - 0.5,
                        y: Math.random() - 0.5
                    })
                )
            }
            for (let i = 0; i < e.radious; i++) {
                particles.push(
                    new Particle(defendYellow.x, defendYellow.y, Math.random() * 2, player.color, {
                        x: Math.random() - 0.5,
                        y: Math.random() - 0.5
                    })
                )
            }

            if (e.radious - 10 > 10) {
                notes = notes + 10;
                //score
                score.innerHTML = notes
                localStorage.setItem('javascriptgame', notes);
                gsap.to(e, {
                    radious: e.radious - 10
                })
            }
            else {
                setTimeout(() => {
                    Enemies.splice(eindex, 1)
                }, 0)
            }
        }
        //
        projectiles.forEach((p, pindex) => {
            const dist = Math.hypot(p.x - e.x, p.y - e.y)
            if (dist - e.radious - p.radious < 1) {
                if (flag) {
                    if ((e.velecity.y > 0 && e.velecity.x > 0) || (e.velecity.y < 0 && e.velecity.x < 0)) {

                        for (let i = 0; i < e.radious; i++) {
                            particles.push(
                                new Particle(p.x, p.y, Math.random() * 2, e.color, {
                                    x: Math.random() - 0.5 + (Math.random() * 1.5),
                                    y: Math.random() - 0.5 - (Math.random() * 1.5)
                                })
                            )
                        }
                        for (let i = 0; i < e.radious; i++) {

                            particles.push(
                                new Particle(p.x, p.y, Math.random() * 2, p.color, {
                                    x: Math.random() - 0.5 - (Math.random() * 1.5),
                                    y: Math.random() - 0.5 + (Math.random() * 1.5)
                                })
                            )
                        }
                    }
                    else {
                        for (let i = 0; i < e.radious; i++) {
                            particles.push(
                                new Particle(p.x, p.y, Math.random() * 2, e.color, {
                                    x: Math.random() - 0.5 - (Math.random() * 1),
                                    y: Math.random() - 0.5 - (Math.random() * 1)
                                })
                            )
                        }
                        for (let i = 0; i < e.radious; i++) {

                            particles.push(
                                new Particle(p.x, p.y, Math.random() * 2, p.color, {
                                    x: Math.random() - 0.5 + (Math.random() * 1.5),
                                    y: Math.random() - 0.5 + (Math.random() * 1.5)
                                })
                            )
                        }
                    }
                    flag = 0;
                }
                else {
                    for (let i = 0; i < e.radious; i++) {
                        particles.push(
                            new Particle(p.x, p.y, Math.random() * 2, e.color, {
                                x: Math.random() - 0.5,
                                y: Math.random() - 0.5
                            })
                        )
                    }
                    for (let i = 0; i < e.radious; i++) {

                        particles.push(
                            new Particle(p.x, p.y, Math.random() * 2, p.color, {
                                x: Math.random() - 0.5,
                                y: Math.random() - 0.5
                            })
                        )
                    }
                    flag = 1;
                }

                // play2()

                if (e.radious - 10 > 10) {
                    notes = notes + 10;
                    // score
                    score.innerHTML = notes
                    localStorage.setItem('javascriptgame', notes);
                    gsap.to(e, {
                        radious: e.radious - 10
                    })
                    setTimeout(() => {
                        projectiles.splice(pindex, 1)
                    }, 0)
                }
                else {
                    setTimeout(() => {
                        Enemies.splice(eindex, 1)
                        projectiles.splice(pindex, 1)
                    }, 0)
                }

            }
        })
    })

}

// event
loginbtn.addEventListener('click', () => {
    convas.style.display = "block"
    score.style.display = "block"
    document.getElementById("box").style.display = "none";
    const NewUser = {
        name: name.value,
        country: Country.value,
        Score: notes,
    }
    console.log(NewUser)
    add()
    spawEnemy();
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
})

navbutton.addEventListener('click', () => {
    console.log("nav click")
    cancelAnimationFrame(animatedId)
})

closeNav.addEventListener('click', () => {
    requestAnimationFrame(animate)
})

//funtions call



if (notes == null) {
    convas.style.display = "none"
    container.style.display = "block"
    localStorage.setItem('javascriptgame', 10);
}
else {
    container.style.display = "none"
    notes++
    score.innerHTML = notes
    animate();
    get();
    spawEnemy()
}


