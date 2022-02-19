import { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function randomID() {
    return Math.floor(Math.random() * Date.now())
  }

  function handleCreateNewTask() {
    if(newTaskTitle === '') {
      toast.error("Insira um título primeiro!")
    } else {
      toast.success("Nota criada com sucesso!")
      setTasks([...tasks, { id: randomID(), title: newTaskTitle, isComplete: false}]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <section className="task-list container">
      <Toaster />
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value.trimStart())}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}