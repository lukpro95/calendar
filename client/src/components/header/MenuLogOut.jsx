import React, { Component } from 'react'
import {logOut} from '../../api'

export default class MenuLogOut extends Component {

    logOut = async () => {
        await logOut()
        .then(res => {
            if(res.data.includes("Success")) {
                this.props.loggedOut()
            } else {

            }
        })
        .catch()
    }

    render() {
        return (
            <div className="buttonContainer">
                {!this.props.isHidden &&
                    <button onClick={this.logOut} className="showElement">Log Out</button>
                }
            </div>
        )
    }
}
