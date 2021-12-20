import './App.css';
import React from 'react';
import { useState } from 'react';
import Title from './components/Title';
import Modal from './components/Modal';
import EventList from './components/EventList';
import NewEventForm from './components/NewEventForm';


function App() {
  const [showModal, setShowModal] = useState(false)
  const [showEvents, setShowEvents] = useState(true)
  const [events, setEvents] = useState([])

  const addEvent = (event) => {
    setEvents((prevEvents) => {
      return [...prevEvents, event]
    })
    //takes the current events, spreads them into the new array of events
    setShowModal(false)

  }

  const handleClick = (id) => {
    
      setEvents((prevEvents) => {
        return prevEvents.filter((event) => {
          return id !== event.id
        })
      })
    console.log(id)
  }

  // const handleClose = () => {
  //   setShowModal(false)
  // }

  const subtitle = "Happening now!"

  return (
    <div className="App">
      <Title title="Events on the dark side of the moon" subtitle={subtitle}/>

        { showEvents && (
          //showEvents logic to hide the hide events button when events are shown
            <div>
            <button onClick={() => {setShowEvents(false)}}>Hide Events</button>
            </div>
        )}
        { !showEvents && (
          //showEvents logic to hide show events button when events are shown
            <div>
              <button onClick={() => {setShowEvents(true)}}>Show Events</button>
            </div>
        )}
        { showEvents && <EventList events={events} handleClick={handleClick}/> }

      {/* <Modal>
            <h2>WELCOME TO THE MOON</h2>
                <p>There are two sides to this rock</p>
                <p>The dark-side,</p>
                <p>and the Light.</p>
       </Modal>  */}
       {showModal && <Modal isWarningModal={ false }>
        <NewEventForm addEvent={addEvent} />
       </Modal>}
       <br />
       <br />
       <br />

       <div>
         <button onClick={() => setShowModal(true)}>Add Event</button>
         <br />
         <button onClick={() => setShowModal(true)}>Modal</button>

       </div>

    </div>
  );
}

export default App;

// cannot use fragments when a prop is being used like in like 45.  You have to use React.Fragment to open and close tagging.