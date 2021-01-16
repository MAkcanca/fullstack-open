import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({ message }) => {
  if (message == null) {
    return null
  }

  return (
    <div className={message.isError ? "error" : "success"}>
      {message.content}
    </div>
  )
}

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

const Persons = ({phonesToShow, handleDelete}) => {
  return <div>{phonesToShow.map(person =><p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> </p>)}</div>
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
    const personObj = {
      name: newName,
      number: newPhone
    }

    if(person !== undefined) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with the new one?`)){
        updatePerson(person.id, personObj)
        return
      } else {
        return
      }
    }
    personService
      .create(personObj)
      .then(response => {
        createNotification(`Added ${personObj.name}`)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
  }

  const createNotification = (message, isError=false) => {
    const msgObj = {
      content: message,
      isError: isError
    }
    setNotificationMessage(msgObj)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }
  

  const updatePerson = (id, newObject) => {
    personService
      .update(id, newObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        createNotification(`${newObject.name} was already edited in server`, true)
      })
  }
  

  const delPerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}`)){
      personService
        .deleteEntry(id)
        .then(_ => setPersons(persons.filter(n => n.id !== id)))
        .catch(error => {
          createNotification(`${person.name} was already deleted from server`, true)
        })
    }
  }
  
  
  const phonesToShow = filter.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter onHandle={handleFilterChange} filter={filter} />

      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons phonesToShow={phonesToShow} handleDelete={delPerson}/>
    </div>
  )
}

export default App
