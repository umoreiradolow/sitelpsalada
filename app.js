// ============================================================
// Saladas no Pote LP V14 — App Script (Otimizado Mobile-First)
// ============================================================

(function() {
  'use strict';

  let isVideoOutOfView = false;
  let vimeoPlayer = null;

  // ---------- Imagens reais de alunas (Marquee horizontal contínuo) ----------
  const SALADS = [
    { img: 'salad-1.webp', name: 'Daniela S.', caption: 'O molho de gergelim ficou idêntico ao do restaurante. Vício total.' },
    { img: 'salad-2.webp', name: 'Renata B.',  caption: 'Preparei 4 potes em menos de 1 hora. Semana inteira resolvida.' },
    { img: 'salad-3.webp', name: 'Camila O.',  caption: 'A versão thai com edamame virou a queridinha da casa.' },
    { img: 'salad-4.webp', name: 'Juliana M.', caption: 'Quinta-feira e a folha ainda crocante. Método das camadas funciona.' },
    { img: 'salad-5.webp', name: 'Beatriz A.', caption: 'Salada mexicana com feijão preto — meu marido pediu repetir.' },
    { img: 'salad-6.webp', name: 'Larissa P.', caption: 'Não consigo mais pedir marmita. Cada pote sai por menos de R$8.' },
  ];

  function renderMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const loop = [...SALADS, ...SALADS]; // Duplicado para fazer loop infinito
    const star = '★';
    track.innerHTML = loop.map(s => `
      <article class="salad-card">
        <div class="salad-card__img"><img src="assets/student-salads/${s.img}" alt="Salada de ${s.name}" width="280" height="396" loading="lazy" decoding="async"></div>
        <div class="salad-card__body">
          <div class="stars">${star}${star}${star}${star}${star}</div>
          <p class="salad-card__caption">"${s.caption}"</p>
          <div class="salad-card__name">— ${s.name}</div>
        </div>
      </article>
    `).join('');
  }

  // ---------- Simulador de Camadas Interativo (Pote Perfeito) ----------
  function initPoteSimulator() {
    const layers = document.querySelectorAll('.jar-layer');
    const contents = document.querySelectorAll('.layer-detail-content');
    if (!layers.length || !contents.length) return;

    function activeLayer(layerNum) {
      // Remove classes ativas de todas as camadas e conteúdos
      layers.forEach(l => l.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Adiciona ativa na camada e conteúdo selecionado
      const targetLayer = document.querySelector(`.jar-layer--${layerNum}`);
      const targetContent = document.querySelector(`[data-layer-content="${layerNum}"]`);
      
      if (targetLayer) targetLayer.classList.add('active');
      if (targetContent) targetContent.classList.add('active');
    }

    // Eventos de clique nas camadas
    layers.forEach(layer => {
      layer.addEventListener('click', () => {
        const num = layer.getAttribute('data-layer');
        activeLayer(num);
      });
      // Hover para desktop
      layer.addEventListener('mouseenter', () => {
        const num = layer.getAttribute('data-layer');
        activeLayer(num);
      });
    });

    // Inicia com a camada 5 (Topo) ativa
    activeLayer(5);
  }

  // ---------- Economizômetro Dinâmico ----------
  function initEconomizometro() {
    const slider = document.getElementById('ecoRange');
    const currentText = document.getElementById('ecoCurrentText');
    const monthVal = document.getElementById('ecoMonthValue');
    const yearVal = document.getElementById('ecoYearValue');
    const barCurrent = document.getElementById('ecoBarCurrent');
    const barPote = document.getElementById('ecoBarPote');

    if (!slider) return;

    function formatBRL(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function calculate() {
      const dailySpend = parseInt(slider.value);
      const saladCost = 8.00;
      
      const dailySavings = dailySpend - saladCost;
      const monthlySavings = dailySavings * 22;
      const yearlySavings = dailySavings * 264; // 12 meses x 22 dias de almoço

      const totalMonthCurrent = dailySpend * 22;
      const totalMonthPote = saladCost * 22; // R$176.00 fixo

      // Atualiza textos na tela
      currentText.textContent = `R$ ${dailySpend},00 / dia`;
      monthVal.textContent = formatBRL(monthlySavings);
      yearVal.textContent = formatBRL(yearlySavings);

      // Atualiza textos das barras comparativas
      barCurrent.textContent = formatBRL(totalMonthCurrent);
      
      // Proporção de preenchimento
      const pctPote = (totalMonthPote / totalMonthCurrent) * 100;
      barPote.style.width = `${pctPote}%`;
      barPote.textContent = `${formatBRL(totalMonthPote)}`;
    }

    slider.addEventListener('input', calculate);
    calculate(); // Inicializa
  }

  // ---------- FAQ accordion ----------
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-item__btn');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  }

  // ---------- Legal modals ----------
  const LEGAL_CONTENT = {
    privacy: {
      title: 'Política de Privacidade',
      html: `
        <p>Esta Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais ao adquirir nossos produtos digitais.</p>
        <h4>1. Responsabilidade</h4>
        <p>Somos responsáveis pelo infoproduto "101 Receitas de Saladas no Pote". Contato: <strong>moreira.digital2026@gmail.com</strong>.</p>
        <h4>2. Coleta de dados</h4>
        <p>Coletamos nome, e-mail e CPF informados no checkout para envio do link do PDF e controle fiscal de venda. Dados de navegação (cookies, IP) são capturados de forma totalmente anônima para análise de cliques e anúncios.</p>
        <h4>3. Proteção e Retenção</h4>
        <p>Seus dados são protegidos por criptografia de ponta a ponta e nunca serão compartilhados, vendidos ou alugados para terceiros. O processamento financeiro é 100% gerenciado pela plataforma de pagamentos GG Checkout.</p>
      `
    },
    terms: {
      title: 'Termos de Uso',
      html: `
        <p>Ao adquirir o produto "101 Receitas de Saladas no Pote", você concorda com as diretrizes de licenciamento digital.</p>
        <h4>1. Licença de Uso Pessoal</h4>
        <p>O material em PDF é de uso estritamente pessoal e intransferível. Fica proibida a revenda, republicação em sites de compartilhamento ou reprodução comercial total/parcial do material sem autorização.</p>
        <h4>2. Isenção de Resultados de Saúde</h4>
        <p>O material é meramente informativo. Não substitui dietas médicas ou consultas com nutricionistas profissionais. Pessoas com restrições alimentares severas devem validar ingredientes antes do consumo.</p>
      `
    }
  };

  function initLegal() {
    const modal = document.getElementById('legalModal');
    const title = document.getElementById('legalTitle');
    const body  = document.getElementById('legalModalBody');
    if (!modal) return;
    
    function open(kind) {
      const c = LEGAL_CONTENT[kind];
      if (!c) return;
      title.textContent = c.title;
      body.innerHTML = c.html;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    
    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    
    document.querySelectorAll('[data-legal]').forEach(a => {
      a.addEventListener('click', e => { e.preventDefault(); open(a.getAttribute('data-legal')); });
    });
    
    document.querySelectorAll('[data-legal-close]').forEach(b => b.addEventListener('click', close));
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // ---------- Notificações de Vendas Reais Simuladas (Social Proof) ----------
  const SALE_NAMES = [
    'Mariana A.', 'Roberta L.', 'Aline P.', 'Tatiane S.', 'Vanessa M.',
    'Cláudia R.', 'Eliane B.', 'Sandra F.', 'Karina G.', 'Lucimara C.',
    'Priscila O.', 'Fátima D.', 'Sueli N.', 'Rosa H.', 'Adriana J.',
    'Carla T.', 'Joana E.', 'Yara K.', 'Débora V.', 'Helena W.',
  ];
  const SALE_CITIES = [
    'São Paulo / SP', 'Rio de Janeiro / RJ', 'Belo Horizonte / MG', 'Curitiba / PR',
    'Salvador / BA', 'Fortaleza / CE', 'Recife / PE', 'Porto Alegre / RS',
    'Brasília / DF', 'Goiânia / GO', 'Florianópolis / SC', 'Vitória / ES',
    'Campinas / SP', 'Santos / SP', 'Sorocaba / SP',
  ];

  function initSalePopup() {
    const pop = document.getElementById('salePop');
    const popName = document.getElementById('salePopName');
    const popAction = document.getElementById('salePopAction');
    const popMeta = document.getElementById('salePopMeta');
    if (!pop) return;
    
    let popTimer = null;
    let popClosed = false;

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function show() {
      if (popClosed || !isVideoOutOfView) {
        clearTimeout(popTimer);
        popTimer = setTimeout(show, 3000);
        return;
      }
      
      const pkg = Math.random() < 0.25 ? 'Pacote Simples' : 'Pacote Completo';
      popName.textContent = pick(SALE_NAMES);
      popAction.innerHTML = `Comprou o <strong>${pkg}</strong>`;
      popMeta.textContent = pick(SALE_CITIES);
      
      pop.classList.add('is-visible');
      
      clearTimeout(popTimer);
      popTimer = setTimeout(hide, 6000); // Fica 6 segundos na tela
    }

    function hide() {
      pop.classList.remove('is-visible');
      clearTimeout(popTimer);
      popTimer = setTimeout(show, 15000); // Reaparece após 15 segundos
    }

    window.__closeSalePop = function() {
      popClosed = true;
      pop.classList.remove('is-visible');
      clearTimeout(popTimer);
    };

    setTimeout(show, 8000); // Dispara após 8s
  }

  // ---------- Rastreamento de Checkouts ----------
  function initCheckoutTracking() {
    document.querySelectorAll('[data-checkout]').forEach(btn => {
      btn.addEventListener('click', () => {
        const which = btn.getAttribute('data-checkout');
        const value = which === 'completo' ? 24.90 : 10.00;
        const label = which === 'completo' ? 'Pacote Completo' : 'Pacote Simples';
        
        try {
          if (which === 'completo') {
            if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: label, value: value, currency: 'BRL' });
            if (window.gtag) gtag('event', 'begin_checkout', { currency: 'BRL', value: value, items: [{ item_name: label, price: value, quantity: 1 }] });
          }
          if (window.clarity) clarity('event', 'click_checkout_' + which);
        } catch(e) {}
      });
    });
  }

  // ---------- Vimeo Video Control ----------
  function initHeroVideo() {
    const overlay = document.getElementById('videoOverlay');
    const catcher = document.getElementById('videoClickCatcher');
    if (!overlay) return;

    function playVideo() {
      overlay.classList.add('is-hidden');
      if (catcher) catcher.style.display = 'block';

      try {
        if (vimeoPlayer && typeof vimeoPlayer.setMuted === 'function') {
          vimeoPlayer.setCurrentTime(0)
            .then(() => vimeoPlayer.setMuted(false))
            .then(() => vimeoPlayer.setVolume(1.0))
            .then(() => vimeoPlayer.play());
        } else {
          const iframe = document.getElementById('vimeo-player');
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'setCurrentTime', value: 0 }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'setMuted', value: false }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value: 1.0 }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
          }
        }
      } catch (e) {
        console.warn("Vimeo play error:", e);
      }
    }

    overlay.addEventListener('click', playVideo);

    if (catcher) {
      catcher.addEventListener('click', () => {
        if (vimeoPlayer && typeof vimeoPlayer.getPaused === 'function') {
          vimeoPlayer.getPaused().then(paused => {
            if (paused) vimeoPlayer.play();
            else vimeoPlayer.pause();
          });
        }
      });
    }
  }

  function initVideoScrollPause() {
    const iframe = document.getElementById('vimeo-player');
    if (!iframe || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Pausa se sair completamente da tela
        if (!entry.isIntersecting) {
          if (vimeoPlayer && typeof vimeoPlayer.pause === 'function') {
            vimeoPlayer.pause().catch(() => {});
          }
        }
      });
    }, {
      root: null,
      threshold: 0
    });

    observer.observe(iframe);
  }

  function loadVimeoAPI() {
    const iframe = document.getElementById('vimeo-player');
    if (!iframe) return;

    const tag = document.createElement('script');
    tag.src = 'https://player.vimeo.com/api/player.js';
    tag.onload = function() {
      try {
        if (typeof Vimeo !== 'undefined') {
          vimeoPlayer = new Vimeo.Player(iframe);
          vimeoPlayer.setLoop(false);
          initVideoScrollPause();
          
          // Monitora se o vídeo está sendo visualizado na tela
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              isVideoOutOfView = !entry.isIntersecting;
              if (entry.isIntersecting) {
                const pop = document.getElementById('salePop');
                if (pop) pop.classList.remove('is-visible');
              }
            });
          }, { root: null, threshold: 0 });
          obs.observe(iframe);
        }
      } catch (e) {}
    };
    document.head.appendChild(tag);
  }

  // ---------- Urgency Banner Timer ----------
  function initUrgencyTimer() {
    const timerEl = document.getElementById('urgencyCountdown');
    if (!timerEl) return;

    function update() {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);

      const diff = nextMidnight - now;
      if (diff <= 0) {
        timerEl.textContent = "00:00:00";
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = n => String(n).padStart(2, '0');
      timerEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    update();
    setInterval(update, 1000);
  }

  // ---------- Upsell Modal de R$4,90 ----------
  function initUpsellModal() {
    const modal = document.getElementById('upsellModal');
    if (!modal) return;

    const simplesBtns = document.querySelectorAll('[data-checkout="simples"]');
    const closeBtn = document.getElementById('upsellCloseBtn');
    const secBtn = document.getElementById('upsellSecBtn');
    const mainBtn = document.getElementById('upsellMainBtn');

    // Abre o modal de upsell ao clicar em qualquer botão do Pacote Simples
    simplesBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    
    if (secBtn) {
      secBtn.addEventListener('click', () => {
        try {
          if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: 'Pacote Simples (Downsell)', value: 10.00, currency: 'BRL' });
          if (window.gtag) gtag('event', 'begin_checkout', { currency: 'BRL', value: 10.00, items: [{ item_name: 'Pacote Simples (Downsell)', price: 10.00, quantity: 1 }] });
        } catch(err) {}
        close();
      });
    }

    if (mainBtn) {
      mainBtn.addEventListener('click', () => {
        try {
          if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: 'Pacote Completo (Upsell)', value: 14.90, currency: 'BRL' });
          if (window.gtag) gtag('event', 'begin_checkout', { currency: 'BRL', value: 14.90, items: [{ item_name: 'Pacote Completo (Upsell)', price: 14.90, quantity: 1 }] });
        } catch(err) {}
        close();
      });
    }

    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  }

  // ---------- Sticky Bottom Mobile CTA ----------
  function initFloatingCta() {
    const cta = document.getElementById('floatingCta');
    const completeCard = document.getElementById('completeCard');
    if (!cta || !completeCard) return;

    const btn = document.getElementById('btnFloatingCta');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('ofertas-anchor');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // O cta só aparece após passar o card do pacote completo rolando para baixo
          const isScrolledPast = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && isScrolledPast) {
            cta.classList.add('is-visible');
          } else {
            cta.classList.remove('is-visible');
          }
        });
      }, { root: null, threshold: 0 });
      observer.observe(completeCard);
    }
  }

  // ---------- Staggered Pricing Cards Focus Pulse ----------
  function initPricingCardsObserver() {
    const section = document.getElementById('oferta');
    if (!section || !window.IntersectionObserver) return;
    
    const cards = section.querySelectorAll('.price-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('animate-pulse-once');
            }, idx * 180);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.1 });
    
    observer.observe(section);
  }

  // ---------- Boot ----------
  function boot() {
    renderMarquee();
    initPoteSimulator();
    initEconomizometro();
    initFAQ();
    initLegal();
    initSalePopup();
    initCheckoutTracking();
    initHeroVideo();
    loadVimeoAPI();
    initUrgencyTimer();
    initUpsellModal();
    initFloatingCta();
    initPricingCardsObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
