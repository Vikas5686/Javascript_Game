const convas = document.querySelector('canvas')
const body = document.querySelector('body')
const c = convas.getContext('2d')
console.log(gsap)

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

const friction=.99
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
        this.velecity.x*=friction
        this.velecity.y*=friction
        this.x = this.x + this.velecity.x
        this.y = this.y + this.velecity.y
        this.alpha -= 0.0028;
    }
}
const x = convas.width / 2
const y = convas.height / 2

const player = new Player(x, y, 30, 'white')




const projectiles = []
const Enemies = []
const particles = []

function spawEnemy() {
    setInterval(() => {
        const radious = Math.random() * 30+15 +Math.random()* 30+15;
        const x = Math.random() < 0.5 ? 0 - radious : convas.width + radious
        const y = Math.random() < 0.5 ? 0 - radious : convas.height + radious
        const color = `hsl(${Math.random() * 360},100%,50%)`
        const angle = Math.atan2(
            convas.height / 2 - y,
            convas.width / 2 - x
        )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        Enemies.push(
            new Enemy(x, y, radious, color, velocity)
        )
        //    console.log(Enemies)
    }, 2000)
}

let animatedId
function animate() {
    animatedId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.1)'
    c.fillRect(0, 0, convas.width, convas.height)
    player.draw()
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
            // console.log("this")
        }
        projectiles.forEach((p, pindex) => {
            const dist = Math.hypot(p.x - e.x, p.y - e.y)

            if (dist - e.radious - p.radious < 1) {

                for (let i = 0; i < e.radious*2; i++) {
                    particles.push(
                        new Particle(p.x, p.y, Math.random()*2.5, e.color, { 
                            x: Math.random() - 0.5*(Math.random()*8), 
                            y: Math.random() - 0.5*(Math.random()*8)
                        })
                    )
                }

                if (e.radious - 10 > 10) {
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
    const velocity = {
        x: Math.cos(angle) * 15,
        y: Math.sin(angle) * 15
    }
    projectiles.push(
        new Projectile(convas.width / 2, convas.height / 2, 5, 'white', velocity)
    )

})
animate();
spawEnemy();