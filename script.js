let count = 60;
let timer = document.getElementById("timer");
let scoreEl = document.getElementById("scores-div");
let buttonEl = document.getElementById("buttons");
var info = document.getElementById("info");
var title = document.getElementById("quiz-title");
let scoreBtn = document.getElementById("view-scores");
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", startTime);
var questionEl = document.getElementById("question-div");
let results = document.getElementById("results");
var answersEl = document.getElementById("answers");
let emptyArray = [];
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));
var questionCount = 0;
let score = 0

function startTime() {
  showQuestion();
  let timerInterval = setInterval(function() {
    count--;
    timer.textContent = "";
    timer.textContent = "Time: " + count;
    if (count <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
      questionEl.classList.add("d-none")
    } 
  }, 1000);
}
// A function to clear away main screen to populate questions and answers
function showQuestion() {
  removeEls(startButton);
  info.classList.add("d-none")
  title.classList.add("d-none")

  if (questionCount < questions.length) {
    questionEl.innerHTML = questions[questionCount].title;
    answersEl.textContent = "";

    for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
      let el = document.createElement("button");
      el.innerText = questions[questionCount].multiChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[questionCount].answer) {
          score += count;
        } else {
          score -= 10;
          count = count - 10;
        }
        
        questionEl.innerHTML = "";

        if (questionCount === questions.length) {
          return;
        } else {
          questionCount++;
          showQuestion();
        }
      });
      answersEl.append(el);
    }
  }
}


function captureUserScore() {
  timer.remove();
  answersEl.textContent = "";

  let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  results.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type", "text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post Score!");
  postScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    let initials = initialsInput.value;
    let scoreInfo = {
      initials: initials,
      score: score,
    };

    scoresArray.push(scoreInfo);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    mainScreen();
    scoreBtn.remove();
  });
  results.append(initialsInput);
  results.append(postScoreBtn);
}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function displayAllScores() {
  removeEls(timer, startButton, results);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach(obj => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoreEl.append(resultsP);
  });
}

// This function allows user to view the current scores saved in the local storage
function viewScores() {
  scoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startButton);
    info.classList.add("d-none")
    title.classList.add("d-none")
    displayAllScores();
    removeEls(scoreBtn);
    clearScoresBtn();
    mainScreen();
  });
}
// This function clears the scores and user data saved in the local storage
function clearScoresBtn() {    
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoreEl);
    window.localStorage.removeItem("highScores");
  })
  scoreEl.append(clearBtn)
}
// This function allows user to go to the main screen
function mainScreen() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonEl.append(backBtn)
}

var questions = [
    {
      title: "What does HTML stand for?",
      multiChoice: ["Hyper Tag Markup Language", "Hyper Text Markup Language", "Hyperlinks Text Mark Language", "Hyperlinking Text Marking Language"],
      answer: "Hyper Text Markup Language"
    },
  
    {
      title: "What symbol indicates a tag?",
      multiChoice: ["Angle brackets", "Curved brackets", "Commas", "Exclamation marks"],
      answer: "Angle brackets"
    },
  
    {
      title: "Which of these is a genuine tag keyword?",
      multiChoice: ["Header", "Bold", "Body", "Image"],
      answer: "Body"
    },
  
    {
      title: "Which array method inserts an element at the end of the array?",
      multiChoice: [".pop()", ".push()", ".length", ".join()"],
      answer: ".push()"
    },
  
    {
      title: "What does CSS stand for?",
      multiChoice: ["Computing Style Sheet", "Creative Style System", "Cascading Style Sheet", "Creative Styling Sheet"],
      answer: "Cascading Style Sheet"
    },

    {
      title: "What is the correct format for changing the background colour of a div in CSS?",
      multiChoice: ["Bg-color:red;", "Background:red;", "Background-colour:red;", "background-color:red;"],
      answer: "background-color:red;"
      }
  ];

