import React from 'react'
import Table from './Table'
import {Link} from 'react-router-dom'
import Day from './Day'

export default function Days({tasks, date}) {

    const {month, year, numberOfDays} = date

    const translateToName = (number) => {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days.filter(day => days.indexOf(day) === number)[0]
    }

    const bufferData = () => {

        var weeks = []
        var weekArray = []

        for(var day = 1; day <= numberOfDays; day ++) {
            var name = translateToName(new Date(year, month, day).getDay())

            weekArray = {...weekArray, [name]: day}

            if(name === 'Sunday' && day !== numberOfDays){
                weeks.push(weekArray)
                weekArray = []
            }

            if(day === numberOfDays) {
                weeks.push(weekArray)
                weekArray = []
            }
        }

        return weeks
    }

    return (
        <div>
            <Table data={bufferData()} columns={columns} month={month} year={year} tasks={tasks}/>
        </div>
    )

}

function digitsFiller(dateFragment) {
    if(dateFragment < 10) {return `0${dateFragment}`} 
    else {return dateFragment}
}

function checkDay(props) {
    const {year, month, cell, tasks} = props
    return (
        <Link to={`/${year}-${digitsFiller(month+1)}-${digitsFiller(cell.value)}`}>
            <Day day={cell.value} month={month} year={year} tasks={tasks || []} />
        </Link>
    )    
}

const columns = [
    { 
        Header: 'Monday', accessor: 'Monday', 
        Cell: function(props) {return checkDay(props)}
    },
    { 
        Header: 'Tuesday', accessor: 'Tuesday', 
        Cell: function(props) {return checkDay(props)}
    },
    { 
        Header: 'Wednesday', accessor: 'Wednesday', 
        Cell: function(props) {return checkDay(props)}
    },
    { 
        Header: 'Thursday', accessor: 'Thursday', 
        Cell: function(props) {return checkDay(props)}
    },
    { 
        Header: 'Friday', accessor: 'Friday', 
        Cell: function(props) {return checkDay(props)}
    },
    { 
        Header: 'Saturday', accessor: 'Saturday', 
        Cell: function(props) {return checkDay(props)}
    },
    { 
        Header: 'Sunday', accessor: 'Sunday', 
        Cell: function(props) {return checkDay(props)}
    },
]