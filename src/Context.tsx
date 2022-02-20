import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ref, onValue, remove, set, update } from 'firebase/database';
import db from './firebase';
import TodoList from './interface/TodoList';

type TodoListObject = {
  todoList?: TodoList[];
  addTodoList?: (title: string, callback: () => void) => void;
  deleteTodoList?: (id: number, callback: () => void) => void;
  updateTodo?: (id: number, title: string, callback: () => void) => void;
  isCompleteUpdate?: (id: number, bol: boolean) => void;
  active?: number;
  updateActive?: (id: number) => void;
  setIsY?: (y: number) => void;
  isY?: number;
  isLoading?: boolean;
  setIsLoading?: (bol: boolean) => void;
};

export const TodoListContext = createContext<TodoListObject>({});
export const useTodoList = (): TodoListObject => useContext<TodoListObject>(TodoListContext);

function TodoContextProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [active, setActive] = useState<number>(1);
  const [y, setY] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbref = ref(db, 'todos');
    onValue(dbref, (snapshot) => {
      const todos: Array<{ id: number; title: string; isComplete: boolean }> = [];
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).map((data: any) => {
          const todo: TodoList = data[1];
          todos.push(todo);
        });
        setTodoList(todos);
      } else {
        setTodoList([]);
      }
      setLoading(false);
    });
  }, []);

  const addTodoList = async (title: string, callback: () => void): Promise<void> => {
    try {
      const id = new Date().getTime();
      await set(ref(db, `todos/${id}`), {
        id,
        title,
        isComplete: false,
      });

      callback();
    } catch (error) {
      console.log(error);
    }
    // setTodoList([...todoList, { id, title, isComplete: false }]);
  };

  const deleteTodoList = async (id: number, callback: () => void): Promise<void> => {
    try {
      await remove(ref(db, `/todos/${id}`));
      callback();
    } catch (error) {
      console.log(error);
    }
    // const newTodo = todoList.filter((item) => item.id !== id);
    // setTodoList(newTodo);
  };

  const updateTodoList = async (id: number, title: string, callback: () => void): Promise<void> => {
    try {
      await update(ref(db, `/todos/${id}`), {
        title,
      });
      callback();
    } catch (error) {
      console.log(error);
    }

    // const newTodo = todoList.map((item) => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       title,
    //     };
    //   }
    //   return item;
    // });

    // setTodoList(newTodo);
  };

  const ToggleComplete = async (id: number, bol: boolean): Promise<void> => {
    try {
      await update(ref(db, `/todos/${id}`), {
        isComplete: bol,
      });
    } catch (error) {
      console.log(error);
    }

    // const newTodo = todoList.map((item): TodoList => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       isComplete: !item.isComplete,
    //     };
    //   }

    //   return item;
    // });

    // setTodoList(newTodo);
  };

  const updateActive = (id: number): void => {
    setActive(id);
  };

  const getTodoList = (): TodoList[] => {
    return todoList
      .map((item) => item)
      .sort((a, b) => b.id - a.id)
      .filter((item) => {
        if (active === 2) {
          return item.isComplete === true;
        }
        if (active === 3) {
          return item.isComplete === false;
        }

        return item;
      });
  };

  const setIsY = (num: number): void => {
    setY(num);
  };

  const setFinishLoading = (bol: boolean): void => {
    setLoading(bol);
  };

  const todoObject = useMemo<TodoListObject>(
    () => ({
      todoList: getTodoList(),
      addTodoList,
      deleteTodoList,
      isCompleteUpdate: ToggleComplete,
      active,
      updateActive,
      isY: y,
      setIsY,
      updateTodo: updateTodoList,
      isLoading: loading,
      setIsLoading: setFinishLoading,
    }),
    [todoList, active, loading]
  );

  return <TodoListContext.Provider value={todoObject}>{children}</TodoListContext.Provider>;
}

export default TodoContextProvider;
