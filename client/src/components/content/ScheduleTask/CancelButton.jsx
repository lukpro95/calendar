import React from 'react'

const CancelButton = (props) => {

    const {load, backURL} = props
    
    const clickHandler = (e) => {
        e.preventDefault()
        window.location.href = `/${backURL}`
    }

    return (
        <>
            {load &&
                <div className="w-100 mr-3">
                    <button style={cancel} onClick={clickHandler}>
                        <span>{`Cancel`}</span>
                    </button>
                </div>
            }
        </>
    )
}

const cancel = {
    backgroundColor: 'rgb(33,33,33, 0.75)'
}

export default CancelButton