// import { useState, useEffect, useCallback } from 'react';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

// styles
import './TripList.css';

export default function TripList() {
    // const [trips, setTrips] = useState([])
    const [url, setUrl] = useState('http://localhost:3000/trips')
    const { data: trips, isPending, error } = useFetch(url, { type: 'GET' })

    // const fetchTrips = useCallback(async () => {
    //     const response = await fetch(url)
    //     const json = await response.json()
    //     setTrips(json)
    // }, [url])
    // //without having a destination for the loop to stop at it will trigger a listing of the array over and over and over again.

    //     useEffect(() => {
    //         fetchTrips()
    //     }, [fetchTrips])
    //     //using fetch above with a function to use over again elsewhere

    // // useEffect(() => {
    // //     fetch(url)
    // //         .then(response => response.json())
    // //         .then(json => setTrips(json))
    // // }, [url])
    // // //usual way to fetch data without a function

    // console.log(trips)

    //Above commented out because we created a useFetch custom hook in the hooks folder

    return (
        <div className="trip-list">
            <h2>Trip List</h2>
            {isPending && <div>Loading Trips...</div>}
            {error && <div>{error}</div>}
            <ul>
                {trips && trips.map(trip => (
                    <li key={ trip.id }>
                        <h3>{ trip.title }</h3>
                        <p>{ trip.price }</p>
                    </li>
                ))}
            </ul>
            <div className="filters">
                <button onClick={()=> setUrl('http://localhost:3000/trips?loc=europe')}>
                    Eurpoean Trips
                </button>
                <button onClick={()=> setUrl('http://localhost:3000/trips')}>
                    All Trips
                </button>
            </div>
        </div>
    )
}
