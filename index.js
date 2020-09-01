#!/usr/bin/env node
console.log('ytk-cli脚手架工具')

// 命令
const program = require('commander')
// 从github下载
const download = require('download-git-repo')
// loading样式
const ora = require('ora')
// 文字颜色
const chalk = require('chalk')
// 成功和失败图标
const logSymbols = require('log-symbols')

program
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

program
  .command('create <project>')
  .description('初始化项目模版')
  .action(function (project) {
    const spinner = ora('正在下载模版中').start()
    const downLoadUrl = 'http://github.com:youtingkun/vue-template#master'
    download(downLoadUrl, project, { clone: true }, (err) => {
      if (err) {
        // console.log('下载失败', err)
        spinner.fail()
        return console.log(
          logSymbols.error,
          chalk.red('下载失败，失败原因：' + err)
        )
      } else {
        // console.log('下载成功')
        spinner.succeed()
        return console.log(logSymbols.success, chalk.yellow('下载成功'))
      }
    })
  })

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .action(function (env, options) {
    const mode = options.setup_mode || 'normal'
    env = env || 'all'
    console.log('setup for %s env(s) with %s mode', env, mode)
  })

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use')
  .action(function (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode)
  })
  .on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ deploy exec sequential')
    console.log('  $ deploy exec async')
  })

program.parse(process.argv)
