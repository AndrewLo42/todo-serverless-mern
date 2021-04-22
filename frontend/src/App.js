import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import { Container, Col } from "react-bootstrap";
import TodoList from './components/TodoList';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const allTodos = await fetch('https://sd5t3nnwwl.execute-api.us-east-1.amazonaws.com/dev/api/todos', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'todo',
        },
        method: "GET"
      })
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData)
        setData(jsonData)
      })
      .catch((err) => {
        console.error(err)
      })
    }
    getData();
  }, []);

  if(!data) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <Container>
      <h1 className="text-center mt-4 app-title" >Todo List</h1>
      <Col className="d-flex flex-column m-auto justify-content-center">
        <h4 className="text-center">Add A New Task</h4>
        <TodoForm entries={data} updateEntries={setData}/>
      </Col>
      <Container className="d-flex justify-content-center m-auto" >
        <TodoList entries={data} updateEntries={setData}/>
      </Container>
    </Container>
  );
}

export default App;
