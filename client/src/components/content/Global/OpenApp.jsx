import React from 'react'

const OpenApp = (props) => {

    const {open} = props

    return (
        <div className="row h-100 w-100 justify-content-center align-items-center dive">
            <div onClick={open} className="my-auto mx-auto text-center diveBox">
                <h1>Dive In</h1>
            </div>
        </div>
    )
}

export default OpenApp