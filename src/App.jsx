import { useState, useRef } from "react";
import DefaultContent from "./DefaultContent";
import AddProject from "./AddProject";
import Sidebar from "./Sidebar";
import Project from "./Project";
import ModalNotification from './ModalNotification';

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

  const modalRef = useRef(null);

  let content = <DefaultContent 
    onAddProject={handleAddProject}
  /> 
  if( view.page === 'addProject') {
    content = <AddProject 
      onBackHome={handleBackToHome}
      onAddNewProject={handleAddNewProject}
    />
  } else if (view.page === 'project') {
    content = <Project 
      project={view.payload}
      onDeleteProject={handleDeleteProject}
      onAddProjectTask={handleAddProjectTask}
      onHandleDeleteProjectTask={handleDeleteProjectTask}
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

  function handleProjectDetail(project) {
    setView({
      page: 'project',
      payload: project
    });
  }

  function handleAddNewProject(payload) {
    setProjects([
      ...projects,
      {
        id: projects.length + 1,
        ...payload,
        tasks: [],  
      }
    ]);

    modalRef.current.setContent({
      title: 'success',
      text: `Add "${payload.name}" Project Success!!!`
    })
    modalRef.current.open();
  }

  function handleDeleteProject(projectId) {
    const { name } = projects.filter(project => project.id === projectId)[0];
    const newProjects = projects.filter(project => project.id !== projectId);
    setProjects(newProjects);
    modalRef.current.setContent({
      title: 'success',
      text: `Delete '${name}' Project Success!!!`
    })
    modalRef.current.open();
    handleBackToHome();
  }

  function handleAddProjectTask(projectId, task){
    const copyProjects = [...projects];
    const projectIndex = projects.findIndex(project => project.id === projectId);
    
    const project = projects.filter(project => project.id === projectId)[0];
    project.tasks = [
      ...project.tasks,
      task
    ];
    copyProjects.splice(projectIndex, 1, project); 
    setProjects(copyProjects);
  }

  function handleDeleteProjectTask(projectId, taskIndex, task) {
    const copyProjects = [...projects];
    const projectIndex = projects.findIndex(project => project.id === projectId);
    
    const project = projects.filter(project => project.id === projectId)[0];
    const taskToDelete = project.tasks[taskIndex];
    if(taskToDelete === task) {
      project.tasks.splice(taskIndex, 1);
      console.log(project);
      copyProjects.splice(projectIndex, 1, project);
      setProjects(copyProjects);
    } else {
      console.error('Error when deleting task');
    }
  }

  return (
    <>
      <main className="h-screen flex">
        <ModalNotification ref={modalRef} />
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
