import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css'; // Import the CSS file

function UploadFile() {
    const [filename, setFilename] = useState(null);
    const [status, setStatus] = useState('');

    const api = 'http://127.0.0.1:8000/api/files/';

    const saveFile = () => {
        if (!filename) {
            setStatus('No file selected');
            return;
        }

        let formData = new FormData();
        formData.append("pdf", filename);

        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        axios.post(api, formData, axiosConfig)
            .then(response => {
                console.log(response);
                setStatus('File Uploaded Successfully');
                setFilename(null); // Clear selected file after upload
            })
            .catch(error => {
                console.log(error);
                setStatus('Error uploading file');
            });
    };

    return (
        <div className="upload-file-container">
            <div className="upload-file-row">
                <div className="upload-file-col">
                    <h3 className="upload-file-header">File Upload Section</h3>
                    <form>
                        <div className="upload-file-form-group">
                            <input
                                type="file"
                                id="fileUpload"
                                className="upload-file-input"
                                onChange={e => setFilename(e.target.files[0])}
                            />
                            <label htmlFor="fileUpload" className="upload-file-input-label">
                                Choose File
                            </label>
                            <div className="upload-file-status">
                                {filename ? filename.name : 'No file chosen'}
                            </div>
                        </div>
                        <br />
                        <button
                            type="button"
                            onClick={saveFile}
                            className="upload-file-submit-button"
                        >
                            Submit
                        </button>
                        {status && <h2 className="upload-file-status">{status}</h2>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
