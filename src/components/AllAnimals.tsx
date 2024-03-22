import React from 'react'
import Animal from "./AnimalCard"

function AllAnimals (){
    const [animals, setAnimals] = React.useState (null)
React.useEffect(()=>{
    async function fetchAnimals(){
      const resp = await fetch('/api/animals')
      const data = await resp.json()
      console.log(data)
      setAnimals(data)
    }
    fetchAnimals()
  }, [])

  console.log(animals)

    return<section className="section">
        <div className="container">
            <div className="columns is-multiline">
                {animals?.map(animal =>{
                    return <Animal
                    key={animal._id}
                    {...animal}
                    />
                })}
            </div>
        </div>
   
    </section>

}

export default AllAnimals