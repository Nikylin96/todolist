import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: string
}

function App() {

    const removeTasks = (id: string, todolistId: string) => {
        //Достанем нужный массив по todolistId
        let todolistTasks = tasks[todolistId]
        //перезапишем в этот объект массив для нужного тудулста отфлитрованным массивом
        tasks[todolistId] = todolistTasks.filter(f => f.id != id)
        //засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
    }
    const addTasks = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        //Достаем нужный массив todolistId
        let todolistTasks = tasks[todolistId]
        // Перезапишем в этот объект массив для нужного тудулиста копией, добавив в начало новую
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        // остаем нужный массив по todolistId
        let todolistTasks = tasks[todolistId]
        //айдем нужную таску
        let task = todolistTasks.find(f => f.id == id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        // остаем нужный массив по todolistId
        let todolistTasks = tasks[todolistId]
        //айдем нужную таску
        let task = todolistTasks.find(f => f.id == id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(f => f.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        //засунем в стейт тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(f => f.id != todolistId))
        //удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todolistId]//удаляем свойство из объекта ... значением которого является массив тасок
        //засетаем в стейт копию обхекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(t => t.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all',}
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},

        ]
    })

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
                    <Typography variant='h6'>News</Typography>
                    <Button color='inherit'></Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style ={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(f => f.isDone == false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(f => f.isDone == true)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTasks={removeTasks}
                                        changeFilter={changeFilter}
                                        addTasks={addTasks}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                        }
                        </Grid>
                        </Container>
                        </div>
                        );
                    }

                    export default App;

