let questions = [
    {
      quiz_id: 1,
      question:
        "You can learn a lot about the local _______ by talking to local people.",
      answers: ["territory", "area", "land", "nation"],
    },
    {
      quiz_id: 2,
      question:
        "It's good to have someone to ________ you when you are visiting a new place.",
      answers: ["lead", "take", "guide", "bring"],
    },
    {
      quiz_id: 3,
      question:
        "When you ______ your destination, your tour guide will meet you at the airport.",
      answers: ["arrive", "reach", "get", "achieve"],
    },
    {
      quiz_id: 4,
      question: "It can be quite busy here during the tourist ______",
      answers: ["season", "phase", "period", "stage"],
    },
    {
      quiz_id: 5,
      question:
        "Make sure you _______ a hotel before you come to our island, especially in the summer.",
      answers: ["book", "keep", "put", "buy"],
    },
    {
      quiz_id: 6,
      question: "Captain Cook discovered Australia on a _______ to the Pacific.",
      answers: ["vacation", "travel", "cruise", "voyage"],
    },
    {
      quiz_id: 7,
      question:
        " Most tourist attractions in London charge an admission ________.",
      answers: ["fare", "ticket", "fee", "pay"],
    },
    {
      quiz_id: 8,
      question: "The hotel where we are _______ is quite luxurious.",
      answers: ["living", "existing", "remaining", "staying"],
    },
    {
      quiz_id: 9,
      question: "Is English an ________ language in your country?",
      answers: ["mother", "official", "living", "old"],
    },
    {
      quiz_id: 10,
      question: "He spoke a ______ of French that we found hard to understand.",
      answers: ["slang", "jargon", "dialect", "language"],
    },
  ];
const results = [
    {
      quiz_id: 1,
      answer: "area",
    },
    {
      quiz_id: 2,
      answer: "guide",
    },
    {
      quiz_id: 3,
      answer: "reach",
    },
    {
      quiz_id: 4,
      answer: "season",
    },
    {
      quiz_id: 5,
      answer: "book",
    },
    {
      quiz_id: 6,
      answer: "voyage",
    },
    {
      quiz_id: 7,
      answer: "fee",
    },
    {
      quiz_id: 8,
      answer: "staying",
    },
    {
      quiz_id: 9,
      answer: "official",
    },
    {
      quiz_id: 10,
      answer: "dialect",
    },
  ];

const API_KEY = `https://script.google.com/macros/s/AKfycbx7UWV8r6YZKo8pghoMLYUsFMShJCpvw7tC8sBE_gMiL3xEFDPRh2tU1leERWRNIu3r/exec`

const countdown = document.querySelector('#countdown')
const btnSubmit = document.querySelector('.submit')
const quizListDiv = document.querySelector('.quiz-lists')
const titleQuestion = document.querySelector('.title-question')
const questionText = document.querySelector('.question-text')
const answerDiv = document.querySelectorAll('.div-answer div')
const progess = document.querySelector('#progess')
const progessText = document.querySelector('.progess-text')
const btnNext = document.querySelector('.next')
const btnPrev = document.querySelector('.prev')

let currentIndex = []
let quizList = []
let answerArray = []
let resultLists = []
let isSubmit = false

const getAPI = async () => {
  const response = await fetch(`${API_KEY}?category=english`)
  const data = await response.json()
  console.log(data.data)
}

const getResult = async () => {
  const response = await(API_KEY,{
    method : 'POST',
  })
}

getAPI()

function randomArray(array) {
  return (array = array.sort(() => Math.random() - Math.random()));
}

const quiz = {
  randomQuestion : function () {
    questions = randomArray(questions)
    questions.forEach((item) => {
      item.answers = randomArray(item.answers)
    })
  },
  renderTimer : function () {
    // targetTime 
    var targetTime = new Date()
    targetTime.setMinutes(targetTime.getMinutes() + 15)
    
    // now
    var x = setInterval(() => {
      var currentTime = new Date()
      let distance = targetTime - currentTime
      // setminutes & seconds
      var minutes = Math.floor(distance / (1000 *60))
      var seconds = Math.floor((distance % (1000*60)) / 1000)
      // innerHTML
      countdown.innerHTML = `${minutes} phut ${seconds} giay`

      if(minutes <= 0 && seconds == 0) {
        clearInterval(x)
      }
      if(isSubmit) {
        clearInterval(x)
      }
    },1000)
  },
  renderQuestionLists : function () {
    questions.forEach((item,index) => {
      const btn = document.createElement('div')
      btn.setAttribute('class','btn outline small')
      btn.innerText = index + 1
      quizListDiv.append(btn)
    })
  },
  handleQuestionClick : function () {
    quizList = quizListDiv.querySelectorAll('div')
    quizList.forEach((item,index) => {
      item.addEventListener('click', () => {
        quizList.forEach((item,index) => {
          item.classList.remove('active')
        })
        item.classList.add('active')
        currentIndex = index
        this.renderQuestion()
        answerDiv.forEach((item,index) => {
          item.classList.remove('selected')
        })
        let selected = answerArray[currentIndex]
        selected >= 0 && answerDiv[selected].classList.add('selected')
        if(isSubmit){
          this.renderResult()
        }
      })
    })
    quizList[0].click()
  },
  handleClickAnswer : function () {
    answerDiv.forEach((item,index) => {
      item.addEventListener('click',() => {
        answerDiv.forEach((item,index) => {
          item.classList.remove('selected')
        })
        item.classList.add('selected')
        answerArray[currentIndex] = index
        quizList[currentIndex].classList.add('selected')
        console.log(answerArray)
        this.handleProgess()
      })
    })
  },
  handleNextQuestion : function () {
    btnNext.addEventListener('click',() => {
      ++currentIndex
      if(currentIndex > questions.length - 1) {
        currentIndex = 0
      }
      questions[currentIndex]
      this.renderQuestion()
    })
  },
  handlePrevQuestion : function () {
    btnPrev.addEventListener('click',() => {
      --currentIndex
      if(currentIndex < 0) {
        currentIndex = questions.length - 1
      }
      questions[currentIndex]
      this.renderQuestion()
    })
  },
  handleSubmit : function () {
    btnSubmit.addEventListener('click',() => {
    const proLen = answerArray.filter(e => e >= 0)
      if( proLen.length === questions.length) {
        console.log('ban chon du')
        this.handleCheckResult()
      
      }else {
        console.log('ban chua chon du')
      }
    })
  },
  handleCheckResult : function () {
    let correct = 0
    questions.forEach((item,index) => {
      let result = results.find(r => r.quiz_id === item.quiz_id)
      // console.log(result)
      if(item.answers[answerArray[index]] === result.answer) {
        resultLists[index] = answerArray[index]
        correct++
      }else{
        quizList[index].classList.add('incorrect')
        resultLists[index] = item.answers.indexOf(result.answer)
      }
      // console.log({answerArray})
      // console.log({resultLists});
    })
    isSubmit = true
    this.handleProgess(correct)
  },
  renderResult : function () {
    if(answerArray[currentIndex] === resultLists[currentIndex]) {
      answerDiv.forEach((item,index) => {
        item.classList.remove('incorrect')
      })
      answerDiv[answerArray[currentIndex]].classList.add('selected')
    }else {
      answerDiv.forEach((item,index) => {
        item.classList.remove('selected')
        item.classList.remove('incorrect')
      })
      answerDiv[resultLists[currentIndex]].classList.add('selected')
      answerDiv[answerArray[currentIndex]].classList.add('incorrect')
    }
  },
  handleProgess : function (correct) {
    const r = progess.getAttribute('r')
    if(!isSubmit) {
      const proLen = answerArray.filter(e => e >= 0)
      progess.style = `stroke-dasharray : ${(2 * Math.PI * r * proLen.length) / questions.length} 99999`
      progessText.innerText = `${proLen.length}/${questions.length}`
    }else{
      progess.style = `stroke-dasharray : ${(2 * Math.PI * r * correct) / questions.length} 99999`
      progessText.innerText = `${correct}/${questions.length}`
    }
  },
  renderProgess : function () {
    progess.style = 'stroke-dasharray : 0 99999'
    progessText.innerText = `0/${questions.length}`
  },
  renderQuestion : function () {
    titleQuestion.innerHTML = `Question ${currentIndex + 1} of ${questions.length}`
    questionText.innerHTML = questions[currentIndex].question
    answerDiv.forEach((item,index) => item.innerHTML = questions[currentIndex].answers[index])
  },
  start : function () {
    this.randomQuestion()
    this.renderQuestionLists()
    this.handleQuestionClick()
    this.handleClickAnswer()
    this.renderProgess()
    this.renderTimer()
    this.handleNextQuestion()
    this.handlePrevQuestion()
    this.handleSubmit()
  }
}

quiz.start()