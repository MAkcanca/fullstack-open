import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ text, votes=0 }) => {
  return (
    <div>    
      <div>
        {text}
      </div>
      <div>
        has {votes} votes
      </div>
    </div>    
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))
  const [highestPoint, setHighestPoint] = useState(0)

  const handleNext = () => {
    let random = Math.floor(Math.random() * props.anecdotes.length)
    while (random === selected) {
      random = Math.floor(Math.random() * props.anecdotes.length)
    }
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    if (!points[highestPoint] || points[selected] + 1 > points[highestPoint] ) {
      setHighestPoint(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        text={props.anecdotes[selected]}
        votes={points[selected]}
      />
      <button onClick={handleVote}>vote</button><button onClick={handleNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote
        text={props.anecdotes[highestPoint]}
        votes={points[highestPoint]}
      />
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
