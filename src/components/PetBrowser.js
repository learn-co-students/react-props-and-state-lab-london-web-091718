import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    const { pets } = this.props
    return <div className="ui cards">
      {pets.map(pet =>
       < Pet clickHandler={() => this.props.adoptPet(pet)} pet={pet}/>)}
    </div>
  }
}

export default PetBrowser
