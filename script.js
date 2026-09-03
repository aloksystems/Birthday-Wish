/* =====================================================
   A Little Birthday Experience
   Person: Saniya · Girlfriend · Funny + calm
   ===================================================== */
(function () {
  'use strict';

  /* ---------- Config : personalize here ---------- */
  var CONFIG = {
    name: 'Birthday',
    from: 'Boy'
  };

  /* ---------- Utils ---------- */
  function $(id) { return document.getElementById(id); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Background particles ---------- */
  var canvas = $('bg');
  var ctx = canvas.getContext('2d');
  var parts = [];
  var W, H;

  function sizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);

  var COLORS = ['#B8B0F7', '#E8C37A', '#F5F3FF', '#8A8A96'];

  function makeParticle() {
    var big = Math.random() < 0.12;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: big ? 1.6 + Math.random() * 1.4 : 0.6 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(0.08 + Math.random() * 0.22),
      tw: Math.random() * Math.PI * 2,
      ts: 0.5 + Math.random() * 1.2,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      big: big
    };
  }

  for (var i = 0; i < (window.innerWidth < 700 ? 46 : 80); i++) parts.push(makeParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.tw += p.ts * 0.016;
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      var a = p.big ? 0.28 + 0.22 * Math.sin(p.tw) : 0.12 + 0.10 * Math.sin(p.tw);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.03, a);
      ctx.fill();
      if (p.big) {
        ctx.globalAlpha = a * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();

  /* ---------- 2. Screen manager ---------- */
  var current = null;

  function goTo(id, init) {
    var next = $(id);
    var prev = current;

    if (!prev) {
      current = next;
      next.classList.add('active');
      gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
      if (init) init();
      return;
    }

    gsap.to(prev, {
      opacity: 0, duration: 0.45, ease: 'power2.in',
      onComplete: function () {
        prev.classList.remove('active');
        current = next;
        next.classList.add('active');
        gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
        if (init) init();
      }
    });
  }

  /* ---------- 3. Typewriter ---------- */
  function typeWriter(el, lines, speed) {
    return new Promise(function (resolve) {
      var li = 0, ci = 0, done = [];
      el.classList.remove('done');

      function tick() {
        if (li >= lines.length) { el.classList.add('done'); resolve(); return; }
        var line = lines[li];
        var prefix = done.join('<br>') + (done.length > 0 ? '<br>' : '');
        el.innerHTML = prefix + line.slice(0, ci);
        if (ci < line.length) {
          ci++;
          setTimeout(tick, speed);
        } else {
          done.push(line);
          li++;
          ci = 0;
          setTimeout(tick, speed * 3.5);
        }
      }
      tick();
    });
  }

  /* ---------- 4. Confetti ---------- */
  function confetti(n) {
    n = n || 70;
    for (var i = 0; i < n; i++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      var palette = ['#B8B0F7', '#E8C37A', '#F5F3FF', '#C9B6E4', '#EACDC2'];
      c.style.background = palette[(Math.random() * palette.length) | 0];
      c.style.left = (Math.random() * 100) + 'vw';
      c.style.width = (6 + Math.random() * 6) + 'px';
      c.style.height = (10 + Math.random() * 10) + 'px';
      document.body.appendChild(c);
      var dur = reduce ? 0.01 : 2.6 + Math.random() * 2.4;
      gsap.to(c, {
        y: window.innerHeight + 60,
        x: (Math.random() - 0.5) * 200,
        rotation: 360 + Math.random() * 540,
        duration: dur,
        ease: 'power1.in',
        delay: Math.random() * 0.8,
        onComplete: function () { c.remove(); }
      });
    }
  }

  /* ---------- 5. Sparkle burst ---------- */
  function sparkle(x, y, n) {
    n = n || 6;
    for (var i = 0; i < n; i++) {
      var s = document.createElement('div');
      s.className = 'spark';
      var size = 4 + Math.random() * 8;
      s.style.width = s.style.height = size + 'px';
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      document.body.appendChild(s);
      gsap.to(s, {
        x: (Math.random() - 0.5) * 70,
        y: (Math.random() - 0.5) * 70,
        opacity: 0,
        scale: 0.2,
        duration: 0.7 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: function () { s.remove(); }
      });
    }
  }

  /* ---------- 6. Screens: intro ---------- */
  var introTimer = setTimeout(function () {
    if (!$('s-intro').classList.contains('active')) return;
    gsap.to('.kicker, .intro-name, .sub', {
      opacity: 0, y: -14, duration: 0.7, stagger: 0.08, ease: 'power2.in',
      onComplete: function () {
        if ($('s-intro').classList.contains('active')) goTo('s-hello', helloInit);
      }
    });
  }, 2500);

  /* ---------- 7. Hello ---------- */
  function helloInit() {
    var btn = $('helloBtn');
    btn.classList.remove('hidden');
    gsap.set(btn, { autoAlpha: 0, y: 12 });
    var tl = gsap.timeline({ delay: 0.3 });
    ['h1', 'h2', 'h3'].forEach(function (id) {
      tl.to($(id), { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '+=0.2');
      tl.to($(id), { opacity: 0, y: -16, duration: 0.5, ease: 'power2.in' }, '+=1.15');
    });
    tl.to(btn, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '+=0.3');
  }

  $('helloBtn').addEventListener('click', function () {
    goTo('s-type', typeInit);
  });

  /* ---------- 8. Typewriter ---------- */
  function typeInit() {
    var btn = $('typeBtn');
    btn.classList.add('hidden');
    typeWriter($('typeText'), [
      'I was going to write a normal birthday wish...',
      'But you deserve something a little more interesting.'
    ], reduce ? 1 : 34).then(function () {
      btn.classList.remove('hidden');
      gsap.fromTo(btn, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 });
    });
  }

  $('typeBtn').addEventListener('click', function () {
    goTo('s-reveal', revealInit);
  });

  /* ---------- 9. Birthday reveal ---------- */
  function revealInit() {
    var tl = gsap.timeline({ delay: 0.35 });
    tl.to('.word', {
      opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out',
      scale: 1, filter: 'drop-shadow(0 0 26px rgba(232,195,122,.35))'
    }, 0);
    tl.fromTo('.reveal-name', { opacity: 0, scale: 1.3, filter: 'blur(8px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }, '+=0.2');
    tl.to('.cake-wrap', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4');
    tl.add(function () { confetti(80); }, '-=0.6');
    tl.add(function () { sparkle(window.innerWidth / 2, window.innerHeight * 0.35, 14); }, '-=1.0');
    var mb = $('moreBtn');
    mb.classList.remove('hidden');
    gsap.set(mb, { autoAlpha: 0 });
    tl.to(mb, { autoAlpha: 1, duration: 0.5 }, '+=0.4');
  }

  $('moreBtn').addEventListener('click', function () {
    goTo('s-cards', cardsInit);
  });

  /* ---------- 10. Message cards ---------- */
  var CARD_MSGS = {
    smile: {
      k: 'For your smile',
      t: 'Keep that smile exactly the way it is. It is my favorite thing about you.'
    },
    future: {
      k: 'For your future',
      t: 'May this year bring you closer to everything you dream about. And I will be right there, cheering you on.'
    },
    today: {
      k: 'For today',
      t: 'Forget everything else. Today is yours. I hope you spend it exactly the way you want.'
    }
  };

  function cardsInit() {
    gsap.fromTo(qsa('#s-cards .card'), { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' });
    gsap.fromTo($('cardsBtn'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.6 });
  }

  qsa('#s-cards .card').forEach(function (card) {
    card.addEventListener('click', function () {
      var m = CARD_MSGS[card.dataset.msg];
      showOverlay($('o-card'), m.k, m.t);
    });
  });

  $('cardsBtn').addEventListener('click', function () {
    goTo('s-surprise', surpriseInit);
  });

  /* ---------- 11. Choose your surprise ---------- */
  var SURPRISE_MSGS = {
    message: {
      k: 'A Message',
      t: 'Some people enter your life and become memories. Some become stories. And some simply make ordinary days a little better. Whatever category you belong to... I am really glad I know you.'
    },
    gift: {
      k: 'A Surprise',
      t: 'I cannot wrap this properly, so here it is — a whole year of happiness, adventures, and unexpectedly good things. Already on its way to you. Watch closely.'
    },
    night: {
      k: 'One Last Thing',
      t: 'Close your eyes. Make a wish. And know that somewhere out there, someone is hoping — with everything they have — that it comes true.'
    }
  };

  function surpriseInit() {
    gsap.fromTo(qsa('#s-surprise .card'), { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' });
    gsap.fromTo($('surpriseBtn'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 0.6 });
  }

  qsa('#s-surprise .card').forEach(function (card) {
    card.addEventListener('click', function () {
      var m = SURPRISE_MSGS[card.dataset.s];
      showOverlay($('o-surprise'), m.k, m.t);
    });
  });

  $('surpriseBtn').addEventListener('click', function () {
    goTo('s-game', levelStart);
  });

  /* ---------- 12. Overlay ---------- */
  var openOverlay = null;

  function showOverlay(ov, kicker, text) {
    openOverlay = ov;
    qsa('.overlay-kicker', ov)[0].textContent = kicker;
    qsa('.overlay-text', ov)[0].textContent = text;
    ov.classList.add('show');
    gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(qsa('.overlay-box', ov)[0], { scale: 0.9, y: 14 }, { scale: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }

  function hideOverlay() {
    if (!openOverlay) return;
    var ov = openOverlay;
    openOverlay = null;
    gsap.to(ov, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: function () { ov.classList.remove('show'); }
    });
  }

  qsa('.overlay').forEach(function (ov) {
    qsa('.overlay-close', ov)[0].addEventListener('click', hideOverlay);
    ov.addEventListener('click', function (e) { if (e.target === ov) hideOverlay(); });
  });

  /* ---------- 13. Mini game ---------- */
  var level = 1;
  var findTaps = 0;

  function levelStart() {
    level = 1;
    findTaps = 0;
    var chip = $('levelChip');
    var title = $('levelTitle');
    var hint = $('levelHint');
    var stage = $('gameStage');
    var result = $('levelResult');
    var next = $('levelNext');

    next.classList.add('hidden');
    result.classList.add('hidden');
    result.textContent = '';

    stage.style.display = 'block';
    $('cakeFind').style.display = 'block';
    $('wishCandle').style.display = 'none';
    $('giftBox').style.display = 'none';

    chip.textContent = 'Level 1 · 3';
    title.textContent = '🎂 Find the birthday cake';
    hint.textContent = 'It is hiding on this screen. Tap around until you find it.';

    var rect = stage.getBoundingClientRect();
    var cake = $('cakeFind');
    cake.style.left = (12 + Math.random() * (rect.width - 130)) + 'px';
    cake.style.top = (30 + Math.random() * (rect.height - 130)) + 'px';
    cake.style.opacity = '0.05';
    cake.style.transition = 'opacity 0.4s ease';
    cake.style.cursor = 'pointer';

    gsap.fromTo(stage, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 });
  }

  $('gameStage').addEventListener('pointerdown', function (e) {
    if (level !== 1) return;
    var cake = $('cakeFind');
    var r = cake.getBoundingClientRect();
    var hitCake = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;

    sparkle(e.clientX, e.clientY, 4);
    findTaps++;

    if (hitCake || findTaps >= 8) {
      levelUp1();
    } else {
      $('levelHint').textContent = 'Not there... but you are getting closer ✨ (' + findTaps + '/8)';
    }
  });

  function levelUp1() {
    if (level !== 1) return;
    level = 2;
    var cake = $('cakeFind');
    cake.style.opacity = '1';
    gsap.fromTo(cake, { scale: 0.4 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    sparkle(window.innerWidth / 2, window.innerHeight / 2, 12);
    confetti(24);
    var result = $('levelResult');
    result.textContent = 'Found it! 🎉';
    result.classList.remove('hidden');
    $('levelHint').textContent = 'Wait... there is something on top of it.';
    levelNextSetup('Make a wish', wishLevel);
  }

  function levelNextSetup(title, nextFn) {
    var next = $('levelNext');
    next.classList.remove('hidden');
    next.textContent = title;
    gsap.fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
    next.onclick = function () { goTo('s-game', nextFn); };
  }

  function wishLevel() {
    var chip = $('levelChip');
    var title = $('levelTitle');
    var hint = $('levelHint');
    var stage = $('gameStage');
    var result = $('levelResult');
    var next = $('levelNext');

    next.classList.add('hidden');
    result.classList.add('hidden');
    result.textContent = '';

    stage.style.display = 'block';
    $('cakeFind').style.display = 'none';
    $('giftBox').style.display = 'none';
    $('wishCandle').style.display = 'block';

    chip.textContent = 'Level 2 · 3';
    title.textContent = '✨ Make a wish';
    hint.textContent = 'A candle appeared. Tap the flame to blow it out.';

    var flame = $('wishFlame');
    flame.style.opacity = '1';
    flame.style.transform = 'translateX(-50%) scale(1)';
    flame.style.animation = 'flick .18s ease-in-out infinite alternate';

    gsap.fromTo(stage, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo($('wishCandle'), { xPercent: -50, scale: 0.6, y: 24 }, { xPercent: -50, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)' });

    flame.onclick = function () {
      if (level !== 2) return;
      level = 3;
      var f = $('wishFlame');
      f.style.animation = 'none';
      f.style.transition = 'all 0.3s ease';
      f.style.transform = 'translateX(-50%) scaleY(0)';
      f.style.opacity = '0';
      sparkle(f.getBoundingClientRect().left + 13, f.getBoundingClientRect().top, 8);

      var result = $('levelResult');
      result.textContent = 'Okay... wish officially submitted. 😌';
      result.classList.remove('hidden');
      $('levelHint').textContent = 'Make sure it is a good one.';
      levelNextSetup('Open your gift', giftLevel);
    };
  }

  function giftLevel() {
    var chip = $('levelChip');
    var title = $('levelTitle');
    var hint = $('levelHint');
    var stage = $('gameStage');
    var result = $('levelResult');
    var next = $('levelNext');

    next.classList.add('hidden');
    result.classList.add('hidden');
    result.textContent = '';

    stage.style.display = 'block';
    $('cakeFind').style.display = 'none';
    $('wishCandle').style.display = 'none';
    $('giftBox').style.display = 'block';

    chip.textContent = 'Level 3 · 3';
    title.textContent = '🎁 Open your gift';
    hint.textContent = 'It has your name on it. Tap to open.';

    var gift = $('giftBox');
    var lid = qsa('.gift-lid', gift)[0];

    gsap.fromTo(stage, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo(gift, { xPercent: -50, scale: 0.6 }, { xPercent: -50, scale: 1, duration: 0.7, ease: 'back.out(1.6)' });

    gift.onclick = function () {
      if (level !== 3) return;
      level = 4;

      gsap.timeline()
        .to(gift, { x: -6, duration: 0.07, repeat: 5, yoyo: true, ease: 'power1.inOut' })
        .to(lid, { y: -46, rotation: 14, duration: 0.5, ease: 'power3.out' })
        .add(function () {
          var r = gift.getBoundingClientRect();
          sparkle(r.left + r.width / 2, r.top + 10, 18);
          confetti(40);
        });

      var result = $('levelResult');
      result.textContent = 'A year full of happiness, adventures & unexpected good things.';
      result.classList.remove('hidden');
      $('levelHint').textContent = 'Best. Gift. Ever.';
      levelNextSetup('Finish ✦', finishGame);
    };
  }

  function finishGame() {
    goTo('s-final', finalInit);
  }

  /* ---------- 14. Final ---------- */
  function finalInit() {
    var tl = gsap.timeline({ delay: 0.4 });
    tl.to($('f1'), { opacity: 1, duration: 1, ease: 'power2.out' });
    tl.to($('f2'), { opacity: 1, duration: 1.1, ease: 'power2.out' }, '+=0.3');
    tl.fromTo($('f3'), { opacity: 0, scale: 1.2, filter: 'blur(6px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }, '+=0.4');
    tl.add(function () { confetti(50); sparkle(window.innerWidth / 2, window.innerHeight / 3, 12); }, '-=0.6');
    tl.to($('f4'), { opacity: 1, duration: 1 }, '+=0.3');
  }

  /* ---------- 15. Music (generative, no file needed) ---------- */
  var actx = null;
  var musicGain = null;
  var musicTimer = null;
  var musicStep = 0;
  var musicOn = false;

  var SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
  var PATTERN = [0, 2, 4, 1, 3, 5, 4, 2];

  function ensureAudio() {
    if (actx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    actx = new AC();
    musicGain = actx.createGain();
    musicGain.gain.value = 0;
    var lp = actx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1800;
    musicGain.connect(lp);
    lp.connect(actx.destination);
  }

  function pluck(freq, delay, dur) {
    if (!actx) return;
    var t = actx.currentTime + delay;
    var o = actx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;
    var g = actx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(musicGain);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  function pad(freq, delay) {
    if (!actx) return;
    var t = actx.currentTime + delay;
    var o = actx.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    var g = actx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.012, t + 0.4);
    g.gain.linearRampToValueAtTime(0.0001, t + 3.4);
    o.connect(g);
    g.connect(musicGain);
    o.start(t);
    o.stop(t + 3.6);
  }

  function musicTick() {
    var s = PATTERN[musicStep % PATTERN.length];
    pluck(SCALE[s], 0.05, 2.4);
    pluck(SCALE[(s + 2) % SCALE.length] * 2, 0.18, 1.6);
    if (musicStep % 8 === 0) {
      pad(SCALE[0] / 2, 0.1);
      pad(SCALE[2] / 2, 0.1);
    }
    musicStep++;
  }

  function onMusicRunning() {
    if (!musicOn || !actx) return;
    $('musicBtn').classList.add('on');
    qsa('.lbl', $('musicBtn'))[0].textContent = 'Sound on';
    musicGain.gain.linearRampToValueAtTime(1, actx.currentTime + 1);
    musicTick();
    if (musicTimer) clearInterval(musicTimer);
    musicTimer = setInterval(musicTick, 440);
  }

  function startMusic() {
    ensureAudio();
    if (!actx || musicOn) return;
    musicOn = true;
    if (actx.state !== 'running') {
      var p = actx.resume();
      if (p && p.then) p.then(onMusicRunning).catch(function () {});
      else onMusicRunning();
    } else {
      onMusicRunning();
    }
  }

  function stopMusic() {
    if (actx && musicGain) musicGain.gain.linearRampToValueAtTime(0, actx.currentTime + 0.4);
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    musicOn = false;
    $('musicBtn').classList.remove('on');
    qsa('.lbl', $('musicBtn'))[0].textContent = 'Sound off';
  }

  $('musicBtn').addEventListener('click', function () {
    musicOn ? stopMusic() : startMusic();
  });

  document.addEventListener('pointerdown', function onFirstTap() {
    document.removeEventListener('pointerdown', onFirstTap);
    if (musicOn && actx && actx.state !== 'running') {
      var p = actx.resume();
      if (p && p.then) p.then(onMusicRunning).catch(function () {});
    } else if (!musicOn) {
      startMusic();
    }
  });
  startMusic();

  /* ---------- 16. Init ---------- */
  function init() {
    qsa('[data-name]').forEach(function (el) { el.textContent = CONFIG.name; });
    qsa('[data-name-upper]').forEach(function (el) { el.textContent = CONFIG.name.toUpperCase(); });
    qsa('[data-from]').forEach(function (el) { el.textContent = CONFIG.from; });

    gsap.fromTo('.kicker', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.3 });
    gsap.fromTo('.intro-name', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.45, ease: 'power3.out' });
    gsap.fromTo('.sub', { opacity: 0 }, { opacity: 1, duration: 0.9, delay: 0.9 });
  }

  init();
})();
