import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Alert from '../components/Alert';
import Logo from '../components/Logo';
import Modal from '../components/ModalEdit';
import Overlay from '../components/Overlay';
import Skeleton from '../components/Skeleton';
import TodoInput from '../components/TodoInput';
import TodoListItem from '../components/TodoListItem';
import TodoMenu from '../components/TodoMenu';
import { useTodoList } from '../Context';
import AlertMessage from '../hooks/AlertMessage';
import TodoList from '../interface/TodoList';

function Todo() {
  const { todoList, updateTodo, isLoading, deleteTodoList } = useTodoList();
  const [todoEdit, setTodoEdit] = useState<{ id: number; title: string } | null>(null);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const { setAlertMessage, messages } = AlertMessage();
  const handleEditTodo = (id: number, title: string): void => {
    const todo = {
      id,
      title,
    };
    setTodoEdit(todo);
    setModalActive(true);
  };

  const onCloseModal = (): void => {
    setTodoEdit(null);
    setModalActive(false);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoList!(id, () => {
      setAlertMessage('Todo List is deleted', 'success', 3000);
    });
  };

  const hadleSaveTodo = (id: number, title: string, callback: () => void): void => {
    if (title === '') {
      setAlertMessage('Todo List is required!', 'error', 3000);
      return;
    }
    updateTodo!(id, title, () => {
      setAlertMessage('Todo List updated', 'success', 3000);
      setModalActive(false);
      callback();
    });
  };

  return (
    <div className='flex flex-col items-start'>
      <Logo />
      <TodoInput />
      <TodoMenu />
      <AnimatePresence>
        <div className='flex flex-col space-y-2 mt-4 w-full'>
          {isLoading ? (
            <div className='flex flex-col space-y-2'>
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} />
              ))}
            </div>
          ) : (
            todoList &&
            todoList.map((item: TodoList) => (
              <TodoListItem
                key={item.id}
                id={item.id}
                title={item.title}
                isComplete={item.isComplete}
                onClick={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </AnimatePresence>
      <AnimatePresence>{modalActive && <Overlay onClose={onCloseModal} />}</AnimatePresence>
      <AnimatePresence>
        {modalActive && <Modal onClose={onCloseModal} item={todoEdit!} onSave={hadleSaveTodo} />}
      </AnimatePresence>
      <Alert messages={messages} />
    </div>
  );
}

export default Todo;
