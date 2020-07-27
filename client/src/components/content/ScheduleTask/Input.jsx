import React from 'react'
import styled from 'styled-components'

const Styled = styled.input`
    ${props => props.innerInfo ?
        `&:before {
            content: '${props.innerInfo}';
            margin-right: 2rem;
        }
        width: 100%;
        `
        :
        `
        width: 100%;
        `
    }
`

const Input = props => {

    const {focus, innerInfo, changeInput, type, name, placeholder, min, max, value} = props

    return (
        <Styled 
            autoComplete="off" 
            autoFocus={focus} 
            innerInfo={innerInfo}
            onChange={changeInput} 
            type={type} 
            name={name}
            placeholder={placeholder}
            min={min}
            max={max}
            value={value}
        />
    )
}

export default Input