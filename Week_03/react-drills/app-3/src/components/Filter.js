import React from 'react';

export default function Filter() {

    const names = ['tim', 'beemer', 'porsche', 'daravy', 'katie', 'kimmy', 'paul', 'peter']

    return (
        <div>
            {names.filter(name => name.includes('')).map(filteredName => (
                <li>
                {filteredName}
                </li>
            ))}
        </div>
    )
}
