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
     * @example
     *  cy.get('#items li').map('innerText')
     */
    reduce(fn: Function): Chainable<any>
  }
}
