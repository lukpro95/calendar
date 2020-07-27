import React, { Component } from 'react'
import {MenuToggler, MenuList, MenuLogOut} from '../../components'
import styled from 'styled-components'
import '../../styles/header.css'

const Wrapper = styled.div.attrs({
    className: 'py-3',
    id: 'header'
})``

export default class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isHidden: this.props.isHidden,
        }
    }

    toggle = () => {
        this.setState({isHidden: !this.state.isHidden})
        this.props.toggler()
    }

    render() {
        const {isHidden} = this.state
        return (
            <Wrapper className={isHidden ? '--hide' : ''}>
                <MenuToggler toggler={this.toggle} isHidden={isHidden}/>
                <MenuList isHidden={isHidden}/>
                <MenuLogOut isHidden={isHidden} loggedOut={this.props.loggedOut}/>
            </Wrapper>
        )
    }
}
