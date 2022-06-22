import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
    removeTasks: (id: string, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: string
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')

    const onClickAllHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter])
    const onClickActiveHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter])
    const onClickCompletedHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter])

    const onClikcToRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTasks(title, props.id)
    }, [props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])
    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(f => f.isDone == false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(f => f.isDone == true)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                    <IconButton onClick={onClikcToRemoveTodolist}><Delete/></IconButton>
                </h3>
                <div>
                    <AddItemForm addItem={addTask}/>
                </div>
                <ul>
                    {
                        props.tasks.map(t => <Task
                            task={t}
                            changeStatus={props.changeStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTasks={props.removeTasks}
                            todolistId={props.id}
                            key={t.id}
                            />
                        )
                    }

                </ul>
                <div>
                    <Button color='default' variant={props.filter === 'all' ? 'outlined' : 'text'}
                            onClick={onClickAllHandler}>All
                    </Button>
                    <Button color='secondary' variant={props.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onClickActiveHandler}>Active
                    </Button>
                    <Button color='primary' variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            onClick={onClickCompletedHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
})

