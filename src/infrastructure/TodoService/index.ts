import { storageEngine, storageKey } from 'config/persistence';
import Todo from 'domain/Todo';
import { getItem, getStorage, setItem } from 'infrastructure/Persistence';
import { useSession } from 'providers/Session';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { User } from "firebase/auth";

const getAllTodos: () => Array<Todo> = () => {
  const storage = getStorage(storageEngine);
  return getItem(storage, storageKey) ?? [];
};

const setAllTodos = (todos: Array<Todo>) => {
  const storage = getStorage(storageEngine);
  setItem(storage, storageKey, todos);
};

const getUserTodos: (userId: string) => Array<Todo> = (userId: string) =>
  getAllTodos().filter((todo) => todo.userId === userId);

const useTodo = () => {
  const user = useSession();

  const getTodos = useCallback(
    () => (user ? getUserTodos(user.uid) : getAllTodos()),
    [user]
  );

  const upsertTodo = useCallback(
    (newOrUpdateTodo: Todo) => {
      // const todos: Array<Todo> = getTodos().map((todo) =>
      //   todo.id === newOrUpdateTodo.id ? newOrUpdateTodo : todo
      // );
      const todos: Array<Todo> = getAllTodos();

      setAllTodos(
        newOrUpdateTodo.id
          ? todos
          : [
              ...todos,
              {
                ...newOrUpdateTodo,
                userId: (user as User)?.uid,
                id: uuidv4(),
              },
            ]
      );
    },
    [user]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setAllTodos(getTodos().filter((todo) => todo.id !== id));
    },
    [getTodos]
  );

  return {
    getTodos,
    upsertTodo,
    deleteTodo,
  };
};

export default useTodo;
