const API_KEY = import.meta.env.VITE_NASA_API_KEY

// Get the date of the last 7 days (minus today)
let date = {
    end: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 ).toISOString().split('T')[0],
    start: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
} 


export const load = async ({ fetch }) => {

    const fetchNeo = async (date) => {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.start}&end_date=${date.end}&api_key=${API_KEY}`)
        const data = await response.json()
        const asteroids = Object.values(data.near_earth_objects).flat()
        return asteroids
    }

    return {
        asteroids:  await fetchNeo(date),
        date
    }
}