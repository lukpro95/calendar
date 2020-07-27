import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class MenuList extends Component {

    render() {
        return (
            <>
                {!this.props.isHidden && 
                    <>
                        <div className="d-flex justify-content-center mt-5 showElement">
                            <h1>Menu</h1>
                        </div>
                        <div className="d-flex justify-content-center showElement">
                            <hr />
                        </div>
                        <div className="justify-content-center showElement">
                            <div className="text-center mt-3 list">
                                <Link to={`/`}><p>Home Page</p></Link>
                                <Link to={`/calendar`}><p>Your Calendar</p></Link>
                                <Link to={`/new-task`}><p>Schedule New Task</p></Link>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}