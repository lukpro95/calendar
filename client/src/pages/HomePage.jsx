import React, { Component } from 'react'
import styled from 'styled-components'
import {UserMenu} from '../components'
import {GuestMenu} from '../components/content/Guest'

const Wrapper = styled.div.attrs({
    className: 'col-12 h-100'
})``

export default class HomePage extends Component {
    render() {
        const {isLogged} = this.props
        return (
            <Wrapper>
                {!isLogged &&
                    <GuestMenu loggedIn={this.props.loggedIn}/>
                }
                {isLogged &&
                    <UserMenu />
                }
            </Wrapper>
        )
    }
}
