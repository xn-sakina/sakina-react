import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { log } from '../log'

const TEMPLATES = {
  singleModule: path.join(__dirname, '../templates/SingleReactModule.tsx'),
}
const REPLACE = {
  singleModule: `SingleReactModule`,
  styleTag: `{{style}}`,
  styleImport: `import styles from './index.module.scss'\n`,
}

export const generateReactModule = ({
  rootDir,
  moduleName,
  isSingleModuleFile,
  isForce = false,
}: {
  rootDir: string
  moduleName: string
  isSingleModuleFile: boolean
  isForce?: boolean
}) => {
  const getTemplateContent = (fileName: string, needStyle: boolean = false) => {
    const content = fs.readFileSync(TEMPLATES.singleModule, {
      encoding: 'utf-8',
    })
    const handleContent = content.replace(
      new RegExp(REPLACE.singleModule, 'gi'),
      fileName
    )
    return handleContent.replace(
      REPLACE.styleTag,
      needStyle ? REPLACE.styleImport : ''
    )
  }

  // is single file
  if (isSingleModuleFile) {
    const targetPath = path.join(rootDir, `./${moduleName}.tsx`)
    const targetDir = path.dirname(targetPath)
    const targetFileName = path.basename(moduleName)
    let isNeedGenerate = true
    if (fs.existsSync(targetPath) && !isForce) {
      log(
        `${chalk.yellow(targetFileName)} file existed, you can use ${chalk.blue(
          '--force'
        )} override`
      )
      isNeedGenerate = false
    }
    if (!isNeedGenerate) {
      return
    }
    // ensure path
    fs.ensureDirSync(targetDir)
    // save
    fs.writeFileSync(targetPath, getTemplateContent(targetFileName, false), {
      encoding: 'utf-8',
    })
    // log
    log(`generate single react module ${chalk.green(targetFileName)} success!`)
    return
  }

  // for dir module
  const targetPath = path.join(rootDir, `./${moduleName}/index.tsx`)
  const targetDir = path.dirname(targetPath)
  const dirName = path.basename(targetDir)
  let isNeedGenerate = true
  if (fs.existsSync(targetDir) && !isForce) {
    log(
      `${chalk.yellow(dirName)} dir existed, you can use ${chalk.blue(
        '--force'
      )} override files.`
    )
    isNeedGenerate = false
  }
  if (!isNeedGenerate) {
    return
  }
  // generate
  fs.ensureDirSync(targetDir)
  // save file
  fs.writeFileSync(targetPath, getTemplateContent(dirName, true), {
    encoding: 'utf-8',
  })
  // save style file
  const styleFilePath = path.resolve(targetDir, './index.module.scss')
  fs.writeFileSync(styleFilePath, '', { encoding: 'utf-8' })
  // log
  log(`generate complete react module ${chalk.green(dirName)} success!`)
}
