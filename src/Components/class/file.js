import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './file.css'; // Import the CSS file

function FileList() {
    const [files, setFiles] = useState([]);
    const api = 'http://127.0.0.1:8000/api/files/';

    const getFiles = () => {
        axios.get(api)
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const forceDownload = (response, title) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
    };

    const downloadWithAxios = (url, title) => {
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        })
            .then(response => {
                forceDownload(response, title);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7">
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr>
                                <th scope="col">File Title</th>
                                <th scope="col">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map(file => (
                                <tr key={file.id}>
                                    <td>{file.pdf}</td>
                                    <td>
                                        <button
                                            onClick={() => downloadWithAxios(file.pdf, file.id)}
                                            className="succes-button"
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FileList;
