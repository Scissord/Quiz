import React, {useState} from 'react'
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const question = [
    {
      questionText: 'Тригонометрическая функция синусоиды?',
      answerOption: [
        {answerText: 'y(x) = x', isCorrect: false},
        {answerText: 'y(x) = cos(x)', isCorrect: true},
        {answerText: 'y(x) = ctg(x)', isCorrect: false},
        {answerText: 'y(x) = ln(x)', isCorrect: false},
      ]
    },
    {
      questionText: 'Какая компания разработала React?',
      answerOption: [
        {answerText: 'Amazon', isCorrect: false},
        {answerText: 'Mail', isCorrect: false},
        {answerText: 'Facebook', isCorrect: true},
        {answerText: 'Google', isCorrect: false},
      ]
    },
    {
      questionText: 'Какое из предложенных государств является страной-анклавом?',
      answerOption: [
        {answerText: 'Сент-Китс и Невис', isCorrect: false},
        {answerText: 'Сан-Марино', isCorrect: true},
        {answerText: 'ЮАР', isCorrect: false},
        {answerText: 'Косово', isCorrect: false},
      ]
    },
    {
      questionText: 'Какой температуре по шкале Цельсия соответствует абсолютный ноль?',
      answerOption: [
        {answerText: '-273 С', isCorrect: true},
        {answerText: '-274 C', isCorrect: false},
        {answerText: '-275 C', isCorrect: false},
        {answerText: '-276 C', isCorrect: false},
      ]
    },
    {
      questionText: 'Самый популярный язык в мире?',
      answerOption: [
        {answerText: 'Английский', isCorrect: false},
        {answerText: 'Русский', isCorrect: false},
        {answerText: 'Китайский', isCorrect: true},
        {answerText: 'Канадский', isCorrect: false},
      ]
    },
    {
      questionText: 'Какая из предложенных стран не содержит рек?',
      answerOption: [
        {answerText: 'Лихтенштейн', isCorrect: false},
        {answerText: 'Бельгия', isCorrect: false},
        {answerText: 'Тувалу', isCorrect: false},
        {answerText: 'Саудовская Аравия', isCorrect: true},
      ]
    },
    {
      questionText: 'Какая из предложенных стран не содержит рек?',
      answerOption: [
        {answerText: 'Лихтенштейн', isCorrect: false},
        {answerText: 'Бельгия', isCorrect: false},
        {answerText: 'Тувалу', isCorrect: false},
        {answerText: 'Саудовская Аравия', isCorrect: true},
      ]
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const { isLoading, error } = useAuth0();
  const { app, isAuthenticated } = useAuth0();

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion)
    }else {
      setShowScore(true)
    }
  }

  const refresh = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
  }

  return (
    <main>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      <Profile />
      <LogoutButton />
      <LoginButton />
      {
        isAuthenticated && (
          <div className="app">
          {
            showScore 
              ? <div className='score-section'>
                  <div>Правильных ответов {score} из {question.length}</div>
                  <button 
                  className='refresh-btn'
                  onClick={refresh}
                  >Попроботь ещё раз</button>
                </div>
              : <div className='quizz'>
                  <div className='question-section'> 
                    <div className='question-count'>
                      <span>Question {currentQuestion + 1}</span> / {question.length}
                    </div> 
                    <div className='question-text'>{question[currentQuestion].questionText}</div>
                  </div>
                  <div className='answer-section'>
                    {question[currentQuestion].answerOption.map(item => (
                    <button
                    onClick={() => handleAnswerOptionClick(item.isCorrect)}
                    >{item.answerText}</button>
                    ))}
                  </div>
                </div>
            }
            </div>
        ) 
      }
    </main>
  );
}

export default App;
