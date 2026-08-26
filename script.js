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


// =========================
// 儲存目前這一題的資料
// =========================

let currentTime;
let currentTool;
let currentAction;


// =========================
// 顯示新題目
// =========================

function showQuestion() {

    // 隨機抽時間
    currentTime = getRandomItem(times);


    // 隨機抽動作
    currentAction = getRandomItem(actions);


    // 找出這個動作可以使用的工具
    const possibleTools = tools.filter(function(tool) {

        return currentAction.allowedTools.includes(tool.id);

    });


    // 從可以使用的工具中隨機抽一個
    currentTool = getRandomItem(possibleTools);


    // 顯示中文題目
    document.getElementById("time-question").textContent =
        "時間：" + currentTime.chinese;

    document.getElementById("tool-question").textContent =
        "工具：" + currentTool.chinese;

    document.getElementById("action-question").textContent =
        "動作：" + currentAction.chinese;


    // 清空上一題輸入的答案
    answerInput.value = "";


    // 清空上一題結果
    result.textContent = "";


    // 自動把游標放回輸入框
    answerInput.focus();
}


// =========================
// 建立所有可能的正確答案
// =========================

function createCorrectAnswers() {

    const correctAnswers = [];


    // 每一種「時間」寫法
    currentTime.answers.forEach(function(time) {


        // 每一種「工具」寫法
        currentTool.answers.forEach(function(tool) {


            // 每一種「動作」寫法
            currentAction.answers.forEach(function(action) {


                // 沒有句號的版本
                const sentenceWithoutPeriod =
                    time +
                    tool +
                    "で" +
                    action;


                // 有日文句號的版本
                const sentenceWithPeriod =
                    sentenceWithoutPeriod + "。";


                // 兩種都加入正確答案
                correctAnswers.push(sentenceWithoutPeriod);

                correctAnswers.push(sentenceWithPeriod);

            });

        });

    });


    return correctAnswers;
}


// =========================
// 檢查玩家答案
// =========================

function checkAnswer() {

    // 取得玩家輸入的答案
    // trim() 會移除前後多餘的空格
    const userAnswer =
        answerInput.value.trim();


    // 產生所有可能的正確答案
    const correctAnswers =
        createCorrectAnswers();


    // 檢查玩家答案是否存在於正確答案中
    if (correctAnswers.includes(userAnswer)) {

        result.textContent =
            "答對了！🎉";

    } else {

        // 顯示第一種標準答案
        // 並加上日文句號
        result.textContent =
            "答錯了！正確答案是：" +
            correctAnswers[1];

    }
}


// =========================
// 按「送出答案」
// =========================

submitButton.addEventListener(
    "click",
    function() {

        checkAnswer();

    }
);


// =========================
// 按 Enter 也可以送出答案
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
// 按「下一題」
// =========================

nextButton.addEventListener(
    "click",
    function() {

        showQuestion();

    }
);


// =========================
// 網站剛打開時
// =========================

// 自動顯示第一題
showQuestion();