let chromespeed = 1;
let treefix = "hidden"
let star = []
let shootingstar = []
let nextSpawn = Math.random() * 300 + 10;

function getBrowser() {
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        chromespeed = 0.3
        console.log("chrome")
    } else {
        console.log("other")
    }

    document.documentElement.style.setProperty("--treefix", treefix);
}
getBrowser()

function start_canva() {
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = document.documentElement.scrollHeight

    if (window.innerHeight < 3000) {
        document.getElementById("Tree").style.display = "none"
    } else {
        document.getElementById("Tree").style.display = "inline"
    }

    for (let i = 0; i < 200; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speed = (Math.random() + 0.3) * chromespeed
        let size = Math.random() * 2 + 1
        let brightness = 0
        let parralax = 0
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.push([x, y, speed, size, brightness, parralax])
        shootingstar.push([x, y])
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function shootingstars() {
        ctx.beginPath();
        ctx.arc(shootingstar[0][0], shootingstar[0][1], 5, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(shootingstar[0][0], shootingstar[0][1])
        ctx.lineTo(shootingstar[0][0] - 100, shootingstar[0][1] - 100)
        ctx.lineWidth = 8;
        let gradient = ctx.createLinearGradient(shootingstar[0][0], shootingstar[0][1], shootingstar[0][0] - 70, shootingstar[0][1] - 70)
        ctx.strokeStyle = gradient;
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "transparent");
        ctx.stroke()

        shootingstar[0][0] += 2 * chromespeed;
        shootingstar[0][1] += 2 * chromespeed;
    }

    function move(timestamp) {
        clear()

        for (let i = 0; i < 200; i++) {
            if (canvas.height < star[i][1]) {
                star[i][1] = 0
            }
            star[i][1] += star[i][2]
            ctx.beginPath();
            if (star[i][3] < 2.5 && star[i][2] < 0.025) {
                star[i][2] -= 0.001
            }
            if (star[i][3] < 2 && star[i][2] < 0.65) {
                star[i][2] += 0.0005
            }

            ctx.arc(star[i][0], star[i][1], star[i][3], 0, Math.PI * 2);
            ctx.globalAlpha = Math.random() + 0.77;
            ctx.fillStyle = "white";
            ctx.fill();
        }

        if (shootingstar[0][1] > canvas.height || shootingstar[0][1] > canvas.width) {
            console.log("SHOOTING STAR");
            shootingstar[0][0] = Math.random() * canvas.width;
            shootingstar[0][1] = 0;

        }
        shootingstars()
        requestAnimationFrame(move);
    }
    move()

}

window.addEventListener("resize", start_canva, false);