export const fetchLocations = () => (
  // fetch('http://localhost:8080/api/locations')
  fetch('/api/locations')
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`)
      }
      return response.json()
    })
)

export const fetchInteriors = (building) => (
  // fetch('http://localhost:8080/api/interiors/')
  fetch('/api/interiors')
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`)
      }
      return response.json()
    })
)
