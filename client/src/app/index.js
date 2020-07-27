import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Header, Footer, HomePage, Calendar, ScheduleNewTask, Day, EditTask} from '../pages'
import Context from '../pages/Context'
import {OpenApp} from '../components/content/Global'
import styled from 'styled-components'
import 'bootstrap-4-react'
import apis from '../api'

const Container = styled.div.attrs({
    className: 'container-fluid p-0'
})``

const Content = styled.div.attrs({
    className: 'content'
})``

const GuestContent = styled.div.attrs({
    className: 'guestContent'
})``

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            isMenuHidden: true,
            isLoading: true,
            isLogged: false,
        }
    }

    openApp = () => {
        this.setState({isOpen: true})
        sessionStorage.setItem('isAppOpen', 'true')
    }

    toggleMenu = () => {
        this.setState({isMenuHidden: !this.state.isMenuHidden})
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 300)

        if(sessionStorage.getItem('isAppOpen')) {
            this.setState({isOpen: true})
        } else {
            this.setState({isOpen: false})
        }

        await apis.getLoggedStatus()
        .then((res) => {
            if(res.data) {
                this.loggedIn()
            }
        })
    }
    
    loggedOut = () => {
        this.setState({isLogged: false, isMenuHidden: true})
    }

    loggedIn = () => {
        this.setState({isLogged: true})
    }

    render() {
        const {isMenuHidden, isOpen, isLoading, isLogged} = this.state
        
        return (
            <>
            {!isLoading &&
                <Container>
                    <Router>
                        {!isOpen &&
                            <OpenApp open={this.openApp} />
                        }
                        {isOpen &&
                            <>
                            {isLogged &&
                                <Context isHidden={isMenuHidden} isLogged={isLogged} loggedOut={this.loggedOut} toggler={this.toggleMenu}/>
                            }
                            {!isLogged &&
                                <>
                                    <GuestContent>
                                        <Route exact path="/" render={(props) => (
                                            <HomePage {...props} loggedIn={this.loggedIn} isLogged={isLogged}/>
                                        )}/>
                                    </GuestContent>

                                    <Footer />
                                </>
                            }
                            </>
                        }
                    </Router>
                </Container>
            }
            </>
        )
    }
}
