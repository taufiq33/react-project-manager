import { useRef, useState } from 'react';
export default function Project({
  project,
  onDeleteProject,
  onAddProjectTask,
  onHandleDeleteProjectTask,
  onEditProjectTask
}) {
  const [submitMode, setSubmitMode] = useState('Add Task');
  const inputRef = useRef(null);

  function handleSubmitTask(event) {
    event.preventDefault();
    if(submitMode === 'Add Task') {
      onAddProjectTask(project.id, inputRef.current.value);
      inputRef.current.value = '';
    } else if (submitMode === 'Edit Task') {
      onEditProjectTask(project.id, {
        id: inputRef.current.taskId,
        name: inputRef.current.value
      });
      inputRef.current.value = '';
      setSubmitMode('Add Task');
    }
  }

  function handleEditTask(task) {
    setSubmitMode('Edit Task');
    inputRef.current.value = task.name;
    inputRef.current.taskId = task.id;
    inputRef.current.focus();
  }

  return (
    <section className="w-full p-6 max-h-full overflow-scroll">
      <div className="flex justify-between p-4">
        <div className="basis-2/3">
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <span className="text-gray-500">{project.dueDate}</span>
          <p className="mt-6 mb-2 text-gray-700 tracking-wide leading-6">{project.description}</p>
        </div>
        <div>
          <button onClick={() => onDeleteProject(project.id)} className="mr-4 text-amber-950 font-bold tracking-wider">Delete</button>
        </div>

      </div>
      <hr className="mt-6 mb-3" />
      <div className="p-6">
        <h4 className="text-xl font-bold mb-4">Tasks</h4>
        <div className="flex gap-2">
          <form onSubmit={handleSubmitTask} className='flex justify-center flex-col sm:flex-row gap-2'>
            <input ref={inputRef} required className="focus:outline-none p-1 bg-gray-200 rounded" type="text" />
            <button type='submit' className="bg-slate-800 text-white p-1 rounded text-sm">{submitMode}</button>
          </form>
        </div>
      </div>
      <div className="p-6 w-full">
        {project.tasks.length > 0 && (
          project.tasks.map((task, index) => {
            return <div className="bg-slate-200 my-1 flex items-center justify-between sm:w-2/3 p-1" key={task.id}>
              <p><b>{index + 1}-</b> {task.name}</p>
              <p className="flex flex-col sm:flex-row text-sm sm:text-md gap-3 justify-around pr-2">
                <button className='hover:text-slate-500' onClick={() => handleEditTask(task)}>Edit</button>
                <button className='hover:text-slate-500' onClick={() => onHandleDeleteProjectTask(project.id, task)}>Delete</button>
              </p>
            </div>

          })
        )}
        {project.tasks.length < 1 && <p>This project doesn't have any task yet.</p>}
      </div>
    </section>
  )
}