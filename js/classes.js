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
