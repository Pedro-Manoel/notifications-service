import { randomUUID } from 'node:crypto';

import { Replace } from '@shared/types/replace';

interface IEntityProps {
  id: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

type Props<T> = T & IEntityProps;

export type PropsConstructor<T> = T &
  Replace<IEntityProps, { createdAt?: Date; id?: string }>;

export abstract class Entity<T> implements IEntityProps {
  protected readonly props: Props<T>;

  constructor(props: PropsConstructor<T>) {
    props.id = props.id || randomUUID();
    props.createdAt = props.createdAt || new Date();
    props.updatedAt = props.updatedAt || new Date();
    this.props = props as Props<T>;
  }

  get id() {
    return this.props.id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
