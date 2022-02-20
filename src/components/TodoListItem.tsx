import { motion } from 'framer-motion';
import { FormEvent, useEffect } from 'react';
import { useTodoList } from '../Context';
import Resize from '../hooks/Resize';
import TodoList from '../interface/TodoList';
import todoListVariant from '../variants/todoList';
import ButtonAction from './ButtonAction';
import CheckIcon from './CheckIcon';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import UnCheckIcon from './UnCheckIcon';

function TodoListItem({
  id,
  isComplete,
  title,
  onDelete,
  onClick,
}: TodoList & {
  onClick: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}) {
  const { isCompleteUpdate, isY, setIsY } = useTodoList();
  const { width } = Resize();

  useEffect(() => {
    setTimeout(() => {
      setIsY!(100);
    }, 2000);
  }, []);

  const handleDeleteTodo = (e: FormEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <motion.div
      key={id}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: width < 600 ? 0.85 : 0.97 }}
      onClick={() => setTimeout(() => isCompleteUpdate!(id, !isComplete), 200)}
      variants={todoListVariant}
      custom={isY}
      initial='hidden'
      animate='visible'
      exit='exit'
      layout
      className={`bg-white flex flex-row items-center justify-between px-4 py-4 w-full shadow rounded-lg cursor-pointer ${
        isComplete && 'bg-opacity-50'
      }`}
    >
      <div className='flex items-center space-x-3'>
        {isComplete ? <CheckIcon /> : <UnCheckIcon />}
        <h4 className={`block text-base tracking-wide ${isComplete && 'line-through'}`}>{title}</h4>
      </div>

      <div className='flex items-center space-x-2'>
        <ButtonAction className='bg-red-500' onClick={handleDeleteTodo} icon={<DeleteIcon />} />
        <ButtonAction
          className='bg-green-500'
          onClick={(e) => {
            e.stopPropagation();
            onClick!(id, title);
          }}
          icon={<EditIcon size='w-4 h-4' />}
        />
      </div>
    </motion.div>
  );
}

export default TodoListItem;
