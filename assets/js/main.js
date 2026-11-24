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
  if (!cards.length || !pills.length) return;

  function applyFilter(tag) {
    pills.forEach(function (p) {
      p.classList.toggle('is-active', tag && p.getAttribute('data-tag') === tag);
    });
    cards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(' ');
      card.style.display = (!tag || tags.indexOf(tag) !== -1) ? '' : 'none';
    });
  }

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
});
