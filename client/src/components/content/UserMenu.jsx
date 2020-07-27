import React, { Component } from 'react'
import styled from 'styled-components'
import cookie from 'js-cookie'
import {Main} from '../content/Global'

const Float = styled.div.attrs({
    className: `box shadow moving-content`,
})``

export default class UserMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: cookie.get('username')
        }
    }

    render() {
        const { username } = this.state
        return (
            <Main>
                <Float className="col-4">
                    <h2 className="text-center">Welcome <strong>{username}</strong>!</h2>
                </Float>
                <Float className="col-12 px-3 py-2" style={coloredText}>
                    You can navigate through the application by expanding Menu on the left of your screen. 
                    Simply click on the arrow in the upper left corner to see your options.
                    <div>Have a good day!</div>
                </Float>
            </Main>
        )
    }
}

const coloredText = {
    color: 'rgba(47, 88, 202, 0.844)',
}