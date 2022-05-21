import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { dateTimeFormatting } from 'config/ui';
import Todo from 'domain/Todo';
import moment from 'moment';
import { memo } from 'react';
import StatusIcon from 'ui/atoms/StatusIcon';

import type { FC, MouseEvent } from "react";

type TodoAction = (todo: Todo) => void;

type Props = Todo & {
  readonly onEdit: TodoAction;
  readonly onDelete: TodoAction;
};

const TodoCard: FC<Props> = ({ onEdit, onDelete, ...todoProps }) => {
  const { description, dueDate, status } = todoProps;

  const handleAction =
    (todoProps: Todo, callback: TodoAction) => (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      callback(todoProps);
    };

  return (
    <Card onClick={handleAction(todoProps, onEdit)}>
      <CardActionArea
        sx={{
          minWidth: 300,
          maxWidth: 500,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, auto)",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "min-content 1fr",
            columnGap: 2,
            alignItems: "center",
          }}
        >
          <Avatar>
            <StatusIcon status={status} />
          </Avatar>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {description}
            </Typography>
            <br />
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="caption"
              color="text.secondary"
            >
              {moment(dueDate).format(dateTimeFormatting)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <IconButton
            color="success"
            aria-label="edit-todo"
            onClick={handleAction(todoProps, onEdit)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete-todo"
            onClick={handleAction(todoProps, onDelete)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default memo(TodoCard);
