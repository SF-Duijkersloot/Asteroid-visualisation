// Import the animation functions
import { resetAnimation, showCloseOrbit, showHazardousAsteroids } from './animations.js'

// Export for the intersectionObserver code
export const setIntersectionObserver = () => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hazardous-asteroids')) {
                    resetAnimation()
                    showHazardousAsteroids()
                } else if (entry.target.classList.contains('close-encounters')) {
                    resetAnimation()
                    showCloseOrbit()
                } else {
                    resetAnimation()
                }
            }
        })
    }, { rootMargin: '0px 0px -50% 0px', threshold: 0.5 })

    // Observe each text section
    document.querySelectorAll('.observer-section').forEach(section => {
        sectionObserver.observe(section)
    })
}