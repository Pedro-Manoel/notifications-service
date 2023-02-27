import { Config } from 'jest';

import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testRegex: '.*\\.spec\\.ts$',
};

export default config;
