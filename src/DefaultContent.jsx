import NoProjectImage from './assets/no-projects.png';

export default function DefaultContent () {
  return (
    <section className="flex flex-col gap-4 items-center w-full">
      <img className="mt-16 mb-4 h-36 w-40" src={NoProjectImage} alt="No project illustration" />
      <h2 className='text-2xl font-bold text-yellow-800'>No project have been selected</h2>

      <p className='mb-8'>Select a project or get started with a new one</p>

      <button className="px-8 py-2 bg-slate-900 text-white shadow-md font-bold rounded hover:bg-slate-600">Create new Project</button>
    </section>
  )
}