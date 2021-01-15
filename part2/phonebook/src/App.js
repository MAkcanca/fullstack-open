import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, onHandle}) => {
  return (
    <div>
      filter shown with <input 
      value={filter}
      onChange={onHandle} />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newPhone, handlePhoneChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange} />
      </div>
      <div>number: <input 
      value={newPhone}
      onChange={handlePhoneChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({phonesToShow}) => {
  return <div>{phonesToShow.map(person =><p key={person.name}>{person.name} {person.phone}</p>)}</div>
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObj = {
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewPhone('')
  }
  
  const phonesToShow = filter.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onHandle={handleFilterChange} filter={filter} />

      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons phonesToShow={phonesToShow} />
    </div>
  )
}

export default App
