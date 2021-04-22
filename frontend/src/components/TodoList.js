import React from 'react';
import TodoTask from './TodoTask';

const TodoList = ({entries, updateEntries}) => {
  const list = entries.map((item) => {
    return(
      <TodoTask key={item._id} item={item} entries={entries} updateEntries={updateEntries}/>
    )
  })
  return(
    <div className="mt-3">
      {list}
    </div>
  )
}

export default TodoList;
