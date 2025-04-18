import { useState, useEffect } from "react"
import './App.css'
import PoliticianCard from "./components/PoliticianCard"

const getData = async () => {
  const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
  const data = await response.json()
  return data
}

function App() {

  const [politicians, setPoliticians] = useState([]);

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

  return (
    <>
      <div className="container">
        <h1>Lista politici</h1>
        <div className="cards-grid">
          {politicians.map((politician) => (
            <PoliticianCard
              key={politician.id}
              name={politician.name}
              image={politician.image}
              position={politician.position}
              biography={politician.biography}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
