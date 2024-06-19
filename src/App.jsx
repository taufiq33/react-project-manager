import { useState } from "react";
import DefaultContent from "./DefaultContent";
import AddProject from "./AddProject";
import Sidebar from "./Sidebar";
import Project from "./Project";

let dummyState = [
  {
    id: 1,
    name: 'project 1',
    description: 'Etiam euismod pharetra lacus, in molestie lorem gravida euismod. Curabitur et dapibus metus, sit amet lacinia velit. Phasellus tincidunt erat sed felis dapibus scelerisque. ',
    dueDate: 'May 9, 2028',
    tasks: ['task 1', 'task 2'],
  },
  {
    id: 2,
    name: 'project 2',
    description: 'Plan B of project 1',
    dueDate: 'December 9, 2024',
    tasks: [],
  }
];

function App() {
  const [view, setView] = useState({
    page: 'default',
    payload: {}
  });
  const [projects, setProjects] = useState(dummyState);

  let content = <DefaultContent 
    onAddProject={handleAddProject}
  /> 
  if( view.page === 'addProject') {
    content = <AddProject 
      onBackHome={handleBackToHome}
    />
  } else if (view.page === 'project') {
    content = <Project project={view.payload}/>
  }

  function handleAddProject() {
    setView({
      page: 'addProject',
      payload: {}
    });
  }

  function handleBackToHome() {
    setView({
      page: 'default',
      payload: {}
    });
  }

  function handleProjectDetail(project) {
    setView({
      page: 'project',
      payload: project
    });
  }

  return (
    <>
      <main className="h-screen flex">
        <Sidebar
          onAddProject={handleAddProject}
          projects={projects}
          onViewDetailProject={handleProjectDetail}
        />
        {content}
      </main>
    </>
    
  );
}

export default App;
