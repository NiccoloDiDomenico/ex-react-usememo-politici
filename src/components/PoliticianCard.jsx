function PoliticianCard({ name, image, position, biography }) {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p><strong>Position:</strong> {position}</p>
            <p>{biography}</p>
        </div>
    )
}

export default PoliticianCard