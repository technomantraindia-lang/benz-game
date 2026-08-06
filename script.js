'use strict';

/* ===== PARTICLES ===== */
(function () {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 3 + 1;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*8+5}s;--delay:${Math.random()*8}s;`;
    p.style.background = ['#f0a500','#ffd166','#ffffff','#e63946'][Math.floor(Math.random()*4)];
    c.appendChild(p);
  }
})();

/* ===== HAMBURGER ===== */
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    const s = btn.querySelectorAll('span');
    if (open) {
      s[0].style.transform = 'translateY(7px) rotate(45deg)';
      s[1].style.opacity = '0';
      s[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      s.forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    }
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(x => { x.style.transform = ''; x.style.opacity = ''; });
    }
  });
})();

/* ===== COUNTER ===== */
(function () {
  const els = document.querySelectorAll('.stat-number[data-target]');
  if (!els.length) return;
  const fmt = n => n >= 1e6 ? (n/1e6).toFixed(1)+'M+' : n >= 1000 ? (n/1000).toFixed(0)+'K+' : n;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target, dur = 2000, t0 = performance.now();
      const step = now => {
        const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.floor(eased * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
})();

/* ===== NAVBAR SCROLL ===== */
(function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 10 ? 'rgba(6,4,4,0.99)' : '';
    nav.style.boxShadow  = window.scrollY > 10 ? '0 2px 20px rgba(240,165,0,0.08)' : '';
  }, { passive: true });
})();

/* ===== VIDEO AUTOPLAY ===== */
(function () {
  const v = document.getElementById('heroVideo');
  if (!v) return;
  v.muted = true;
  v.play().catch(() => {
    const play = () => { v.play(); };
    document.addEventListener('click', play, { once: true });
    document.addEventListener('touchstart', play, { once: true });
  });
})();

/* ===== RIPPLE ===== */
(function () {
  document.querySelectorAll('.btn-cta-primary,.btn-register-nav,.btn-claim,.btn-vip-join').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = this.getBoundingClientRect();
      const el = document.createElement('span');
      el.className = 'ripple-effect';
      const sz = Math.max(r.width, r.height);
      el.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-r.left-sz/2}px;top:${e.clientY-r.top-sz/2}px;`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(el);
      setTimeout(() => el.remove(), 600);
    });
  });
})();

/* ===== SCROLL REVEAL ===== */
(function () {
  const items = document.querySelectorAll(
    '.winner-card,.game-card,.promo-card,.step-card,.vip-perk,.stat-item,.hero-title,.hero-subtitle,.live-badge'
  );
  const cards = Array.from(document.querySelectorAll('.game-card'));
  const isMobile = window.matchMedia('(max-width: 560px)').matches;
  
  items.forEach((el, i) => {
    el.style.opacity = '0';
    if (el.classList.contains('game-card') && !isMobile) {
      const cardIdx = cards.indexOf(el);
      // Alternate left/right slide-in for cards
      if (cardIdx % 2 === 0) {
        el.style.transform = 'translateX(-80px)';
      } else {
        el.style.transform = 'translateX(80px)';
      }
    } else {
      el.style.transform = isMobile ? 'translateY(14px)' : 'translateY(22px)';
    }
    el.style.transition = `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        if (e.target.classList.contains('game-card') && !isMobile) {
          e.target.style.transform = 'translateX(0)';
        } else {
          e.target.style.transform = 'translateY(0)';
        }
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 }); // Lower threshold to trigger sooner and smoother on scroll
  items.forEach(el => obs.observe(el));
})();

/* ===== ACTION REDIRECTS ===== */
(function () {
  const targetUrl = 'https://share.ct4ze.com/web/share/index.html?ic=AA0G53Q1&ts=1785923340&m=2&lang=en&id=1';
  const selectors = [
    '.btn-login',
    '.btn-register-nav',
    '.btn-cta-primary',
    '.btn-vip-join',
    '.btn-download-app',
    '.btn-claim',
    '.game-card',
    '.game-play-btn',
    '.faq-answer strong'
  ];
  
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(targetUrl, '_blank');
      });
    });
  });
})();

/* ===== FAQ ACCORDION ===== */
(function () {
  const questions = document.querySelectorAll('.faq-question');
  const setAnswerHeight = answer => {
    answer.style.maxHeight = (answer.scrollHeight + 24) + 'px';
  };
  const unlockAnswerHeight = answer => {
    if (answer.closest('.faq-item')?.classList.contains('active')) {
      answer.style.maxHeight = 'none';
    }
  };

  questions.forEach(q => {
    q.addEventListener('click', function () {
      const item = this.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        requestAnimationFrame(() => {
          setAnswerHeight(answer);
          setTimeout(() => unlockAnswerHeight(answer), 450);
        });
      }
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-item.active .faq-answer').forEach(answer => {
      answer.style.maxHeight = 'none';
    });
  }, { passive: true });
})();

/* ===== COUNTDOWN TIMER — 1 min infinite loop ===== */
(function () {
  const el = document.getElementById('heroTimer');
  if (!el) return;

  let totalSeconds = 60;

  const format = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  function tick() {
    el.textContent = format(totalSeconds);
    // Flash red in last 10 seconds
    el.classList.toggle('flash', totalSeconds <= 10);
    totalSeconds = totalSeconds === 0 ? 60 : totalSeconds - 1;
  }

  tick();
  setInterval(tick, 1000);
})();
