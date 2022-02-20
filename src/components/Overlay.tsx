import { motion } from 'framer-motion';
import overlayVariant from '../variants/overlay';

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={overlayVariant}
      initial='hidden'
      animate='visible'
      exit='hidden'
      onClick={onClose}
      className='fixed inset-0 bg-black z-40'
    />
  );
}

export default Overlay;
