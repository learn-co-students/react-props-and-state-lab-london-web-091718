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

  onChangeType = newFilter => {
    this.setState({
      filters: {type: newFilter}
    })
  }

  onFindPetsClick = () => {
    const { type } = this.state.filters
    const url = type === 'all' ? '/api/pets' : `/api/pets?type=${type}`
    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({pets}))
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map(pet => pet.id === id ? {...pet, isAdopted:true} : pet)
    this.setState({pets})
  }


  render() {
    const { onChangeType, onFindPetsClick, onAdoptPet } = this
    const { pets } = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
