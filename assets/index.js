// noinspection JSUnresolvedVariable

const appMount = document.getElementById('app');

/** some stuff for document loading including the transition
 * @param {string} name
 */
$(document).ready(function () {
    $.blockUI = function () {
        const html = `
            <div class="block-ui">
                <div class="block-ui-content">
                    <svg class="introLogo" viewBox="0 0 915 742" fill="#FAF1D9" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                        <g class="logoLeft normal">
                            <path d="M0 254.224L235.183 741.057L409.125 654.601L585.127 160.048L493.524 0L313.92 302.598L0 254.224Z"
                                />
                        </g>
                        <g class="logoRight normal">
                            <path d="M687.022 336.049L610.858 212.539L458.529 635.56L833.175 445.149L915 251.651L687.022 336.049Z"
                                />
                        </g>
                    </svg>
                </div>
            </div>
            <style>
                .block-ui {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                
                .introLogo {
                    width: 10rem;
                }
                
                .logoLeft {
                    transform: translate(-10%, -200%);
                    animation: logoSlideIn 2.1s cubic-bezier(0.77, -0.1, 0.96, -0.05) forwards;
                }
                
                .logoRight {
                    transform: translate(10%, 200%);
                    animation: logoSlideIn 2.1s cubic-bezier(0.77, -0.1, 0.96, -0.05) forwards;
                }
                
                @keyframes logoSlideIn {
                    0% {
                        opacity: 0;
                    }
                
                    30% {
                        opacity: 0.1
                    }
                
                    100% {
                        opacity: 1;
                        transform: translate(0%, 0%);
                    }
                }
            </style>
        `;
        $('body').append(html);
    };
    $.changeUI = async function () {
        $('body').css('background', 'var(--color-background)');
        const introLogo = $('.introLogo')
        introLogo.css('fill', 'var(--color-text)');

        await sleep(1000);
        introLogo.fadeOut(750);

        setTimeout($.unblockUI, 1000);
    };
    $.unblockUI = function () {
        // remove the block from the DOM
        // then update the body css to change the background colour
        $('.block-ui').remove();
        appMount.classList.remove('hidden');
        transitionElements.forEach(
            _trigger => {
                createTransitionTween(
                    _trigger["name"],
                    _trigger["x"],
                    _trigger["y"],
                    _trigger["d"],
                    _trigger["r"],
                );
            }
        );
    };
    $.blockUI();
    $(window).load(function () {
        setTimeout($.changeUI, 2000);
    });
});

/**
 * an async sleep function
 * @param {*} ms delay in milliseconds
 * @returns
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const transitionElements = [
    { name: "title1", x: -500, y: 0, r: -7, d: 1.8 },
    { name: "title2", x: 0, y: -700, r: 12, d: 2.6 },
    { name: "title3", x: -600, y: 0, r: 5, d: 2.0 },
]

const scrollHeadingElements = [
    { name: "title1", trigger: "header", scrub: 4, x: -250, y: 0, r: 0 },
    { name: "title2", trigger: "header", scrub: 1.5, x: 0, y: -300, r: 0 },
    { name: "title3", trigger: "header", scrub: 3, x: 400, y: 0, r: 0 },
];

// register scroll trigger gsap plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * very basic scroll trigger handler
 * @param {*} element element DOM name
 * @param {*} trigger element trigger
 * @param {*} scrub scrub speed
 * @param {*} x change in x
 * @param {*} y change in y
 * @param {*} rotation rotation
 * @returns {*} scrollTrigger object
 */
function createScrollTrigger(element, trigger, scrub, x, y, rotation) {
    gsap.to(`.${element}`, {
        scrollTrigger: {
            trigger: `.${trigger}`,
            start: "top top",
            end: "+=600",
            scrub: scrub,
            markers: false,
        },
        x: x,
        y: y,
        rotation: rotation,
        ease: "none",
    });
}

function createTransitionTween(element, x, y, d, r) {
    gsap.from(`.${element}`, {
        x: x,
        y: y,
        rotation: r,
        duration: d,
        ease: "expo",
    });
}

scrollHeadingElements.forEach(
    (_trigger) => {
        createScrollTrigger(
            _trigger["name"],
            _trigger["trigger"],
            _trigger["scrub"],
            _trigger["x"],
            _trigger["y"],
            _trigger["r"],
        );
    }
);