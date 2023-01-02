import { ApiTags } from '@nestjs/swagger';

export function ApiTagsModule(...tags: string[]): ClassDecorator {
  return (target: object) => {
    const controllers = (Reflect.getMetadata('controllers', target) || []) as ((
      ...args: any[]
    ) => any)[];

    controllers.forEach((controller) => ApiTags(...tags)(controller));
  };
}
