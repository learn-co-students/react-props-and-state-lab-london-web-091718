import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    // var lucy = {name: 'lucy'}

    // var instructors = {
    //   tcfs: {
    //     lucy,
    //     sam: {name: 'sam'}
    //   }
    // }

    // var copy = {...instructors}

    // copy.tcfs.lucy.name = "sam"

    // var stringVersion = JSON.stringify(instructors)

    // // "doudfsigsdfhgsdfj"

    // var unstringifiedVersion = JSON.parse(stringVersion)



    // function myfunc (object) {
    //   object.name = "sam"
    // }

    // myfunc(lucy)

    // lucy.name === "sam"

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  adoptPet = petToChange => {
    // const pets = [...this.state.pets]
    // const foundPet = pets.find(pet => pet.id === petToChange.id)
    // // const foundPetCopy = {...foundPet} shallow copy
    // const foundPetCopy = JSON.parse(JSON.stringify(foundPet))
    // foundPetCopy.isAdopted = true
    // const index = pets.indexOf(petToChange)
    // pets[index] = foundPetCopy
    // this.setState({ pets })

    this.setState({
      pets: this.state.pets.map(pet => {
        if (pet.id === petToChange.id) {
          pet.isAdopted = true
        }
        return pet
      })
    })
  }

  updateFilter  = newfilter => {
    this.setState({
      filters: {type: newfilter}
    })
  }

  getPets = () => {
    const {type} = this.state.filters 
    const url = this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
    
    fetch(url)
    .then(resp => resp.json())
    .then(pets => this.setState({ pets }))
  }



  render() {
    const {updateFilter, getPets} = this
    const {pets, filters} = this.state
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
              <PetBrowser pets={ pets } adoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
