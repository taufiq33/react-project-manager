import { useRef, useState } from "react";

export default function AddProject({
  onBackHome,
  onAddNewProject
}) {
  const [dueDate, setDueDate] = useState('');
  const titleRef = useRef('');
  const descRef = useRef('');
  const dateRef = useRef('');

  function handleDueDateChange() {
    setDueDate(new Date(dateRef.current.value).toLocaleDateString('en-US', {dateStyle: 'full'}));
  }

  function onSave() {
    let newProject = {
      name: titleRef.current.value,
      description: descRef.current.value,
      dueDate: dateRef.current.value,
    }
    onAddNewProject(newProject);
    onBackHome();
  }

  return (
    <section className="flex flex-col p-4 w-full">
      <div className="flex justify-end p-2 gap-8 mb-2">
        <button className="text-sm font-bold hover:text-slate-600 text-slate-900" onClick={onBackHome}>Cancel</button>
        <button onClick={onSave} className="text-sm px-8 py-2 bg-slate-700 text-white rounded-lg shadow-md hover:bg-slate-500">Save</button>
      </div>
      <div>
        <p>
          <label htmlFor="title" className="text-slate-900 tracking-widest font-xl block mt-6 mb-1">TITLE</label>
          <input ref={titleRef} className="border-0 border-b border-slate-400 rounded-md p-1 text-sm w-full bg-gray-200" name="title" type="text" />
        </p>
        <p>
          <label htmlFor="description" className="text-slate-900 tracking-widest font-xl block mt-6 mb-1">DESCRIPTION</label>
          <textarea ref={descRef} className="border-0 border-b border-slate-400 rounded-md p-1 text-sm w-full bg-gray-200" name="description" id=""></textarea>
        </p>
        <p>
          <label htmlFor="dueDate" className="text-slate-900 tracking-widest font-xl block mt-6 mb-1">DUE DATE</label>
          <input onChange={handleDueDateChange} ref={dateRef} className="border-0 border-b border-slate-400 rounded-md p-1 text-sm w-full bg-gray-200" type="date" name="dueDate" />
          <span>{dueDate}</span>
        </p>
      </div>
    </section>
  )
}