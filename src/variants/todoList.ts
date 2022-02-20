const todoListVariant = {
  hidden: (i: number) => ({
    opacity: i === 0 ? 1 : 0,
    y: i,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 100,
  },
};

export default todoListVariant;
