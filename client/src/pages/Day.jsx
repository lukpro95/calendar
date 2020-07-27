import React, { Component } from 'react'
import styled from 'styled-components'
import OverflowAnimation from '../components/content/Global/OverflowAnimation'
import {Link} from 'react-router-dom'
import apis from '../api'
import '../styles/day.css'

const Wrapper = styled.div.attrs({
    className: 'row w-100 m-0 justify-content-center'
})``

const Options = styled.div.attrs({
    className: 'px-3 py-2 options'
})``

const Content = styled.div.attrs({
    className: 'col-11 mt-4'
})``

const Title = styled.div.attrs({
    className: 'col-4 py-2 box shadow text-center'
})``

const Float = styled.div.attrs({
    className: `col-11 d-flex moving-content mr-4`,
})``

const Group = styled.div.attrs({
    className: 'px-3 py-2 box shadow mr-4 text-nowrap'
})``

export default class Day extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: window.location.pathname.substring(1),
            tasks: []
        }
    }

    showDescription = (id) => {
        const {tasks} = this.state

        let newTasks = tasks.map(task => {
            if(task._id === id) { return {...task, isShown: true}} 
            else {return task}
        })

        this.setState({tasks: newTasks})
    }

    hideDescription = (id) => {
        const {tasks} = this.state

        let newTasks = tasks.map(task => {
            if(task._id === id) { return {...task, isShown: false}} 
            else {return task}
        })

        this.setState({tasks: newTasks})
    }

    componentDidMount = () => {
        OverflowAnimation()
        const {date} = this.state
        const year = date.substring(0, date.indexOf('-'))
        const month = date.substring(date.indexOf('-')+1, date.lastIndexOf('-'))
        const day = date.substring(date.lastIndexOf('-')+1)

        apis.getDayTasks({year, month, day})
        .then((res) => {
            if(!res.data.includes('nothing')) {
                res.data = res.data.map(record => {
                    return {
                        _id: record._id,
                        taskName: record.taskName,
                        taskTimeStart: record.taskTimeStart,
                        taskTimeEnd: record.taskTimeEnd,
                        taskDescription: record.taskDescription,
                        isShown: false
                    }
                })

                this.setState({tasks: res.data})
            }
        })
    }

    taskDescription = (isShown, description) => {
        return (
            isShown ? 
            <Group className="showMore"> 
                {description || <i className="text-muted">No description given</i>}
            </Group>
            : ''
        )
    }

    render() {
        const {date, tasks} = this.state
        return (
            <Wrapper>
                <Content>
                    <Title>
                        <h1 style={coloredText}><strong>Day {date}</strong></h1>
                    </Title>
                </Content>

                <Content>
                    {tasks.length > 0 && 
                        tasks.map(task => (
                            <Float key={task._id}>

                                <Link to={`/${task._id}/edit`}>
                                    <Options><i className="fa fa-cog"></i></Options>
                                </Link>

                                <Group> <i>{task.taskTimeStart} - {task.taskTimeEnd}</i> </Group>

                                <Group 
                                    onMouseLeave={() => {this.hideDescription(task._id)}} 
                                    onMouseEnter={() => {this.showDescription(task._id)}}
                                    style={coloredText}
                                > 
                                    <strong>{task.taskName}</strong> 
                                </Group>
                                
                                {this.taskDescription(task.isShown, task.taskDescription)}

                            </Float>
                        ))
                    }
                    {tasks.length === 0 && 
                        <Float>
                            <Group> You have a free day! No scheduled duties yet. </Group>
                        </Float> 
                    }
                </Content>
            </Wrapper>
        )
    }
}

const coloredText = {
    color: 'rgba(47, 88, 202, 0.844)',
}