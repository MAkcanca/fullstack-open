import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.lesson.name} {props.lesson.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(val => <Part key={val.name} lesson={val} />)}
    </div>
  )
}

const Total = (props) => {
  const result = props.parts.reduce((sum, cur) => sum + cur.exercises , 0)
  return (
    <p>Number of exercises {result}</p>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))