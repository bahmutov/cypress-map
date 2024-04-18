import { registerQuery } from './utils'

export type StableType = 'text' | 'value' | 'element' | 'css'

const validStableTypes = ['text', 'value', 'element', 'css']

// set to console.log if you want to debug the command
const logger = Cypress._.noop
// const logger = console.log

function stableCss(
  param: string,
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

  const message = `stable ${param} for ${ms}ms`
  const log =
    shouldLog &&
    Cypress.log({
      name: `stable css`,
      message,
      timeout,
    })
  logger(log)

  let started = null
  let initialValue = null
  let initialAt = null
  return ($el) => {
    if (initialValue === null) {
      started = +new Date()
      initialValue = $el.css(param)
      initialAt = started
      logger('started with CSS value %o', initialValue)
      throw new Error('start')
    }
    if ($el.css(param) === initialValue) {
      const now = +new Date()
      if (now - started > ms) {
        logger(
          'after %dms stable CSS %s %o',
          now - started,
          param,
          initialValue,
        )
        if (shouldLog) {
          log.set('consoleProps', () => {
            return {
              time: now - started,
              duration: now - initialAt,
              css: param,
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
      initialValue = $el.css(param)
      logger('CSS value %s changed to %o', param, initialValue)
      throw new Error('reset')
    }
  }
}

function stableNonCss(
  type: StableType,
  ms: number = 1000,
  options: CyOptions = { log: true },
) {
  if (!validStableTypes.includes(type)) {
    throw new Error(`unknown cy.stable type "${type}"`)
  }

  const shouldLog = 'log' in options ? options.log : true

  // make sure this query command respects the timeout option
  const timeout =
    'timeout' in options
      ? options.timeout
      : Cypress.config('defaultCommandTimeout')
  this.set('timeout', timeout)

  const message = `stable for ${ms}ms`
  const log =
    shouldLog &&
    Cypress.log({
      name: `stable ${type}`,
      message,
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
  } else if (type === 'element') {
    let started = null
    let initialElement = null
    let initialAt = null
    return ($el) => {
      if (initialElement === null) {
        if ($el.length !== 1) {
          throw new Error('Expected one element to check if stable')
        }
        started = +new Date()
        initialElement = $el[0]
        initialAt = started
        throw new Error('start')
      }
      if ($el[0] === initialElement) {
        const now = +new Date()
        if (now - started > ms) {
          logger('after %dms stable element', now - started)
          if (shouldLog) {
            log.set('consoleProps', () => {
              return {
                time: now - started,
                duration: now - initialAt,
                result: initialElement,
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
        initialElement = $el[0]
        logger(
          'element changed to "%s"',
          initialElement.innerText.substring(0, 100) + '...',
        )
        throw new Error('reset')
      }
    }
  }
}

registerQuery(
  'stable',
  function (
    type: StableType,
    param: string,
    ms: number = 1000,
    options: CyOptions = { log: true },
  ) {
    if (!validStableTypes.includes(type)) {
      throw new Error(`unknown cy.stable type "${type}"`)
    }

    if (type === 'css') {
      return stableCss.call(this, param, ms, options)
    } else {
      if (arguments.length === 1) {
        return stableNonCss.call(this, type)
      } else if (arguments.length === 2) {
        return stableNonCss.call(this, type, param)
      } else if (arguments.length === 3) {
        return stableNonCss.call(this, type, param, ms)
      }
    }
  },
)
