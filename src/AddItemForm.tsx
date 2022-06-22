import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField, IconButton} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>('')

    const addTasks = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTasks()
        }
    }


    return (
        <div>
            <TextField
                variant='outlined'
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label='Title'
                helperText={error}
            />
            <IconButton color='primary' onClick={addTasks}><AddBox/></IconButton>
        </div>
    )
})