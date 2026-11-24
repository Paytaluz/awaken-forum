document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  var cards = document.querySelectorAll('.bento .card, .spotlight-grid .card');
  var pills = document.querySelectorAll('.pills .pill');
  if (cards.length && pills.length) {
    var applyFilter = function (tag) {
      pills.forEach(function (p) {
        p.classList.toggle('is-active', tag && p.getAttribute('data-tag') === tag);
      });
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        card.style.display = (!tag || tags.indexOf(tag) !== -1) ? '' : 'none';
      });
    };

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var tag = pill.getAttribute('data-tag');
        var alreadyActive = pill.classList.contains('is-active');
        applyFilter(alreadyActive ? null : tag);
      });
    });

    document.querySelectorAll('.nav-tag').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var tag = link.getAttribute('data-tag');
        e.preventDefault();
        applyFilter(tag);
        document.getElementById('latest').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ---- Pinned articles (localStorage, per-visitor) ---- */
  var PIN_KEY = 'awakenforum:pinned';

  function getPinned() {
    try { return JSON.parse(localStorage.getItem(PIN_KEY)) || []; }
    catch (e) { return []; }
  }
  function setPinned(list) {
    localStorage.setItem(PIN_KEY, JSON.stringify(list));
  }

  function renderPinned() {
    var box = document.getElementById('pinned-area');
    if (!box) return;
    var pinned = getPinned();
    if (!pinned.length) {
      box.innerHTML = '<div class="pinned-empty">Click <span class="pin-chip">🔖 Pin this article</span> on any article and your favorites will appear here.</div>';
      return;
    }
    var list = document.createElement('div');
    list.className = 'pinned-list';
    pinned.forEach(function (p) {
      var row = document.createElement('a');
      row.className = 'pinned-item';
      row.href = p.href;
      row.innerHTML =
        '<span class="tag pill-' + p.cat + '">#' + p.catLabel + '</span>' +
        '<span>' + p.title + '</span>' +
        '<span class="remove-pin" data-href="' + p.href + '">Unpin ✕</span>';
      list.appendChild(row);
    });
    box.innerHTML = '';
    box.appendChild(list);

    box.querySelectorAll('.remove-pin').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setPinned(getPinned().filter(function (p) { return p.href !== btn.getAttribute('data-href'); }));
        renderPinned();
        syncPinButtons();
      });
    });
  }

  function syncPinButtons() {
    document.querySelectorAll('.pin-btn').forEach(function (btn) {
      var href = btn.getAttribute('data-href');
      var pinned = getPinned().some(function (p) { return p.href === href; });
      btn.classList.toggle('is-pinned', pinned);
      btn.textContent = pinned ? '🔖 Pinned' : '🔖 Pin this article';
    });
  }

  document.querySelectorAll('.pin-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var href = btn.getAttribute('data-href');
      var list = getPinned();
      var already = list.some(function (p) { return p.href === href; });
      if (already) {
        list = list.filter(function (p) { return p.href !== href; });
      } else {
        list.push({
          href: href,
          title: btn.getAttribute('data-title'),
          cat: btn.getAttribute('data-cat'),
          catLabel: btn.getAttribute('data-cat-label')
        });
      }
      setPinned(list);
      syncPinButtons();
      renderPinned();
    });
  });

  syncPinButtons();
  renderPinned();
});
