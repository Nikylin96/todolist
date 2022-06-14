import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {userReducer} from "./state/user-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAС,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: string
}

export type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}

function AppWithReducer() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all',}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

    const removeTasks = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }
    const addTasks = (title: string, todolistId: string) => {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId))
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolistsReducer(ChangeTodolistFilterAС(todolistId, value))
    }

    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)

    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatchToTodolistsReducer(action)
    }


    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
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
                <Grid container style={{padding: '20px'}}>
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

export default AppWithReducer;

