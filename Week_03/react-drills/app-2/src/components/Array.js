import React from 'react'

export default function array() {

    const people = [

        { name: 'tim' },
        { name: 'beemer' },
        { name: 'porsche' },
        { name: 'daravy' },
        { name: 'katie' }

    ];


    return (
        <div>

            {people.map(person => (

                <p>{ person.name }</p>

            ))}

        </div>
    )
}
