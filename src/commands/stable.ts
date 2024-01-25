import { registerQuery } from './utils'

export type StableType = 'text' | 'value'

const validStableTypes = ['text', 'value']

// set to console.log if you want to debug the command
const logger = Cypress._.noop
// const logger = console.log

registerQuery(
  'stable',
  function (
    type: StableType,
    ms: number = 1000,
    options: CyOptions = { log: true },
  ) {
    const shouldLog = 'log' in options ? options.log : true

    // make sure this query command respects the timeout option
    const timeout =
      'timeout' in options
        ? options.timeout
        : Cypress.config('defaultCommandTimeout')
    this.set('timeout', timeout)

    if (!validStableTypes.includes(type)) {
      throw new Error(`unknown stable type ${type}`)
    }

    const log =
      shouldLog &&
      Cypress.log({
        name: `stable ${type}`,
        message: `stable for ${ms}ms`,
        timeout,
      })
    logger(log)

    if (type === 'text') {
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
            if (shouldLog) {
              log.set('consoleProps', () => {
                return {
                  time: now - started,
                  duration: now - initialAt,
                  result: initialText,
                }
              })
            }
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
    } else if (type === 'value') {
      let started = null
      let initialValue = null
      let initialAt = null
      return ($el) => {
        if (initialValue === null) {
          started = +new Date()
          initialValue = $el.val()
          initialAt = started
          logger('started with value %o', initialValue)
          throw new Error('start')
        }
        if ($el.val() === initialValue) {
          const now = +new Date()
          if (now - started > ms) {
            logger(
              'after %dms stable val %o',
              now - started,
              initialValue,
            )
            if (shouldLog) {
              log.set('consoleProps', () => {
                return {
                  time: now - started,
                  duration: now - initialAt,
                  result: initialValue,
                }
              })
            }
            // yield the original element
            // so we can chain more commands and assertions
            return $el
          } else {
            throw new Error('waiting')
          }
        } else {
          started = +new Date()
          initialValue = $el.val()
          logger('value changed to %o', initialValue)
          throw new Error('reset')
        }
      }
    }
  },
)
