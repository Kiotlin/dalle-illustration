import React, {useEffect, useState} from "react";
import styles from "./Style.module.css";
import {Grid, TextField} from "@mui/material";
import {isValidURL} from "./utils";
import {PulseLoader} from "react-spinners";
import qs from "qs";
import {checkIfValidBackend} from "./backend_api";

const BackendUrlInput = ({
                             disabled, setBackendValidUrl,
                             isValidBackendEndpoint, setIsValidBackendEndpoint,
                             isCheckingBackendEndpoint, setIsCheckingBackendEndpoint,
                         }) => {

    const [backendUrl, setBackendUrl] = useState('');

    useEffect(() => {
        const qsBackendUrl = qs.parse(window.location.search, {ignoreQueryPrefix: true}).backendUrl
        if (qsBackendUrl) {
            onChange(qsBackendUrl)
        }
    }, [setBackendUrl])

    function onChange(newBackendUrl) {
        if (isValidURL(newBackendUrl)) {
            setIsCheckingBackendEndpoint(true)
            checkIfValidBackend(newBackendUrl).then((isValid) => {
                setIsValidBackendEndpoint(isValid)
                if (isValid) {
                    setBackendValidUrl(newBackendUrl)
                }
                setIsCheckingBackendEndpoint(false)
            }).catch(() => {
                setIsCheckingBackendEndpoint(false)
            })
        } else {
            setIsValidBackendEndpoint(false)
        }

        setBackendUrl(newBackendUrl)
    }

    return (
        <Grid container spacing={1} alignContent="center" pl={2} pt={1}>
            <Grid item xs={6}>
                <TextField className={styles.inputBackend} fullWidth id="standard-basic"
                           label="Backend URL" value={backendUrl} disabled={disabled}
                           error={!isValidBackendEndpoint && backendUrl !== ''}
                           helperText={!isValidBackendEndpoint && backendUrl !== '' && "No running DALL-E server with this URL"}
                           variant="standard" size="small" InputLabelProps={{shrink:true}}
                           onChange={(event) => onChange(event.target.value)}/>
            </Grid>
            {isCheckingBackendEndpoint && <Grid item className={styles.loadingSpinner} xs={2}>
                <PulseLoader sizeUnit={"px"} size={5} color="purple"
                             loading={isCheckingBackendEndpoint}/>
            </Grid>}
        </Grid>
    )
}

export default BackendUrlInput;
