#!/usr/bin/env node

const { program } = require('commander')
const pkg = require('../package.json')
const { generateReactModule } = require('../dist')

/**
 * generate single react module file
 * @example sr gs AnimeList
 *            => AnimeList.tsx
 */
program
  .command('gs <module_name>')
  .description('generate single react module file')
  .option('-f, --force', 'force override file', false)
  .action((moduleName, { force }) => {
    const rootDir = process.cwd()
    generateReactModule({
      rootDir,
      moduleName,
      isForce: force,
      isSingleModuleFile: true,
    })
  })

/**
 * generate complete react module
 * @example sr g AnimeList
 *            => AnimeList/index.tsx
 *               AnimeList/index.module.scss
 */
program
  .command('g <module_name>')
  .description('generate complete react module')
  .option('-f, --force', 'force override files', false)
  .action((moduleName, { force }) => {
    const rootDir = process.cwd()
    generateReactModule({
      rootDir,
      moduleName,
      isForce: force,
      isSingleModuleFile: false,
    })
  })

program.version(pkg.version)
program.parse(process.argv)
