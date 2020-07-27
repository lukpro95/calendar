import React, {Component} from 'react'
import FormSegment from './FormSegment'
import Input from './Input'

export default class InsertTimeEnd extends Component {

    constructor(props) {
        super(props)

        this.state = {
            end: '',
            errors: []
        }

        this.timeout = null
    }

    validation = () => {
        const {end} = this.state
        var errors = []

        if(end.length === 0) {errors.push("You must provide an ending time.")}

        this.setState({errors: errors}, () => {
            if(this.state.errors.length > 0) {this.props.hasErrors('end', true)} 
            else {this.props.hasErrors('end', false)}
        })
    }

    changeHandler = (e) => {
        const {value} = e.target
        
        this.props.changeInput(e) 
        this.setState({end: value})

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {this.validation()}, 350)
    }

    componentDidMount = () => {
        this.setState({end: this.props.value})
    }

    render(){
        const {errors} = this.state
        const {value, load} = this.props
        return (
            <>
            {load &&
                <FormSegment outer={'col-6'}> 
                    <Input 
                        focus 
                        changeInput={this.changeHandler}
                        type={'time'} 
                        name={'taskTimeEnd'}
                        value={value || ''}
                        innerInfo={'Ending at: '}
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