import React, {useState} from "react";
import {TextField, Grid} from "@mui/material";
import styles from "./Style.module.css"

const TextPromptInput = ({enterPressedCallback, disabled}) => {
    const [promptText, setPromptText] = useState('');

    function handleTextPromptKeyPressed(event) {
        if (event.key === 'Enter') {
            enterPressedCallback(promptText)
        }
    }

    function onTextChanged(event) {
        setPromptText(event.target.value)
    }

    return (
        <Grid container p={2}>
            <TextField className={styles.inputPrompt} id="prompt-input" label="Text prompt"
                   helperText="hit Enter to search" multiline InputLabelProps={{shrink:true}}
                   placeholder="e.g. an apple on a table" value={promptText}
                   onChange={onTextChanged} fullWidth rows={14}
                   onKeyPress={handleTextPromptKeyPressed} disabled={disabled}/>
        </Grid>
    )
}

export default TextPromptInput;