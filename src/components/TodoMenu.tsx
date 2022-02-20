import { useTodoList } from '../Context';
import TodoMenuInterface from '../interface/TodoMenu';
import dataTodoMenu from '../menu';
import TodoMenuButton from './TodoMenuButton';

function TodoMenu() {
  const { active, updateActive } = useTodoList();

  return (
    <div className='flex items-center justify-start mt-4 divide-x-2 shadow rounded-lg overflow-hidden bg-white'>
      {dataTodoMenu.map((item: TodoMenuInterface) => (
        <TodoMenuButton
          key={item.id}
          id={item.id}
          title={item.title}
          active={active!}
          roundedClass={item.roundedClass}
          setActive={(id) => updateActive!(id)}
        />
      ))}
    </div>
  );
}

export default TodoMenu;
