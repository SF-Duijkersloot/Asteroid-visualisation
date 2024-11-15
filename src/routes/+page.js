const API_KEY = import.meta.env.VITE_NASA_API_KEY;

// Get today's date
const today = new Date(Date.now())
// Calculate the start date (4 weeks ago)
const oneMonthAgo = new Date(today - 28 * 24 * 60 * 60 * 1000);

export const load = async () => {
    // Function to fetch data for a given date range
    const fetchNeo = async (start, end) => {
        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`
        );
        const data = await response.json();
        return Object.values(data.near_earth_objects).flat();
    };

    // Helper function to format date as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];

    // Generate date ranges for parallel fetching
    const dateRanges = [];
    let start = new Date(oneMonthAgo);
    while (start < today) {
        const end = new Date(start);
        end.setDate(end.getDate() + 7); // Increment end by 7 days
        if (end > today) end.setTime(today.getTime()); // Ensure we don't exceed today's date

        dateRanges.push({
            start: formatDate(start),
            end: formatDate(end),
        });

        start.setDate(start.getDate() + 7); // Move the start date forward by 7 days
    }

    // Fetch all data in parallel
    const allAsteroidsPromises = dateRanges.map((range) =>
        fetchNeo(range.start, range.end)
    );

    const allAsteroidsResults = await Promise.all(allAsteroidsPromises);

    // Flatten the results and filter dangerous asteroids
    const allAsteroids = allAsteroidsResults
        .flat()
        .filter(
            (asteroid) => +asteroid.close_approach_data[0].miss_distance.astronomical < 0.1
        );

    console.log(
        `Total dangerous asteroids: ${allAsteroids.filter(
            (asteroid) => asteroid.is_potentially_hazardous_asteroid
        ).length}`
    );

    return {
        asteroids: allAsteroids,
        date: {
            start: formatDate(oneMonthAgo),
            end: formatDate(today),
        },
    };
};