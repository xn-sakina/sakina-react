const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

const templatesPath = path.resolve(__dirname, '../src/templates')
const targetPath = path.resolve(__dirname, '../dist/templates')

const build = async () => {
  await execa.command(`pnpm build:output`, { stdio: 'inherit' })

  await fs.copy(templatesPath, targetPath)
}

build()
