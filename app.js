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
    score: 0
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
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)
