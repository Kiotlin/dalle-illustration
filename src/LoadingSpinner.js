import {PulseLoader} from "react-spinners";
import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "./Style.module.css"

const processingSteps = ['Generating images 👨🏽‍🎨', 'Doing fancy calculations ✨'];

const LoadingSpinner = ({isLoading}) => {
    const [textIdx, setTextIdx] = useState(0);

    useEffect(() => {
        const intervalID = setTimeout(() => {
            let currentIdx = textIdx;
            if (currentIdx + 1 < processingSteps.length) {
                setTextIdx(currentIdx + 1)
            }

        }, 10000);

        return () => clearInterval(intervalID);
    }, []);

    const loadingText = processingSteps[textIdx % processingSteps.length];
    return (
        <div className={styles.spinnerRoot}>
            <PulseLoader sizeUnit={"px"} size={20} color="purple" loading={isLoading}/>
            <Typography className={styles.loadingText} variant={"h6"}>{loadingText}</Typography>
        </div>
    )
}

export default LoadingSpinner