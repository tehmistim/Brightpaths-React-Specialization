import React from 'react';
import styles from './EventList.module.css';
//this imports the css module for the element we want to use it for, hince just to each event in this component.  NOTE that we cannot use React.Fragment for adding styles to an element.  We must use the div tag in place.

const EventList = ({ events, handleClick }) => {
    return ( 
         <div>
             {events.map((event, index) => (
          <div className={styles.card} key={event.id}>
            <h3>{ index } - { event.title }</h3>
            <button onClick={ () => {handleClick(event.id)} }>delete event</button>
          </div>
      ))}
         </div>
    );
}
 
export default EventList;