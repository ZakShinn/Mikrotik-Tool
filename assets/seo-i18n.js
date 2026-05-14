(function (w, d) {
    var EVT = 'mikrotik-lang-change';
    var initial = null;

    function metaByName(name) {
        return d.querySelector('meta[name="' + name + '"]');
    }

    function metaByProp(prop) {
        return d.querySelector('meta[property="' + prop + '"]');
    }

    function captureInitial() {
        if (initial) return;
        initial = {
            lang: d.documentElement.getAttribute('lang') || 'vi',
            title: d.title,
            description: (function () {
                var m = metaByName('description');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            keywords: (function () {
                var m = metaByName('keywords');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            ogTitle: (function () {
                var m = metaByProp('og:title');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            ogDesc: (function () {
                var m = metaByProp('og:description');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            twitterTitle: (function () {
                var m = metaByName('twitter:title');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            twitterDesc: (function () {
                var m = metaByName('twitter:description');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            ogImageAlt: (function () {
                var m = metaByProp('og:image:alt');
                return m ? m.getAttribute('content') || '' : '';
            })(),
            twitterImageAlt: (function () {
                var m = metaByName('twitter:image:alt');
                return m ? m.getAttribute('content') || '' : '';
            })()
        };
    }

    function setContent(sel, val) {
        if (val === undefined || val === null || val === '') return;
        var el = d.querySelector(sel);
        if (el) el.setAttribute('content', val);
    }

    function applyPack(pack) {
        if (pack.title) d.title = pack.title;
        setContent('meta[name="description"]', pack.description);
        setContent('meta[name="keywords"]', pack.keywords);
        setContent('meta[property="og:title"]', pack.ogTitle);
        setContent('meta[property="og:description"]', pack.ogDesc);
        setContent('meta[name="twitter:title"]', pack.twitterTitle);
        setContent('meta[name="twitter:description"]', pack.twitterDesc);
        setContent('meta[property="og:image:alt"]', pack.ogImageAlt);
        setContent('meta[name="twitter:image:alt"]', pack.twitterImageAlt);
    }

    function swapOgLocale(forEnglish) {
        var a = metaByProp('og:locale');
        var b = metaByProp('og:locale:alternate');
        if (!a || !b) return;
        if (forEnglish) {
            a.setAttribute('content', 'en_US');
            b.setAttribute('content', 'vi_VN');
        } else {
            a.setAttribute('content', 'vi_VN');
            b.setAttribute('content', 'en_US');
        }
    }

    function getSeoData() {
        var el = d.getElementById('seo-i18n-data');
        if (!el) return null;
        try {
            return JSON.parse(el.textContent);
        } catch (e) {
            return null;
        }
    }

    function sync() {
        if (typeof w.MikrotikLang === 'undefined') return;
        captureInitial();
        var lang = w.MikrotikLang.get();
        var data = getSeoData();
        if (!data || !data.en) return;

        if (lang === 'en') {
            d.documentElement.setAttribute('lang', 'en');
            applyPack(data.en);
            swapOgLocale(true);
        } else {
            d.documentElement.setAttribute('lang', initial.lang || 'vi');
            applyPack({
                title: initial.title,
                description: initial.description,
                keywords: initial.keywords,
                ogTitle: initial.ogTitle,
                ogDesc: initial.ogDesc,
                twitterTitle: initial.twitterTitle,
                twitterDesc: initial.twitterDesc,
                ogImageAlt: initial.ogImageAlt,
                twitterImageAlt: initial.twitterImageAlt
            });
            swapOgLocale(false);
        }
    }

    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', sync);
    } else {
        sync();
    }
    w.addEventListener(EVT, sync);
})(typeof window !== 'undefined' ? window : this, document);
