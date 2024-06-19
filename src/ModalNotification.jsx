import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const ModalNotification = forwardRef(({
  type = 'notification',
  callback = null
}, ref) => {
  const [modalContent, setModalContent] = useState({
    title: '',
    text: null,
  });
  const dialogRef = useRef(null);

  function onButtonDefaultClick() {
    dialogRef.current.close();
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
      setContent(payload) {
        setModalContent(payload);
      }
    }
  })

  return createPortal(
    <dialog className='p-10 rounded-lg shadow-lg' ref={dialogRef}>
      <h2 className='text-xl font-bold uppercase border-b mb-10 text-center'>{modalContent.title}</h2>
      <p className='tracking-wide text-slate-700'>{modalContent.text}</p>
      <button className='mx-auto block bg-slate-800 text-white px-4 py-1 text-sm mt-10 rounded' onClick={onButtonDefaultClick}>Okay</button>
    </dialog>
  , document.getElementById('modal-root'));
});

export default ModalNotification;