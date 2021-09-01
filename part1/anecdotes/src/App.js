import React, { useState } from 'react'

// Button component
const Button = ({ text, action }) => {
  return(
    <div><button onClick={action}>{text}</button></div>
  )
}

// Header component
const Header = ({ text }) => <h1>{text}</h1>

// Display anecdote and vote
const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

// Winner component
const MostVotes = ({ anecdotes, votes}) => {
  const maxVotes = Math.max(...votes)
  if (maxVotes === 0) {
    return <div>There are no votes</div>
  }
  const winningAnecdote = votes.indexOf(maxVotes)
  return (
    <Anecdote text={anecdotes[winningAnecdote]} votes={maxVotes} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const numberOfAnecdotes = anecdotes.length

  const [selected, setSelected] = useState(0)
  //const [votes, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0})
  const [votes, setVote] = useState(Array(numberOfAnecdotes).fill(0))

  const randomAnectote = () => {
    setSelected(Math.floor(Math.random() * numberOfAnecdotes))
  }

  const addVote = () => {
    //const newVotes = {...votes, [selected]: votes[selected] + 1}
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVote(newVotes)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text='next anecdote' action={randomAnectote} />
      <Button text='vote' action={addVote} />
      <Header text='Anecdote with most votes' />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App