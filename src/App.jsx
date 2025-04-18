import { useState, useEffect, useMemo } from "react"
import './App.css'
import PoliticianCard from "./components/PoliticianCard"

const getData = async () => {
  const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
  const data = await response.json()
  return data
}

function App() {

  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await getData();
        setPoliticians(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })();
  }, [])

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const searchLower = search.toLowerCase();
      return (
        politician.name.toLowerCase().includes(searchLower) ||
        politician.biography.toLowerCase().includes(searchLower)
      );
    });
  }, [politicians, search]);

  return (
    <>
      <div className="container">
        <h2>Lista politici</h2>

        {/* Search bar */}
        <input
          type="text"
          value={search}
          placeholder="Cerca..."
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Politicians list */}
        <section className="list">
          <div className="cards-grid">
            {filteredPoliticians.map((politician) => (
              <PoliticianCard
                key={politician.id}
                name={politician.name}
                image={politician.image}
                position={politician.position}
                biography={politician.biography}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default App
