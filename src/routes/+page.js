const apiKey = import.meta.env.VITE_NASA_API_KEY

/*******************************
          Define dates
********************************/
const today = new Date(Date.now())
const oneMonthAgo = new Date(today - 28 * 24 * 60 * 60 * 1000)

/*******************************
          Load export
********************************/
export const load = async () => {
    // Fetch based on date range
    const fetchNeo = async (start, end) => {
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${apiKey}`
        )
        const data = await response.json()
        return Object
                .values(data.near_earth_objects)
                .flat()
    }

    // Helper function to format date as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0]

    // Generate date ranges function
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

    // Generate date ranges
    const dateRanges = generateDateRanges(oneMonthAgo, today)

    // Fetch all asteroids data in parallel
    const allAsteroidsData = await Promise.all(
        dateRanges.map(range => fetchNeo(range.start, range.end))
    )

    // Flatten the results and filter dangerous asteroids
    const allAsteroids = allAsteroidsData
        .flat()
        .filter(asteroid => +asteroid.close_approach_data[0].miss_distance.lunar < 25)

    console.log(
        `Total dangerous asteroids: ${allAsteroids.filter(
            (asteroid) => asteroid.is_potentially_hazardous_asteroid
        ).length}`
    )

    return {
        asteroids: allAsteroids,
    }
}