import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({ text, feedback}) => <button onClick={feedback}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
  
}

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  if (all < 1) {
    return <div>No feedback given</div>
  }

  const average = (good - bad) / (good + neutral + bad)
  const positive = (good * 100) / (good + neutral + bad)
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive + ' %'} />
            </tbody>
        </table>
      </div>
    )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
  }
  const addBad = () => {
    setBad(bad + 1)
  }  

  return (
    <div>
      <Header text='give feedback'/>
      <Button text='good' feedback={addGood} />
      <Button text='neutral' feedback={addNeutral} />
      <Button text='bad' feedback={addBad} />
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
