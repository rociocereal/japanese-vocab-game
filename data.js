// =========================
// 題目資料
// =========================

const times = [
    {
        chinese: "今天",
        answers: ["今日", "きょう"]
    },
    {
        chinese: "昨天",
        answers: ["昨日", "きのう"]
    },
    {
        chinese: "明天",
        answers: ["明日", "あした"]
    }
];


const tools = [
    {
        id: "chopsticks",
        chinese: "筷子",
        answers: ["箸", "はし"]
    },
    {
        id: "spoon",
        chinese: "湯匙",
        answers: ["スプーン"]
    },
    {
        id: "computer",
        chinese: "電腦",
        answers: ["パソコン"]
    },
    {
        id: "pencil",
        chinese: "鉛筆",
        answers: ["鉛筆", "えんぴつ"]
    }
];


const actions = [
    {
        chinese: "吃飯",
        answers: ["ご飯を食べます", "ごはんをたべます"],
        allowedTools: ["chopsticks", "spoon"]
    },
    {
        chinese: "工作",
        answers: ["仕事をします", "しごとをします"],
        allowedTools: ["computer"]
    },
    {
        chinese: "寫信",
        answers: ["手紙を書きます", "てがみをかきます"],
        allowedTools: ["pencil"]
    }
];