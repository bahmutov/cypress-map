declare namespace Cypress {
  interface Chainable {
    /**
     * A query command that passes each element from the list or jQuery object
     * through the given synchronous function (or extracts the named property)
     * @see https://github.com/bahmutov/cypress-map
     * @example
     *  cy.get('#items li').map('innerText')
     */
    map(fnOrProperty: string | Function): Chainable<any>

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
    update(prop: string, callback: function): Chainable<any>

    /**
     * Returns an object or DOM element from the collection at index K.
     * Returns elements from the end of the collection for negative K.
     * @see https://github.com/bahmutov/cypress-map
     * @param index The index of the element
     * @example
     *  cy.get('li').eq(0) // the first DOM element
     * @example
     *  cy.wrap([...]).eq(-1) // the last item in the array
     */
    at(index: number): Chainable<any>

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
    print(format?: string | function): Chainable<any>

    /**
     * Collects all cells from the table subject into a 2D array of strings.
     * You can slice the array into a smaller region, like a single row, column,
     * or a 2D region.
     * @example cy.get('table').table()
     * @example cy.get('table').table(0, 0, 2, 2)
     */
    table(x?: number, y?: number, w?: number, h?: number): Chainable<string[][]>

    /**
     * Invokes the method on the current subject.
     * This is a COMMAND, not a query, so it won't retry, unlike the stock `cy.invoke`
     */
    invokeOnce(methodName: string, ...args: unknown[]): Chainable<any>
  }
}
