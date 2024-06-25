export default function Sidebar({
  onAddProject,
  projects,
  onViewDetailProject,
}) {
  return (
    <section className="max-w-md mt-10 bg-slate-900 text-white p-4 rounded-tr-lg">
      <h2 className="uppercase text-2xl my-8 mx-4 font-bold tracking-wide">Your Project</h2>
      <button onClick={onAddProject} className="py-2 px-4 bg-slate-600 rounded-lg block mx-auto my-10 hover:bg-slate-700">+ Add Project</button>

      <ul className="flex flex-col gap-3 justify-center items-center">
        {projects.map((project) => {
          return <li onClick={() => onViewDetailProject(project.id)} key={project.name} className="p-1 bg-slate-800 hover:bg-slate-500 cursor-pointer rounded w-full text-center">{project.name}</li>
        })}
        
  
      </ul>
    </section>
  )
}