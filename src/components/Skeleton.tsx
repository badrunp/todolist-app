function Skeleton() {
  return (
    <div className='w-full rounded-lg bg-white flex items-center justify-between h-16 px-4'>
      <div className='flex items-center space-x-2 flex-grow'>
        <div className='w-8 h-8 bg-zinc-300 rounded-full animate-pulse' />
        <div className='h-6 w-2/3 bg-zinc-300 rounded-xl animate-pulse' />
      </div>
      <div className='flex items-center space-x-2'>
        <div className='w-8 h-8 bg-zinc-300 rounded-full animate-pulse' />
        <div className='w-8 h-8 bg-zinc-300 rounded-full animate-pulse' />
      </div>
    </div>
  );
}

export default Skeleton;
