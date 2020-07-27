import React, {Component} from 'react'
import FormSegment from './FormSegment'
import Input from './Input'

export default class InsertTimeEnd extends Component {

    constructor(props) {
        super(props)

        this.state = {
            start: '',
            errors: []
        }

        this.timeout = null
    }

    validation = () => {
        const {start} = this.state
        var errors = []

        if(start.length === 0) {errors.push("You must provide a starting time.")}

        this.setState({errors: errors}, () => {
            if(this.state.errors.length > 0) {this.props.hasErrors('start', true)} 
            else {this.props.hasErrors('start', false)}
        })
    }

    changeHandler = (e) => {
        const {value} = e.target
        
        this.props.changeInput(e) 
        this.setState({start: value})

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {this.validation()}, 350)
    }

    componentDidMount = () => {
        this.setState({start: this.props.value})
    }

    render(){
        const {errors} = this.state
        const {value, load} = this.props
        return (
            <>
            {load &&
                <FormSegment outer={'col-6 pr-3'}> 
                    <Input 
                        focus 
                        changeInput={this.changeHandler}
                        type={'time'} 
                        name={'taskTimeStart'}
                        value={value || ''}
                        innerInfo={'Starting at: '}
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