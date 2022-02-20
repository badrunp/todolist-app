import React, { useEffect } from 'react';
import Layout from './components/Layout';
import TodoContextProvider from './Context';
import Todo from './pages/Todo';

function App(): React.ReactElement {
  useEffect(() => {
    document.title = 'TodoList App';
  }, []);
  return (
    <TodoContextProvider>
      <Layout>
        <Todo />
      </Layout>
    </TodoContextProvider>
  );
}

export default App;
