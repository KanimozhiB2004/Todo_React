import React, { useReducer, useState } from 'react';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload }];
    case 'DELETE':
      return state.filter(task => task.id !== action.payload);
    case 'EDIT':
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.newText }
          : task
      );
    default:
      return state;
  }
};

const TodoApp2 = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch({ type: 'ADD', payload: newTask });
      setNewTask('');
    }
  };

  const handleEditTask = (id, text) => {
    setEditTaskId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch({ type: 'EDIT', payload: { id: editTaskId, newText: editText } });
      setEditTaskId(null);
      setEditText('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>To-Do App with useReducer</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        style={{ padding: '5px', width: '200px', marginRight: '10px' }}
      />
      <button onClick={handleAddTask} style={{ padding: '5px 10px' }}>Add</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={handleSaveEdit} style={{ marginLeft: '10px' }}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                  <button onClick={() => handleEditTask(task.id, task.text)} style={{ marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp2;
