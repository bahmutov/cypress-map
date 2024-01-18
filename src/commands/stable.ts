import { registerQuery } from './utils'

export type StableType = 'text'

// set to console.log if you want to debug the command
const logger = Cypress._.noop

registerQuery('stable', (type: StableType, ms: number = 1000) => {
  if (type !== 'text') {
    throw new Error(`unknown stable type ${type}`)
  }

  const log = Cypress.log({
    name: `stable ${type}`,
    message: `stable for ${ms}ms`,
  })
  logger(log)
  let started = null
  let initialText = null
  let initialAt = null
  return ($el) => {
    if (initialText === null) {
      started = +new Date()
      initialText = $el.text()
      initialAt = started
      logger('started with text "%s"', initialText)
      throw new Error('start')
    }
    if ($el.text() === initialText) {
      const now = +new Date()
      if (now - started > ms) {
        logger(
          'after %dms stable text "%s"',
          now - started,
          initialText,
        )
        log.set('consoleProps', () => {
          return {
            time: now - started,
            duration: now - initialAt,
            result: initialText,
          }
        })
        // yield the original element
        // so we can chain more commands and assertions
        return $el
      } else {
        throw new Error('waiting')
      }
    } else {
      started = +new Date()
      initialText = $el.text()
      logger('text changed to "%s"', initialText)
      throw new Error('reset')
    }
  }
})
