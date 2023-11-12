import * as core from '@actions/core'
import { HttpClient } from '@actions/http-client'
import { commitChanges, exportLocaleData, updateLanguagesMetadata } from './utils'

async function main() {
  try {
    const tolgee_secret = core.getInput('tolgee_secret', { required: true, trimWhitespace: true })
    const author_name = core.getInput('author_name', { required: false, trimWhitespace: true })
    const author_email = core.getInput('author_email', { required: false, trimWhitespace: true })
    const commit_message = core.getInput('commit_message', { required: false, trimWhitespace: true })

    core.debug('Extracting languages')
    await updateLanguagesMetadata(new HttpClient('VueTorrent GitHub Actions workflow'), tolgee_secret)

    core.debug('Exporting locale data to ./src/locales')
    await exportLocaleData(tolgee_secret)

    core.debug('Committing changes to repo')
    await commitChanges(author_name, author_email, commit_message)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

main()