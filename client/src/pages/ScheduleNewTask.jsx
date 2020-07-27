import React, { Component } from 'react'
import styled from 'styled-components'
import {TaskBuilder} from '../components/content/ScheduleTask'
import Main from '../components/content/Global/Main'
import OverflowAnimation from '../components/content/Global/OverflowAnimation'
import apis from '../api'

const Float = styled.div.attrs({
    className: `col-12 box shadow moving-content mr-4`,
})``

export default class ScheduleNewTask extends Component {

    constructor(props) {
        super(props)

        this.state = {
            routine: false,
            once: false,
        }
    }

    reset = () => {
        this.setState({
            routine: false,
            once: false,
        })
    }

    changeHandler = (e) => {
        this.reset()
        this.setState({[e.target.value]: !this.state[e.target.value]})
    }

    changeInput = (e) => {
        this.setState({[e.target.name]: true})
    }

    componentDidMount = () => {
        OverflowAnimation()
    }

    submitNewTask = async (data) => {
        await apis.insertTask(data)
        .then(response => {
            if(!response.data) {
                alert("Something went wrong!")
            } else {
                alert("Success!")
            }
        })
    }

    render() {
        const {routine, once} = this.state
        return (
            <Main>
                    <Float>
                        <select onChange={this.changeHandler} className="w-100" name="option">
                            <option value="DEFAULT" hidden>New Task</option>
                            <option value="routine">Routine</option>
                            <option value="once">One-Time</option>
                        </select>
                    </Float>
                    {once && 
                        <TaskBuilder routine={false} operation={this.submitNewTask} />
                    }
                    {routine && 
                        <TaskBuilder routine={true} operation={this.submitNewTask} />
                    }
            </Main>
        )
    }
}