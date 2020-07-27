import React, {Component} from 'react'
import FormSegment from './FormSegment'
import Input from './Input'

export default class InsertRepetition extends Component {

    constructor(props) {
        super(props)

        this.state = {
            repetition: '',
            errors: []
        }

        this.timeout = null
    }

    validation = () => {
        const {repetition} = this.state
        var errors = []

        if(repetition.length === 0) {errors.push("You must provide an interval number [days].")}

        this.setState({errors: errors}, () => {
            if(this.state.errors.length > 0) {this.props.hasErrors('repetition', true)} 
            else {this.props.hasErrors('repetition', false)}
        })
    }

    changeHandler = (e) => {
        const {value} = e.target
        
        this.props.changeInput(e) 
        this.setState({repetition: value})

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {this.validation()}, 350)
    }

    componentDidMount = () => {
        this.setState({repetition: this.props.value})
    }

    render(){
        const {errors} = this.state
        const {value, load} = this.props
        return (
            <>
            {load &&
                <FormSegment outer={'col-4'}> 
                    <Input 
                        focus 
                        changeInput={this.changeHandler}
                        type={'number'} 
                        name={'taskRepetition'}
                        value={value || ''}
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