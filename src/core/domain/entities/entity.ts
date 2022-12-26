import { Replace } from '@shared/types/replace';

import { Id } from './id';

interface IEntityProps {
  id: Id;
  createdAt: Date;
  updatedAt?: Date | null;
}

type Props<T> = T & IEntityProps;

export type PropsConstructor<T> = T &
  Replace<IEntityProps, { createdAt?: Date; id?: Id }>;

export abstract class Entity<T> implements IEntityProps {
  protected readonly props: Props<T>;

  constructor(props: PropsConstructor<T>) {
    props.id = props.id || Id.create();
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
