import './NewEventForm.css'
import React, { useState } from 'react';


// const handleChange = (e) => {
//     setTitle(e.target.value)
// }

const NewEventForm = ({ addEvent }) => {

const [title, setTitle] = useState('')
const [date, setDate] = useState('')
const [location, setLocation] = useState('Dark Side of the Moon')


const resetForm = () => {
    setTitle('')
    setDate('')
    setLocation('Dark Side of the Moon')
}

const handleSubmit = (e) => {
    e.preventDefault()
    //prevents page refresh

    const event = {
        title: title,
        date: date,
        location: location,
        id: Math.floor(Math.random() * 10000)
        //generates a random ID number
    }
    // console.log(event)
    addEvent(event)
    resetForm()    
    
    console.log(event)

}

    return ( 
        <form className="new-event-form" onSubmit={handleSubmit}>
            <label>
                <span>Event Title:</span>
                <input required
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <label>
                <span>Event Date:</span>
                <input required
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </label>
            <label>
                <span>
                    Event Location:
                </span>
                <select onChange={(e) => setLocation(e.target.value)}>
                    <option value="Dark side of the Moon">Dark Side of the Moon</option>
                    <option value="The Light">The Light</option>
                    <option value="Hover Orbit Around">Hover Orbital Position</option>
                    <option value="Planet-side">Planet-Side</option>
                </select>
            </label>
            <button>Submit</button>
            {/* <p>Title - { title }, Date - { date }</p>
            <p onClick={ resetForm }>reset this form</p> */}
            
        </form>
    );
}
 
export default NewEventForm;