import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';

type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
    removeTasks: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTasks: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle:(id:string, newTitle: string)=> void
    filter: string
    changeTaskTitle:(id:string, newTitle:string, todolistId:string)=> void
}

export const Todolist = (props: PropsType) => {

    const onClickAllHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onClickActiveHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onClickCompletedHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const onClikcToRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title:string) => {
        props.addTasks(title, props.id)
    }

    const changeTodolistTitle = (newTitle:string)=>{
        props.changeTodolistTitle(props.id, newTitle)
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
                        props.tasks.map(t => {
                            const onClickHandler = () => {
                                props.removeTasks(t.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeStatus(t.id, newIsDoneValue, props.id)
                            }
                            const onChangeTitleHandler = (newValue:string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)
                            }

                            return <li key={t.id}>
                                <Checkbox color='primary' checked={t.isDone} onChange={onChangeHandler}
                                       className={t.isDone == true ? 'is-done' : ''}/>
                                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onClickHandler}><Delete/></IconButton>
                            </li>
                        })
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
};

