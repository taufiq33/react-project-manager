import { useState, useRef } from "react";
import DefaultContent from "./DefaultContent";
import AddProject from "./AddProject";
import Sidebar from "./Sidebar";
import Project from "./Project";
import ModalNotification from './ModalNotification';

let dummyState = [
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    name: 'project 2',
    description: 'Plan B of project 1',
    dueDate: 'December 9, 2024',
    tasks: [],
  }
];

function App() {

  const [globalState, setGlobalState] = useState({
    selectedProjectId: undefined, // undefined = defaultContent , null = addnewProject, some id Project = Project detail 
    projects: dummyState,
  })

  const modalRef = useRef(null);

  let content = null;
  if (globalState.selectedProjectId === null) {
    content = <AddProject
      onBackHome={handleBackToHome}
      onAddNewProject={handleAddNewProject}
    />
  } else if (globalState.selectedProjectId === undefined) {
    content = <DefaultContent
      onAddProject={handleAddProject}
    />
  } else {
    content = <Project
      project={globalState.projects.filter(project => project.id === globalState.selectedProjectId)[0]}
      key={globalState.selectedProjectId}
      onDeleteProject={handleDeleteProject}
      onAddProjectTask={handleAddProjectTask}
      onHandleDeleteProjectTask={handleDeleteProjectTask}
      onEditProjectTask={handleEditProjectTask}
    />
  }

  function handleAddProject() {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleBackToHome() {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleProjectDetail(projectId) {
    setGlobalState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      }
    })
  }

  function handleAddNewProject(payload) {

    setGlobalState((prevState) => {
      return {
        ...prevState,
        projects: [
          ...prevState.projects,
          {
            id: crypto.randomUUID(),
            ...payload,
            tasks: [],
          }
        ]
      }
    })

    modalRef.current.setContent({
      title: 'success',
      text: `Add "${payload.name}" Project Success!!!`
    })
    modalRef.current.open();
  }

  function handleDeleteProject(projectId) {

    setGlobalState((prevState) => {
      return {
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== projectId),
      }
    })

    modalRef.current.setContent({
      title: 'success',
      text: `Delete Project Success!!!`
    })
    modalRef.current.open();
  }

  function handleAddProjectTask(projectId, task) {

    setGlobalState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: [
                ...project.tasks,
                {
                  id: crypto.randomUUID(),
                  name: task
                }
              ],
            };
          } else {
            return project;
          }
        }),
      }
    });

  }

  function handleDeleteProjectTask(projectId, taskD) {

    setGlobalState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: project.tasks.filter(task => task.id !== taskD.id)
            };
          } else {
            return project;
          }
        }),
      }
    });
  }

  function handleEditProjectTask(projectId, taskEdited) {

    setGlobalState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: project.tasks.map((task) => {
                if(task.id === taskEdited.id) {
                  return taskEdited
                } else {
                  return task;
                }
              })
            };
          } else {
            return project;
          }
        }),
      }
    });
  }

  return (
    <>
      <main className="h-screen flex">
        <ModalNotification ref={modalRef} />
        <Sidebar
          onAddProject={handleAddProject}
          projects={globalState.projects}
          onViewDetailProject={handleProjectDetail}
        />
        {content}
      </main>
    </>

  );
}

export default App;
