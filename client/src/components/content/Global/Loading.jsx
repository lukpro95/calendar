import React, { Component } from 'react'
import looper from '../../../looper.svg'

export default class Loading extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="mb-5 loading-text box"><strong>{this.props.text}</strong></div>
                <div>
                    <img src={looper} alt="" />
                </div>
            </div>
        )
    }
}
