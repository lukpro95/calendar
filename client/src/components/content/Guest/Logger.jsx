import React, { Component } from 'react'
import {StyledTitle} from '../Global'
import {Form} from './'
import apis from '../../../api'

export default class Logger extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errors: []
        }

        this.timeout = null

    }

    submitHandler = async (e) => {
        this.staticValidate()
        .then(async () => {
            const {username, password, errors} = this.state
            if(!errors.length) {
                await apis.logIn({username, password})
                .then((response) => {
                    console.log(response)
                    if(response.data.includes("Invalid")) {
                        this.setState({errors: errors.concat({
                            msg: "Invalid username / password.",
                            category: 'global'
                        })})
                    }
                    if(response.data.includes("Thanks")) {
                        alert("Logged In!")
                        this.props.loggedIn()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        })
    }

    changeHandler = (e) => {
        clearTimeout(this.timeout)
        this.setState({[e.target.name]: e.target.value})
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

    staticValidate = () => {
        return new Promise (async resolve => {
            const {username, password} = this.state
            await this.emptyErrors()
            if(password.length === 0) {
                await this.addError("Please enter your password.", 'password')
            }
            if(username.length === 0) {
                await this.addError("Please enter your username.", 'username')
            }
            resolve()
        })
    }

    render() {

        const items = [
            {
                id: 0,
                type: 'text',
                name: 'username',
                msgs: this.state.errors.map(error => {
                    if(error.category === 'username') {return error.msg}
                    else {return null}
                }).filter(msg => {return msg !== null}) 
            },
            {
                id: 1,
                type: 'password',
                name: 'password',
                msgs: this.state.errors.map(error => {
                    if(error.category === 'password') {return error.msg}
                    else {return null}
                }).filter(msg => {return msg !== null})
            }
        ]

        return (
            <>
                <StyledTitle title={"Log In"}/>
                <Form formItems={items} onChange={this.changeHandler} onSubmit={this.submitHandler}/>
            </>
        )
    }
}