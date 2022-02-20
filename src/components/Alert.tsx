import { AnimatePresence, motion } from 'framer-motion';
import AlertMessageType from '../interface/AlertMessage';
import alertVariant from '../variants/alert';

function Alert({ messages }: { messages: AlertMessageType[] }) {
  return (
    <div className='fixed left-0 top-0 z-50 flex flex-col p-2 space-y-2'>
      <AnimatePresence>
        {messages.length > 0 &&
          messages.map((item) => (
            <motion.div
              variants={alertVariant}
              initial='hidden'
              animate='visible'
              exit='exit'
              layout
              key={item.id}
              className={`${
                item.type === 'error'
                  ? 'border-red-600 bg-red-500'
                  : 'border-green-600 bg-green-500'
              } ring-1 ring-gray-400 border-2 shadow-xl py-2 px-4 rounded-lg flex items-center space-x-1`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <h4 className='block tracking-wide text-xs text-white'>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}, {item.message}
              </h4>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default Alert;
