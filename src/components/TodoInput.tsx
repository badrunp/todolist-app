import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTodoList } from '../Context';
import AlertMessage from '../hooks/AlertMessage';
import AddIcon from './AddIcon';
import Alert from './Alert';

function TodoInput() {
  const [title, setTitile] = useState<string>('');
  const { addTodoList } = useTodoList();
  const { messages, setAlertMessage } = AlertMessage();

  const handleAddTodoList = (e: React.FormEvent) => {
    e.preventDefault();
    if (title === '') {
      setAlertMessage('Todo List is required!', 'error', 3000);
      return;
    }
    addTodoList!(title, () => {
      setAlertMessage('Todo List is added', 'success', 3000);
      setTitile('');
    });
  };

  return (
    <form onSubmit={handleAddTodoList} className='w-full'>
      <div className='w-full h-auto bg-white shadow p-1 rounded-lg flex items-center space-x-2 pr-3'>
        <div className='grow'>
          <input
            type='text'
            placeholder='What needs to be done?'
            className='w-full py-3 px-4 focus:outline-none rounded-md'
            value={title}
            onChange={(e) => setTitile(e.target.value)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          type='button'
          className='block p-2 rounded-full bg-blue-600'
          onClick={handleAddTodoList}
        >
          <AddIcon />
        </motion.button>
      </div>
      <Alert messages={messages} />
    </form>
  );
}

export default TodoInput;
