import React, { Component } from 'react'
import '../../../styles/guestform.css'

export default class Form extends Component {

    submitHandler = (e) => {
        e.preventDefault()
        this.props.onSubmit(e)
    }

    changeHandler = (e) => {
        this.props.onChange(e)
    }

    capitalise = (word) => {
        return word.replace(word.substring(0, 1), word.substring(0, 1).toUpperCase())
    }

    render() {
        const formItems = this.props.formItems
        return (
            <div className="row h-100 w-100 mx-auto my-auto justify-content-center align-items-center">
                <form onSubmit={this.submitHandler} className="w-50" action="">

                    {formItems.map(item => (
                        <div key={formItems.indexOf(item)}>

                            {item.msgs.length ? 
                                <div className="alert alert-danger my-2 showAlert" style={{marginBottom: '-1px !important'}}>
                                    {item.msgs.map(msg => (<div key={item.msgs.indexOf(msg)}>{msg}</div>))}
                                </div>
                                :
                                <></>
                            }

                            <input 
                                key={item.id}
                                className="d-block w-100 mb-3" 
                                type={item.type} 
                                name={item.name} 
                                value={item.value} 
                                placeholder={this.capitalise(item.name)}
                                autoComplete="off"
                                onChange={this.changeHandler}
                            />

                        </div>
                    ))}

                    <button onSubmit={this.submitHandler}>Submit</button>

                </form>
            </div>
        )
    }
}