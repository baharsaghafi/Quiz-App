const start = document.getElementById ("start");            
const quiz = document.getElementById ("quiz");        
const question = document.getElementById ("question"); 
const qImg = document.getElementById ("qImg"); 
const choiceA = document.getElementById ("A"); 
const choiceB = document.getElementById ("B"); 
const choiceC = document.getElementById ("C"); 
const counter = document.getElementById ("counter"); 
const timeGauge = document.getElementById ("timeGauge"); 
const progress = document.getElementById ("progress"); 
const scoreDiv = document.getElementById ("scoreContainer"); 

//Create questions
let questions = [ 
    {
        question : "What does HTML stand for?",
        imgSrc : "img/html.png",
        choiceA :"Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },
    {
        question : "What does Css stand for?",
        imgSrc : "img/css.png",
        choiceA :"Wrong",
        choiceB : "Correcr",
        choiceC : "Correct",
        correct : "B"
    },
    {
        question : "What does Js stand for?",
        imgSrc : "img/js.png",
        choiceA :"Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    }
];

//Creat Some Variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//Render a Question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

//Start Quiz
function startQuiz(){
   start.style.display = "none";
   renderQuestion();
   quiz.style.display = "block";
   renderProgress();
   renderCounter();
   TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

//Render Progress
function renderProgress(){
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

//Counter Render
function renderCounter(){
    if (count <= questionTime ) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++   
    }else{
        count = 0;
        //Change The Progress Color To Red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // End The Quiz and Show The score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//CheckAnswer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        //Answer is Correct
        score++;
        //Change The Progress Color To Green
        answerIsCorrect();
    }else{
        //Answer is Wrong
        //Change The Progress Color To Red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }    
}

//Answer is Correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//Answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//Score Render
function scoreRender(){
    scoreDiv.style.display = "block";

    //Calculate The Amount of Question Percent Answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    //Choose The Image Based On The Score
    let img = (scorePerCent >= 80) ? "img/5.png":
              (scorePerCent >= 60) ? "img/4.png":
              (scorePerCent >= 40) ? "img/3.png":
              (scorePerCent >= 20) ? "img/2.png":
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">"; 
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";                  
}
