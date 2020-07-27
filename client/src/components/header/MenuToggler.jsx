import React, { Component } from 'react'
import PropsTypes from 'prop-types'

export default class MenuToggler extends Component {

    eventHandler = () => {
        this.props.toggler()
    }

    arrow = () => {
        return this.props.isHidden ? `right` : `left`
    }

    render() {
        return (
            <div className="text-right">
                <span onClick={this.eventHandler}><i className={`fa fa-arrow-circle-${this.arrow()} arrow`}></i></span>
            </div>
        )
    }
}

MenuToggler.propTypes = {
    isHidden: PropsTypes.bool.isRequired,
    toggler: PropsTypes.func.isRequired
}