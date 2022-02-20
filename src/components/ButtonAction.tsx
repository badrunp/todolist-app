import { motion } from 'framer-motion';
import { MouseEvent, ReactElement } from 'react';

function ButtonAction({
  className,
  onClick,
  icon,
}: {
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon: ReactElement;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 1 }}
      onClick={onClick}
      type='button'
      className={`block text-white ${className} shadow p-2 rounded-full focus:outline-none`}
    >
      {icon}
    </motion.button>
  );
}

export default ButtonAction;
