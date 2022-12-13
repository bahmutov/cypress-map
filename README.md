# cypress-map [![ci](https://github.com/bahmutov/cypress-map/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bahmutov/cypress-map/actions/workflows/ci.yml) ![cypress version](https://img.shields.io/badge/cypress-12.0.1-brightgreen)

> Extra Cypress query commands for v12+

📺 Watch the video [Cypress v12 Querying Commands Introduction](https://youtu.be/4HpEECek2OE)

🎓 Covered in my course [Cypress Plugins](https://cypress.tips/courses/cypress-plugins)

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

### primo

```js
cy.get('.matching')
  .map('innerText')
  .primo()
  .invoke('toUpperCase')
  .should('equal', 'FIRST')
```

See [primo.cy.js](./cypress/e2e/primo.cy.js)

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
