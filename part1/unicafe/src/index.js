import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}
const ShowStatistic = ({statName, statVal}) => {
  return (
  <tr>
    <td>{statName}</td>
    <td>{statVal}</td>
  </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseValue = (valueToIncrease, setValue) => {
    return () => setValue(valueToIncrease + 1)
  }

  const getAverage = () => {
    return ((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad) ) || 0
  }

  const getPosPercentage = () => {
    return (good / (good + neutral + bad)) * 100 || 0
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseValue(good, setGood)} text="good"/>
      <Button handleClick={increaseValue(neutral, setNeutral)} text="neutral"/>
      <Button handleClick={increaseValue(bad, setBad)} text="bad"/>
      <h1>statistics</h1>
      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
          <ShowStatistic statName="good" statVal={good} />
          <ShowStatistic statName="neutral" statVal={neutral} />
          <ShowStatistic statName="bad" statVal={bad} />
          <ShowStatistic statName="all" statVal={good + neutral + bad} />
          <ShowStatistic statName="average" statVal={getAverage()} />
          <ShowStatistic statName="positive" statVal={`${getPosPercentage()} %`} />  
          </tbody>
        </table>
      )}
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
