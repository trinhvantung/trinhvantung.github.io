document.addEventListener("DOMContentLoaded", function () {
  let open = false;
  let clicked = false;
  // let movingTextAnimationId;
  var envelope = document.getElementById("envelope");
  var rains = document.querySelectorAll(".rain");
  var sun = document.querySelector(".sun");
  var body = document.querySelector("body");

  if (envelope) {
    document.addEventListener("click", toggle);
  }

  function toggle() {
    if (envelope) {
      if (!open) {
        open = !open;
        // if (!clicked) {
        //   var movingText = document.getElementById("moving-text");
        //   if (movingText) {
        //     cancelAnimationFrame(movingTextAnimationId);
        //     movingText.remove();
        //     clicked = true;
        //   }
        // }

        var message = document.getElementById("message");
        message.innerText = "Click lần nữa nha";
        message.classList.add("second");
        rains.forEach((rain) => rain.classList.toggle("none"));
        sun.classList.toggle("none");
        envelope.classList.toggle("open");
        envelope.classList.toggle("close");
        body.classList.toggle("sky");
      } else {
        const phoneNumber = "";
        const message = "Bảo giề!!!!!!!!!!!!";
        const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        window.location.href = smsLink;
      }
    }
  }

  // // const text = document.getElementById("moving-text");
  // // if (text) {
  // //   const screenWidth = window.innerWidth;
  // //   const screenHeight = window.innerHeight;

  // //   let x = Math.random() * (screenWidth / 2);
  // //   let y = Math.random() * (screenHeight / 2);
  // //   let dx = 1;
  // //   let dy = 1;

  // //   function animate() {
  // //     const rect = text.getBoundingClientRect();

  // //     if (x + rect.width >= window.innerWidth || x <= 0) {
  // //       dx = -dx;
  // //     }

  // //     if (y + rect.height >= window.innerHeight || y <= 0) {
  // //       dy = -dy;
  // //     }

  // //     x += dx;
  // //     y += dy;

  // //     text.style.left = `${x}px`;
  // //     text.style.top = `${y}px`;

  // //     movingTextAnimationId = requestAnimationFrame(animate);
  // //   }

  // //   animate();

  //   // Update kích thước khi resize
  //   window.addEventListener("resize", () => {
  //     x = Math.min(x, window.innerWidth - text.offsetWidth);
  //     y = Math.min(y, window.innerHeight - text.offsetHeight);
  //   });
  // }

  // flash
  const width = window.innerWidth;
  const height = window.innerHeight;

  const maxTimeBetweenLightning = 30;
  const maxLightningPaths = 200;
  const maxLightningThickness = 5;
  const startingDistance = 30;
  const maxBranches = 7;

  function makeLightning(ctx, startingX, startingY, branches) {
    ctx.beginPath();
    const amntOfPaths = getRandomInt(maxLightningPaths);
    let lightningThickness = maxLightningThickness;
    let distance = startingDistance;
    let timeout = 80;
    let speed = timeout;
    let totalTime = 0;
    for (let i = 0; i < amntOfPaths; i++) {
      ctx.strokeStyle = `rgb(255,255,255)`;
      ctx.lineWidth = getRandomInt(lightningThickness);
      lightningThickness /= 1.2;
      setTimeout(() => {
        ctx.moveTo(startingX, startingY);
        let endingX = getRandomInt(distance) * negOrPos() + startingX;
        let endingY = startingY + getRandomInt(distance * 2);
        distance /= 1.1;
        ctx.lineTo(endingX, endingY);
        startingX = endingX;
        startingY = endingY;
        ctx.stroke();
        if (branches < maxBranches && getRandomInt(maxLightningPaths / 6) == 1) {
          let time = makeLightning(ctx, startingX, startingY, branches + 1);
          totalTime += time;
        }
      }, timeout);
      speed /= 1.4;
      timeout += speed;
    }
    return timeout + totalTime;
  }

  function negOrPos() {
    return Math.round(Math.random()) == 0 ? -1 : 1;
  }

  function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
  }

  let prevHighestId = 0;

  function createCanvasAndLightning() {
    const canvas = document.createElement("canvas");
    const body = document.getElementById("flash");
    const thunder = document.getElementById("thunder");
    canvas.setAttribute("width", `${window.innerWidth}px`);
    canvas.setAttribute("height", `${window.innerHeight}px`);
    canvas.className = "flash-canvas";
    ctx = canvas.getContext("2d");
    body.appendChild(canvas);
    const time = makeLightning(ctx, getRandomInt(width), getRandomInt(height / 3), 0);
    thunder.style.animationName = "flash";
    thunder.style.animationDuration = time + "ms";
    setTimeout(() => {
      if (!open) {
        thunder.style.animationName = "fadeOut";
      }
    }, time);
    setTimeout(() => {
      if (!open) {
        canvas.remove();
        const highestId = window.setTimeout(() => {
          for (let i = highestId; i >= prevHighestId; i--) {
            window.clearTimeout(i);
          }
          prevHighestId = highestId;
          setTimeout(() => {
            if (!open) {
              createCanvasAndLightning();
            }
          }, 4000);
        }, 0);
      }
    }, time * 2);
  }

  createCanvasAndLightning();
});
