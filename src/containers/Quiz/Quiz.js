import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";


export default class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState:null,
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
        this.setState({
            answerState:{[answerId]:'success'}
        })
        let question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswer === answerId) {
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('Finished')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState:null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        }else {
            this.setState({
                answerState:{[answerId]:'error'}
            })

        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHAndler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state = {this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}