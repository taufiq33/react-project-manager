export default function Project({
  project
}) {
  return (
    <section className="w-full p-6">
      <div className="flex justify-between p-4">
        <div className="basis-2/3">
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <span className="text-gray-500">{project.dueDate}</span>
          <p className="mt-6 mb-2 text-gray-700 tracking-wide leading-6">{project.description}</p>
        </div>
        <div>
          <button className="mr-4 text-amber-950 font-bold tracking-wider">Delete</button>
        </div>

      </div>
      <hr className="mt-6 mb-3"/>
      <div className="p-6">
        <h4 className="text-xl font-bold mb-4">Tasks</h4>
        <div className="flex gap-2">
          <input className="focus:outline-none p-1 bg-gray-200 rounded" type="text" />
          <button className="ml-1">Add Task</button>
        </div>
      </div>
      <div className="p-6 w-full">
        {project.tasks.length > 0 && (
          project.tasks.map((task, index) => {
            return <div className="bg-slate-200 my-1 flex justify-between w-2/3 p-1" key={task}>
              <p><b>{index+1}-</b> {task}</p>
              <p className="flex gap-2 justify-around pr-2">
                <button>Edit</button>
                <button>Delete</button>
              </p>
            </div>
            
          })
        )}
        {project.tasks.length < 1 && <p>This project doesn't have any task yet.</p>}
      </div>
    </section>
  )
}