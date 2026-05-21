# Saladas no Pote — Landing Page (versão estática)

Esta é a versão **HTML/CSS puro** da landing page, pronta para hospedar em qualquer lugar (Netlify, Vercel, Cloudflare Pages, Hostinger, GitHub Pages).

## Estrutura

```
site/
├── index.html       ← a página inteira
├── styles.css       ← todo o CSS (tokens + componentes + responsivo)
└── assets/
    ├── covers/      ← 6 capas dos volumes
    ├── bonuses/     ← 4 capas dos bônus
    ├── student-salads/  ← 6 fotos das alunas (carrossel)
    ├── avatars/     ← 5 fotos dos depoimentos
    ├── mockups/     ← mockup do hero + rodapé
    └── logo/        ← logo placeholder (favicon)
```

**Nenhum framework, nenhum build.** Só HTML, CSS e um pouco de JS inline para o carrossel + acordeão do FAQ. Ícones vêm da Lucide via CDN.

---

## 🚀 Deploy no Netlify (3 minutos)

### Opção A — Drag & drop (mais simples)

1. Vá em **https://app.netlify.com/drop**
2. Faça login (Google/GitHub/email)
3. **Arraste a pasta `site/` inteira** pra dentro da página do Netlify
4. Pronto — a URL fica algo como `https://random-name-123.netlify.app`
5. Em **Site settings → Change site name** você muda pra `saladasnopote.netlify.app`

### Opção B — Conectar com GitHub (recomendado pra atualizar fácil)

1. Crie um repositório no GitHub e suba só a pasta `site/`
2. No Netlify: **Add new site → Import an existing project → GitHub**
3. Selecione o repositório
4. Build settings:
   - **Build command:** *(deixe em branco)*
   - **Publish directory:** `.` (ou `site` se subiu o projeto inteiro)
5. Clique em **Deploy site**
6. Toda vez que você fizer push, o site atualiza automático

### Opção C — Netlify CLI (avançado)

```bash
npm install -g netlify-cli
cd site
netlify deploy --prod
```

---

## 🌐 Domínio próprio

No Netlify: **Domain settings → Add a domain** → digite seu domínio (ex. `saladasnopote.com.br`) → siga as instruções de DNS (geralmente 2 registros CNAME ou A no seu provedor — Registro.br, GoDaddy, etc.).

O HTTPS é **automático e gratuito** (Let's Encrypt).

---

## ⚠️ Antes de colocar no ar

1. **Trocar os links de checkout** — abra `index.html`, procure por `data-checkout` e troque os `href="#"` pelas URLs reais da sua plataforma (Kiwify, Hotmart, Eduzz, etc.):
   ```html
   <a href="https://pay.kiwify.com.br/SEU-LINK-SIMPLES" ...>QUERO O PACOTE SIMPLES</a>
   <a href="https://pay.kiwify.com.br/SEU-LINK-COMPLETO" ...>QUERO O PACOTE COMPLETO</a>
   ```

2. **Política de Privacidade e Termos de Uso** — no rodapé estão como `href="#"`. Crie as páginas ou cole os links.

3. **Pixel do Meta / Google Tag** (se for rodar anúncio) — cole o script logo após `<head>` no `index.html`. Exemplo de Meta Pixel:
   ```html
   <script>
     !function(f,b,e,v,n,t,s){...}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', 'SEU_PIXEL_ID');
     fbq('track', 'PageView');
   </script>
   ```

4. **Logo de verdade** — substitua `assets/logo/logo-mark.svg` pelo seu (mantenha o nome ou ajuste no `<link rel="icon">` do HTML).

5. **og:image** (meta tag de compartilhamento) — pode trocar `assets/mockups/hero-mockup.png` por uma imagem 1200×630 otimizada para WhatsApp/Facebook.

---

## 🛠️ Mexer no conteúdo

- **Texto:** abre o `index.html` em qualquer editor de texto (VS Code, Sublime, Bloco de Notas) — está tudo em português puro, sem código complicado.
- **Cores e fontes:** abre o `styles.css`, primeiras linhas (`:root { ... }`). Tudo controlado por variáveis CSS.
- **Trocar uma foto:** substitua o arquivo dentro da pasta `assets/` correspondente, mantendo o mesmo nome de arquivo.

---

## 📊 Performance

Página estática, ~30KB de HTML+CSS, fontes via CDN, imagens carregam lazy.
Lighthouse score esperado: **95+ em performance**.
