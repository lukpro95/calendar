import React, { Component } from 'react'
import {StyledTitle} from '../Global'
import {Form} from './'

export default class Registry extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errors: []
        }

        this.timeout = null

    }

    submitHandler = (e) => {
        clearTimeout(this.timeout)
        this.setState({[e.target.name]: e.target.value}, () => {
            this.timeout = setTimeout(()=>{this.staticValidate()})
        })
    }

    changeHandler = (e) => {
        clearTimeout(this.timeout)
        this.setState({[e.target.name]: e.target.value}, () => {
            this.timeout = setTimeout(() => {this.dynamicValidate()}, 550)
        })
    }

    emptyErrors = () => {
        return new Promise((resolve) => {
            this.setState({errors: []}, () => {
                resolve()
            })
        })
    }

    addError = (msg, category) => {
        return new Promise((resolve) => {
            const {errors} = this.state
            this.setState({
                errors: [...errors.concat({
                    msg: msg,
                    category: category
                })]
            }, () => {
                resolve()
            })
        })
    }

    dynamicValidate = async () => {
        const {username, password} = this.state
        await this.emptyErrors()
        if(username.length) {
            if(username.length < 4 || username.length > 20) {
                await this.addError("Username has to be between 4 and 20 characters long.", 'username')
            }
        }
        if(password.length) {
            if(password.length < 6 || password.length > 40) {
                await this.addError("Password has to be between 6 and 40 characters long.", 'password')
            }
        }

    }

    staticValidate = async () => {
        const {username, password} = this.state
        await this.emptyErrors()
        if(username.length < 4 || username.length > 20) {
            await this.addError("Username has to be between 4 and 20 characters long.", 'username')
        }
        if(password.length < 6 || password.length > 40) {
            await this.addError("Password has to be between 6 and 40 characters long.", 'password')
        }
        if(password.length === 0) {
            await this.addError("You must provide a password.", 'password')
        }
        if(username.length === 0) {
            await this.addError("You must provide a username.", 'username')
        }
    }

    getFormItems = () => {

        const {errors} = this.state

        return [
            {
                id: 0,
                type: 'text',
                name: 'username',
                msgs: errors.map(error => {
                    if(error.category === 'username') {return error.msg}
                    else {return null}
                }).filter(msg => {return msg !== null}) 
            },
            {
                id: 1,
                type: 'password',
                name: 'password',
                msgs: errors.map(error => {
                    if(error.category === 'password') {return error.msg}
                    else {return null}
                }).filter(msg => {return msg !== null})
            }
        ]
    }

    render() {

        return (
            <>
                <StyledTitle title={"Register"}/>
                <Form formItems={this.getFormItems()} onChange={this.changeHandler} onSubmit={this.submitHandler}/>
            </>
        )
    }
}