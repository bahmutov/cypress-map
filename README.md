# cypress-map [![ci](https://github.com/bahmutov/cypress-map/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bahmutov/cypress-map/actions/workflows/ci.yml) ![cypress version](https://img.shields.io/badge/cypress-12.3.0-brightgreen)

> Extra Cypress query commands for v12+

- 📺 Watch the videos [Cypress v12 Querying Commands Introduction](https://youtu.be/4HpEECek2OE) and [Confirm Table Column](https://youtu.be/UOLQlNmuhY0)
- 📝 Read the blog post [Cypress V12 Is A Big Deal](https://glebbahmutov.com/blog/cypress-v12/)
- 🎓 Covered in my course [Cypress Plugins](https://cypress.tips/courses/cypress-plugins)

## Install

Add this package as a dev dependency

```
$ npm i -D cypress-map
# or using Yarn
$ yarn add -D cypress-map
```

Include this package in your spec or support file to use all custom query commands

```js
import 'cypress-map'
```

Alternative: import only the query commands you need:

```js
import 'cypress-map/commands/map'
import 'cypress-map/commands/tap'
// and so on, see the /commands folder
```

## API

### apply

```js
const double = (n) => n * 2
cy.wrap(100).apply(double).should('equal', 200)
```

### map

```js
cy.get('.matching')
  .map('innerText')
  .should('deep.equal', ['first', 'third', 'fourth'])
```

### mapInvoke

```js
cy.get('#items li')
  .find('.price')
  .map('innerText')
  .mapInvoke('replace', '$', '')
  .mapInvoke('trim')
```

### reduce

```js
cy.get('#items li')
  .find('.price')
  .map('innerText')
  .mapInvoke('replace', '$', '')
  .map(parseFloat)
  .reduce((max, n) => (n > max ? n : max))
// yields the highest price
```

You can provide the initial accumulator value

```js
cy.wrap([1, 2, 3])
  .reduce((sum, n) => sum + n, 10)
  .should('equal', 16)
```

See [reduce.cy.js](./cypress/e2e/reduce.cy.js)

### tap

```js
cy.get('#items li')
  .find('.price')
  .map('innerText')
  .tap() // console.log by default
  .mapInvoke('replace', '$', '')
  .mapInvoke('trim')
  // console.info with extra label
  .tap(console.info, 'trimmed strings')
```

**Notice:** if the label is provided, the callback function is called with label and the subject.

### print

A better `cy.log`: yields the value, intelligently stringifies values using `%` and [string-format](https://github.com/davidchambers/string-format) notation.

```js
cy.wrap(42)
  .print() // "42"
  // and yields the value
  .should('equal', 42)
// pass formatting string
cy.wrap(42).print('the answer is %d') // "the answer is 42"
cy.wrap({ name: 'Joe' }).print('person %o') // 'person {"name":"Joe"}'
// use {0} with dot notation, supported deep properties
// https://github.com/davidchambers/string-format
cy.wrap({ name: 'Joe' }).print('person name {0.name}') // "person name Joe"
// print the length of an array
cy.wrap(arr).print('array length {0.length}') // "array length ..."
// pass your own function to return formatted string
cy.wrap(arr).print((a) => `array with ${a.length} items`)
// if you return a non-string, it will attempt to JSON.stringify it
cy.wrap(arr).print((list) => list[2]) // JSON.stringify(arr[2])
```

See [print.cy.js](./cypress/e2e/print.cy.js) for more examples

### primo

```js
cy.get('.matching')
  .map('innerText')
  .primo()
  .invoke('toUpperCase')
  .should('equal', 'FIRST')
```

See [primo.cy.js](./cypress/e2e/primo.cy.js)

### prop

Works like `cy.its` for objects, but gets the property for jQuery objects, which `cy.its` does not

```js
cy.get('#items li.matching').last().prop('ariaLabel').should('equal', 'four')
```

See [prop.cy.js](./cypress/e2e/prop.cy.js)

### at

Returns a DOM element from jQuery object at position `k`. Returns an item from array at position `k`. For negative index, counts the items from the end.

```js
cy.get('#items li').at(-1).its('innerText').should('equal', 'fifth')
```

See [at.cy.js](./cypress/e2e/at.cy.js)

### table

📝 to learn more about `cy.table` command, read the blog post [Test HTML Tables Using cy.table Query Command](https://glebbahmutov.com/blog/cy-table/).

Extracts all cells from the current subject table. Yields a 2D array of strings.

```js
cy.get('table').table()
```

You can slice the table to yield just a region `.table(x, y, w, h)`

![Table](./images/table.png)

For example, you can get 2 by 2 subregion

```js
cy.get('table')
  .table(0, 2, 2, 2)
  .should('deep.equal', [
    ['Cary', '30'],
    ['Joe', '28'],
  ])
```

See the spec [table.cy.js](./cypress/e2e/table.cy.js) for more examples.

**Tip:** you can combine `cy.table` with `cy.map`, `cy.mapInvoke` to get the parts of the table. For example, the same 2x2 part of the table could be extracted with:

```js
cy.get('table')
  .table()
  .invoke('slice', 2, 4)
  .mapInvoke('slice', 0, 2)
  .should('deep.equal', [
    ['Cary', '30'],
    ['Joe', '28'],
  ])
```

**Tip 2:** to get just the headings row, combine `.table` and `.its` queries

```js
cy.get('table')
  .table(0, 0, 3, 1)
  .its(0)
  .should('deep.equal', ['Name', 'Age', 'Date (YYYY-MM-DD)'])
```

To get the last row, you could do:

```js
cy.get('table').table().invoke('slice', -1).its(0)
```

To get the first column joined into a single array (instead of array of 1x1 arrays)

```js
cy.get('table')
  .table(0, 1, 1) // skip the heading "Name" cell
  // combine 1x1 arrays into one array
  .invoke('flatMap', Cypress._.identity)
  .should('deep.equal', ['Dave', 'Cary', 'Joe', 'Anna'])
```

### invokeOnce

In Cypress v12 `cy.invoke` became a query, which made working with asynchronous methods really unwieldy. The `cy.invokeOnce` is a return the old way of calling the method and yielding the resolved value.

```js
cy.wrap(app)
  // app.fetchName is an asynchronous method
  // that returns a Promise
  .invokeOnce('fetchName')
  .should('equal', 'My App')
```

See the spec [invoke-once.cy.js](./cypress/e2e/invoke-once.cy.js) for more examples.

## cy.invoke vs cy.map vs cy.mapInvoke

Here are a few examples to clarify the different between the `cy.invoke`, `cy.map`, and `cy.mapInvoke` query commands, see [diff.cy.js](./cypress/e2e/diff.cy.js)

```js
const list = ['apples', 'plums', 'bananas']

// cy.invoke
cy.wrap(list)
  // calls ".sort()" on the list
  .invoke('sort')
  .should('deep.equal', ['apples', 'bananas', 'plums'])

// cy.mapInvoke
cy.wrap(list)
  // calls ".toUpperCase()" on every string in the list
  .mapInvoke('toUpperCase')
  .should('deep.equal', ['APPLES', 'PLUMS', 'BANANAS'])

// cy.map
const reverse = (s) => s.split('').reverse().join('')
cy.wrap(list)
  // reverses each string in the list
  .map(reverse)
  .should('deep.equal', ['selppa', 'smulp', 'sananab'])
  // grabs the "length" property from each string
  .map('length')
  .should('deep.equal', [6, 5, 7])
```

## Types

This package includes TypeScript command definitions for its custom commands in the file [commands/index.d.ts](./commands/index.d.ts). To use it from your JavaScript specs:

```js
/// <reference types="cypress-map" />
```

If you are using TypeScript, include this module in your types list

```json
{
  "compilerOptions": {
    "types": ["cypress", "cypress-map"]
  }
}
```

## See also

- [cypress-should-really](https://github.com/bahmutov/cypress-should-really) has similar functional helpers for constructing the `should(callback)` function on the fly.

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips & Tricks Newsletter](https://cypresstips.substack.com/)
- [my Cypress courses](https://cypress.tips/courses)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-map/issues) on Github
