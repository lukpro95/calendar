import React, { Component } from 'react'
import styled from 'styled-components'
import '../../styles/footer.css'

const Wrapper = styled.div.attrs({
    className: 'd-flex footer',
})``

export default class Footer extends Component {
    render() {
        return (
            <Wrapper>
                <div className="col-12 px-0 mx-auto text-center w-100">Copyright 2020 &copy; FriendlyCalendar</div>
            </Wrapper>
        )
    }
}
