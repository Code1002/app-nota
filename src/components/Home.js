import React, { useState } from "react";
import Navbar from "./Navbar";

function Home() {
  // Estado y funciones del To-Do List
  const [tasks, setTasks] = useState([
    { id: 1, text: "Aprender GitHub", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Estado para editar
  const [editText, setEditText] = useState(""); // Texto para editar

  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleEdit = (id, currentText) => {
    setIsEditing(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setIsEditing(null); // Terminar edición
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>To-Do List</h1>

        {/* Campo para añadir nuevas tareas */}
        <div>
          <input
            type="text"
            placeholder="Añadir nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Añadir</button>
        </div>

        {/* Lista de tareas */}
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            {isEditing === task.id ? (
              // Campo de edición
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <p
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  margin: "0 10px",
                }}
              >
                {task.text}
              </p>
            )}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            {isEditing === task.id ? (
              <button onClick={() => handleSaveEdit(task.id)}>Guardar</button>
            ) : (
              <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
