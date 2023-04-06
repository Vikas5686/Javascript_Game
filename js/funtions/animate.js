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