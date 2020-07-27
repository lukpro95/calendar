import React, { Component } from 'react'
import styled from 'styled-components'
import {
    InsertName, InsertDate, 
    InsertRepetition, InsertTimeStart, 
    InsertTimeEnd, InsertDescription, 
    SubmitButton, CancelButton, DeleteButton} from './'
import '../../../styles/validation.css'

const Group = styled.div.attrs({
    className: 'row mx-0 px-0'
})``

const ButtonGroup = styled.div.attrs({
    className: 'row mx-0 px-0 mt-5 justify-content-between'
})``

const ButtonDivider = styled.div.attrs({
    className: 'col-6 d-flex justify-content-between'
})``

export default class TaskBuilder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskName: '',
            taskDate: '',
            taskTimeStart: '',
            taskTimeEnd: '',
            taskDescription: '',
            taskRepetition: '',

            errors: {},

            loadDate: false,
            loadRepetition: false,
            loadTimeStart: false,
            loadTimeEnd: false,
            loadDescription: false,
            loadButton: false,
        }

        this.timeout = null
    }

    proceedSubmission = async () => {
        const {taskName, taskDate, taskTimeStart, taskTimeEnd, taskDescription, taskRepetition} = this.state
        const data = {taskName, taskDate, taskTimeStart, taskTimeEnd, taskDescription, taskRepetition}
        
        this.props.operation(data)
    }

    showErrors = () => {
        alert(`Error: ${this.state.errors}`)
    }

    resetErrors = () => {
        this.setState({
            errors: {}
        })
    }

    checkLoaders = () => {
        const {errors} = this.state
            
        if(errors.name === false) 
            {this.setState({loadDate: true})}
        if(errors.date === false) 
            {this.props.routine ? this.setState({loadRepetition: true}) : this.setState({loadTimeStart: true})}
        if(errors.start === false) 
            {this.setState({loadTimeEnd: true})}
        if(errors.end === false) 
            {this.setState({loadDescription: true, loadButton: true})}
        if(errors.repetition === false && this.props.routine) 
            {this.setState({loadTimeStart: true})}
    }

    submit = (e) => {
        const {errors} = this.state

        e.preventDefault()
        this.resetErrors()
        this.checkLoaders()
        if(errors.length) {
            this.showErrors()
        } else {
            this.proceedSubmission()
        }
    }

    errorHandler = (field, hasError) => {
        const {errors} = this.state
        if(hasError) {this.setState({errors: {...errors, [field]: true}})}
        else {this.setState({errors: {...errors, [field]: false}})}
    }

    changeInput = (e) => {
        this.resetErrors()

        const {name, value} = e.target
        this.setState({[name]: value}, () => {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.checkLoaders()
            }, 450)
        })

    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.presetData !== this.props.presetData) {
            const {presetData, loadAll} = this.props
            const {taskName, taskDate, taskTimeStart, taskTimeEnd, taskDescription, taskRepetition} = presetData
            this.setState({
                taskName: taskName,
                taskDate: taskDate,
                taskTimeStart: taskTimeStart,
                taskTimeEnd: taskTimeEnd,
                taskDescription: taskDescription,
                taskRepetition: taskRepetition,
            })

            if(loadAll) {
                this.setState({
                    loadDate: true,
                    loadRepetition: presetData.taskRepetition ? true : false,
                    loadTimeStart: true,
                    loadTimeEnd: true,
                    loadDescription: true,
                    loadButton: true,
                })
            }
        }
    }

    render() {
        const {loadDate, loadTimeStart, loadTimeEnd, loadDescription, loadRepetition, loadButton} = this.state
        const {taskName, taskDate, taskRepetition, taskTimeStart, taskTimeEnd, taskDescription} = this.state
        const {routine, edit} = this.props
        return (
            <form onSubmit={this.submit}>
                <Group>
                    <InsertName         changeInput={this.changeInput} hasErrors={this.errorHandler} routine={routine} value={taskName} />
                    <InsertDate         changeInput={this.changeInput} hasErrors={this.errorHandler} routine={routine} load={loadDate} value={taskDate} />
                    <InsertRepetition   changeInput={this.changeInput} hasErrors={this.errorHandler} load={loadRepetition} value={taskRepetition} />
                </Group>
                <Group>
                    <InsertTimeStart    changeInput={this.changeInput} hasErrors={this.errorHandler} load={loadTimeStart} value={taskTimeStart} />
                    <InsertTimeEnd      changeInput={this.changeInput} hasErrors={this.errorHandler} load={loadTimeEnd} value={taskTimeEnd} />
                </Group>
                <Group>
                    <InsertDescription  changeInput={this.changeInput} load={loadDescription} value={taskDescription} />
                </Group>
                <ButtonGroup>
                    <ButtonDivider>
                        {edit &&
                        <CancelButton backURL={this.props.presetData.taskDate} load={loadButton} />
                        }
                        <SubmitButton load={loadButton} />
                    </ButtonDivider>
                    {edit &&
                    <DeleteButton backURL={this.props.presetData.taskDate} load={loadButton} />
                    }
                </ButtonGroup>
            </form>
        )
    }
}