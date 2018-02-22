export const fetchLocations = () => (
  fetch('http://localhost:8080/api/locations')
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`)
      }
      return response.json()
    })
)
