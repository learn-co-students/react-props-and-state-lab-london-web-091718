import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  adoptPet = petToChange => {
    const pets = [...this.state.pets]
    const foundPet = pets.find(pet => pet.id === petToChange.id)
    const foundPetCopy = JSON.parse(JSON.stringify(foundPet))  // making a deep copy by turning it to json and then back again   shallow copy: {...foundPet}
    foundPetCopy.isAdopted = true
    const index = pets.indexOf(petToChange)
    pets[index] = foundPetCopy  // reasining old pet with new pet
    this.setState({ pets })
  }

  updateFilter = newFilter => {
    this.setState({
      filters: {type: newFilter}
    })
  }

  getPets = async () => {
    const { type } = this.state.filters
    const url = type === 'all' ?
      '/api/pets' :
      `/api/pets?type=${type}`

    const response = await fetch(url)
    const pets = await response.json()
    this.setState({ pets })
  }

  render() {
    const { updateFilter, getPets, adoptPet } = this
    const { pets } = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters updateFilter={updateFilter} getPets={getPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={pets} adoptPet={adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
