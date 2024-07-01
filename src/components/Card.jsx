import React, { useState } from 'react';
import { IoInvertMode } from "react-icons/io5";
import { Stack } from 'react-bootstrap';
import '../App.css';
import { IoAddOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { RiCloseCircleFill } from "react-icons/ri";



export default function Card( {onModeChange, isLightMode} ) {
    const [title, setTitle] = useState("");
    const toggleMode = () => {
        onModeChange(!isLightMode);
        if (isLightMode) {
            document.body.style.backgroundColor = "rgb(30, 27, 31)";
        } else {
            document.body.style.backgroundColor = "white";
        }
    };
    const [todos, setTodos] = useState([
    ]);
    const handleDelete = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id)
        setTodos(newTodos)
    }
    const handleSwitch = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(newTodos)
    }
    const handleAdd = () => {
        if (title.trim() === "") {
            alert("Input doesn't have value");
            return;
        }

        const newTodos = [...todos]
        newTodos.push({
            id: newTodos.length + 1,
            title: title,
            completed: false
        })
        setTodos(newTodos)
        setTitle('')
    }

    const handleClearCompleted = () => {
        const newTodos = todos.filter((todo) => todo.completed === false)
        setTodos(newTodos)
    }
    const handleClearUncompleted = () => {
        const newTodos = todos.filter((todo) => todo.completed === true)
        setTodos(newTodos)
    }
    const handleCompleteAll = () => {
        const newTodos = todos.map((todo) => ({
            ...todo,
            completed: true
        }));
        setTodos(newTodos);
    };
    return (
        <Stack className="todo">

            <Stack direction={'horizontal'}>
                <h1 className="fw-bold text-white">TO DO</h1>
                <div className="d-flex ms-auto align-items-center gap-5">
                    <IoInvertMode  onClick={toggleMode} className="text-white " size={70} />
                </div>
            </Stack>
            <Stack className='d-flex gap-3'>

                <InputGroup className=" mt-4 shadow font-monospace">
                    <Form.Control
                        placeholder="create your to do"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <Button variant="success">
                        <IoAddOutline onClick={handleAdd} size={30} />
                    </Button>
                </InputGroup>




                {todos.map((todo) => {
                    return (
                        <Stack className='app bg-white rounded d-flex align-items-center justify-content-between px-3' direction='horizontal' >
                            <Stack className='d-flex flex-row align-items-center'>
                                <Form.Check className='fs-5'
                                    type="switch"
                                    id="custom-switch"
                                    checked={todo.completed === true}
                                    onClick={() => handleSwitch(todo.id)}
                                />
                            </Stack>
                            <Stack className='d-flex flex-row align-items-center justify-content-flex-start'>
                                <h6 className={`${todo.completed ? 'text-decoration-line-through opacity-50' : ''}`}>{todo.title}</h6>
                            </Stack>
                            <Stack className='close d-flex fs-2 justify-content-center '>
                                <RiCloseCircleFill onClick={() => handleDelete(todo.id)} className='closeBtn' />
                            </Stack>
                        </Stack>
                    )
                })}


                <Stack className='app bg-white rounded d-flex flex-row align-items-center px-3' direction='horizontal' gap={5}>
                    <div><b className='text-primary'>{todos.filter(todo => !todo.completed).length}</b> task left</div>
                    <Stack direction='horizontal' gap={4}>
                        <div className='completed' onClick={handleCompleteAll}>Completed</div>
                        <div className='clearc' onClick={handleClearCompleted}>Clear_Completed</div>
                        <div className='clearu' onClick={handleClearUncompleted}>Clear_Uncompleted</div>
                    </Stack>
                </Stack>
            </Stack>

        </Stack>
    );
}
