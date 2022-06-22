import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksPropsType} from "./Todolist";

type TaskPropsType = {
    removeTasks: (id: string, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    task: TasksPropsType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTasks(props.task.id, props.todolistId)
    },[props.task.id, props.removeTasks])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todolistId)
    },[props.task.id, props.changeStatus])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.task.id, props.changeTaskTitle])

    return <li key={props.task.id}>
        <Checkbox color='primary' checked={props.task.isDone} onChange={onChangeHandler}
                  className={props.task.isDone == true ? 'is-done' : ''}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </li>
})