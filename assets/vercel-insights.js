/**
 * Vercel Web Analytics + Speed Insights (static HTML).
 * Requires Analytics / Speed Insights enabled in the Vercel project dashboard.
 * Routes are injected by Vercel at deploy: /_vercel/insights/* and /_vercel/speed-insights/*
 */
(function () {
    window.va =
        window.va ||
        function () {
            (window.vaq = window.vaq || []).push(arguments);
        };
    var analytics = document.createElement('script');
    analytics.defer = true;
    analytics.src = '/_vercel/insights/script.js';
    document.head.appendChild(analytics);

    window.si =
        window.si ||
        function () {
            (window.siq = window.siq || []).push(arguments);
        };
    var speed = document.createElement('script');
    speed.defer = true;
    speed.src = '/_vercel/speed-insights/script.js';
    document.head.appendChild(speed);
})();
