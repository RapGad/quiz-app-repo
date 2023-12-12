const answers = document.querySelectorAll('.answer')
const score = document.querySelector('.score')
const nextBtn = document.querySelector('.nextBtn')
const main = document.querySelector('.main')
const questionContainer = document.querySelector('.question')
let index = 0
let scoreValue = 0
let questions = []

const API = 'https://the-trivia-api.com/v2/questions'

function disable() {
    answers.forEach(answer => {
        if (answer.dataset.id === 'true') {
            answer.classList.add('bg-lime-600')
            answer.classList.add('text-white')
        }
        answer.disabled = true


    })
}

function removeClasses() {
    answers.forEach(answer => {
        answer.classList.remove('bg-lime-600')
        answer.classList.remove('bg-red-700')
        answer.classList.remove('text-white')

        answer.disabled = false

    })

}
function setQuestionsAndAnswers(arr) {
    let randomPos = Math.floor(Math.random() * arr[index].incorrectAnswers.length - 1)
    arr[index].incorrectAnswers.splice(randomPos, 0, arr[index].correctAnswer)
    randomPos === -1 ? randomPos = 2 : randomPos
    questionContainer.innerText = `${index + 1}.${arr[index].question.text}`
    answers.forEach((answer, ind) => {
        if (ind === randomPos) {
            answer.dataset.id = 'true'
            answer.innerText = arr[index].incorrectAnswers[ind]

        }
        else {
            answer.dataset.id = 'false'

            answer.innerText = arr[index].incorrectAnswers[ind]

        }
    })



    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            if (answer.dataset.id === 'true') {
                scoreValue += 10
                score.innerText = scoreValue
                answer.classList.add('bg-lime-600')
                answer.classList.add('text-white')
            }
            else {
                answer.classList.add('bg-red-700')
                answer.classList.add('text-white')

            }
            disable()
        })
    })

}

async function fetchQuestion() {
    const response = await fetch(API)
    questions = await response.json()
    console.log(questions)

    setQuestionsAndAnswers(questions)

}



nextBtn.addEventListener('click', () => {
    index += 1

    if (index <= questions.length - 1) {
        setQuestionsAndAnswers(questions)
        removeClasses()

    }
    else {
        main.innerHTML = `
                <p class="text-center mt-32 text-3xl">Quiz Done, You scored ${score.innerText}/${questions.length}</p>
        `
    }
})

fetchQuestion()
