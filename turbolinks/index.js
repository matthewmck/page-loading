function pageTransition() {
    console.log('page transition')
    const tl = gsap.timeline()
    // show
    tl.to('ul.transition li', {
        duration: .5,
        scaleY: 1,
        transformOrigin: 'bottom left',
        stagger: .2
    })
    // hide
    tl.to('ul.transition li', {
        duration: .5,
        scaleY: 0,
        transformOrigin: 'bottom left',
        stagger: .1,
        delay: .1
    })
}

function contentAnimation() {
    const tl = gsap.timeline();
    tl.from('.left', {
        duration: 1.5,
        translateY: 50,
        opacity: 0
    })
    tl.to('img', {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    }, "-=1.1")
}

function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n)
    })
}

Turbolinks.start();

// barba.init({
//     sync: true,
//     transitions: [{
//         async leave(data) {
//             const done = this.async();
//             pageTransition();
//             await delay(1500);
//             done();
//         },
//         async enter(data) {
//             contentAnimation()
//         },
//         async once(data) {
//             contentAnimation();
//         }
//     }]
// })

// Called once after the initial page has loaded
document.addEventListener('turbolinks:load', () => {
    contentAnimation();
}, { once: true });

// seems to be firing twice because of this issue:
// https://discourse.stimulusjs.org/t/controller-initialized-twice-when-visiting-from-a-turbolinks-page/17/2
document.addEventListener('turbolinks:before-visit', async (event) => {
    const url = event.data.url
    //event.preventDefault()
    pageTransition();
    await delay(1500);
    console.log(event.data.url)
});

// Called after every non-initial page load
document.addEventListener('turbolinks:render', (event) => {
    event.preventDefault()
    contentAnimation();
});