import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);
  
  const handleFormSubmit = (e) => {                     // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { title, description };

    // Make a PUT request to update the project
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/projects/${projectId}`)
      });
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
      </form>
    </div>
  );
}

export default EditProjectPage;