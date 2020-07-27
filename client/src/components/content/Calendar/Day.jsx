import React from 'react'

export default function Day({tasks, day, month, year}) {

    const isToday = () => {
        if(
            new Date().getDate() === day &&
            new Date().getMonth() === month &&
            new Date().getFullYear() === year
        )       {return true}
        else    {return false}
    }

    const isTheTaskToday = (task) => {
        if (
            new Date(task.date).getDate() === day &&
            new Date(task.date).getMonth() === month &&
            new Date(task.date).getFullYear() === year
        )       {return true}
        else if (isRoutinedTaskToday(task))
                {return true}
        else    {return false}
    }

    const isRoutinedTaskToday = (task) => {
        if(task.repetition) {
            var thisDay = new Date(year, month, day)
            var taskDate = new Date(task.date)
            var daysDifference = (thisDay.getTime() - taskDate.getTime())/(1000*60*60*24)
            
            if((daysDifference.toFixed(0)*1) % task.repetition === 0 && daysDifference > 0) {
                return true
            }

        }
        else {return false}
    }

    const sortDisplayedText = () => {
        let taskCounter = 0
        return tasks.map(task => {
            if(isTheTaskToday(task)) {
                taskCounter++
                if(taskCounter < 3) {
                    return <div key={task.id}>{task.name}</div>
                } else if(taskCounter === 3) {
                    return <div key={task.id} className="text-muted">... see more</div>
                } else {
                    return ''
                }
            } else {
                return ''
            }
        })
    }

    return (
        <div>
            {isToday() && 
                <div>
                    <strong>Today</strong>
                </div>
            }
            <div>
                <em>
                    {sortDisplayedText()}
                </em>
            </div>
            <div className="text-right dayNumber">{day}</div>
        </div>
    )
}