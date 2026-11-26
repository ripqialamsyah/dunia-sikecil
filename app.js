(() => {
  const state = {
    screen: 'home',
    category: 'animals',
    mode: 'explore',
    index: 0,
    soundEnabled: true,
    quizTarget: null,
    quizLastTargetId: null,
    quizPair: [],
    quizStreak: 0,
    quizLocked: false,
    quizTimer: null,
    countTimers: [],
    toastTimer: null
  };

  // Elements
  const screenHome = document.getElementById('screen-home');
  const screenPlay = document.getElementById('screen-play');
  const btnHome = document.getElementById('btn-home');
  const btnSound = document.getElementById('btn-sound');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const iconSoundOn = document.getElementById('icon-sound-on');
  const iconSoundOff = document.getElementById('icon-sound-off');
  const iconFsEnter = document.getElementById('icon-fs-enter');
  const iconFsExit = document.getElementById('icon-fs-exit');
  const modeSwitch = document.getElementById('mode-switch');
  const btnModeExplore = document.getElementById('btn-mode-explore');
  const btnModeQuiz = document.getElementById('btn-mode-quiz');
  const parentToast = document.getElementById('parent-toast');

  const viewExplore = document.getElementById('view-explore');
  const viewQuiz = document.getElementById('view-quiz');

  const exploreCard = document.getElementById('explore-card');
  const exploreVisual = document.getElementById('explore-visual');
  const exploreCounters = document.getElementById('explore-counters');
  const exploreTitle = document.getElementById('explore-title');
  const exploreSubtitle = document.getElementById('explore-subtitle');
  const progressDots = document.getElementById('progress-dots');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  const quizPromptBtn = document.getElementById('quiz-prompt-btn');
  const quizPromptText = document.getElementById('quiz-prompt-text');
  const quizOptions = document.getElementById('quiz-options');
  const sparkleLayer = document.getElementById('sparkle-layer');

  function initHomeIcons() {
    document.getElementById('home-art-animals').innerHTML = GAME_DATA.homeIcons.animals;
    document.getElementById('home-art-numbers').innerHTML = GAME_DATA.homeIcons.numbers;
    document.getElementById('home-art-letters').innerHTML = GAME_DATA.homeIcons.letters;
    document.getElementById('home-art-shapes').innerHTML = GAME_DATA.homeIcons.colors_shapes;
    document.getElementById('home-art-fruits').innerHTML = GAME_DATA.homeIcons.fruits;
    document.getElementById('home-art-vehicles').innerHTML = GAME_DATA.homeIcons.vehicles;
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  function clearTimers() {
    if (state.quizTimer) {
      clearTimeout(state.quizTimer);
      state.quizTimer = null;
    }
    state.countTimers.forEach((t) => clearTimeout(t));
    state.countTimers = [];
    soundEngine.stopEffects();
  }

  function showParentToast(msg = 'Tahan tombol sebentar (Mode Orang Tua)') {
    if (state.toastTimer) clearTimeout(state.toastTimer);
    parentToast.textContent = msg;
    parentToast.classList.remove('hidden');
    state.toastTimer = setTimeout(() => {
      parentToast.classList.add('hidden');
    }, 1600);
  }

  /**
   * Parent Gate: requires holding for `durationMs` when inside Play screen
   * so a 1-year-old's accidental tap doesn't exit or mute.
   */
  function attachParentHold(el, action, { durationMs = 850, alwaysRequireHold = false } = {}) {
    let timer = null;
    let triggered = false;
    let activePointerId = null;

    const cancelHold = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      activePointerId = null;
      el.classList.remove('holding');
    };

    el.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      const needsHold = alwaysRequireHold || state.screen === 'play';
      if (!needsHold) {
        triggered = true;
        action();
        return;
      }

      triggered = false;
      activePointerId = e.pointerId;
      el.classList.add('holding');
      timer = setTimeout(() => {
        triggered = true;
        cancelHold();
        action();
      }, durationMs);
    });

    el.addEventListener('pointerup', (e) => {
      e.stopPropagation();
      if (activePointerId !== null && !triggered && (alwaysRequireHold || state.screen === 'play')) {
        showParentToast('Tahan sebentar untuk orang tua');
        soundEngine.playSoftNudge();
      }
      cancelHold();
    });

    el.addEventListener('pointercancel', cancelHold);
    el.addEventListener('pointerleave', cancelHold);

    // Keyboard accessibility (Enter / Space)
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        action();
      }
    });
  }

  function spawnSparkles(x, y, count = 10) {
    const icons = ['⭐', '✨', '🌟', '💛', '🎈'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'sparkle';
      el.textContent = icons[i % icons.length];
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 55 + Math.random() * 85;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 20;
      const rot = Math.round((Math.random() - 0.5) * 140) + 'deg';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.setProperty('--dx', `${dx}px`);
      el.style.setProperty('--dy', `${dy}px`);
      el.style.setProperty('--rot', rot);
      sparkleLayer.appendChild(el);
      setTimeout(() => el.remove(), 900);
    }
  }

  function spawnBubble(x, y) {
    const size = 28 + Math.random() * 26;
    const dx = (Math.random() - 0.5) * 44;
    const el = document.createElement('div');
    el.className = 'bubble';
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--dx', `${dx}px`);
    sparkleLayer.appendChild(el);
    setTimeout(() => el.remove(), 1150);
  }

  function spawnSparklesAtElement(el, count = 10) {
    const rect = el.getBoundingClientRect();
    spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
  }

  function getItems() {
    return GAME_DATA[state.category] || [];
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {
        showParentToast('Layar penuh tidak didukung browser ini');
      });
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  function syncFullscreenIcon() {
    const isFs = Boolean(document.fullscreenElement);
    iconFsEnter.classList.toggle('hidden', isFs);
    iconFsExit.classList.toggle('hidden', !isFs);
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    soundEngine.setEnabled(state.soundEnabled);
    iconSoundOn.classList.toggle('hidden', !state.soundEnabled);
    iconSoundOff.classList.toggle('hidden', state.soundEnabled);
    btnSound.setAttribute('aria-label', state.soundEnabled ? 'Suara Aktif' : 'Suara Mati');
    if (state.soundEnabled) soundEngine.playPop(4);
  }

  function showHome() {
    clearTimers();
    state.screen = 'home';
    screenHome.classList.remove('hidden');
    screenPlay.classList.add('hidden');
    btnHome.classList.add('hidden');
    modeSwitch.classList.add('hidden');
    soundEngine.playPop(0);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function openCategory(category) {
    clearTimers();
    state.category = category;
    state.index = 0;
    state.mode = 'explore';
    state.screen = 'play';
    state.quizStreak = 0;
    state.quizLastTargetId = null;

    screenHome.classList.add('hidden');
    screenPlay.classList.remove('hidden');
    btnHome.classList.remove('hidden');
    modeSwitch.classList.remove('hidden');

    updateModeButtons();
    renderExplore(true);
  }

  function setMode(mode) {
    if (state.mode === mode) return;
    clearTimers();
    state.mode = mode;
    updateModeButtons();
    soundEngine.playPop(2);

    if (mode === 'explore') {
      viewQuiz.classList.add('hidden');
      viewExplore.classList.remove('hidden');
      renderExplore(true);
    } else {
      viewExplore.classList.add('hidden');
      viewQuiz.classList.remove('hidden');
      startQuizRound();
    }
  }

  function updateModeButtons() {
    const isExplore = state.mode === 'explore';
    btnModeExplore.classList.toggle('active', isExplore);
    btnModeExplore.setAttribute('aria-selected', String(isExplore));
    btnModeQuiz.classList.toggle('active', !isExplore);
    btnModeQuiz.setAttribute('aria-selected', String(!isExplore));
  }

  function renderExplore(speakNow = false) {
    clearTimers();
    viewExplore.classList.remove('hidden');
    viewQuiz.classList.add('hidden');

    const items = getItems();
    const item = items[state.index];
    if (!item) return;

    exploreCard.style.setProperty('--card-bg', item.cardBg || '#ffffff');
    exploreCard.style.setProperty('--card-ledge', item.ledge || '#dce6ef');

    if (state.category === 'numbers') {
      exploreVisual.innerHTML = `<div class="big-glyph" style="--glyph-color: ${item.color}">${item.glyph}</div>`;
      exploreCounters.classList.remove('hidden');
      exploreCounters.innerHTML = Array.from({ length: item.count })
        .map(
          (_, idx) =>
            `<button type="button" class="counter-item" data-idx="${idx}" aria-label="Hitung benda ke ${idx + 1}">${item.counterSvg}</button>`
        )
        .join('');

      exploreCounters.querySelectorAll('.counter-item').forEach((counterBtn) => {
        counterBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          handleCounterTap(counterBtn, item, e);
        });
      });
    } else if (state.category === 'letters') {
      exploreCounters.classList.add('hidden');
      exploreCounters.innerHTML = '';
      exploreVisual.innerHTML = `
        <div class="big-glyph-wrap">
          <div class="big-glyph" style="--glyph-color: ${item.color}">${item.glyph}</div>
          <div class="glyph-companion">${item.svg}</div>
        </div>
      `;
    } else {
      exploreCounters.classList.add('hidden');
      exploreCounters.innerHTML = '';
      exploreVisual.innerHTML = item.svg;
    }

    exploreTitle.textContent = item.title;
    exploreSubtitle.textContent = item.subtitle;

    if (items.length <= 12) {
      progressDots.innerHTML = items
        .map((_, i) => `<span class="dot ${i === state.index ? 'active' : ''}"></span>`)
        .join('');
    } else {
      progressDots.innerHTML = `<span style="font-weight:700;color:#5f6c7b;font-size:1rem;">${state.index + 1} / ${items.length}</span>`;
    }

    if (speakNow) {
      triggerExploreFeedback(item, false);
    }
  }

  function handleCounterTap(counterBtn, item, event) {
    clearTimers();
    const allCounters = Array.from(exploreCounters.querySelectorAll('.counter-item'));
    const alreadyAllLit = allCounters.every((el) => el.classList.contains('lit'));
    if (alreadyAllLit) {
      allCounters.forEach((el) => el.classList.remove('lit'));
    }

    if (!counterBtn.classList.contains('lit')) {
      counterBtn.classList.add('lit');
    }

    const litCount = allCounters.filter((el) => el.classList.contains('lit')).length;
    const countWord = NUMBER_WORDS[litCount - 1] || String(litCount);

    if (event && event.clientX) {
      spawnSparkles(event.clientX, event.clientY, 5);
    }

    if (litCount === item.count) {
      soundEngine.playSuccess();
      soundEngine.speak(`${countWord}! Hebat, ada ${item.countLabel || item.title}!`, 120);
      spawnSparklesAtElement(exploreCard, 12);
    } else {
      soundEngine.playCountNote(litCount - 1);
      soundEngine.speak(`${countWord}!`, 40);
    }
  }

  function triggerExploreFeedback(item, withSparkles = true, tapX = null, tapY = null) {
    clearTimers();
    exploreCard.classList.remove('bounce');
    void exploreCard.offsetWidth;
    exploreCard.classList.add('bounce');

    const animClass = `anim-${item.anim || 'jiggle'}`;
    exploreVisual.className = 'explore-visual';
    void exploreVisual.offsetWidth;
    exploreVisual.classList.add(animClass);

    if (withSparkles) {
      if (tapX !== null && tapY !== null) {
        spawnSparkles(tapX, tapY, 9);
      } else {
        spawnSparklesAtElement(exploreCard, 9);
      }
    }

    if (item.sound) {
      const waitMs = soundEngine.playEffect(item.sound);
      soundEngine.speak(item.speech, Math.max(260, waitMs));
    } else if (state.category === 'numbers') {
      const counterEls = exploreCounters.querySelectorAll('.counter-item');
      counterEls.forEach((el) => el.classList.remove('lit'));
      soundEngine.speak(item.speech, 40);
      counterEls.forEach((el, idx) => {
        const timer = setTimeout(() => {
          el.classList.add('lit');
          soundEngine.playCountNote(idx);
        }, idx * 140);
        state.countTimers.push(timer);
      });
    } else {
      soundEngine.playPop(state.index);
      soundEngine.speak(item.speech, 110);
    }
  }

  function stepExplore(delta) {
    const items = getItems();
    state.index = (state.index + delta + items.length) % items.length;
    renderExplore(true);
  }

  function getQuizLabel(item) {
    if (state.category === 'letters') return `Huruf ${item.glyph}`;
    if (state.category === 'numbers') return `Angka ${item.glyph}`;
    return item.title;
  }

  function startQuizRound() {
    clearTimers();
    state.quizLocked = false;
    const items = getItems();

    // Gradually expand pool for long categories so 1-year-olds aren't overwhelmed
    const poolSize =
      items.length > 8 ? Math.min(items.length, 5 + state.quizStreak) : items.length;
    const pool = items.slice(0, poolSize);

    let targetIdx = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && pool[targetIdx].id === state.quizLastTargetId) {
      targetIdx = (targetIdx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
    }

    let otherIdx = Math.floor(Math.random() * pool.length);
    while (otherIdx === targetIdx && pool.length > 1) {
      otherIdx = Math.floor(Math.random() * pool.length);
    }

    const target = pool[targetIdx];
    const other = pool[otherIdx];
    state.quizTarget = target;
    state.quizLastTargetId = target.id;
    state.quizPair = Math.random() < 0.5 ? [target, other] : [other, target];

    const questionLabel = getQuizLabel(target);
    quizPromptText.textContent = `Mana ${questionLabel}?`;

    quizOptions.innerHTML = '';
    state.quizPair.forEach((item) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-card';
      btn.style.setProperty('--card-bg', item.cardBg || '#ffffff');
      btn.style.setProperty('--card-ledge', item.ledge || '#dce6ef');

      let visualHtml = '';
      if (state.category === 'numbers' || state.category === 'letters') {
        visualHtml = `<div class="quiz-glyph" style="color:${item.color}">${item.glyph}</div>`;
      } else {
        visualHtml = `<div class="quiz-visual">${item.svg}</div>`;
      }

      const labelHtml =
        state.category === 'letters'
          ? `<div class="quiz-label">${item.title.split('—')[1]?.trim() || item.title}</div>`
          : `<div class="quiz-label">${item.title}</div>`;

      btn.innerHTML = `${visualHtml}${labelHtml}`;
      btn.addEventListener('click', (e) => handleQuizChoice(item, btn, e));
      quizOptions.appendChild(btn);
    });

    soundEngine.speak(`Mana ${questionLabel}?`, 120);
  }

  function handleQuizChoice(item, cardEl, event) {
    if (state.quizLocked) return;
    const targetLabel = getQuizLabel(state.quizTarget);

    if (item.id === state.quizTarget.id) {
      state.quizLocked = true;
      state.quizStreak += 1;
      cardEl.classList.add('celebrate');
      soundEngine.playSuccess();
      soundEngine.speak(`Hebat! Ini ${targetLabel}!`, 140);

      if (event && event.clientX) {
        spawnSparkles(event.clientX, event.clientY, 14);
      } else {
        spawnSparklesAtElement(cardEl, 14);
      }

      state.quizTimer = setTimeout(() => {
        startQuizRound();
      }, 1700);
    } else {
      cardEl.classList.remove('gentle-wobble');
      void cardEl.offsetWidth;
      cardEl.classList.add('gentle-wobble');
      soundEngine.playSoftNudge();
      soundEngine.speak(`Itu ${getQuizLabel(item)}. Yuk cari ${targetLabel}!`, 80);
    }
  }

  // Event Listeners
  document.querySelectorAll('.cat-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      openCategory(btn.dataset.category);
    });
  });

  attachParentHold(btnHome, showHome, { durationMs: 850, alwaysRequireHold: true });
  attachParentHold(btnSound, toggleSound, { durationMs: 850, alwaysRequireHold: false });
  attachParentHold(btnFullscreen, toggleFullscreen, { durationMs: 850, alwaysRequireHold: false });
  attachParentHold(btnModeExplore, () => setMode('explore'), { durationMs: 750, alwaysRequireHold: true });
  attachParentHold(btnModeQuiz, () => setMode('quiz'), { durationMs: 750, alwaysRequireHold: true });

  document.addEventListener('fullscreenchange', syncFullscreenIcon);

  btnPrev.addEventListener('click', () => stepExplore(-1));
  btnNext.addEventListener('click', () => stepExplore(1));

  exploreCard.addEventListener('click', (e) => {
    const item = getItems()[state.index];
    if (item) {
      triggerExploreFeedback(item, true, e.clientX || null, e.clientY || null);
    }
  });

  exploreCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = getItems()[state.index];
      if (item) triggerExploreFeedback(item, true);
    }
  });

  quizPromptBtn.addEventListener('click', () => {
    if (!state.quizTarget) return;
    soundEngine.playPop(1);
    soundEngine.speak(`Mana ${getQuizLabel(state.quizTarget)}?`, 60);
  });

  // Gentle cause-and-effect bubble pops if toddler taps background areas
  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, .explore-card')) return;
    spawnBubble(e.clientX, e.clientY);
    soundEngine.playBubblePop();
  });

  // Gentle swipe left/right on explore card
  let touchStartX = null;
  exploreCard.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  exploreCard.addEventListener(
    'touchend',
    (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(dx) > 48) {
        stepExplore(dx < 0 ? 1 : -1);
      }
    },
    { passive: true }
  );

  // Keyboard support for parents on laptop
  window.addEventListener('keydown', (e) => {
    if (state.screen !== 'play') return;
    if (e.key === 'Escape') {
      showHome();
      return;
    }
    if (state.mode !== 'explore') return;
    if (e.key === 'ArrowRight') stepExplore(1);
    else if (e.key === 'ArrowLeft') stepExplore(-1);
  });

  initHomeIcons();
  registerServiceWorker();
})();
