import React, { Component } from 'react'
import {Registry, Logger, FormsToggler} from './'
import {Loading} from '../Global'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'row h-100 w-100 m-0 justify-content-center align-items-center'
})``

const Content = styled.div.attrs({
    className: 'col-6 text-center box shadow'
})``

export default class GuestMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            elementActive: 0,
            isLoading: true
        }
    }

    eventHandler = (elementToActivate) => {
        this.setState({elementActive: elementToActivate})
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 750)
    }

    render() {
        const {elementActive, isLoading} = this.state
        return (
            <Wrapper>
                {isLoading && 
                    <Loading text="Loading Menu.."/>
                }
                {!isLoading &&
                    <Content>
                        {elementActive === 0 &&
                            <Logger loggedIn={this.props.loggedIn}/>
                        }
                        {elementActive === 1 &&
                            <Registry/>
                        }
                            <FormsToggler changeOption={this.eventHandler}/>
                    </Content>
                }
            </Wrapper>
        )
    }
}