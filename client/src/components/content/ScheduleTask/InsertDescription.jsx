import React from 'react'
import FormSegment from './FormSegment'
import Input from './Input'

const InsertDescription = props => {

    const {changeInput, load, value} = props

    return (
        <>
        {load &&
            <FormSegment outer={'col-12'}> 
                <Input 
                    focus 
                    changeInput={changeInput}
                    type={'text'} 
                    name={'taskDescription'} 
                    value={value || ''}
                    placeholder={"Insert some description to your new task."}
                />
            </FormSegment>
        }
        </>
    )
}

export default InsertDescription