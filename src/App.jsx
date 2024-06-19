import { useState } from "react";
import DefaultContent from "./DefaultContent";
import AddProject from "./AddProject";
import Sidebar from "./Sidebar";

let dummyState = [
  {
    name: 'project 1',
    dueDate: 'May 9, 2028',
    tasks: ['task 1', 'task 2'],
  },
  {
    name: 'project 2',
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

  return (
    <>
      <h1 className="my-8 text-center text-5xl font-bold">Project Management App</h1>
      <main className="h-screen flex">
        <Sidebar
          onAddProject={handleAddProject}
          projects={projects}
        />
        {content}
      </main>
    </>
    
  );
}

export default App;
