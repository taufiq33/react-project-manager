import { useRef, useState } from 'react';
import BurgerMenuIcon from './assets/icons8-menu.svg';

export default function Sidebar({
  onAddProject,
  projects,
  onViewDetailProject,
}) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const sidebarContent = useRef(null);
  const parentSidebarContent = useRef(null);
  const buttonRef = useRef(null);

  function handleMenuClick() {
    sidebarContent.current.classList.toggle('hidden');
    parentSidebarContent.current.classList.toggle('w-10');
    buttonRef.current.classList.toggle('w-8');
    setToggleSidebar((prevState) => !prevState);
  }

  return (
    <section ref={parentSidebarContent} className="w-10 sm:w-auto sm:mt-10 bg-slate-900 text-white sm:rounded-tr-lg h-screen">
      <button ref={buttonRef} onClick={handleMenuClick} className='sm:hidden bg-slate-600 p-2 border-1 border-white mt-1 rounded-lg w-8 h-auto mx-auto block hover:bg-slate-400'>
        {toggleSidebar && 'Close Sidebar' }
        {!toggleSidebar && <img src={BurgerMenuIcon} alt="" />}
      </button>

      <div ref={sidebarContent} id="sidebar-content" className='p-4 hidden sm:block'>
        <h2 className="uppercase text-2xl my-8 mx-4 font-bold tracking-wide">Your Project</h2>
        <button onClick={onAddProject} className="py-2 px-4 bg-slate-600 rounded-lg block mx-auto my-10 hover:bg-slate-700">+ Add Project</button>

        <ul className="flex flex-col gap-3 justify-center items-center">
          {projects.map((project) => {
            return <li onClick={() => onViewDetailProject(project.id)} key={project.name} className="p-1 bg-slate-800 hover:bg-slate-500 cursor-pointer rounded w-full text-center">{project.name}</li>
          })}


        </ul>
      </div>

    </section>
  )
}