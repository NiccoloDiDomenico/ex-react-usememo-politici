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
  const [selectedPosition, setSelectedPosition] = useState("");

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
    return politicians.filter((p) => {
      const searchLower = search.toLowerCase();

      const matchesSearch =
        p.name.toLowerCase().includes(searchLower) ||
        p.biography.toLowerCase().includes(searchLower)

      const matchesPosition =
        selectedPosition === 'all' ||
        selectedPosition === p.position

      return matchesSearch && matchesPosition
    });
  }, [politicians, search, selectedPosition]);

  const positions = useMemo(() => {
    return politicians.reduce((acc, p) => {
      if (!acc.includes(p.position)) {
        acc.push(p.position)
      }
      return acc
    }, []);
  }, [politicians])

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

        {/* Selected bar */}
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="all">Tutte le posizioni</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>
              {position}
            </option>
          ))}
        </select>

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
