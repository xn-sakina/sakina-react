import chalk from 'chalk'

const prefix = `${chalk.cyan('[sakina-react]')}: `

export const log = (content: string) => {
  console.log(`${prefix}${content}`)
}
