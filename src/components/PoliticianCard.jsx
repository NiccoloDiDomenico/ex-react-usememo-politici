import { memo } from 'react'

function PoliticianCard({ name, image, position, biography }) {
    console.log("Render card:", name);

    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p><strong>Position:</strong> {position}</p>
            <p>{biography}</p>
        </div>
    )
}

export default memo(PoliticianCard)