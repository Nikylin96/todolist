import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange:(newValue:string)=> void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = ()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateVievMode = ()=> {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <TextField variant='outlined' autoFocus onBlur={activateVievMode} onChange={onChangeHandler} value={title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

};

export default EditableSpan;