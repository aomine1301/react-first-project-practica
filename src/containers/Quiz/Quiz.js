import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


export default class Quiz extends Component {
    state = {
        results:{}, //{[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null,//{[id]:'success', 'error'}
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswer: 1,
                id: 1,
                answers: [
                    {text: 'Синий', id: 1},
                    {text: 'Черный', id: 2},
                    {text: 'Белый', id: 3},
                    {text: 'Красный', id: 4}
                ]
            },
            {
                question: 'Зевс алкаш?',
                rightAnswer: 2,
                id: 2,
                answers: [
                    {text: 'ДА', id: 1},
                    {text: 'ТОЧНО ДА!', id: 2},
                    {text: 'ВОЗМОЖНО НЕТ', id: 3},
                    {text: 'ТОЧНО НЕТ!', id: 4}
                ]
            },
            {
                question: 'ТИМА алкаш?',
                rightAnswer: 3,
                id: 3,
                answers: [
                    {text: 'ДА', id: 1},
                    {text: 'ТОЧНО ДА!', id: 2},
                    {text: 'ВОЗМОЖНО НЕТ', id: 3},
                    {text: 'ТОЧНО НЕТ!', id: 4}
                ]
            },
            {
                question: 'Руся ДРЫЩ?',
                rightAnswer: 4,
                id: 5,
                answers: [
                    {text: 'ДА', id: 1},
                    {text: 'ТОЧНО ДА!', id: 2},
                    {text: 'ВОЗМОЖНО НЕТ', id: 3},
                    {text: 'ТОЧНО НЕТ!', id: 4}
                ]
            }
        ]
    }
    onAnswerClickHAndler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        console.log('Answer ID', answerId)
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswer === answerId) {
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler=()=>{
        this.setState({
            activeQuestion:0,
            answerState:null,
            isFinished:false,
            results:{}
            }
        )
    }

    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.isFinished
                        ? <FinishedQuiz
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}/>
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHAndler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    }

                </div>
            </div>
        )
    }
}
