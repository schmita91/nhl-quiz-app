/**
 * Example store structure
 */
const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'Which NHL city has the biggest population?',
        answers: [
          'New York City',
          'Toronto',
          'Chicago',
          'Los Angeles'
        ],
        correctAnswer: 'New York City'
      },
      {
        question: 'Which one of these Canadian provinces does not have an NHL team?',
        answers: [
          'British Columbia',
          'Alberta',
          'Nova Scotia',
          'Manitoba'
        ],
        correctAnswer: 'Nova Scotia'
      },
      {
        question: 'As of the 2020-2021 season, how many U.S. states are home to a National Hockey League team?',
        answers: [
          '15',
          '17',
          '16',
          '18'
        ],
        correctAnswer: '18'
      },
      {
        question: 'Which of these European countries has produced the most active NHL players?',
        answers: [
          'Finland',
          'Czech Republic',
          'Sweden',
          'Slovakia'
        ],
        correctAnswer: 'Sweden'
      },
      {
        question: 'Which NHL city was founded before 1900?',
        answers: [
          'Seattle Kraken (Seattle, Washington)',
          'Florida Panthers (Sunrise, Florida)',
          'Vegas Golden Knights (Las Vegas, Nevada)',
          'Edmonton Oilers (Edmonton, Alberta, Canada)'
        ],
        correctAnswer: 'Seattle Kraken (Seattle, Washington)'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    submitAns: false,
    score: 0,

    currentState: {
        answerArr: []
    }
  };
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates

  // Welcome View-- The first page a user should see
  function createWelcomeView() {
      console.log('createWelcomeView ran')
      return `
      <div class="welcome-view">
          <form>
              <p>Welcome to the NHL Geography Quiz. How much do you know about NHL Geography? Press "Start Quiz" to begin!
              </p>
                <button type="submit" id="quizStart" autufocus="on">Start Quiz</button>
          </form>
      </div>
      `;
  }

  // Question View -- What the user sees when presented with a question
  // The createQuestionView function updates the HTML to present the user with a question and answer choices
  // The parameter (questionObject) is an object defined in returnCurrentQuestion() function and refers to store.questions[index]
  // After targeting the questionObject, we insert the question, answerChoices, and quiz progress (question index number / quiz length) into the HTML
  function createQuestionView(questionObject) {
      console.log(questionObject);
      console.log(questionObject.question.answers);
      return `
      <div class='quizView'> 
        <p>Question ${questionObject.index} out of ${store.questions.length} </p>
        <p>
            ${questionObject.question.question}
        </p>
        <form>
            <ol type="A">
                ${renderQuizAnswers(questionObject.question.answers)}
            </ol>
            <button type="submit" class="submitAnswer">Submit</button>
        </form>
        <p>Score: ${store.score}</p>
    </div>
    `;
  }

  //Answer View -- What the User sees after submitting a question
  //If on last question -- button changes from 'Next' to 'View Results'
  //answerIsCorrect + answerIsIncorrect 
    function renderAnswerResults() {
        let answerArray = store.currentState.answerArr;

        const buttons = {
            next: '<button type="submit" class="goToNextQuestion" autofocus="on">Next Question</button>',
            results: '<button type="submit" class="viewResults" autofocus="on">View Results</button>'
        };

        let answerIsCorrect = `"${answerArr[1]}" is correct`;
        let answerisIncorrect = `"${answerArr[2]}" is incorrect. The correct answer is "${answerArr[1]}"`;
        // answerArr[0] is True if answerArr[1] (the stored correct answer) and answerArr[2] (the user submission) are equal to each other
        // questionNumber is the index number of the question, and since it starts at 0, we add 1 to it to get the correct number
        // if the index number + 1 is equal to the length of questions array (number of questions) then it is the last question
        let lastQ = (store.questionNumber + 1) === (store.questions.length);

        return 
        `
            <div class="answerView">
            <form> 
            <p>${answerArr[0] === true ? answerIsCorrect : answerisIncorrect}</p>
            <p> Score: ${store.score}</p>
            ${lastQ ? buttons.results : buttons.next}
            </form>
            </div>
        `;
    }

// renderQuizAnswers is a function called by createQuestionView that gives answer choices in radio format
// It uses stringAnswers function to format each answer choice as a radio and then returning them as an array
// "answer" refers to single answer in the relative answers array in STORE
// The index number of the anser is pushed to the indexArray
// answerArray.map(answer => stringAnswers(answer)).join('') maps over the answerArray, formats each answer choice as a radio item, and joins them all together
    function renderQuizAnswers(answers) {
        let answerArray = [];
        let indexArray = [];
        answers.forEach(answer => {
            answerArray.push(answer);
            indexArray.push(answers.indexOf(answer));
        });
        return answerArray.map(answer => stringAnswers(answer)).join('');
    } 

// the stringAnswers function is used to format each answer as a radio item that can be called in our renderQuizAnswers function 

    function stringAnswers(answer) {
        let questionNumber = store.questionNumber;
        let name = store.questions[questionNumber].answers.indexOf(answer);

        return `
            <li>
                <div class="submitAnswer">
                <input type="radio" name="answer" id="answerNumber-${name}" data-answer="${answer}">
                <label for="answer-${name}"> ${answer}</label>

                </div>
            </li>
        `;
    }
  
  // Results View
    function stringQuizResults() {
        return `
        <div class='quizResults'>
            <p>You have completed the quiz.</p>
            <p>You got ${store.score} questions correct and ${store.questions.length - store.score} questions incorrect</p>
                <button class="startOver">Start Over</button>
        </div>
        `;
    }


  /********** RENDER FUNCTION(S) **********/
  
  function renderQuiz () {
//renderQuiz first checks if quizStarted is false, if so then it will check 
//to see if the current questionNumber is also the last question.
//Based on these conditions, renderQuiz will call the appropriate string funtion we defined earlier.
//stringQuizResults will display if the quiz is NOT started AND the store.QuestionNumber is equal 
//to the quiz length (the quiz has been completed) ELSE it will display the welcome view (quiz is not 
//started AND the store.QuestionNumber !== store.questions.length)


    if(store.quizStarted === false) {
      if(store.questionNumber === store.questions.length){
        const resultsString = stringQuizResults();
        $('main').html(resultsString); 
      } else {
        const welcomeViewString = createWelcomeView();
        $('main').html(welcomeViewString);
      }
      //The below conditions apply if quizStared === true, and will check the submitAns value in STORE
      //If false, our createQuestionView function runs with the returnCurrentQuestion function as an argument
     

    } else if (store.quizStarted === true) {
      if(store.submitAns === false) {
        const questionViewString = createQuestionView(returnCurrentQuestion());
        $('main').html(questionViewString);
      } else if (store.submitAns === true) {
        const answerResultsString = renderAnswerResults();
        $('main').html(answerResultsString);
      }
    } 
  }
  
  
  // Changes the state of the application to a quizStarted = true
  // called by handleQuizStartSubmit event handler function
  function quizStart() {
    store.quizStarted = true;
  }
  
  
  //returnCurrentQuestion purpose is to use an index to keep track of
  //the current question number by adding +1 to variable 'index' that represents the newest question
  //returnCurrentQuestion returns questionObject which is the input needed for createQuestionView
  
  function returnCurrentQuestion(){
    let index = store.questionNumber;
    let questionObject = store.questions[index];
    return {
      index: index +1,
      question: questionObject
    };
  }
  
  // This function is called by handleGoToNextQuestionSubmit event handler function.
  // First condition checks if it is the last question of the quiz.
  // If there are still more questions, we add +1 to the questionNumber variable located in STORE and
  //  also change the submitAns variable back to false.
  // If there are no more questions, we change the quizStarted variable back to false 
  //  because the quiz is completed.
  function goToNextQuestion(){
    if (store.questionNumber < store.questions.length){
      store.questionNumber++;
      store.submitAns = false;
    } else if(store.questionNumber === store.questions.length) {
      store.quizStarted = false;
    }
  }
  
  
  function gradeAnswer() {
    let radios = $('input:radio[name=answer]');
    let selectedAnswer = $('input[name="answer"]:checked').data('answer');
    let questionNumber = store.questionNumber;
    let correctAnswer = store.questions[questionNumber].correctAnswer;
  
    if (radios.filter(':checked').length === 0) {
      //filters out checked values and if there is none, there needs to be one selected
      alert('Please choose an answer.');
      return;
    } else {
      store.submitAns = true;
      if(selectedAnswer === correctAnswer){
        store.score += 10;
        store.currentState.answerArr = [true, correctAnswer, selectedAnswer];
      } else {
        store.currentState.answerArr = [false, correctAnswer, selectedAnswer];
      }
    }
  }
  
  function viewResults() {
    store.quizStarted = false;
    store.questionNumber ++;
  }
  
  function startOver() {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.submittingAnswer = false;
    store.currentQuestionState.answerArr = [];
  }
  
  /********** EVENT HANDLER FUNCTIONS **********/
  // These functions handle events (submit, click, etc)
  // Controller layer
  
  function handleQuizStartSubmit(){
    
    $('main').on('click', '#quizStart', (event) =>{
      event.preventDefault();
      quizStart();
      renderQuiz();
    });
  }
  
  function handleSubmitAnswer() {
    $('main').on('click' , '.submitAnswer', (event)=>{
      event.preventDefault();
      gradeAnswer();
      renderQuiz();
    });
  }
  
  function handleGoToNextQuestionSubmit(){
    $('main').on('click', '.goToNextQuestion', (event) => {
      event.preventDefault();
      goToNextQuestion();
      renderQuiz();
    });
  }
  
  function handleViewResultsSubmit(){
    $('main').on('click', '.viewResults', (event) => {
      event.preventDefault();
      viewResults();
      renderQuiz();
    });
  }
  
  function handleStartOverSubmit(){
    $('main').on('click', '.startOver', (event) => {
      event.preventDefault();
      startOver();
      renderQuiz();
    });
  }
  
  
  // This function will launch all other functions after the page is loaded
  function handleQuiz (){
    renderQuiz();
    handleQuizStartSubmit();
    handleSubmitAnswer();
    handleGoToNextQuestionSubmit();
    handleStartOverSubmit();
    handleViewResultsSubmit();
  
  }
  
  $(handleQuiz);
