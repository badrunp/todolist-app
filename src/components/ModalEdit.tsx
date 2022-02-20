import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Resize from '../hooks/Resize';
import modalVariant from '../variants/modal';
import EditIcon from './EditIcon';
import ModalButton from './ModalButton';

function Modal({
  onClose,
  item,
  onSave,
}: {
  onClose: () => void;
  item: { id: number; title: string };
  onSave: (id: number, title: string, callback: () => void) => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = Resize();
  const handleSaveTodo = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    onSave(item.id, title, () => {
      setLoading(false);
    });
  };
  return (
    <motion.div className='fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
      <motion.div
        variants={modalVariant}
        initial='hidden'
        animate='visible'
        exit='exit'
        custom={width}
        className='w-96 bg-white shadow-xl rounded-lg px-5 py-4'
      >
        <div className='flex items-center space-x-2'>
          <EditIcon size='w-6 h-6' />
          <h1 className='block tracking-normal font-semibold'>Edit Todo List</h1>
        </div>
        <form onSubmit={handleSaveTodo} className='mt-4 flex items-start flex-col'>
          <input
            type='text'
            placeholder='Enter todo'
            className='w-full border border-gray-300 rounded-md focus:outline-none px-2 py-2 focus:ring-2 focus:border-blue-600 focus:ring-blue-300'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='mt-4 flex items-center space-x-2'>
            <ModalButton
              title='Save'
              onClick={handleSaveTodo}
              loading={loading}
              className='bg-blue-600 focus:ring-blue-300'
            />
            <ModalButton
              title='Cancel'
              onClick={onClose}
              loading={false}
              className='bg-red-600 focus:ring-red-300'
            />
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
