import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();  


  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);
  
  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };

    // Make a PUT request to update the project
    axios
    .put(
      `${process.env.REACT_APP_API_URL}/projects`, 
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
  )
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/projects/${projectId}`)
      });
  };

  const deleteProject = () => {                    //  <== ADD
    // Make a DELETE request to delete the project
    axios
    .delete(
      `${process.env.REACT_APP_API_URL}/projects`, 
      { headers: { Authorization: `Bearer ${storedToken}` } }
  )
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };  
  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>      {/*  <== UPDATE  */}
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form><br />
      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;