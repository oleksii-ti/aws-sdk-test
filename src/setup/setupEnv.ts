import dotenv from 'dotenv'
if (!process.env.GITHUB_ACTIONS) {
  dotenv.config({ path: `.${process.env.NODE_ENV}.env` })
}
