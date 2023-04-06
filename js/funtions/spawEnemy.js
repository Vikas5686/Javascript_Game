function spawEnemy() {
    console.log("enemy")

    setInterval(() => {
        if (stoploop) {
            const radious = Math.random() * 30+10;
            let x;
            let y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radious : convas.width + radious
                y = Math.random() * convas.height
            }
            else{
                
                x = Math.random() * convas.width
                y = Math.random() < 0.5 ? 0 - radious : convas.height + radious
            }
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
        }
        console.log(stoploop + "this is the enemy loop")
    }, 3000)
}
