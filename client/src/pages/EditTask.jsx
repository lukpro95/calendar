import React, {Component} from 'react'
import TaskBuilder from '../components/content/ScheduleTask/TaskBuilder'
import Main from '../components/content/Global/Main'
import OverflowAnimation from '../components/content/Global/OverflowAnimation'
import apis from '../api'

export default class EditTask extends Component {

    constructor(props) {
        super(props)

        this.state = {
            task: []
        }
    }

    componentDidMount = async () => {
        OverflowAnimation()
        await apis.getTaskById(this.props.match.params.taskId)
        .then(response => {
            if(response.data !== 'wrong') {
                this.setState({task: response.data[0]})
            } else {
                this.setState({task: []})
            }
        })
    }

    submitTaskUpdate = async (data) => {
        const id = window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/'))
        await apis.updateTask(id, data)
        .then(response => {
            if(response.data.includes('Success')) {
                window.location.href = `/${this.state.task.taskDate}`
            }
        })
    }

    render(){
        const {taskName, taskDate, taskTimeStart, taskTimeEnd, taskDescription, taskRepetition} = this.state.task
        return (
            <Main>
                <TaskBuilder 
                    operation={this.submitTaskUpdate}
                    routine={taskRepetition ? true : false} 
                    loadAll={true}
                    edit={true} 
                    presetData={{
                        taskName: taskName,
                        taskDate: taskDate,
                        taskTimeStart: taskTimeStart,
                        taskTimeEnd: taskTimeEnd,
                        taskDescription: taskDescription,
                        taskRepetition: taskRepetition,
                    }} 
                />
            </Main>
        )
    }
    
}