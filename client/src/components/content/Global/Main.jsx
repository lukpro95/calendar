import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'row w-100 mx-0 justify-content-center'
})``

const Content = styled.div.attrs({
    className: 'col-11 mt-4'
})``

const Main = (props) => {
    return (
        <Wrapper>
            <Content>
                {props.children}
            </Content>
        </Wrapper>
    )
}

export default Main