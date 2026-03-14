/* ================= DOM ELEMENTS ================= */
const showBox = document.getElementById("SHOW_BOX");
const typeBox = document.getElementById("typing_box");
const correctCharBox = document.getElementById("correctCharacters");
const incorrectCharBox = document.getElementById("incorrectCharacters");
const muteCheckbox = document.getElementById("mutecheck");

/* ================= STATE ================= */
let correctCount = 0;
let incorrectCount = 0;
let originalText = "";


/* ================= CLEAR INPUT ================= */
function clearInputBox() {
    const colorLayer = document.getElementById("colorText");

    typeBox.value = "";
    colorLayer.innerHTML = "";

    correctCount = 0;
    incorrectCount = 0;

    correctCharBox.value = 0;
    incorrectCharBox.value = 0;
}

/* ================= KEY CHECK ================= */
// typeBox.addEventListener("keydown", function (e) {

//     if (e.key === "Backspace") return;

//     let position = typeBox.value.length;
//     let expectedChar = showBox.innerText[position];
//     let typedChar = e.key;

//     if (typedChar === expectedChar) {
//         correctCount++;
//         correctCharBox.style.color = "green";
//     } else {
//         incorrectCount++;
//         incorrectCharBox.style.color = "red";
//     }

//     correctCharBox.value = correctCount;
//     incorrectCharBox.value = incorrectCount;
// });

//old 

// typeBox.addEventListener("input", function () {

//     const original = showBox.innerText;
//     const typed = typeBox.value;

//     correctCount = 0;
//     incorrectCount = 0;

//     for (let i = 0; i < typed.length; i++) {

//         if (i >= original.length) break;

//         if (typed[i] === original[i]) {
//             correctCount++;
//         } else {
//             incorrectCount++;
//         }
//     }

//     correctCharBox.value = correctCount;
//     incorrectCharBox.value = incorrectCount;

//     correctCharBox.style.color = "green";
//     incorrectCharBox.style.color = "red";

//     colorWords();  
//     startTimer();   
// });
typeBox.addEventListener("input", function () {

    const typed = typeBox.value;

    // Stop extra typing
    if (typed.length > originalText.length) {
        typeBox.value = typed.substring(0, originalText.length);
        return;
    }
    //     if (typed.length > originalText.length) {
    //     typeBox.value = typed.substring(0, originalText.length);
    //     return;
    // }


    correctCount = 0;
    incorrectCount = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === originalText[i]) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    }

    correctCharBox.value = correctCount;
    incorrectCharBox.value = incorrectCount;

    correctCharBox.style.color = "green";
    incorrectCharBox.style.color = "red";

    colorWords();
    startTimer();
});


/* ================= PARAGRAPHS ================= */
const easyText = [
    "I drink water every morning.",
    "The sky looks blue today.",
    "We should always speak the truth.",
    "I enjoy playing outdoor games."
];

const mediumText = [
    "Healthy habits help us live a better and longer life.",
    "Education plays an important role in personal development.",
    "Good communication skills improve professional growth.",
    "Reading books regularly increases knowledge and focus.",
    "Teamwork helps achieve goals more efficiently."
];

const hardText = [
    "Success is the result of consistent effort and disciplined actions over time.",
    "Critical thinking enables individuals to make informed and rational decisions.",
    "Adapting to technological advancements is necessary in the modern era.",
    "Strong leadership requires responsibility, vision, and emotional intelligence.",
    "Personal growth begins when comfort zones are challenged deliberately."
];

/* ================= LOAD PARAGRAPH ================= */
function loadParagraph() {

    enableSound();

    const level = document.getElementById("level").value;
    const customBox = document.getElementById("CUSTOM_INPUT");

    if (!level) {
        showBox.innerText = "";
        typeBox.disabled = true;
        customBox.style.display = "none";
        muteCheckbox.disabled = true;
        clearInputBox();
        return;
    }

    let textArray;

    if (level === "easy") textArray = easyText;
    else if (level === "medium") textArray = mediumText;
    else if (level === "hard") textArray = hardText;
    else {
        typeBox.disabled = false;
        customBox.style.display = "block";
        showBox.innerText = "";
        muteCheckbox.disabled = false;
        clearInputBox();
        return;
    }

    typeBox.disabled = false;
    customBox.style.display = "none";
    muteCheckbox.disabled = false;
    clearInputBox();

    let randomIndex = Math.floor(Math.random() * textArray.length);
    showBox.innerText = textArray[randomIndex];
    originalText = showBox.innerText;


}


function colorWords() {
    const original = showBox.innerText;
    const typed = typeBox.value;

    let html = "";

    for (let i = 0; i < typed.length; i++) {

        if (i < typed.length) {

            if (typed[i] === original[i]) {
                html += `<span class="correct">${typed[i]}</span>`;
            } else {
                html += `<span class="incorrect">${typed[i]}</span>`;
            }

        } 
    }

    colorText.innerHTML = html;
}



/* ================= TIMER ================= */
let totalSeconds = 300;
let timerId = null;
let isPaused = false;

function startTimer() {

    if (timerId !== null) return;

    timerId = setInterval(() => {

        let hours = Math.floor(totalSeconds / 300);
        let minutes = Math.floor((totalSeconds % 300) / 60);
        let seconds = totalSeconds % 60;

        document.getElementById("COUNT_TIME").innerText =
            formatTime(hours) + ":" +
            formatTime(minutes) + ":" +
            formatTime(seconds);

        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(timerId);
            timerId = null;
        }

        document.getElementById("PAUSE_TIMER").disabled = false;
        document.getElementById("RESET_TIMER").disabled = false;
        document.getElementById("SUMMID_BTN").disabled = false;

    }, 1000);
}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    totalSeconds = 300;
    document.getElementById("COUNT_TIME").innerText = "00:05:00";
    startTimer();
}

function togglePause() {
    const pauseBtn = document.getElementById("PAUSE_TIMER");

    if (pauseBtn.innerText === "Pause Timer") {
        pauseTimer();
        pauseBtn.innerText = "Resume Timer";
    } else {
        resumeTimer();
        pauseBtn.innerText = "Pause Timer";
    }
}

function pauseTimer() {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
    isPaused = true;
}

function resumeTimer() {
    if (!isPaused) return;
    isPaused = false;
    startTimer();
}

/* ================= RESULT ================= */
function submitTest() {

    celebrate();
    document.getElementById("FOOTER_DIV").style.display = "block";

    const originalText = showBox.innerText;
    const typedText = typeBox.value;

    let correctChars = 0;
    let incorrectChars = 0;
    let skippedChars = 0;

    for (let i = 0; i < originalText.length; i++) {
        if (typedText[i] === undefined) skippedChars++;
        else if (typedText[i] === originalText[i]) correctChars++;
        else incorrectChars++;
    }

    let originalWords = originalText.split(" ");
    let typedWords = typedText.split(" ");

    let correctWords = 0;
    let incorrectWords = 0;
    let skippedWords = 0;

    for (let i = 0; i < originalWords.length; i++) {
        if (typedWords[i] === undefined) skippedWords++;
        else if (typedWords[i] === originalWords[i]) correctWords++;
        else incorrectWords++;
    }

    let accuracy = correctChars + incorrectChars
        ? (correctChars * 100) / (correctChars + incorrectChars)
        : 0;

    let minutesUsed = (300 - totalSeconds) / 60;
    let wpm = minutesUsed > 0 ? typedWords.length / minutesUsed : 0;

    document.getElementById("correctCharacters").value = correctChars;
    document.getElementById("incorrectCharacters").value = incorrectChars;
    document.getElementById("skippedCharacters").value = skippedChars;

    document.getElementById("correctWords").value = correctWords;
    document.getElementById("incorrectWords").value = incorrectWords;
    document.getElementById("skippedWords").value = skippedWords;

    document.getElementById("totalAccuracy").value = accuracy.toFixed(2) + "%";
    document.getElementById("wpm").value = Math.round(wpm);

    disableAfterSubmit();

    clearInterval(timerId);
    timerId = null;
}

/* ================= SOUND ================= */
const keySound = new Audio("audio.mp3");
let soundEnabled = false;
function enableSound() {
    if (soundEnabled) return;
    document.addEventListener("keydown", () => {
        if (muteCheckbox.checked) return;
        keySound.currentTime = 0;
        keySound.play();
    });
    soundEnabled = true;
}

// window.onload = () => {
//     enableSound();
// };

/* ================= CUSTOM WORDS ================= */
const masterText = `
Success does not happen overnight; it is the result of consistent effort, patience, and disciplined action taken every single day. 
Learning programming or any valuable skill requires focus, logical thinking, and the willingness to solve problems repeatedly. 
Technology continues to transform industries, communication, and daily life at a rapid pace, making continuous learning more important than ever. 
Education builds the foundation of knowledge, but practical experience strengthens true understanding. 
Time management allows individuals to balance work, study, and personal growth effectively. 
Confidence grows when small goals are achieved consistently, and discipline ensures progress even when motivation is low. 
Challenges are not obstacles but opportunities to develop resilience and critical thinking abilities. 
Improvement happens gradually through practice, reflection, and adjustment of strategies. 
People who remain adaptable and open to feedback tend to grow faster in competitive environments. 
Dedication, responsibility, and a growth mindset ultimately separate average performance from excellence.
`.repeat(10);

function loadCustomWords() {
    let count = document.getElementById("costom_input").value;
    if(!count || count <= 0){
        return;
    }
    let words = masterText.split(" ");

    let result = "";
    
    for (let i = 0; i < count; i++) {
        result += words[i] + " ";
    }
    result = result.trim();

    showBox.innerText = result;

    originalText = result;
    typeBox.disabled = false;
    clearInputBox();
}


// function syncScroll() {
//     // const input = document.getElementById("typing_boxx");
//     // const color = document.getElementById("colorText");

//     color.scrollTop = input.scrollTop;
// }
const typingBox = document.getElementById("typing_box");
const colorText = document.getElementById("colorText");

typingBox.addEventListener("scroll", () => {
    colorText.scrollTop = typingBox.scrollTop;
});


/* ================= CONFETTI ================= */
// function celebrate() {
//     for (let i = 0; i < 100; i++) {
//         let confetti = document.createElement("div");
//         confetti.className = "confetti";
//         confetti.style.left = Math.random() * 100 + "vw";
//         confetti.style.backgroundColor = randomColor();
//         confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
//         document.body.appendChild(confetti);

//         setTimeout(() => confetti.remove(), 5000);
//     }
// }
function celebrate() {

    const particleCount = 180;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < particleCount; i++) {

        let particle = document.createElement("div");
        particle.className = "confetti";

        particle.style.left = centerX + "px";
        particle.style.top = centerY + "px";

        // random direction (radians)
        let angle = Math.random() * 2 * Math.PI;

        // random speed
        let velocity = Math.random() * 6 + 4;

        let x = Math.cos(angle) * velocity * 40;
        let y = Math.sin(angle) * velocity * 40;

        particle.style.setProperty("--x", x + "px");
        particle.style.setProperty("--y", y + "px");

        // random size
        let size = Math.random() * 6 + 4;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.backgroundColor = randomColor();

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 4000);
    }
}

function randomColor() {
    const colors = ["red", "yellow", "green", "blue", "pink", "orange", "white"];
    return colors[Math.floor(Math.random() * colors.length)];
}

/* ================= DISABLE AFTER SUBMIT ================= */
function disableAfterSubmit() {
    document.getElementById("level").disabled = true;
    document.getElementById("costom_input").disabled = true;
    document.getElementById("costum_btn").disabled = true;
    typeBox.disabled = true;
    document.getElementById("PAUSE_TIMER").disabled = true;
    document.getElementById("RESET_TIMER").disabled = true;
    document.getElementById("SUMMID_BTN").disabled = true;
    muteCheckbox.disabled = true;
}

/* ================= COPY PASTE BLOCK ================= */
function disableCopyPaste() {

    typeBox.onpaste = () => false;
    typeBox.oncopy = () => false;
    typeBox.oncut = () => false;

    typeBox.onkeydown = (e) => {
        if (e.ctrlKey && ["v", "c", "x"].includes(e.key)) return false;
    };
}


// const typingBox = document.getElementById("typing_box");
typeBox.addEventListener("click", function () {
    this.setSelectionRange(this.value.length, this.value.length);
});
