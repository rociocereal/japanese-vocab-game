// =========================
// 題目資料
// =========================
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
        allowedTools: ["pencil", "computer"]
    }
];