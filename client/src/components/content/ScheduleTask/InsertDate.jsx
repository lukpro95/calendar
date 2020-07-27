import React, {Component} from 'react'
import FormSegment from './FormSegment'
import Input from './Input'

export default class InsertDate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: '',
            errors: []
        }

        this.timeout = null
    }

    validation = () => {
        const {date} = this.state
        var errors = []

        if(date.length === 0) {errors.push("You must provide a date.")} 

        this.setState({errors: errors}, () => {
            if(this.state.errors.length > 0) {this.props.hasErrors('date', true)} 
            else {this.props.hasErrors('date', false)}
        })
    }

    changeHandler = (e) => {
        const {value} = e.target
        
        this.props.changeInput(e) 
        this.setState({date: value})

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {this.validation()}, 350)
    }

    componentDidMount = () => {
        this.setState({name: this.props.value})
    }

    render(){
        const {errors} = this.state
        const {routine, value, load} = this.props
        return (
            <>
            {load &&
                <FormSegment outer={routine ? 'col-4 pr-3' : 'col-6'}> 
                    <Input 
                        focus 
                        changeInput={this.changeHandler}
                        type={'date'} 
                        name={'taskDate'} 
                        value={value || ''}
                        min={`${new Date().toISOString().split("T")[0]}`}
                        innerInfo={'Date: '}
                    />
                    {errors.length > 0 &&
                        <div className="show-error">{errors[0]}</div>
                    }
                </FormSegment>
            }
            </>
        )
    }
}