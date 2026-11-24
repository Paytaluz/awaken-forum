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

  var pills = document.querySelectorAll('.pills .pill');
  var cards = document.querySelectorAll('.grid .card');
  if (pills.length && cards.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var category = pill.getAttribute('data-category');
        var alreadyActive = pill.classList.contains('is-active');
        pills.forEach(function (p) { p.classList.remove('is-active'); });

        if (alreadyActive) {
          cards.forEach(function (card) { card.style.display = ''; });
          return;
        }
        pill.classList.add('is-active');
        cards.forEach(function (card) {
          card.style.display = (card.getAttribute('data-category') === category) ? '' : 'none';
        });
      });
    });
  }
});
