/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import styles from "./App.module.css";


const App = () => {

    const url = 'http://localhost:3001/uploadFiles';

    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);

    function onChangeHandler(event) {
        const files = event.target.files;
        setFiles(files);

    }

    async function onClickHandler() {

        setLoading(true);

        const formData = new FormData();

        for (const file of files) {
            formData.append('myFiles', file);
        }

        for (const [key, value] of formData) {
            console.log(`Key : ${key}, Value : ${value}`);
        }

        let response = await fetch(url, {
            method: "post",
            body: formData
        })
        let data = await response.json();
        console.log(data.result);

        // if (data.result === 'Perfect!') {
        //     window.open("http://localhost:3001/downloadFile");
        // }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form_container}>
                <label>Upload Several PDF Files to Merge</label>
                <input type="file" name="myFiles" accept=".pdf" multiple="multiple" onChange={onChangeHandler} />
                <button type="submit" name='file' onClick={onClickHandler}>Submit</button>
            </div>
            <div className={styles.results}>

            </div>

        </div>
    );
}

export default App;