import React from 'react'

const SubmitButton = (props) => {

    const {load} = props

    return (
        <>
            {load &&
                <div className="w-100">
                    <button>
                        <span>{`Submit`}</span>
                    </button>
                </div>
            }
        </>
    )
}

export default SubmitButton