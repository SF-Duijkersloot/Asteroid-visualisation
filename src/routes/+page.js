const API_KEY = import.meta.env.VITE_NASA_API_KEY

// Get the date of the last 7 days (minus today)
let date = {
    end: '2024-10-17',
    start: '2024-10-10'
} 

// let date = {
//     end: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 ).toISOString().split('T')[0],
//     start: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
// } 
export const load = async () => {

    const fetchNeo = async (date) => {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date.start}&end_date=${date.end}&api_key=${API_KEY}`)
        const data = await response.json()
        const asteroids = Object.values(data.near_earth_objects).flat()
        // log the 3 largerst asteroids size in km and the velocity in km/s
        console.log(asteroids.sort((a, b) => b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max).slice(0, 3).map(asteroid => {
            return {
                size: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second,
                nearMiss: asteroid.close_approach_data[0].miss_distance.lunar
            }
        }))
        return asteroids
    }

    return {
        asteroids:  await fetchNeo(date),
        date
    }
}