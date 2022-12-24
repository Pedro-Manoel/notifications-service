import { Content } from '../../content';

export function makeTestContent(content?: string) {
  return Content.create(content || 'Nova solicitação de amizade');
}
