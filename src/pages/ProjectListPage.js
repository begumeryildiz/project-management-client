// src/pages/ProjectListPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";


function ProjectListPage() {
    const [projects, setProjects] = useState([]);

    const getAllProjects = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/projects`)
            .then((response) => setProjects(response.data))
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllProjects();
    }, []);


    return (
        <div className="ProjectListPage">

            <AddProject newProjects={getAllProjects} />
            <hr />

            {projects.map((project) => (
                <ProjectCard key={project._id} {...project} />
            ))}
        </div>
    );
}

export default ProjectListPage;
