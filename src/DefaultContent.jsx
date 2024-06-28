import NoProjectImage from './assets/no-projects.png';

export default function DefaultContent({
  onAddProject
}) {
  return (
    <section className="flex flex-col gap-4 items-center w-full">
      <img className="mt-16 mb-4 h-36 w-40" src={NoProjectImage} alt="No project illustration" />
      <h2 className='text-2xl font-bold text-yellow-800'>No project have been selected</h2>

      <p className='mb-8'>Select a project or get started with a new one</p>

      <button onClick={onAddProject} className="px-8 py-2 bg-slate-900 text-white shadow-md font-bold rounded hover:bg-slate-600">Create new Project</button>

      <div className='text-slate-500 text-sm'>
        <a target="_blank" href="https://icons8.com/icon/8113/menu">Menu</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
    </section>
  )
}