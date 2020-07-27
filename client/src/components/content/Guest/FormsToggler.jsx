import React, { Component } from 'react'

export default class FormsToggler extends Component {

    constructor(props) {
        super(props)

        this.state = {
            elementOne: 'circleElement-active',
            elementTwo: ''
        }
    }

    changeOption = (e) => {
        if(!this.state.elementOne.length) {
            if(e.target.getAttribute('data-value') === '0') {
                this.setState({elementOne: 'circleElement-active', elementTwo: ''}, () => {
                    this.props.changeOption(0)
                })
            }
        }
        if(!this.state.elementTwo.length) {
            if(e.target.getAttribute('data-value') === '1') {
                this.setState({elementTwo: 'circleElement-active', elementOne: ''}, () => {
                    this.props.changeOption(1)
                })
            }
        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center mt-3 mb-3">
                <div data-value={0} onClick={this.changeOption} className={`circleElement ${this.state.elementOne} mr-4`}></div>
                <div data-value={1} onClick={this.changeOption} className={`circleElement ${this.state.elementTwo}`}></div>
            </div>
        )
    }
}
