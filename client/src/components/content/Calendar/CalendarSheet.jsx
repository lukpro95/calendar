import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import {Month, Days} from './'
import apis from '../../../api'

const Wrapper = styled.div.attrs({
    className: 'col-11 text-center p-0 my-5'
})``

export default class CalendarSheet extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            date: {
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                numberOfDays: this.countDaysInMonth(new Date().getFullYear(), new Date().getMonth())
            },
            tasks: [],
            day: new Date().getDate()
        }

        this.wrapperRef = createRef()
        this.timeout = null
    }

    countDaysInMonth = (year, month) => {
        return new Date(year, month+1, 0).getDate()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.date.month < this.state.date.month) {
            console.log("Next")
            this.wrapperRef.current.classList.add('slideRight')
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {this.wrapperRef.current.classList.remove('slideRight')}, 800)
        }
        if(prevState.date.month > this.state.date.month) {
            console.log("Previous")
            this.wrapperRef.current.classList.add('slideLeft')
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {this.wrapperRef.current.classList.remove('slideLeft')}, 800)
        }
    }

    previousMonth = () => {
        const {date} = this.state
        const {year, month} = date

        if(month === 0) {
            this.setState({date: {
                ...date,
                year: year - 1,
                month: 11,
                numberOfDays: this.countDaysInMonth(year, 11)
            }})
        } else {
            this.setState({date: {
                ...date,
                month: month - 1,
                numberOfDays: this.countDaysInMonth(year, month-1)
            }})
        }
    }

    nextMonth = () => {
        const {date} = this.state
        const {year, month} = date

        if(month === 11) {
            this.setState({date: {
                ...date,
                year: year + 1,
                month: 0,
                numberOfDays: this.countDaysInMonth(year, 0)
            }})
        } else {
            this.setState({date: {
                ...date,
                month: month + 1,
                numberOfDays: this.countDaysInMonth(year, month+1)
            }})
        }
    }

    componentDidMount = async () => {
        await apis.getTasks()
        .then(response => {
             
            let array = response.data.map(record => {
                const {_id, taskName, taskDate, taskTimeStart, taskTimeEnd, taskDescription, taskRepetition} = record
                return ({
                    id: _id,
                    name: taskName,
                    date: taskDate,
                    start: taskTimeStart,
                    end: taskTimeEnd,
                    description: taskDescription,
                    repetition: taskRepetition || undefined
                })
            })

            this.setState({tasks: array})
        })
    }

    render() {
        const {day, date, tasks} = this.state
        return (
            <Wrapper ref={this.wrapperRef}>
                <Month 
                    year={date.year} 
                    month={date.month} 
                    day={day} 
                    prevMonth={this.previousMonth.bind(this)}
                    nextMonth={this.nextMonth.bind(this)}
                />

                <Days 
                    date={date}
                    tasks={tasks}
                />
            </Wrapper>
        )
    }
}