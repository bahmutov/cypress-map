const initialList = [
  {
    name: 'Joe Z',
    date: '1990-02-25',
    age: 20,
  },
  {
    name: 'Anna',
    date: '2010-03-26',
    age: 37,
  },
  {
    name: 'Dave',
    date: '1997-12-23',
    age: 25,
  },
  {
    name: 'Joseph',
    date: '2001-01-24',
    age: 30,
  },
  {
    name: 'Jonathan',
    date: '2004-02-01',
    age: 30,
  },
]

let list = initialList
let filtered = list
let nameFilter

// utility methods
const itemToRow = (item) =>
  `<tr><td>${item.name}</td><td>${item.date}</td><td>${item.age}</td></tr>`
const listToHtml = (list) => list.map(itemToRow).join('\n')

// the main "render" method
const render = () => {
  if (nameFilter) {
    filtered = list.filter((item) => item.name.includes(nameFilter))
  } else {
    filtered = list
  }
  document.getElementById('people-data').innerHTML = listToHtml(filtered)
}

// set the initial table
fetch('/people').then((r) => {
  if (r.ok) {
    r.json().then((data) => {
      list = data
      render()
    })
  } else {
    // use the default data
    list = initialList
    render()
  }
})

document.getElementById('by-name').addEventListener('input', (e) => {
  nameFilter = e.target.value
  setTimeout(() => {
    render()
  }, 1000)
})
