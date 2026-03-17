/* MUSIC */
const music = document.getElementById("music");
const vinyl = document.getElementById("vinyl");

music.play().catch(() => {
    document.body.addEventListener("click", () => music.play(), { once: true });
});
music.addEventListener("play", () => vinyl.classList.add("spin"));

/* SPARKLES */
document.addEventListener("mousemove", e => {
    if (window.innerWidth < 600) return;
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
});

/* TULIPS */
function createTulip() {
    if (document.hidden) return;
    const t = document.createElement("img");
    t.src = "tulip.png";
    t.className = "tulip";
    t.style.left = Math.random() * window.innerWidth + "px";
    t.style.width = (Math.random() * 20 + 20) + "px";
    const duration = Math.random() * 3 + 4;
    t.style.animationDuration = duration + "s";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), duration * 1000);
}
setInterval(createTulip, 700);

/* ELEMENTS */
const envelope = document.getElementById("envelopeContainer");
const letterImg = document.getElementById("letterImg");
const continueBtn = document.getElementById("continueBtn");
const question = document.getElementById("question");
const buttons = document.querySelector(".buttons");

/* ENVELOPE CLICK */
envelope.onclick = () => {
    letterImg.classList.add("showLetter");
    continueBtn.style.display = "block";
    envelope.style.pointerEvents = "none";
};

/* TYPEWRITER WITH SPACES */
const fullText = "Willㅤyouㅤspendㅤyourㅤeveningㅤwithㅤme? 🌷";
const spacedText = fullText.split(" ").join("   "); // extra spaces

function typeText(el, text, speed = 40) {
    el.innerText = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerText += text[i];
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

/* CONTINUE */
continueBtn.onclick = () => {
    envelope.style.display = "none";
    letterImg.style.display = "none";
    continueBtn.style.display = "none";

    question.style.opacity = "1";
    question.style.transform = "translateY(0)";

    typeText(question, spacedText, 40);

    setTimeout(() => {
        buttons.style.display = "flex";
    }, spacedText.length * 40 + 300);
};

/* YES / NO BUTTONS */
const messageTop = document.getElementById("messageTop");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const phrases = [
    "You sureee? 🥺",
    "Really? 😭",
    "Ayaw gadd 💔",
    "Pleaseee 🌷",
    " PLEASEEEEEEE 🥹",
];

let index = 0;
let scale = 1;
let noClicks = 0;

/* YES BUTTON SCALE */
noBtn.onclick = () => {
    messageTop.innerText = phrases[index % phrases.length];
    index++;
    noClicks++;
    if (noClicks <= 5) {
        scale += 0.25;
        yesBtn.style.transform = `scale(${scale})`;
    }
};

/* NO BUTTON DODGE */
noBtn.addEventListener("mouseover", () => {
    if (noClicks < 5) return;

    noBtn.style.position = "fixed";

    const maxX = window.innerWidth - noBtn.offsetWidth - 10;
    const maxY = window.innerHeight - noBtn.offsetHeight - 10;

    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
});

/* YES BUTTON CLICK */
yesBtn.onclick = () => {
    messageTop.innerText = "Thank you";
    question.innerText = "Thank you for choosing to spend your night with me, Yabyumamuchh 🌷";
    buttons.style.display = "none";

    for (let i = 0; i < 25; i++) createTulip();
};