import React, { Component } from 'react'
import styled from 'styled-components'
import {Header, Footer, HomePage, Calendar, ScheduleNewTask, Day, EditTask} from '../pages'
import {Route} from 'react-router-dom'
import {Loading, Main} from '../components/content/Global'

const Wrapper = styled.div.attrs({
    className: 'row h-100 w-100 m-0 justify-content-center align-items-center content'
})``

const Content = styled.div.attrs({
    className: 'content'
})``

export default class Context extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 750)
    }

    render() {
        const {isLoading} = this.state
        return (
            <>
            {!isLoading &&
                <div>
                    <Header isHidden={this.props.isHidden} toggler={this.props.toggler} loggedOut={this.props.loggedOut} />
                    
                    <Content isHidden={this.props.isMenuHidden} className={this.props.isHidden ? '--expand' : ''}>
                        <Route exact path="/" render={(props) => (
                            <HomePage {...props} isLogged={this.props.isLogged}/>
                        )}/>
                        <Route exact path="/calendar" component={Calendar} />
                        <Route exact path="/:year-:month-:day" component={Day} />
                        <Route exact path="/:taskId/edit" component={EditTask} />
                        <Route exact path="/new-task" component={ScheduleNewTask} />
                    </Content>
    
                    <Footer/>
                </div>
            }
            {isLoading && 
                <Wrapper>
                <Content className={this.props.isHidden ? '--expand' : ''}>
                    <Loading text={"Loading User Components..."}/>
                </Content>
                </Wrapper>
            }
            </>
        )
    }
}
