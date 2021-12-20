import './NewEventForm.css'
import React, { useState } from 'react';


// const handleChange = (e) => {
//     setTitle(e.target.value)
// }

const NewEventForm = () => {

const [title, setTitle] = useState('')
const [date, setDate] = useState('')

const resetForm = () => {
    setTitle('')
    setDate('')
}

    return ( 
        <form className="new-event-form">
            <label>
                <span>Event Title:</span>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <label>
                <span>Event Date:</span>
                <input 
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </label>
            <button>Submit</button>
            <p>Title - { title }, Date - { date }</p>
            <p onClick={ resetForm }>reset this form</p>
        </form>
    );
}
 
export default NewEventForm;