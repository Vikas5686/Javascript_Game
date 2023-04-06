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