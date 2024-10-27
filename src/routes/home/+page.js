const API_KEY = import.meta.env.VITE_NASA_API_KEY

const date = {
    start: '2024-10-19',
    end: '2024-10-26'
}

export const load = async ({ fetch }) => {

    const fetchNeo = async (date) => {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.start}&end_date=${date.end}&api_key=${API_KEY}`)
        const data = await response.json()
        const asteroids = Object.values(data.near_earth_objects).flat()
        return asteroids
    }

    return {
        asteroids:  await fetchNeo(date)
    }
}
