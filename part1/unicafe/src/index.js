import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}
const ShowStatistic = ({statName, statVal}) => {
  return <p>{statName} {statVal}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseValue = (valueToIncrease, setValue) => {
    return () => setValue(valueToIncrease + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseValue(good, setGood)} text="good"/>
      <Button handleClick={increaseValue(neutral, setNeutral)} text="neutral"/>
      <Button handleClick={increaseValue(bad, setBad)} text="bad"/>
      <h1>statistics</h1>
      <ShowStatistic statName="good" statVal={good} />
      <ShowStatistic statName="neutral" statVal={neutral} />
      <ShowStatistic statName="bad" statVal={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
