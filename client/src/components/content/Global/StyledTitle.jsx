import React from 'react'

const StyledTitle = (props) => {

    const {title} = props

    return (
        <div className="mt-2 mb-4 mx-auto row justify-content-center align-items-center">
            <div className="col-4" style={inside}><h1 style={styledText}>{title}</h1></div>
            <div className="col-12"><hr style={line} /></div>
        </div>
    )
}

export default StyledTitle

const inside = {
    overflowWrap: 'break-word'
}

const styledText = {
    color: 'rgb(53,80,168, 70%)',
    textAlign: 'center',
    fontSize: '3vw',
    width: '100%',
    boxSizing: 'border-box',
}

const line = {
    border: 'solid 2px rgb(53,80,168, 30%)',
    borderRadius: '50%'
}