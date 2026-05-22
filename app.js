// ============================================================
// Saladas no Pote — App script
// Deferred from index.html so it doesn't block render.
// Handles: marquee render, FAQ accordion, legal modals,
// sales popup, checkout tracking.
// ============================================================

(function() {
  'use strict';

  // ---------- Student salads carousel ----------
  const SALADS = [
    { img: 'salad-1.webp', name: 'Daniela S.', caption: 'O molho de gergelim ficou idêntico ao do restaurante. Vício total.' },
    { img: 'salad-2.webp', name: 'Renata B.',  caption: 'Preparei 4 potes em menos de 1 hora. Semana inteira resolvida.' },
    { img: 'salad-3.webp', name: 'Camila O.',  caption: 'A versão thai com edamame virou a queridinha da casa.' },
    { img: 'salad-4.webp', name: 'Juliana M.', caption: 'Quinta-feira e a folha ainda crocante. Método das camadas funciona.' },
    { img: 'salad-5.webp', name: 'Beatriz A.', caption: 'Salada mexicana com feijão preto — meu marido pediu repetir.' },
    { img: 'salad-6.webp', name: 'Larissa P.', caption: 'Não consigo mais pedir delivery. Cada pote sai por menos de R$8.' },
  ];
  function renderMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const loop = [...SALADS, ...SALADS];
    const star = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    track.innerHTML = loop.map(s => `
      <article class="salad-card">
        <div class="salad-card__img"><img src="assets/student-salads/${s.img}" alt="Salada de ${s.name}" width="560" height="792" loading="lazy" decoding="async"></div>
        <div class="salad-card__body">
          <div class="stars">${star}${star}${star}${star}${star}</div>
          <p class="salad-card__caption">"${s.caption}"</p>
          <div class="salad-card__name">— ${s.name}</div>
        </div>
      </article>
    `).join('');
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
        <p>Esta Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais quando você visita esta página ou adquire nossos produtos digitais.</p>
        <h4>1. Quem somos</h4>
        <p>Somos responsáveis pelo produto digital "101 Receitas de Saladas no Pote". Contato: <strong>moreira.digital2026@gmail.com</strong>.</p>
        <h4>2. Quais dados coletamos</h4>
        <ul>
          <li><strong>Dados de compra:</strong> nome, e-mail, CPF e dados de pagamento, fornecidos por você no checkout.</li>
          <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, páginas visitadas e tempo de permanência, coletados automaticamente via cookies e pixels.</li>
          <li><strong>Comunicações:</strong> mensagens enviadas por você ao suporte por e-mail.</li>
        </ul>
        <h4>3. Para que usamos seus dados</h4>
        <ul>
          <li>Processar sua compra e entregar o produto digital.</li>
          <li>Enviar suporte, atualizações do material e comunicações relacionadas ao seu pedido.</li>
          <li>Mensurar e melhorar a eficiência de campanhas publicitárias por meio de ferramentas como Meta Pixel e Google Ads.</li>
          <li>Cumprir obrigações legais e fiscais.</li>
        </ul>
        <h4>4. Cookies e tecnologias semelhantes</h4>
        <p>Utilizamos cookies próprios e de terceiros (incluindo <strong>Meta Pixel</strong>, <strong>Google Analytics</strong>, <strong>Microsoft Clarity</strong> e <strong>Utmify</strong>) para entender o comportamento dos visitantes e otimizar nossos anúncios. Você pode desativar cookies nas configurações do seu navegador a qualquer momento.</p>
        <h4>5. Compartilhamento com terceiros</h4>
        <p>Compartilhamos apenas o estritamente necessário com:</p>
        <ul>
          <li>Plataformas de pagamento e processamento de pedidos (ex.: Wiapy).</li>
          <li>Ferramentas de análise e publicidade (Meta, Google, Microsoft).</li>
          <li>Autoridades quando exigido por lei.</li>
        </ul>
        <p><strong>Não vendemos seus dados.</strong></p>
        <h4>6. Seus direitos (LGPD)</h4>
        <p>Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode a qualquer momento:</p>
        <ul>
          <li>Confirmar a existência de tratamento e acessar seus dados.</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
          <li>Revogar consentimento previamente dado.</li>
        </ul>
        <p>Para exercer esses direitos, envie um e-mail para <strong>moreira.digital2026@gmail.com</strong>.</p>
        <h4>7. Retenção</h4>
        <p>Seus dados são mantidos pelo tempo necessário para cumprir as finalidades acima ou exigências legais (mínimo de 5 anos para dados fiscais).</p>
        <h4>8. Segurança</h4>
        <p>Adotamos medidas técnicas e administrativas razoáveis para proteger seus dados contra acesso não autorizado. Ainda assim, nenhum sistema online é 100% inviolável — use senhas fortes e mantenha seus dispositivos atualizados.</p>
        <h4>9. Alterações</h4>
        <p>Esta política pode ser atualizada periodicamente. A versão atual sempre estará disponível nesta página.</p>
        <div class="legal-modal__updated">Última atualização: 20 de maio de 2026.</div>
      `
    },
    terms: {
      title: 'Termos de Uso',
      html: `
        <p>Ao acessar esta página e/ou adquirir o produto "101 Receitas de Saladas no Pote", você concorda com os termos abaixo. Leia com atenção antes de finalizar a compra.</p>
        <h4>1. O produto</h4>
        <p>O produto é um <strong>material digital em formato PDF</strong>, entregue exclusivamente por e-mail após a confirmação do pagamento. Não há envio físico.</p>
        <h4>2. Acesso e entrega</h4>
        <p>O link de acesso é enviado para o e-mail informado no checkout, em geral em poucos minutos. Em caso de atraso ou não recebimento, entre em contato pelo e-mail de suporte.</p>
        <h4>3. Preços e formas de pagamento</h4>
        <p>Os preços exibidos estão em reais (R$) e podem ser alterados a qualquer momento sem aviso prévio. O pagamento é processado por gateway parceiro (Wiapy), que aceita cartão de crédito, Pix e demais métodos disponíveis no checkout.</p>
        <h4>4. Garantia e reembolso</h4>
        <p>Oferecemos <strong>garantia incondicional de 7 dias</strong> a partir da data da compra, conforme o Código de Defesa do Consumidor (art. 49). Para solicitar reembolso, envie um e-mail para <strong>moreira.digital2026@gmail.com</strong> dentro do prazo, sem necessidade de justificativa. O valor é estornado integralmente.</p>
        <h4>5. Uso permitido</h4>
        <p>O material adquirido é para uso <strong>pessoal e não transferível</strong>. É vedada qualquer forma de:</p>
        <ul>
          <li>Reprodução, distribuição ou compartilhamento gratuito ou pago do conteúdo.</li>
          <li>Revenda, sublicenciamento ou comercialização em parte ou no todo.</li>
          <li>Criação de obras derivadas para venda sem autorização expressa.</li>
        </ul>
        <p>Você pode, sim, aplicar as receitas em sua própria cozinha ou em pequena escala (ex.: para vender saladas prontas) sem qualquer restrição.</p>
        <h4>6. Propriedade intelectual</h4>
        <p>Todo o conteúdo (textos, fotos, layout, marca) é protegido por direitos autorais. O uso não autorizado está sujeito às punições previstas na Lei 9.610/1998.</p>
        <h4>7. Resultados e responsabilidade</h4>
        <p>O material possui caráter informativo e não substitui orientação de nutricionista, médico ou profissional da saúde. Pessoas com restrições alimentares, alergias ou condições específicas devem consultar um profissional antes de seguir as receitas. Resultados (emagrecimento, economia, etc.) variam conforme o estilo de vida individual.</p>
        <h4>8. Suporte</h4>
        <p>O suporte é oferecido exclusivamente por e-mail (<strong>moreira.digital2026@gmail.com</strong>), em horário comercial, com prazo de resposta de até 24 horas úteis.</p>
        <h4>9. Foro</h4>
        <p>Eventuais questões serão resolvidas pelo foro da comarca do consumidor, conforme prevê o CDC.</p>
        <div class="legal-modal__updated">Última atualização: 20 de maio de 2026.</div>
      `
    }
  };

  function initLegal() {
    const modal = document.getElementById('legalModal');
    const title = document.getElementById('legalModalTitle');
    const body  = document.getElementById('legalModalBody');
    if (!modal) return;
    function open(kind) {
      const c = LEGAL_CONTENT[kind];
      if (!c) return;
      title.textContent = c.title;
      body.innerHTML = c.html;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      body.scrollTop = 0;
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

  // ---------- Sales social-proof popup ----------
  const SALE_NAMES = [
    'Mariana A.', 'Roberta L.', 'Aline P.', 'Tatiane S.', 'Vanessa M.',
    'Cláudia R.', 'Eliane B.', 'Sandra F.', 'Karina G.', 'Lucimara C.',
    'Priscila O.', 'Fátima D.', 'Sueli N.', 'Rosa H.', 'Adriana J.',
    'Carla T.', 'Joana E.', 'Yara K.', 'Débora V.', 'Helena W.',
    'Solange U.', 'Mirna X.', 'Lúcia I.', 'Nádia Q.', 'Bruna Z.',
    'Luana Y.', 'Cristina A.', 'Mônica P.', 'Vera C.', 'Thaísa R.',
  ];
  const SALE_CITIES = [
    'São Paulo / SP', 'Rio de Janeiro / RJ', 'Belo Horizonte / MG', 'Curitiba / PR',
    'Salvador / BA', 'Fortaleza / CE', 'Recife / PE', 'Porto Alegre / RS',
    'Brasília / DF', 'Goiânia / GO', 'Manaus / AM', 'Belém / PA',
    'Florianópolis / SC', 'Vitória / ES', 'Campinas / SP', 'Natal / RN',
    'João Pessoa / PB', 'Maceió / AL', 'Cuiabá / MT', 'Campo Grande / MS',
    'Aracaju / SE', 'Teresina / PI', 'São Luís / MA', 'Londrina / PR',
    'Ribeirão Preto / SP', 'Niterói / RJ', 'Uberlândia / MG', 'Joinville / SC',
    'Santos / SP', 'Sorocaba / SP',
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
      if (popClosed) return;
      const pkg = Math.random() < 0.3 ? 'Pacote Simples' : 'Pacote Completo';
      popName.textContent = pick(SALE_NAMES);
      popAction.innerHTML = `Comprou o <strong>${pkg}</strong>`;
      popMeta.textContent = pick(SALE_CITIES);
      pop.classList.add('is-visible');
      clearTimeout(popTimer);
      popTimer = setTimeout(hide, 10000);
    }
    function hide() {
      pop.classList.remove('is-visible');
      clearTimeout(popTimer);
      popTimer = setTimeout(show, 10000);
    }
    window.__closeSalePop = function() {
      popClosed = true;
      pop.classList.remove('is-visible');
      clearTimeout(popTimer);
    };
    setTimeout(show, 6000);
  }

  // ---------- Checkout tracking ----------
  function initCheckoutTracking() {
    document.querySelectorAll('[data-checkout]').forEach(btn => {
      btn.addEventListener('click', () => {
        const which = btn.getAttribute('data-checkout');
        const value = which === 'completo' ? 24.90 : 10.00;
        const label = which === 'completo' ? 'Pacote Completo' : 'Pacote Simples';
        try {
          // Apenas dispara InitiateCheckout direto para o Completo, pois o Simples abre o modal de Upsell primeiro
          // e o rastreamento final ocorrerá quando o usuário tomar a ação definitiva dentro do modal.
          if (which === 'completo') {
            if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: label, value: value, currency: 'BRL' });
            if (window.gtag) gtag('event', 'begin_checkout', { currency: 'BRL', value: value, items: [{ item_name: label, price: value, quantity: 1 }] });
          }
          if (window.clarity) clarity('event', 'click_comprar_' + which);
        } catch(e) {}
      });
    });
  }

  // ---------- Vimeo Video Player ----------
  let vimeoPlayer;

  function initHeroVideo() {
    const overlay = document.getElementById('videoOverlay');
    const catcher = document.getElementById('videoClickCatcher');
    if (!overlay) return;
    
    overlay.addEventListener('click', function() {
      // Hide the overlay immediately for a snappy UX
      overlay.classList.add('is-hidden');
      if (catcher) catcher.style.display = 'block'; // Show the click catcher
      
      // Try to unmute, restart from beginning (hook), and play the video with audio
      try {
        if (vimeoPlayer && typeof vimeoPlayer.setMuted === 'function') {
          vimeoPlayer.setCurrentTime(0)
            .then(() => vimeoPlayer.setMuted(false))
            .then(() => vimeoPlayer.setVolume(1.0))
            .then(() => vimeoPlayer.play())
            .catch(e => {
              console.warn("Vimeo setCurrentTime/setMuted/play failed:", e);
              // Fallback play if setCurrentTime fails
              try {
                vimeoPlayer.setMuted(false);
                vimeoPlayer.setVolume(1.0);
                vimeoPlayer.play();
              } catch (err) {}
            });
        } else {
          // Fallback: send a postMessage to the iframe to seek to 0, unmute and play
          const iframe = document.getElementById('vimeo-player');
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'setCurrentTime', value: 0 }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'setMuted', value: false }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value: 1.0 }), '*');
            iframe.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
          }
        }
      } catch (e) {
        console.warn("Error unmuting/restarting video:", e);
      }
    });

    if (catcher) {
      catcher.addEventListener('click', function() {
        if (vimeoPlayer && typeof vimeoPlayer.getPaused === 'function') {
          vimeoPlayer.getPaused().then(function(paused) {
            if (paused) {
              vimeoPlayer.play();
            } else {
              vimeoPlayer.pause();
            }
          }).catch(e => {
            console.warn("Vimeo getPaused failed:", e);
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
        // Se o vídeo sumiu completamente da tela (isIntersecting é falso)
        if (!entry.isIntersecting) {
          if (vimeoPlayer && typeof vimeoPlayer.pause === 'function') {
            vimeoPlayer.pause().catch(err => {
              console.warn("Vimeo scroll pause failed:", err);
            });
          }
        }
      });
    }, {
      root: null,
      threshold: 0 // Dispara exatamente quando some 100% da tela
    });

    observer.observe(iframe);
  }

  function loadVimeoAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://player.vimeo.com/api/player.js';
    tag.onload = function() {
      try {
        const iframe = document.getElementById('vimeo-player');
        if (iframe && typeof Vimeo !== 'undefined') {
          vimeoPlayer = new Vimeo.Player(iframe);
          vimeoPlayer.setLoop(false); // Do not loop, stop after playing once
          initVideoScrollPause(); // Inicializa a escuta de rolagem
        }
      } catch (e) {
        console.warn("Vimeo Player initialization failed:", e);
      }
    };
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }

  function updateUrgencyDate() {
    const dateEl = document.getElementById('urgencyDate');
    if (!dateEl) return;
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('pt-BR', options);
  }

  // ---------- Special Offer Upsell Modal ----------
  function initUpsellModal() {
    const modal = document.getElementById('upsellModal');
    if (!modal) return;

    const simplesBtns = document.querySelectorAll('[data-checkout="simples"]');
    const closeBtn = document.getElementById('upsellCloseBtn');
    const secBtn = document.getElementById('upsellSecBtn');
    const mainBtn = document.getElementById('upsellMainBtn');

    // 1. Interceptar clique no botão do Pacote Simples da LP e abrir o modal
    simplesBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o redirecionamento direto, sempre abrindo o modal
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Impede scroll na LP por trás
      });
    });

    // 2. Função para apenas fechar o modal e permitir que o usuário continue navegando no site livremente
    function closeUpsellModal(e) {
      if (e) e.preventDefault();
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // O botão "X" apenas fecha o modal, deixando o usuário livre no site
    if (closeBtn) closeBtn.addEventListener('click', closeUpsellModal);

    // O botão cinza secundário (Simples por R$10,00) deve redirecionar o usuário para o respectivo checkout
    if (secBtn) {
      secBtn.addEventListener('click', () => {
        try {
          if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: 'Pacote Simples (Downsell)', value: 10.00, currency: 'BRL' });
          if (window.gtag) gtag('event', 'begin_checkout', { currency: 'BRL', value: 10.00, items: [{ item_name: 'Pacote Simples (Downsell)', price: 10.00, quantity: 1 }] });
          if (window.clarity) clarity('event', 'click_comprar_downsell_simples');
        } catch(err) {}
        
        // Remove a classe do modal e scroll para que fiquem limpos se o usuário voltar
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    // Fechar ao clicar no overlay escuro de fundo (apenas fecha o modal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeUpsellModal(e);
      }
    });

    // Fechar ao pressionar a tecla Escape (apenas fecha o modal)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeUpsellModal(e);
      }
    });

    // 3. Track analytics ao aceitar a oferta do Pacote Completo (R$14,90) e redirecionar
    if (mainBtn) {
      mainBtn.addEventListener('click', () => {
        try {
          if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: 'Pacote Completo (Upsell)', value: 14.90, currency: 'BRL' });
          if (window.gtag) gtag('event', 'begin_checkout', { currency: 'BRL', value: 14.90, items: [{ item_name: 'Pacote Completo (Upsell)', price: 14.90, quantity: 1 }] });
          if (window.clarity) clarity('event', 'click_comprar_upsell_completo');
        } catch(err) {}
        
        // Remove a classe do modal e scroll
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }
  }

  // ---------- Boot ----------
  function boot() {
    updateUrgencyDate();
    renderMarquee();
    initFAQ();
    initLegal();
    initCheckoutTracking();
    initSalePopup();
    initHeroVideo();
    loadVimeoAPI();
    initUpsellModal();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
