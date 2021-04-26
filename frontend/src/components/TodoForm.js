import React, {  useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

const TodoForm = ({entries, updateEntries}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const addTodo = async(e) => {
    e.preventDefault();
    const currentTodo = {
      title: title,
      description: description,
      deadline: deadline
    }

    if(currentTodo.title !== '' && currentTodo.description !== '') {
      await fetch('https://sd5t3nnwwl.execute-api.us-east-1.amazonaws.com/dev/api/todos', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'todo',
        },
        body: JSON.stringify(currentTodo),
        method:'POST'
      })
      .then(response => response.json())
      .then(jsonData => {
        let newEntries = [...entries];
        newEntries.push(jsonData);
        updateEntries(newEntries)
        cancelTodo();
        console.log(jsonData)
      })
      .catch(err => console.error(err));
    }
  }

  const cancelTodo = () => {
    setTitle('');
    setDescription('');
    setDeadline(new Date())
  }

  return(
    <div className="m-auto task-form">
      <div className="d-flex flex-column">
        <input className="title-form mb-3" placeholder="Task Name" value={title} onChange={handleTitleChange} />
        <textarea className="description-form mb-3 " placeholder="Task Description" value={description} onChange={handleDescriptionChange} />
        <DateTimePicker disableClock={true} onChange={setDeadline} value={deadline}/>
      </div>
      <div className="mt-2 d-flex justify-content-between">
        <button className="form-button" onClick={addTodo} >Add Task</button>
        <button className="form-button" onClick={cancelTodo}>Reset</button>
      </div>
    </div>
  )
}

export default TodoForm;
