
const question = [
    {
        question: "Apa singkatan dari HTML?",
        answer: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "High-level Text Markup Language", correct: false },
            { text: "Hypertext and Text Markup Language", correct: false }
        ]
    },
    {
        question: "Elemen HTML untuk membuat paragraf adalah <?>?",
        answer: [
            { text: "paragraf", correct: false },
            { text: "p", correct: true },
            { text: "paragraph", correct: false },
            { text: "line", correct: false }
        ]
    },
    {
        question: "Apa yang dilakukan oleh tag <head> dalam HTML?",
        answer: [
            { text: "Menandai awal dokumen HTML", correct: false },
            { text: "Membuat judul halaman web", correct: false },
            { text: "Menyimpan elemen-elemen metadata", correct: true },
            { text: "Menampilkan teks besar pada halaman", correct: false }
        ]
    },
    {
        question: "Tag HTML untuk membuat tautan adalah?",
        answer: [
            { text: "link", correct: false },
            { text: "a", correct: true },
            { text: "href", correct: false },
            { text: "url", correct: false }
        ]
    },
    {
        question: "Apa arti dari atribut 'src' pada tag <img>?",
        answer: [
            { text: "Source", correct: true },
            { text: "Script", correct: false },
            { text: "Style", correct: false },
            { text: "Search", correct: false }
        ]
    },
    {
        question: "Tag HTML untuk membuat daftar terurut adalah?",
        answer: [
            { text: "ol", correct: true },
            { text: "ul", correct: false },
            { text: "li", correct: false },
            { text: "dl", correct: false }
        ]
    },
    {
        question: "Apa yang dilakukan oleh atribut 'colspan' pada tag <td>?",
        answer: [
            { text: "Menentukan warna latar belakang", correct: false },
            { text: "Menentukan jumlah kolom yang digabung", correct: true },
            { text: "Menentukan lebar kolom", correct: false },
            { text: "Menentukan urutan kolom", correct: false }
        ]
    },
    {
        question: "Tag HTML untuk membuat garis horizontal adalah?",
        answer: [
            { text: "line", correct: false },
            { text: "hr", correct: true },
            { text: "br", correct: false },
            { text: "hline", correct: false }
        ]
    },
    {
        question: "Apa yang dimaksud dengan CSS?",
        answer: [
            { text: "Cascading Style Sheet", correct: true },
            { text: "Computer Style Sheet", correct: false },
            { text: "Creative Style Sheet", correct: false },
            { text: "Colorful Style Sheet", correct: false }
        ]
    },
    {
        question: "Apa fungsi dari tag <meta charset='UTF-8'>?",
        answer: [
            { text: "Mengatur warna teks", correct: false },
            { text: "Menyisipkan gambar", correct: false },
            { text: "Menentukan karakter encoding halaman web", correct: true },
            { text: "Mengatur layout halaman", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const aswerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");



let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
     currentQuestionIndex = 0;
     score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
   

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        aswerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none"
    while(aswerButton.firstChild){
        aswerButton.removeChild(aswerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =   selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");

    }
    // ketika di klik muncul jawaban benar
    Array.from(aswerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ` You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = " play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();