const convas = document.querySelector('canvas')
const body = document.querySelector('body')
const score = document.querySelector('.score1')
const c = convas.getContext('2d')
let color = `hsl(${Math.random() * 360},100%,50%)`
let flag = 1;


let notes = localStorage.getItem('Scorevs5686mahan')
if (notes == null) {
    localStorage.setItem('notes', 10);
}
else {
    notes++
    score.innerHTML = notes
}


function play2() {
    var audio = new Audio(
        './WoodCrashesDistant FS022705.mp3');
    audio.play();
}

convas.width = window.screen.availWidth
convas.height = window.screen.availHeight

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
//enimy
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
const Scoring = 0;
const friction = 1;
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
const x = convas.width / 2
const y = convas.height / 2

let player = new Player(x, y, 10, color)
const defendYellow = new DefendYellow(x, y, 12, 'transparent')



//
const projectiles = []
//enimy
const Enemies = []
const particles = []

//enimy
function spawEnemy() {
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
    }, 2500)
}

let animatedId
//
function animate() {
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

    //enimy
    Enemies.forEach((e, eindex) => {
        e.update()
        const dist = Math.hypot(player.x - e.x, player.y - e.y)
        if (dist - e.radious - player.radious < 1) {
            cancelAnimationFrame(animatedId)
        }
        const dist2 = Math.hypot(defendYellow.x - e.x, defendYellow.y - e.y)
        if (dist2 - e.radious - defendYellow.radious < 1) {
            play2()

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
                score.innerHTML = notes
                localStorage.setItem('Scorevs5686mahan', notes);
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
                let color = `hsl(${Math.random() * 360},100%,50%)`
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

                play2()

                if (e.radious - 10 > 10) {
                    notes = notes + 10;
                    score.innerHTML = notes
                    localStorage.setItem('Scorevs5686mahan', notes);
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

addEventListener('click', (event) => {
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
    else{
         velocity = {
            x: Math.cos(angle) * 7,
            y: Math.sin(angle) * 7
        }
    }
    color = `hsl(${Math.random() * 360},100%,50%)`
    player = new Player(x, y, 10, color)
    projectiles.push(
        new Projectile(convas.width / 2, convas.height / 2, 5, color, velocity)
    )

})

animate();
//enimy
spawEnemy();