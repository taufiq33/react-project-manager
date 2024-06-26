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
    tasks: [
      {
        'id': crypto.randomUUID(), name: 'task 1 on project 1',
      },
      {
        'id': crypto.randomUUID(), name: 'second task on project 1',
      }
    ],
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
      project={projects.filter(project => project.id === view.payload)[0]}
      onDeleteProject={handleDeleteProject}
      onAddProjectTask={handleAddProjectTask}
      onHandleDeleteProjectTask={handleDeleteProjectTask}
      onEditProjectTask={handleEditProjectTask}
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

  function handleProjectDetail(projectId) {
    setView({
      page: 'project',
      payload: projectId
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
    const copyProjects = JSON.parse(JSON.stringify(projects));
    
    const project = copyProjects.filter(project => project.id === projectId)[0];
    project.tasks = [
      ...project.tasks,
      {
        id: crypto.randomUUID(),
        name: task
      }
    ];
    
    setProjects(copyProjects);
  }

  function handleDeleteProjectTask(projectId, taskD) {
    const copyProjects = JSON.parse(JSON.stringify(projects));
    
    const project = copyProjects.filter(project => project.id === projectId)[0];
    project.tasks = project.tasks.filter((task) => {
      return task.id !== taskD.id
    });
    
    setProjects(copyProjects);
  }

  function handleEditProjectTask(projectId, taskEdited){
    const copyProjects = JSON.parse(JSON.stringify(projects));
    
    const project = copyProjects.filter(project => project.id === projectId)[0];
    project.tasks = project.tasks.map((task) => {
      if(task.id === taskEdited.id) {
        return taskEdited
      } else {
        return task
      }
    });

    setProjects(copyProjects);
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
