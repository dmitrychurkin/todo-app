import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Todo from 'domain/Todo';
import useTodo from 'infrastructure/TodoService';
import { useLayout } from 'providers/Layout';
import { memo, useState } from 'react';
import TodoCard from 'ui/molecules/TodoCard';
import TodoForm, { getInitialValues } from 'ui/molecules/TodoForm';

const Todos = () => {
  const theme = useTheme();
  const { gridTemplateColumns } = useLayout();
  const { getTodos, upsertTodo, deleteTodo } = useTodo();

  const [, forceRender] = useState({});
  const [activeTodo, setActiveTodo] = useState<Todo>(getInitialValues);
  const [isOpen, setOpenState] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenState(true);
  };

  const handleCloseDialog = () => {
    setOpenState(false);
    setActiveTodo(getInitialValues);
  };

  const handleSubmitTodo = async (todoFormValues: Todo) => {
    upsertTodo(todoFormValues);
    handleCloseDialog();
  };

  const handleEditTodo = (todo: Todo) => {
    setActiveTodo(todo);
    handleOpenDialog();
  };

  const handleDeleteTodo = (todo: Todo) => {
    deleteTodo(todo.id!);
    forceRender({});
  };

  const todos = getTodos();

  return (
    <>
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          maxWidth: 1200,
          my: 2,
          gridTemplateColumns,
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "initial",
          },
        }}
        gap={2}
      >
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoCard
              {...todo}
              key={todo.id}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : (
          <Box
            sx={{
              height: "calc(100vh - 96px)",
              display: "grid",
              placeContent: "center",
            }}
          >
            <Typography variant="h5" color="text.secondary">
              Looks like nothing todo yet ;)
            </Typography>
            <Button onClick={handleOpenDialog}>Add your first todo</Button>
          </Box>
        )}
      </Box>
      <Tooltip title="Add todo">
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
          aria-label="add todo"
          onClick={handleOpenDialog}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Add task</DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
          }}
        >
          <TodoForm initialValues={activeTodo} onSubmit={handleSubmitTodo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit" form="todoForm">
            Add todo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(Todos);
