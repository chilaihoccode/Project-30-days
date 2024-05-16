// question 
// let questions = [
//     {
//       quiz_id: 1,
//       question:
//         "You can learn a lot about the local _______ by talking to local people.",
//       answer: ["territory", "area", "land", "nation"],
//     },
//     {
//       quiz_id: 2,
//       question:
//         "It's good to have someone to ________ you when you are visiting a new place.",
//       answer: ["lead", "take", "guide", "bring"],
//     },
//     {
//       quiz_id: 3,
//       question:
//         "When you ______ your destination, your tour guide will meet you at the airport.",
//       answer: ["arrive", "reach", "get", "achieve"],
//     },
//     {
//       quiz_id: 4,
//       question: "It can be quite busy here during the tourist ______",
//       answer: ["season", "phase", "period", "stage"],
//     },
//     {
//       quiz_id: 5,
//       question:
//         "Make sure you _______ a hotel before you come to our island, especially in the summer.",
//       answer: ["book", "keep", "put", "buy"],
//     },
//     {
//       quiz_id: 6,
//       question: "Captain Cook discovered Australia on a _______ to the Pacific.",
//       answer: ["vacation", "travel", "cruise", "voyage"],
//     },
//     {
//       quiz_id: 7,
//       question:
//         " Most tourist attractions in London charge an admission ________.",
//       answer: ["fare", "ticket", "fee", "pay"],
//     },
//     {
//       quiz_id: 8,
//       question: "The hotel where we are _______ is quite luxurious.",
//       answer: ["living", "existing", "remaining", "staying"],
//     },
//     {
//       quiz_id: 9,
//       question: "Is English an ________ language in your country?",
//       answer: ["mother", "official", "living", "old"],
//     },
//     {
//       quiz_id: 10,
//       question: "He spoke a ______ of French that we found hard to understand.",
//       answer: ["slang", "jargon", "dialect", "language"],
//     },
//   ];
  const answers = [
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
// Quiz-app
const countdownDiv = document.getElementById('countdown')
const btnSubmit = document.querySelector('.submit')
const titleQuestion = document.querySelector('.title-question')
const questionText = document.querySelector('.question-text')
const answerDiv = document.querySelectorAll('.div-answer div')
const footerDiv = document.querySelector('.footer-quiz');
const listDiv = document.querySelector('.quiz-lists')
const btnPrev = document.querySelector('.prev')
const btnNext = document.querySelector('.next')
const progess = document.querySelector('#progess')
const progessText = document.querySelector('.progess-text')


let questions 
let currentIndex 
let listQuiz = []
let answerArrays = []
let resultArrays = []
let isSubmit = false

const ramdomArray = (array) => {
  return (array = array.sort(() => Math.random() - Math.random()))
}

const quiz = {
  randomQuestion : function () {
    questions = ramdomArray(questions)
    questions.map((item,index) => {
      item.answer = ramdomArray(item.answer)
    })
  },
  getAPI : async function () {
    const response = await fetch(`${API_KEY}?category=english`)
    const data = await response.json()
    questions = data.data
  },
  handleSubmit : function () {
    btnSubmit.addEventListener('click',() => {
      let proLen = answerArrays.filter((item) => item>= 0)
      if(proLen.length === questions.length) {
        console.log('ban da nhap du')
        this.handleCheckResult()
        isSubmit = true
      }else{
        alert('ban hay chon du dap an')
      }
    })
  },
  handleCheckResult : function () {
    questions.forEach((item,index) => {
      let result = answers.find(i => i.quiz_id === item.quiz_id)
      if(item.answer[answerArrays[index]] === result.answer) {
        resultArrays[index] = answerArrays[index]
      }else{
        listQuiz[index].classList.add('incorrect')
        resultArrays[index] = item.answer.indexOf(result.answer)
        // console.log('falil')
      }
    })
  },
  renderResult : function () {
    if(resultArrays[currentIndex] === answerArrays[currentIndex]) {
      answerDiv.forEach((item,index) => {
        item.classList.remove('incorrect')
      })
      answerDiv[answerArrays[currentIndex]].classList.add('selected')
    }else {
      answerDiv.forEach((item,index) => {
        // console.log(item)
        item.classList.remove('incorrect')
        item.classList.remove('selected')
      })
      answerDiv[resultArrays[currentIndex]].classList.add('selected')
      answerDiv[answerArrays[currentIndex]].classList.add('incorrect')
    }
  },
  renderTimer : function () {
    var targetTime = new Date()
    targetTime.setMinutes(targetTime.getMinutes() + 15)
    // now
    const x = setInterval(() => {
    var now = new Date()
    var distance = targetTime - now
    // handle
      let minutes = Math.floor(distance /(1000*60))
      let seconds = Math.floor((distance % (1000*60)) /1000)

      countdownDiv.innerHTML = `${minutes} phut ${seconds} giay`
      if(minutes <= 0) {
        clearInterval(x)
      }
    },1000)

  },
  renderQuestionList : function () {
    questions.forEach((item,index) => {
      const btn = document.createElement('div')
      btn.setAttribute('class','btn outline small')
      btn.innerText = index +1
      listDiv.append(btn)
    })
  },
  handleQuestionClick : function () {
    listQuiz = listDiv.querySelectorAll('div')
    listQuiz.forEach((item,index) => {
      item.addEventListener('click',() => {
        listQuiz.forEach((item) => {
          item.classList.remove('active')
        })
        item.classList.add('active')
        currentIndex = index
        this.renderQuesions()
        answerDiv.forEach((item) => {
          item.classList.remove('selected')
        })
        let selected = answerArrays[currentIndex]
        selected >= 0 && answerDiv[selected].classList.add('selected')
        if(isSubmit) {

          this.renderResult()
        }
      })
    })
    listQuiz[0].click()
  },
  handleAnswer : function () {
    answerDiv.forEach((item,index) => {
      item.addEventListener('click', () => {
        answerDiv.forEach((item,index) => {
          item.classList.remove('selected')
        })
        item.classList.add('selected')
        answerArrays[currentIndex] = index
        console.log(answerArrays)
        listQuiz[currentIndex].classList.add('selected')
        this.handleProgess()
      })
    })
  },
  handleProgess : function () {
    const r = progess.getAttribute('r')
    let proLen = answerArrays.filter(item => item  >= 0)
    progess.style = `stroke-dasharray: ${(2 * Math.PI * r * proLen.length) / questions.length} 9999`
    progessText.innerText = `${proLen.length}/${questions.length}`
  },
  renderProgess : function () {
    progess.style = `stroke-dasharray : 0 9999`
    progessText.innerText = `0/${questions.length}`
  },
  renderQuesions : function () {
    titleQuestion.innerHTML = `Question ${currentIndex +1} of ${questions.length}`
    questionText.innerText = questions[currentIndex].question
    answerDiv.forEach((item,index) => item.innerText = questions[currentIndex].answer[index])
  },
  render : function () {
    this.renderQuestionList()
    this.renderProgess()
    this.renderTimer()
  },
  handle : function () {
    this.handleQuestionClick()
    this.handleAnswer()
    this.handleSubmit()

  },
  start : async function () {
    await this.getAPI()
    this.randomQuestion()
    this.render()
    this.handle()
  }
}
quiz.start()