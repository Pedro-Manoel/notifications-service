import { Config } from 'jest';

import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testRegex: '.*\\.e2e-spec\\.ts$',
};

export default config;
