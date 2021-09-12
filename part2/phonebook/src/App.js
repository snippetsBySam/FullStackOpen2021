import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InputForm = ({ text, value, onChange }) => {
  //console.log('inputform', onChange);
  return (
    <div>{text} <input value={value} onChange={onChange} /> </div>
  )
}

const Filter = ({ text,value, onChange }) => {
  //console.log('filter', onChange, 'text', text);
  return (    
    <InputForm text={text} value={value} onChange={onChange} />
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <InputForm text={props.nameText} value={props.person.name} onChange={props.onNameChange}/>
      <InputForm text={props.numberText} value={props.person.number} onChange={props.onNumberChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ people }) => {
   return (
     people.map(person => <div key={person.name}>{person.name} {person.number}</div>)
     )
}

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPersons = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  const handleNamechange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberchange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }
  const personsToShow = personFilter ? (persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text='filter shown with' value={personFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addPersons}
        person={{name: newName,
          number: newNumber}}
        nameText='name:'
        onNameChange={handleNamechange}
        numberText='number:'
        onNumberChange={handleNumberchange}
      />
      <h3>Numbers</h3>
      <Persons people={personsToShow}/>
    </div>
  )
}

export default App
