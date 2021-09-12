import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({ part }) => {
  //console.log(part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      <p><b>total of {parts.reduce(
        (sum, part) => sum + part.exercises,
        0
      )} exercises</b></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course