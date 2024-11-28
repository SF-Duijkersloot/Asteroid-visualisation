// Source for +page.js load technique:
// https://www.youtube.com/watch?v=EQy-AYhZIlE&t=550s

const apiKey = import.meta.env.VITE_NASA_API_KEY

/*******************************
          Define Dates
********************************/
const today = new Date()
const oneMonthAgo = new Date(today - 28 * 24 * 60 * 60 * 1000)

/*******************************
        Utility Functions
********************************/
// Format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0]

// Generate date ranges in chunks of 7 days
const generateDateRanges = (startDate, endDate) => {
    const ranges = []
    let current = new Date(startDate)

    while (current < endDate) {
        const next = new Date(current)
        next.setDate(next.getDate() + 7) // Increment by 7 days

        ranges.push({
            start: formatDate(current),
            end: formatDate(next > endDate ? endDate : next),
        })

        current.setDate(current.getDate() + 7) // Move the current date forward
    }

    return ranges
}

/*******************************
         Fetch Function
********************************/
const fetchNeo = async (start, end) => {
    try {
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${apiKey}`
        )
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`)
        }
        const data = await response.json()
        // Return flattened array of asteroids
        return Object.values(data.near_earth_objects).flat()
    } catch (error) {
        console.error(`Failed to fetch NEO data for ${start} to ${end}:`, error)
        return []
    }
}

/*******************************
           Load Export
********************************/
export const load = async () => {
    try {
        // Generate date ranges
        const dateRanges = generateDateRanges(oneMonthAgo, today)

        // Fetch all asteroids data in parallel
        const allAsteroidsData = await Promise.all(
            dateRanges.map(range => fetchNeo(range.start, range.end))
        )

        // Flatten results and filter dangerous asteroids
        const allAsteroids = allAsteroidsData
            .flat()
            .filter(asteroid => +asteroid.close_approach_data[0].miss_distance.lunar < 25)
        // Log total number of potentially hazardous asteroids
        const hazardousCount = allAsteroids.filter(
            asteroid => asteroid.is_potentially_hazardous_asteroid
        ).length

        console.log(`Total dangerous asteroids: ${hazardousCount}`)

        // Return asteroid data
        return {
            asteroids: allAsteroids,
        }
    } catch (error) {
        console.error("Failed to load asteroid data:", error)
        return {
            asteroids: [],
        }
    }
}