// =========================
// 「多少時間」單字題庫
// =========================

const HowMuchTime = [
    ...minutes,
    ...hours,
    ...days,
    ...weeks,
    ...months,
    ...years
];


// =========================
// 目前的遊戲模式
// vocab = 單字練習
// sentence = 句型練習
// =========================

let currentMode = "vocab";

let currentLesson = null;

// =========================
// 從陣列中隨機抽一個
// =========================

function getRandomItem(array) {

    const randomIndex =
        Math.floor(Math.random() * array.length);

    return array[randomIndex];
}


// =========================
// 找到 HTML 裡面的元素
// =========================

const answerInput =
    document.getElementById("answer-input");

const submitButton =
    document.getElementById("submit-button");

const nextButton =
    document.getElementById("next-button");

const result =
    document.getElementById("result");

const vocabModeButton =
    document.getElementById("vocab-mode-button");

const sentenceModeButton =
    document.getElementById("sentence-mode-button");

const gameArea =
    document.getElementById("game-area");

const modeMenu =
    document.getElementById("mode-menu");

const backButton =
    document.getElementById("back-button");

const lessonMenu =
    document.getElementById("lesson-menu");

const lessonButtons =
    document.querySelectorAll(".lesson-button");

const lessonBackButton =
    document.getElementById("lesson-back-button");

const lessonTitle =
    document.getElementById("lesson-title");

// =========================
// 選擇單元
// =========================

lessonButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // 取得玩家選擇的單元
        currentLesson =
            Number(button.dataset.lesson);


        // 隱藏單元選單
        lessonMenu.classList.add("hidden");


        // 顯示題型選單
        modeMenu.classList.remove("hidden");


        // 顯示目前選擇的單元
        lessonTitle.textContent =
            "單元 " + currentLesson;

    });

});

// =========================
// 從題型選擇返回單元選擇
// =========================

lessonBackButton.addEventListener(
    "click",
    function() {

        // 隱藏題型選單
        modeMenu.classList.add("hidden");


        // 顯示單元選單
        lessonMenu.classList.remove("hidden");


        // 清除目前選擇的單元
        currentLesson = null;

    }
);

// =========================
// 儲存目前題目
// =========================

// 單字題
let currentWord;

// 句型題
let currentTime;
let currentTool;
let currentAction;


// =========================
// 單字模式：顯示新題目
// =========================

function showVocabQuestion() {

    document.getElementById("question-title").textContent =
    "請輸入這個單字的日文";

    // 從 HowMuchTime 隨機抽一個單字
    currentWord =
        getRandomItem(HowMuchTime);


    // 顯示單字題
    document.getElementById("word-question").textContent =
        currentWord.chinese;


    // 隱藏句型題目的內容
    document.getElementById("time-question").textContent = "";
    document.getElementById("tool-question").textContent = "";
    document.getElementById("action-question").textContent = "";


    // 清空答案
    answerInput.value = "";

    result.textContent = "";

    answerInput.focus();
}


// =========================
// 句型模式：顯示新題目
// =========================

function showSentenceQuestion() {

    document.getElementById("question-title").textContent =
    "請根據條件組成日文句子";

    // 清除單字題
    document.getElementById("word-question").textContent = "";


    // 隨機抽時間
    currentTime =
        getRandomItem(times);


    // 隨機抽動作
    currentAction =
        getRandomItem(actions);


    // 找出這個動作可以使用的工具
    const possibleTools =
        tools.filter(function(tool) {

            return currentAction.allowedTools.includes(
                tool.id
            );

        });


    // 隨機抽工具
    currentTool =
        getRandomItem(possibleTools);


    // 顯示題目
    document.getElementById("time-question").textContent =
        "時間：" + currentTime.chinese;

    document.getElementById("tool-question").textContent =
        "工具：" + currentTool.chinese;

    document.getElementById("action-question").textContent =
        "動作：" + currentAction.chinese;


    // 清空答案
    answerInput.value = "";

    result.textContent = "";

    answerInput.focus();
}


// =========================
// 根據模式顯示題目
// =========================

function showQuestion() {

    if (currentMode === "vocab") {

        showVocabQuestion();

    } else if (currentMode === "sentence") {

        showSentenceQuestion();

    }
}


// =========================
// 改變動詞時態
// =========================

function changeTense(sentence, tense) {

    if (tense === "past") {

        return sentence.replace(
            /ます$/,
            "ました"
        );

    }

    return sentence;
}


// =========================
// 建立句型題的正確答案
// =========================

function createSentenceAnswers() {

    const correctAnswers = [];


    currentTime.answers.forEach(function(time) {

        currentTool.answers.forEach(function(tool) {

            currentAction.answers.forEach(function(action) {

                const actionWithTense =
                    changeTense(
                        action,
                        currentTime.tense
                    );


                const sentence =
                    time +
                    tool +
                    "で" +
                    actionWithTense +
                    "。";


                correctAnswers.push(sentence);

            });

        });

    });


    return correctAnswers;
}


// =========================
// 檢查單字題
// =========================

function checkVocabAnswer() {

    const userAnswer =
        answerInput.value.trim();


    if (currentWord.answers.includes(userAnswer)) {

        result.textContent =
            "答對了！🎉";

    } else {

        result.textContent =
            "答錯了！正確答案是：" +
            currentWord.answers.join(" / ");

    }
}


// =========================
// 檢查句型題
// =========================

function checkSentenceAnswer() {

    const userAnswer =
        answerInput.value.trim();


    const correctAnswers =
        createSentenceAnswers();


    if (correctAnswers.includes(userAnswer)) {

        result.textContent =
            "答對了！🎉";

    } else {

        result.textContent =
            "答錯了！正確答案是：" +
            correctAnswers[0];

    }
}


// =========================
// 根據目前模式檢查答案
// =========================

function checkAnswer() {

    if (currentMode === "vocab") {

        checkVocabAnswer();

    } else if (currentMode === "sentence") {

        checkSentenceAnswer();

    }
}


// =========================
// 切換到單字模式
// =========================

vocabModeButton.addEventListener(
    "click",
    function() {

        currentMode = "vocab";

        modeMenu.classList.add("hidden");

        gameArea.classList.remove("hidden");

        showQuestion();

    }
);


// =========================
// 切換到句型模式
// =========================

sentenceModeButton.addEventListener(
    "click",
    function() {

        currentMode = "sentence";

        modeMenu.classList.add("hidden");

        gameArea.classList.remove("hidden");

        showQuestion();

    }
);

backButton.addEventListener(
    "click",
    function() {

        gameArea.classList.add("hidden");

        modeMenu.classList.remove("hidden");

        answerInput.value = "";

        result.textContent = "";

    }
);

// =========================
// 送出答案
// =========================

submitButton.addEventListener(
    "click",
    function() {

        checkAnswer();

    }
);


// =========================
// Enter 送出答案
// =========================

answerInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkAnswer();

        }

    }
);


// =========================
// 下一題
// =========================

nextButton.addEventListener(
    "click",
    function() {

        showQuestion();

    }
);


// =========================
// 網站剛打開時
// 不自動出題
// 等玩家選擇練習模式
// =========================