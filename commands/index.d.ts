/**
 * Specifies a function callback for different object properties
 */
interface PropertyCallbacks {
  [key: string]: Function
}

/**
 * Type for most Cypress commands to control logging and timeout.
 */
type CyOptions = Partial<Cypress.Loggable & Cypress.Timeoutable>

declare namespace Cypress {
  interface Chainable {
    /**
     * A query command that passes each element from the list or jQuery object
     * through the given synchronous function (or extracts the named property)
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('#items li').map('innerText')
     * @example
     *  cy.wrap(['10', '20']).map(Number) // [10, 20]
     * @example
     *  cy.wrap({ age: '42' }).map({ age: Number }) // { age: 42 }
     */
    map(
      mapper: string | Function | PropertyCallbacks,
      options?: CyOptions,
    ): Chainable<any>

    /**
     * A query command that takes every item from the current subject
     * and calls a method on it by name, passing the given arguments.
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  // remove the $ from each string
     *  cy.get('#prices li').map('innerText').mapInvoke('replace', '$', '')
     */
    mapInvoke(propertyName: string, ...args: any[]): Chainable<any>

    /**
     * A regular cy command that takes every item from the current subject
     * and calls the given function with the item and its index.
     * The function could be synchronous, or async. The function could
     * call other Cypress commands and yield the value. All async and
     * Cypress commands are queued up and execute one at a time.
     * The current subject should be an array.
     * Yields the final list of results.
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  // fetch the users from a list of ids
     *  cy.get(ids).mapChain(id => cy.request('/users/' + id)).then(users => ...)
     */
    mapChain(fn: Function): Chainable<any>

    /**
     * A query command that can log the data without changing it. Useful
     * for debugging longer command chains.
     * @param fn Function that does not modify the data, `console.log` by default.
     * @param label Extra label to log to the Command Log
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('#items li').map('innerText').tap(console.log)
     */
    tap(fn?: Function, label?: string): Chainable<any>

    /**
     * A query command that can log the data without changing it. Useful
     * for debugging longer command chains.
     * @param label Extra label to log to the Command Log
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('#items li').map('innerText').tap('text')
     */
    tap(label: string): Chainable<any>

    /**
     * A query command that reduces the list to a single element based on the predicate.
     * @see https://github.com/bahmutov/cypress-map
     * @param fn Callback function that takes the current accumulator and item
     * @param initialValue Optional starting value
     * @example
     *  cy.get('#items li').map('innerText')
     */
    reduce(fn: Function, initialValue?: any): Chainable<any>

    /**
     * A query command that applies the given callback to the subject.
     * @see https://github.com/bahmutov/cypress-map
     * @param fn Callback function to call
     * @example
     *  cy.wrap(2).apply(double).should('equal', 4)
     */
    apply(fn: Function): Chainable<any>

    /**
     * Creates a callback to apply to the subject by partially applying known arguments.
     * @see https://github.com/bahmutov/cypress-map
     * @param fn Callback function to call
     * @param knownArguments The first argument(s) to the callback
     * @example
     *  cy.wrap(2).partial(Cypress._.add, 4).should('equal', 6)
     */
    partial(
      fn: Function,
      ...knownArguments: unknown[]
    ): Chainable<any>

    /**
     * A query command that returns the first element / item from the subject.
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('...').primo()
     * @example
     *  cy.wrap([1, 2, 3]).primo().should('equal', 1)
     */
    primo(): Chainable<any>

    /**
     * Returns the property of the object or DOM element, skipping through jQuery abstraction.
     * @see https://github.com/bahmutov/cypress-map
     * @param name The property name to yield
     * @example
     *  cy.get('#items li.matching').last().prop('ariaLabel')
     */
    prop(name: string): Chainable<any>

    /**
     * Transforms the named property inside the current subjet
     * by passing it through the given callback
     * @see https://github.com/bahmutov/cypress-map
     * @param prop The name of the property you want to update
     * @param callback The function that receives the property value and returns the updated value
     * @example
     *  cy.wrap({ age: '20' }).update('age', Number).should('deep.equal', {age: 20})
     */
    update(prop: string, callback: Function): Chainable<any>

    /**
     * Returns an object or DOM element from the collection at index K.
     * Returns elements from the end of the collection for negative K.
     * @see https://github.com/bahmutov/cypress-map
     * @param index The index of the element
     * @example
     *  cy.get('li').at(0) // the first DOM element
     * @example
     *  cy.wrap([...]).at(-1) // the last item in the array
     */
    at(index: number): Chainable<any>

    /**
     * Returns a randomly picked item from the current subject.
     * Uses `_.sample` under the hood.
     * @param n Maximum number of items to pick, 1 by default
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('li').sample() // one of the list elements
     * @example
     *  cy.wrap([...]).sample() // a random item from the array
     */
    sample(n?: number): Chainable<any>

    /**
     * Prints the current subject and yields it to the next command or assertion.
     * @see https://github.com/bahmutov/cypress-map
     * @see https://github.com/davidchambers/string-format
     * @param format Optional format string, supports "%" and "{}" notation
     * @example
     *  cy.wrap(42)
     *    .print('the answer is %d')
     *    .should('equal', 42)
     * @example
     *  cy.wrap({ name: 'Joe' }).print('person %o')
     * @example
     *  cy.wrap({ name: 'Joe' }).print('person {}')
     * @example
     *  cy.wrap({ name: 'Joe' }).print('person {0}')
     * @example
     *  cy.wrap({ name: { first: 'Joe' } }).print('Hello, {0.name.first}')
     * @example
     *  cy.wrap(arr).print('array length {0.length}')
     */
    print(format?: string | Function): Chainable<any>

    /**
     * Collects all cells from the table subject into a 2D array of strings.
     * You can slice the array into a smaller region, like a single row, column,
     * or a 2D region.
     * @example cy.get('table').table()
     * @example cy.get('table').table(0, 0, 2, 2)
     */
    table(
      x?: number,
      y?: number,
      w?: number,
      h?: number,
    ): Chainable<string[][]>

    /**
     * Invokes the method on the current subject.
     * This is a COMMAND, not a query, so it won't retry, unlike the stock `cy.invoke`
     */
    invokeOnce(methodName: string, ...args: unknown[]): Chainable<any>

    /**
     * A query command that finds an item in the array or jQuery object.
     * Uses Lodash _.find under the hood.
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('...').findOne({ innerText: '...' })
     * @example
     *  cy.wrap([1, 2, 3]).findOne(n => n === 3).should('equal', 3)
     */
    findOne(predicate: object | Function): Chainable<any>

    /**
     * A query that calls `JSON.parse(JSON.parse(subject))`
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('selector')
     *    // yields DOMStringMap
     *    .should('have.prop', 'dataset')
     *    .toPlainObject()
     *    .should('deep.include', { ... })
     */
    toPlainObject(): Chainable<Object>

    /**
     * Saves current subject in `Cypress.env` object.
     * Note: Cypress.env object is reset before the spec run,
     * but the changed values are passed from test to test.
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.wrap('hello').asEnv('greeting')
     */
    asEnv(name: string): Chainable<any>
  }
}
