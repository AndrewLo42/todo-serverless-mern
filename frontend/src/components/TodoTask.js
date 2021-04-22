import React, { useState } from 'react';
import Countdown from "react-countdown";

const TodoTask = ({item, entries, updateEntries}) => {

  const [status, setStatus] = useState();

  const editItem = async (id) => {
    const newItem = item;
    newItem.completed = true;

    const response = await fetch(`https://sd5t3nnwwl.execute-api.us-east-1.amazonaws.com/dev/api/todos/${newItem._id}`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'todo',
      },
      body: JSON.stringify(newItem),
      method:'PUT'
    })
    .then(response => response.json())
    .then(jsonData => {
      let newEntries = [...entries];
      newEntries.forEach(task => {
        if(task._id === jsonData._id) {
          task = jsonData;
        }
      });
      updateEntries(newEntries)
    })
    .catch(err => console.error(err));
  }

  const deleteItem = async(id) => {
    let newEntries = [...entries];
    const filteredEntries = newEntries.filter(task => {
      return task._id !== id
    })
    const response = await fetch(`https://sd5t3nnwwl.execute-api.us-east-1.amazonaws.com/dev/api/todos/${item._id}`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'todo',
      },
      method:'DELETE'
    })
    .then(response => response.json())
    .then(jsonData => {
      if (jsonData.deletedCount === 1) {
        updateEntries(filteredEntries)
      }
    })
  }

  const CountRender = ({ hours, minutes, seconds, completed }) => {
      let status = '?'
      if(item.completed) {
        status =  <span className="task-complete" >Done</span>
      } else {
        status = <span className="task-progress">In Progress</span>
      }

    if(hours===0 && seconds===0 && minutes===10 && !item.completed){
      alert(`You have 10 minutes left to finish ${item.title}`)
    }
    if(completed && !item.completed){
      return (
        <>
          <div>Status: <span className="task-dismissed">Dismissed</span> </div>
          <span>Task Over</span>
        </>
      );
    } else if (completed && item.completed) {
        return(
          <>
            <div>Status: {status} </div>
            <span>Task Complete!</span>
          </>
        )
    }

    return(
        <>
          <div>Status: {status} </div>
          <span>Deadline: {hours}:{minutes}:{seconds}</span>
        </>
    )
  }

  return(
    <div className="task-card">
      <h3 className="text-center">{item.title}</h3>
      <div className="text-center task-description">
        {item.description}
      </div>
      <div><Countdown date={Date.parse(item.deadline)} renderer={CountRender}/> </div>
      <div className="d-flex justify-content-center">
        {!item.completed ? <button className="task-button complete-task mt-3" onClick={() => editItem(item._id)}>Complete Task</button> : <button className="task-button remove-task mt-3" onClick={() => deleteItem(item._id)}>Remove Task</button>}
      </div>
      {/* <button onClick={() => editItem(item._id)}>Complete Task</button> */}
    </div>
  )
}

export default TodoTask;
