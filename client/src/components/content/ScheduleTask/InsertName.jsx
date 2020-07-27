import React, {Component} from 'react'
import FormSegment from './FormSegment'
import Input from './Input'

export default class InsertName extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            errors: []
        }

        this.timeout = null
    }

    validation = () => {
        const {name} = this.state
        var errors = []

        if(name.length < 4) {errors.push("Task name should be at least 4 characters long.")} 
        if(name.length > 15) {errors.push("Task name should not exceed 15 characters.")}

        this.setState({errors: errors}, () => {
            if(this.state.errors.length > 0) {this.props.hasErrors('name', true)} 
            else {this.props.hasErrors('name', false)}
        })
    }

    changeHandler = (e) => {
        this.props.changeInput(e) 
        this.setState({
            name: e.target.value
        })

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.validation()
        }, 350)
    }

    componentDidMount = () => {
        this.setState({name: this.props.value})
    }

    render(){
        const {errors} = this.state
        const {routine, value} = this.props
        return (
            <FormSegment outer={routine ? 'col-4 pr-3' : 'col-6 pr-3'}> 
                <Input 
                    focus 
                    changeInput={this.changeHandler}
                    type={'text'} 
                    name={`taskName`} 
                    value={value || ''}
                    placeholder={'Insert Name'}
                />
                {errors.length > 0 &&
                    <div className="show-error">{errors[0]}</div>
                }
            </FormSegment>
        )
    }
}