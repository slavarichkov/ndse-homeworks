fetch('http://backend:3000/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: 'example data'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))