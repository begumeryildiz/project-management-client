import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";


function ProjectDetailsPage(props) {
    const [project, setProject] = useState(null);
    // Get the URL parameter `:projectId` 
    const { projectId } = useParams();


    // Helper function that makes a GET request to the API
    // and retrieves the project by id
    const getProject = () => {          //  <== ADD A NEW FUNCTION
        axios
            .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
            .then((response) => {
                const oneProject = response.data;
                setProject(oneProject);
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getProject();
    }, []);


    return (
        <div className="ProjectDetails">
            {project && (
                <>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </>
            )}

            <AddTask refreshProject={getProject} projectId={projectId} />

            {project && project.tasks.map((task) => (
                <TaskCard key={task._id} {...task} />
            ))}

            <br />
            <Link to={`/projects/edit/${projectId}`}>
                <button>Edit Project</button>
            </Link><br /><br />

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>
        </div>
    );
}

export default ProjectDetailsPage;

