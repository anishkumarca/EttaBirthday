// SECRET PASSWORD
function checkPassword() {
    const input = document.getElementById("passwordInput").value.trim();
    const reaction = document.getElementById("passwordReaction");

    if (input.toLowerCase() === "molu") {
        document.getElementById("passwordScreen").style.display = "none";
        document.getElementById("welcomeScreen").style.display = "flex";
    } else {
        reaction.textContent = "Wronggg! 😭 Try again, birthday boy!";
        document.getElementById("passwordInput").value = "";
    }
}

// ENTER KEY SUPPORT
document.getElementById("passwordInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

// START QUIZ
function startQuiz() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("quizScreen").style.display = "flex";
    loadQuestion();
}

// QUIZ QUESTIONS
const questions = [
    {
        question: "Do you love me? 🥺",
        subtitle: "Be honest...",
        answers: ["Yes 💗", "No 🙃"],
        reactions: ["HEHE, I knew it! 😌💕", "Wrong answer! Try again 😂"]
    },
    {
        question: "Who is the luckiest person here? 👀",
        subtitle: "Think carefully...",
        answers: ["Me 😎", "You 🥰", "Both of us 💗"],
        reactions: ["Lucky you! 😌", "Awww, lucky me! 🥹💕", "That's actually adorable! 💗"]
    },
    {
        question: "Who is more annoying? 😭",
        subtitle: "Don't lie!",
        answers: ["You 🙄", "Me 😇", "Both equally 😂"],
        reactions: ["Excuse me?! 😂", "At least you admit it! 😌", "Soooo true 😭💕"]
    },
    {
        question: "If I were beside you right now... 🥺",
        subtitle: "What would you do?",
        answers: ["Hug you 🫂", "Annoy you 😈", "Never let you go 💗"],
        reactions: ["Love you babyy! 🫂", "I knew you would say that! 😭", "Awww! 🥹💕"]
    },
    {
        question: "Will you continue loving me? 💕",
        subtitle: "Last question...",
        answers: ["Always 💗", "Obviously 🙄", "Is that even a question? 😭"],
        reactions: ["That's what I wanted to hear! 💗", "Obviously, obviously! 😂💕", "AWWWW 😭💗"]
    }
];

let currentQuestion = 0;

// LOAD QUESTION
function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("subtitle").textContent = q.subtitle;
    document.getElementById("reaction").textContent = "";
    document.getElementById("progress").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const buttons = document.getElementById("answerButtons");
    buttons.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => answerQuestion(index));

        // RUNAWAY NO BUTTON
        if (currentQuestion === 0 && index === 1) {
            button.addEventListener("mouseenter", moveNoButton);
        }

        buttons.appendChild(button);
    });
}

// ANSWER QUESTION
function answerQuestion(index) {
    if (currentQuestion === 0 && index === 1) {
        moveNoButton();
        return;
    }

    const q = questions[currentQuestion];

    document.getElementById("reaction").textContent = q.reactions[index];

    const buttons = document.getElementById("answerButtons");
    buttons.style.pointerEvents = "none";

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            buttons.style.pointerEvents = "auto";
            loadQuestion();
        } else {
            showBirthday();
        }
    }, 1600);
}

// RUNAWAY BUTTON
function moveNoButton() {
    const noButton = document.getElementById("answerButtons").children[1];

    if (!noButton) return;

    noButton.style.position = "fixed";

    const maxX = Math.max(10, window.innerWidth - noButton.offsetWidth - 20);
    const maxY = Math.max(10, window.innerHeight - noButton.offsetHeight - 20);

    noButton.style.left = Math.random() * maxX + "px";
    noButton.style.top = Math.random() * maxY + "px";
    noButton.style.zIndex = "100";
}

// SHOW BIRTHDAY
function showBirthday() {
    document.getElementById("quizScreen").style.display = "none";

    const birthdayScreen = document.getElementById("birthdayScreen");
    birthdayScreen.style.display = "flex";

    createConfetti();
    playBirthdayMusic();
}

// FLOATING HEARTS
const heartsContainer = document.getElementById("hearts");

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart-float";

    const symbols = ["💗", "💕", "💖", "💘", "💓", "♡"];

    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 25 + 15 + "px";
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 500);

// CONFETTI
function createConfetti() {
    const symbols = ["💗", "💕", "✨", "🎉", "💖", "🎊"];

    for (let i = 0; i < 70; i++) {
        const confetti = document.createElement("div");

        confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";
        confetti.style.fontSize = Math.random() * 20 + 10 + "px";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "20";

        document.body.appendChild(confetti);

        confetti.animate(
            [
                { transform: "translateY(0) rotate(0deg)", opacity: 1 },
                {
                    transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: Math.random() * 4000 + 3000,
                easing: "linear"
            }
        );

        setTimeout(() => confetti.remove(), 7000);
    }
}

// BIRTHDAY MUSIC
let birthdayAudio;

function playBirthdayMusic() {
    birthdayAudio = new Audio(
        "https://cdn.pixabay.com/audio/2022/03/15/audio_783a2f3c5c.mp3"
    );

    birthdayAudio.loop = true;
    birthdayAudio.volume = 0.5;

    birthdayAudio.play().catch(() => {
        console.log("Music could not be played.");
    });
}

// BLOW CANDLES
document.getElementById("blowButton").addEventListener("click", function() {
    document.querySelectorAll(".flame").forEach(flame => {
        flame.style.display = "none";
    });

    this.textContent = "Wish made! 💗🎉";

    createConfetti();
});