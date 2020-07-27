import React, { Component } from 'react'
import {CalendarSheet} from '../components/content/Calendar'
import styled from 'styled-components'
import '../styles/calendar.css'
import OverflowAnimation from '../components/content/Global/OverflowAnimation'

const Wrapper = styled.div.attrs({
    className: 'row w-100 m-0 justify-content-center'
})``

export default class Calendar extends Component {

    componentDidMount = () => {
        OverflowAnimation()
    }

    render() {
        return (
            <Wrapper>
                <CalendarSheet />
            </Wrapper>
        )
    }
}