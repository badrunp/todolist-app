import { motion } from 'framer-motion';
import TodoMenuInterface from '../interface/TodoMenu';

function TodoMenuButton({
  active,
  setActive,
  title,
  id,
  roundedClass = '',
}: TodoMenuInterface & {
  active: number;
  setActive: (id: number) => void;
}) {
  const isActive = active === id;
  return (
    <button
      type='button'
      onClick={() => setActive(id)}
      className={`relative ${isActive ? 'text-white' : 'bg-white'} py-2 px-3 ${roundedClass}`}
    >
      {isActive && (
        <motion.div layoutId='todomenu' className={`absolute inset-0 bg-gray-600 z-10`} />
      )}
      <div className={`text-sm relative z-20`}>{title}</div>
    </button>
  );
}

export default TodoMenuButton;
