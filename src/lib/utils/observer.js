// export function observeElement(callback) {
//     const observerOptions = {
//         root: null, // viewport is the root
//         rootMargin: '-50% 0px', // triggers when the element reaches halfway down the viewport
//         threshold: 0 // triggers as soon as any part of the element enters the threshold
//     };

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 callback(entry); // call the callback when element is intersecting
//             }
//         });
//     }, observerOptions);

//     return observer;
// }
