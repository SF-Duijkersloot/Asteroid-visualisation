import * as d3 from 'd3'

const fadeOutNonHazardousAsteroids = () => {
    d3.selectAll('.asteroid')
        .filter(function() {
            return this.getAttribute('data-hazardous') === "false"
        })
        .transition()
        .duration(1000)
        .attr('opacity', 0)
        .attr('transform', 'scale(0)')
}

const fadeInNonHazardousAsteroids = () => {
    d3.selectAll('.asteroid')
        .filter(function() {
            return this.getAttribute('data-hazardous') === "false"
        })
        .transition()
        .duration(1000)
        .attr('opacity', 1)
        .attr('transform', 'scale(1)')
}

export { fadeOutNonHazardousAsteroids, fadeInNonHazardousAsteroids }