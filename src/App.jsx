
import { useState } from 'react';
import './App.css'
import TaskList from './components/Task'
import TimeTracker from './components/Timer'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  const [taskList, setTaskList] = useState([]);

  const handleTaskSave = (task) => {
    setTaskList([...taskList, task]);
  };

  return (
    <div className='App'>
      <TimeTracker onSave={handleTaskSave}/>
      <TaskList taskList={taskList}/>
    </div>
  )
}

export default App
