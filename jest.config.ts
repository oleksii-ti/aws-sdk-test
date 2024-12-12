import type { Config } from 'jest'

const config: Config = {
  setupFiles: ['./src/setup/setupEnv.ts', './src/setup/setupAxios.ts'],
}

export default config
