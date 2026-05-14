(function (w) {
    var KEY = 'mikrotik-theme';
    var EVT = 'mikrotik-theme-effective-change';

    function prefersDark() {
        try {
            return w.matchMedia && w.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (e) {
            return false;
        }
    }

    function getStored() {
        try {
            var v = localStorage.getItem(KEY);
            if (v === 'dark' || v === 'light') return v;
            return 'system';
        } catch (e) {
            return 'system';
        }
    }

    function getEffective() {
        var s = getStored();
        if (s === 'system') return prefersDark() ? 'dark' : 'light';
        return s;
    }

    function setMeta(dark) {
        var m = document.querySelector('meta[name="theme-color"]');
        if (m) m.setAttribute('content', dark ? '#0c0f14' : '#f5f7fa');
    }

    function notify(theme) {
        try {
            w.dispatchEvent(new CustomEvent(EVT, { detail: { theme: theme } }));
        } catch (e) {}
    }

    function applyDom() {
        var theme = getEffective();
        var dark = theme === 'dark';
        document.documentElement.classList.toggle('theme-dark', dark);
        setMeta(dark);
        notify(theme);
    }

    function toggle() {
        var eff = getEffective();
        var next = eff === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem(KEY, next);
        } catch (e) {}
        applyDom();
    }

    function get() {
        return getEffective();
    }

    function getMode() {
        return getStored();
    }

    function syncMeta() {
        setMeta(document.documentElement.classList.contains('theme-dark'));
    }

    function bindPrefersListener() {
        if (!w.matchMedia) return;
        var mq = w.matchMedia('(prefers-color-scheme: dark)');
        var onChange = function () {
            if (getStored() === 'system') applyDom();
        };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    w.MikrotikTheme = { get: get, getMode: getMode, toggle: toggle, syncMeta: syncMeta };

    applyDom();
    bindPrefersListener();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncMeta);
    } else {
        syncMeta();
    }
})(typeof window !== 'undefined' ? window : this);
