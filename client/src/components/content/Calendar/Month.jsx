import React, { Component } from 'react'

export default class Mont extends Component {

    getPreviousMonth = () => {
        const {month} = this.props

        var prevMonth

        if(month === 0) {
            prevMonth = months.filter(theMonth => theMonth.id === month+11)
        } else {
            prevMonth = months.filter(theMonth => theMonth.id === month-1)
        }

        this.props.month(prevMonth)
    }

    getNextMonth = () => {
        const {month} = this.props

        var nextMonth

        if(month === 0) {
            nextMonth = months.filter(theMonth => {
                if(theMonth.id === month-11) {return theMonth.id} else return 0
            })
        } else {
            nextMonth = months.filter(theMonth => {
                if(theMonth.id === month+1) {return theMonth.id} else return 0
            })
        }
        
        this.props.month(nextMonth)
    }

    getNameOfMonth = (number) => {
        return months[number+1].name
    }

    render() {
        const {year, month, prevMonth, nextMonth} = this.props
        return (
            <div className="d-flex justify-content-around align-items-center mb-3">
                <button onClick={prevMonth} className="prevM"><i className="mr-3 fa fa-angle-left">
                    </i> {this.getNameOfMonth(month-1)}
                </button>

                <h1>{this.getNameOfMonth(month)} {year}</h1>

                <button onClick={nextMonth} className="nextM">{this.getNameOfMonth(month+1)}
                    <i className="my-auto ml-3 fa fa-angle-right"></i>
                </button>
            </div> 
        )
    }
}

const months = [
    {id: -1, name: "December"},
    {id: 0, name: 'January'}, 
    {id: 1, name: 'February'}, 
    {id: 2, name: 'March'},
    {id: 3, name: 'April'}, 
    {id: 4, name: 'May'}, 
    {id: 5, name: 'June'},
    {id: 6, name: 'July'}, 
    {id: 7, name: 'August'}, 
    {id: 8, name: 'September'}, 
    {id: 9, name: 'October'}, 
    {id: 10, name: 'November'},
    {id: 11, name: 'December'},
    {id: 12, name: 'January'}
]