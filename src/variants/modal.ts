const modalVariant = {
  hidden: (width: number) => ({
    opacity: 0,
    y: width > 600 ? '-20vw' : 0,
  }),
  visible: { opacity: 1, y: 0 },
  exit: (width: number) => ({
    opacity: 0,
    y: width > 600 ? '20vw' : 0,
    transition: { type: 'tween' },
  }),
};

export default modalVariant;
