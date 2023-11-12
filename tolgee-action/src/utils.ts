import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { HttpClient } from '@actions/http-client'
import { mkdirP, which } from '@actions/io'
import { rm } from '@actions/io/lib/io-util'
import * as fs from 'fs'
import { LanguageResponse } from './types'

const base_url = 'https://app.tolgee.io/v2'
const languages_url = `${ base_url }/projects/languages`
const export_url = `${ base_url }/projects/export?format=JSON&filterState=TRANSLATED%2CREVIEWED%2CDISABLED`

async function extractProjectLanguages(httpClient: HttpClient, api_key: string) {
  const r_lang = await httpClient.getJson<LanguageResponse>(languages_url, {
    'X-API-KEY': api_key
  })
  core.debug(JSON.stringify(r_lang.result))

  if (r_lang.statusCode !== 200 || !r_lang.result) throw new Error(`HTTP request failed. Received: ${ r_lang.statusCode }`)

  const projectLocales = r_lang.result._embedded.languages
  return projectLocales.map(locale_metadata => ({
    importSymbol: locale_metadata.tag.toLowerCase().replace('-', '_'),
    enumName: locale_metadata.tag.toUpperCase().replace('-', '_'),
    tag: locale_metadata.tag,
    originalName: locale_metadata.originalName
  })).sort((a, b) => a.tag.localeCompare(b.tag))
}

export async function updateLanguagesMetadata(httpClient: HttpClient, api_key: string) {
  const metadata = await extractProjectLanguages(httpClient, api_key)
  let generated = ''

  // import statements
  metadata.forEach(lang => (generated += `import ${ lang.importSymbol } from './${ lang.tag }.json'\n`))

  // typedefs
  generated += '\ntype LocaleDef = { title: string; value: Locales }\n\n'

  // locales enum
  generated += 'export enum Locales {\n'
  metadata.forEach(lang => (generated += `  ${ lang.enumName } = '${ lang.tag }',\n`))
  generated += '}\n\n'

  // locales def
  generated += 'export const LOCALES: LocaleDef[] = [\n'
  metadata.forEach(lang => (generated += `  { title: '${ lang.originalName }', value: Locales.${ lang.enumName } },\n`))
  generated += ']\n\n'

  // i18n messages
  generated += 'export const messages: Record<Locales, any> = {\n'
  metadata.forEach(lang => (generated += `  [Locales.${ lang.enumName }]: ${ lang.importSymbol },\n`))
  generated += '}\n\nexport const defaultLocale = Locales.EN\nexport const fallbackLocale = Locales.EN\n'

  await mkdirP('./src/locales')
  fs.writeFileSync('./src/locales/index.ts', generated)
}

export async function exportLocaleData(api_key: string) {
  const curlPath = await which('curl', true)
  const unzipPath = await which('unzip', true)

  await exec(curlPath, ['-H', `X-API-KEY: ${ api_key }`, export_url, '-o', 'locales.zip'])
  await exec(unzipPath, ['-o', '-d', './src/locales', 'locales.zip'])
  await rm('locales.zip')
}

export async function commitChanges(committer_name: string, committer_email: string, commit_message: string) {
  if (committer_name === '' || committer_email === '' || commit_message === '') {
    core.debug('Info not passed, skipping commit step')
    return
  }

  const gitPath = await which('git', true)

  let hasChanged = false

  await exec(gitPath, ['diff', '--exit-code'])
  .then(value => hasChanged = value !== 0)
  .catch(() => (hasChanged = true))

  if (!hasChanged) {
    core.info('No changes detected. Skipping commit step...')
    return
  }

  core.info('Changes detected. Commiting to repo...')

  await exec(gitPath, ['add', '.'])
  await exec(gitPath, ['config', '--global', 'user.name', committer_name])
  await exec(gitPath, ['config', '--global', 'user.email', committer_email])
  await exec(gitPath, ['commit', '-m', commit_message])
  await exec(gitPath, ['push'])
}