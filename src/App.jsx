import { useState } from "react";
import DefaultContent from "./DefaultContent";
import AddProject from "./AddProject";
import Sidebar from "./Sidebar";

function App() {
  const [view, setView] = useState({
    page: 'default',
    payload: {}
  });

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
        />
        {content}
      </main>
    </>
    
  );
}

export default App;
