import React from 'react'
import styled from 'styled-components'

const OuterSegment = styled.div.attrs({
    className: `moving-content h-50 px-0`,
})``

const InnerSegment = styled.div.attrs({
    className: `box shadow`
})``

const FormSegment = props => {

    const {outer, children} = props

    return (
        <OuterSegment className={outer}>
            <InnerSegment>
                {children}
            </InnerSegment>
        </OuterSegment>
    )
}

export default FormSegment