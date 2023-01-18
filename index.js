const convas = document.querySelector('canvas')
const body = document.querySelector('body')
const c = convas.getContext('2d')

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

const x = convas.width / 2
const y = convas.height / 2

const player = new Player(x, y, 30, 'white')




const projectiles = []

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,convas.width,convas.height)
    player.draw()
    projectiles.forEach((x) => {
        x.update()
    })

}

addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - convas.height / 2,
        event.clientX - convas.width / 2
    )
    const velocity={
        x:Math.cos(angle),
        y:Math.sin(angle)
    }
    projectiles.push(
        new Projectile(convas.width/2,convas.height/2,5,'red',velocity)
    )
})
animate();