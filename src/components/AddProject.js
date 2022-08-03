import { useState } from "react";
import axios from "axios";


function AddProject(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const storedToken = localStorage.getItem("authToken");

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMsg("");

        const requestBody = { title, description };

        axios
        .post(
            `${process.env.REACT_APP_API_URL}/projects`, 
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                // Reset the state
                setTitle("");
                setDescription("");

                props.newProjects();
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="AddProject">
            <h3>Add Project</h3>

            {errorMsg &&
                <p className="error">
                    {errorMsg}
                </p>
            }

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddProject;

