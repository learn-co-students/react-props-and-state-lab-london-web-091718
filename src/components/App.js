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
    const foundPetCopy = JSON.parse(JSON.stringify(foundPet))
    foundPetCopy.isAdopted = true
    const index = pets.indexOf(petToChange)
    pets[index] = foundPetCopy
    this.setState({ pets})
  }

  updateFilter = newFilter => {
    this.setState({ filters: { type: newFilter }})
  }

  getPets = () => {
    const type = this.state.filters.type
    const url = type === 'all'?
    '/api/pets':
    `/api/pets?type=${type}`


    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets }))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters updateFilter={this.updateFilter}
              getPets= {this.getPets} />
            </div>
            <div className="twe{lve wide column">
              <PetBrowser adoptPet={this.adoptPet} pets= {this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
