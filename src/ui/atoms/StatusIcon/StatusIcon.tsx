import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LoopIcon from '@mui/icons-material/Loop';
import { Status } from 'domain/Todo';
import { memo } from 'react';

import type { FC } from "react";

type Props = {
  readonly status: Status;
};

const IconMappingStrategy = new Map()
  .set(Status.Todo, <FormatListBulletedIcon color="primary" />)
  .set(Status.InProgress, <LoopIcon color="warning" />)
  .set(Status.Done, <CheckCircleOutlineIcon color="success" />);

const StatusIcon: FC<Props> = ({ status }) => IconMappingStrategy.get(status);

export default memo(StatusIcon);
