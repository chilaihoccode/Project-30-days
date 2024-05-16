let questions 
let results 

const API_key = 'https://script.google.com/macros/s/AKfycbxBh6f-xivViT8fBQMoSe-WX2KiYDSbDCP9ymc079m6YQSIgkMNN8GzaESVVjUOjVnO/exec';

const getAPI = async () => {
    const reponse = await fetch(`${API_key}?category=history`)
    const data = await reponse.json()
    questions = data.data
    console.log(questions)
}

// modal result 
// result = [
//     {
//         id : 1,
//         answer : '...'
//     }
// ]
const getResults = async () => {
    const postData = {
        category : 'history',
        questions : questions
    }
    const reponse = await fetch(API_key,{
        method : 'POST',
        body : JSON.stringify(postData)
    })
    const data = await reponse.json()
    results = data.data
    // console.log(results)
}

const title = document.querySelector('.question-title');
const questionDiv = document.querySelector('.container-answer');
const btnNext = document.querySelector('.btn-next')

let currentQuestionIndex = 0;
let score = 0


const startQuiz = async () => {
    await getAPI()
    await getResults()
    showQuiz()
}

const randomArray = (array) => {
    return (array = array.sort(() => Math.random() - Math.random()))
}

const showQuiz = () => {
    resetState()
    console.log(questionIndex)
    let currentQuestion = questions[currentQuestionIndex]
    // console.log(currentQuestionIndex)
    console.log({currentQuestion})
    let questtionNo = currentQuestionIndex + 1
    title.innerHTML = questtionNo + '. ' + currentQuestion.question;
    
    // const testAnswer = randomArray(currentQuestion.answers)

    randomArray(currentQuestion.answers).forEach((answer) => {
        const btn = document.createElement('button')
        btn.innerText = answer;
        btn.classList.add('btn-answer');
        questionDiv.appendChild(btn)
        const test = results.find((r) => answer === r.answer)
        // if(answer.correct) {
        //         btn.dataset.correct = answer.correct
        //     }
        if(test) {
            btn.dataset.correct = true
        }
        
        btn.addEventListener('click',selectAnswer)
    })
    
}

const resetState = () => {
    btnNext.style.display = 'none';
    while(questionDiv.firstChild) {
        questionDiv.removeChild(questionDiv.firstChild)
    }
}


function selectAnswer(e) {
    // let score = 0;
    const btnSelect = e.target;
    if(btnSelect.dataset.correct == 'true') {
        btnSelect.classList.add('correct')
        score++;
    }else {
        btnSelect.classList.add('incorrect')
    }
    Array.from(questionDiv.children).forEach((btn) => {
        if(btn.dataset.correct == 'true') {
            btn.classList.add('correct')
        }
        btn.disabled = true
    });
    btnNext.classList.add('btn-next')
    btnNext.innerText = 'Next'
    btnNext.style.display = 'block';
}


btnNext.addEventListener('click',() => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton()
    }else {
        currentQuestionIndex = 0
        score = 0
        showQuiz()
        btnNext.innerText = 'Next'
    }
})
const showScore = () => {
    resetState()
    questionDiv.innerHTML = `Your score ${score} out of ${questions.length}`;
    btnNext.innerText = 'Play Again'  
    btnNext.style.display = 'block'
}

const handleNextButton = () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuiz()
    }else{
        showScore()
    }
}

startQuiz()