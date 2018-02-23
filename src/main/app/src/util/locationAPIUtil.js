export const fetchLocations = () => (
  fetch('/api/locations')
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`)
      }
      return response.json()
    })
)
