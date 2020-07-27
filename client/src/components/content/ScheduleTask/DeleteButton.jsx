import React from 'react'
import apis from '../../../api'

const DeleteButton = (props) => {

    const {load, backURL} = props
    
    const clickHandler = async (e) => {
        e.preventDefault()

        var path = window.location.pathname
        var id = path.substring(1, path.lastIndexOf('/'))
        await apis.deleteTask(id)
        .then(response => {
            console.log(response)
            if(response.data.includes('Success')) {
                window.location.href = `/${backURL}`
            } else {
                alert("Something went wrong. Try again later.")
            }
        })
    }

    return (
        <>
            {load &&
                <div className="col-3">
                    <button style={deleteStyle} onClick={clickHandler}>
                        <span>{`Delete`}</span>
                    </button>
                </div>
            }
        </>
    )
}

const deleteStyle = {
    backgroundColor: 'rgb(203,0,0, 0.75)'
}

export default DeleteButton