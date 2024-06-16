export default function AddProject({
  onBackHome
}) {
  return (
    <section className="flex flex-col p-4 w-full">
      <div className="flex justify-end p-2 gap-8 mb-2">
        <button className="text-sm font-bold hover:text-slate-600 text-slate-900" onClick={onBackHome}>Cancel</button>
        <button className="text-sm px-8 py-2 bg-slate-700 text-white rounded-lg shadow-md hover:bg-slate-500">Save</button>
      </div>
      <div>
        <p>
          <label htmlFor="title" className="text-slate-900 tracking-widest font-xl block mt-6 mb-1">TITLE</label>
          <input className="border-0 border-b border-slate-400 rounded-md p-1 text-sm w-full bg-gray-200" name="title" type="text" />
        </p>
        <p>
          <label htmlFor="description" className="text-slate-900 tracking-widest font-xl block mt-6 mb-1">DESCRIPTION</label>
          <textarea className="border-0 border-b border-slate-400 rounded-md p-1 text-sm w-full bg-gray-200" name="description" id=""></textarea>
        </p>
        <p>
          <label htmlFor="dueDate" className="text-slate-900 tracking-widest font-xl block mt-6 mb-1">DUE DATE</label>
          <input className="border-0 border-b border-slate-400 rounded-md p-1 text-sm w-full bg-gray-200" type="date" name="dueDate" />
        </p>
      </div>
    </section>
  )
}