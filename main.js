// Madeireira Amazônia - Script Principal (JavaScript de Ponta)

const WHATSAPP_NUMBER = "5569993219297";

// Utilitário para abrir o WhatsApp com mensagem personalizada
function enviarParaWhatsApp(mensagem) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", () => {
  // --- APLICAÇÃO DE LINKS WHATSAPP GENÉRICOS ---
  const mensagemPadrao = "Olá! Vim pelo site da Madeireira Amazônia e gostaria de tirar algumas dúvidas e solicitar um orçamento.";
  document.querySelectorAll("[data-whats-generic]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      enviarParaWhatsApp(mensagemPadrao);
    });
  });

  // --- MENU MOBILE ---
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("nav-overlay");

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle("translate-x-0");
      navMenu.classList.toggle("translate-x-full", !isOpen);
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      
      if (overlay) {
        overlay.classList.toggle("opacity-0", !isOpen);
        overlay.classList.toggle("pointer-events-none", !isOpen);
        overlay.classList.toggle("opacity-50", isOpen);
      }
    };

    navToggle.addEventListener("click", toggleMenu);
    if (overlay) overlay.addEventListener("click", toggleMenu);

    // Fecha o menu ao clicar nos links
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("translate-x-0");
        navMenu.classList.add("translate-x-full");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        if (overlay) {
          overlay.classList.add("opacity-0", "pointer-events-none");
          overlay.classList.remove("opacity-50");
        }
      });
    });
  }

  // --- ANO ATUAL ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- ANIMAÇÃO DE REVELAÇÃO NO SCROLL (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- GUIA VISUAL DE PRODUTOS ---
  const guias = {
    estrutura: {
      titulo: "Estruturas Robustas (Telhados & Vigamentos)",
      desc: "Madeiras estruturais selecionadas para aguentar peso e durar gerações. Perfeitas para vigamentos de telhados, tesouras de sustentação e colunas de sustentação.",
      itens: ["Vigas (diversas bitolas)", "Caibros aparelhados ou brutos", "Pilares e Linhas robustas"],
      rendimento: "Altíssima densidade e resistência contra pragas e flexão.",
      cor: "border-amber-700"
    },
    acabamento: {
      titulo: "Acabamentos Especiais (Forros & Tabuados)",
      desc: "Feitas para quem busca estética refinada e encaixes precisos. Deixam sua varanda, teto ou marcenaria com um aspecto impecável, aconchegante e luxuoso.",
      itens: ["Forros de alta qualidade", "Ripas e Sarrafos calibrados", "Tabeiras e guarnições de acabamento"],
      rendimento: "Cortes precisos que reduzem em até 15% o desperdício na obra.",
      cor: "border-amber-500"
    },
    formas: {
      titulo: "Construção Bruta (Formas & Caixarias)",
      desc: "Peças fundamentais para a fundação e concretagem da obra. Oferecem excelente custo-benefício e a resistência necessária para moldar colunas, lajes e vigas de concreto.",
      itens: ["Tábuas para caixaria (20cm e 30cm)", "Sarrafos de pinus ou misto", "Pontaletes de sustentação"],
      rendimento: "Excelente custo por metro quadrado e facilidade de desmolde.",
      cor: "border-yellow-600"
    },
    lei: {
      titulo: "Madeiras Nobres / De Lei (Alta Durabilidade)",
      desc: "O topo de linha em durabilidade e elegância natural. Ideais para áreas externas expostas ao sol e à chuva, como decks de piscinas, pergolados modernos e portões imponentes.",
      itens: ["Pranchas e decks nobres", "Madeiras duras certificadas", "Vigas sob medida para pergolados"],
      rendimento: "Resistência natural à umidade, cupins e apodrecimento por décadas.",
      cor: "border-amber-900"
    }
  };

  const tabs = document.querySelectorAll("[data-guide-tab]");
  const guideCard = document.getElementById("guide-content-card");

  if (guideCard) {
    const updateGuide = (key) => {
      const data = guias[key];
      // Transição suave de opacidade
      guideCard.style.opacity = 0;
      setTimeout(() => {
        guideCard.innerHTML = `
          <div class="border-l-4 ${data.cor} pl-4 sm:pl-6 space-y-4">
            <h3 class="text-xl sm:text-2xl font-bold text-stone-900">${data.titulo}</h3>
            <p class="text-stone-700 leading-relaxed text-sm sm:text-base">${data.desc}</p>
            <div>
              <h4 class="font-bold text-amber-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Principais Peças Disponíveis:</h4>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700 text-sm sm:text-base">
                ${data.itens.map(it => `<li class="flex items-center gap-2">✓ <span class="font-medium text-stone-800">${it}</span></li>`).join("")}
              </ul>
            </div>
            <div class="bg-amber-50 p-3 rounded-lg border border-amber-200/50">
              <span class="text-xs font-bold text-amber-800 uppercase tracking-wider block">Diferencial Técnico:</span>
              <p class="text-xs sm:text-sm text-stone-700 mt-1">${data.rendimento}</p>
            </div>
            <div class="pt-2">
              <button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition duration-200" id="guide-whats-btn">
                💬 Solicitar Preços desta Categoria
              </button>
            </div>
          </div>
        `;
        guideCard.style.opacity = 1;

        // Adiciona evento ao botão gerado
        document.getElementById("guide-whats-btn").addEventListener("click", () => {
          enviarParaWhatsApp(`Olá! Gostaria de fazer uma cotação e saber mais sobre a categoria de "${data.titulo}" do catálogo do site.`);
        });
      }, 150);
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("bg-amber-850", "text-white", "shadow-md"));
        tabs.forEach(t => t.classList.add("bg-stone-100", "text-stone-700", "hover:bg-stone-200"));
        
        tab.classList.remove("bg-stone-100", "text-stone-700", "hover:bg-stone-200");
        tab.classList.add("bg-amber-850", "text-white", "shadow-md");

        const key = tab.getAttribute("data-guide-tab");
        updateGuide(key);
      });
    });

    // Inicializa o primeiro guia
    updateGuide("estrutura");
  }

  // --- CALCULADORA INTELIGENTE ---
  const calcTabs = document.querySelectorAll("[data-calc-project]");
  const calcInputs = document.getElementById("calc-inputs");
  const calcResult = document.getElementById("calc-result-list");
  const calcCta = document.getElementById("calc-whatsapp-cta");
  const calcPlaceholder = document.getElementById("calc-placeholder");
  const calcResultBox = document.getElementById("calc-result-box");

  let projetoAtivo = "";

  const renderInputs = (projeto) => {
    projetoAtivo = projeto;
    calcResultBox.classList.add("hidden");
    calcPlaceholder.classList.remove("hidden");

    let inputsHtml = "";
    if (projeto === "telhado") {
      inputsHtml = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-area">Área Total do Telhado (m²)</label>
            <div class="relative">
              <input type="number" id="calc-area" min="1" max="1000" placeholder="Ex: 120" class="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium pl-4 pr-12" />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">m²</span>
            </div>
            <p class="text-xs text-stone-500 mt-1">Calcule a área considerando a inclinação do telhado (comprimento da queda x largura).</p>
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-telha">Tipo de Telha Previsto</label>
            <select id="calc-telha" class="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium">
              <option value="ceramica">Telha de Barro/Cerâmica (Requer Ripamento Fino)</option>
              <option value="fibrocimento">Telha de Amianto/Fibrocimento (Apenas Terças/Vigas)</option>
              <option value="termoacustica">Telha Sanduíche/Zinco (Estrutura Leve/Espaçada)</option>
            </select>
          </div>
        </div>
      `;
    } else if (projeto === "deck") {
      inputsHtml = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-deck-area">Área do Deck (m²)</label>
            <div class="relative">
              <input type="number" id="calc-deck-area" min="1" max="500" placeholder="Ex: 30" class="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium pl-4 pr-12" />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">m²</span>
            </div>
            <p class="text-xs text-stone-500 mt-1">Comprimento x Largura da área que deseja cobrir com madeira.</p>
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-deck-uso">Tipo de Uso/Local</label>
            <select id="calc-deck-uso" class="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium">
              <option value="externo">Área Externa Desescoberta (Piscina, Jardim - Alta Durabilidade)</option>
              <option value="interno">Varanda Coberta / Espaço Interno (Menor Exposição)</option>
            </select>
          </div>
        </div>
      `;
    } else if (projeto === "cerca") {
      inputsHtml = `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-cerca-len">Extensão (m)</label>
              <div class="relative">
                <input type="number" id="calc-cerca-len" min="1" max="1000" placeholder="Ex: 25" class="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium pl-4 pr-10" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">m</span>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-cerca-height">Altura (m)</label>
              <div class="relative">
                <input type="number" id="calc-cerca-height" min="0.5" max="4" step="0.1" value="1.8" class="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium pl-4 pr-10" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">m</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-stone-500 mt-1">Calcule Mourões de sustentação, Sarrafos de fixação e as Tábuas de fechamento vertical.</p>
        </div>
      `;
    } else if (projeto === "pergolado") {
      inputsHtml = `
        <div class="space-y-4">
          <div class="grid grid-cols-3 gap-2 sm:gap-4">
            <div>
              <label class="block text-[10px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-perg-len">Compr. (m)</label>
              <input type="number" id="calc-perg-len" min="1" max="20" placeholder="4" class="w-full p-2 sm:p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium text-center" />
            </div>
            <div>
              <label class="block text-[10px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-perg-wid">Largura (m)</label>
              <input type="number" id="calc-perg-wid" min="1" max="20" placeholder="3" class="w-full p-2 sm:p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium text-center" />
            </div>
            <div>
              <label class="block text-[10px] sm:text-xs font-bold text-stone-700 uppercase tracking-wide mb-1" for="calc-perg-hei">Altura (m)</label>
              <input type="number" id="calc-perg-hei" min="1" max="5" step="0.1" value="2.8" class="w-full p-2 sm:p-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 text-stone-900 font-medium text-center" />
            </div>
          </div>
          <p class="text-xs text-stone-500 mt-1">Cálculo focado em Vigas Nobres de sustentação (Pilares) e Caibros superiores de sombreamento.</p>
        </div>
      `;
    }

    inputsHtml += `
      <div class="pt-4 border-t border-stone-200">
        <button id="calc-trigger-btn" class="w-full py-3.5 bg-amber-850 hover:bg-amber-900 text-white font-bold rounded-xl shadow-lg transition duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
          ⚡ Calcular Estimativa Didática
        </button>
      </div>
    `;

    calcInputs.innerHTML = inputsHtml;

    // Vincula o evento de clique do cálculo
    document.getElementById("calc-trigger-btn").addEventListener("click", calcular);
  };

  const calcular = () => {
    let listItems = [];
    let msgWhatsApp = "";
    let valid = true;

    if (projetoAtivo === "telhado") {
      const area = parseFloat(document.getElementById("calc-area").value);
      const telha = document.getElementById("calc-telha").value;

      if (!area || area <= 0) {
        alert("Por favor, digite uma área válida.");
        valid = false;
        return;
      }

      // Lógica de estimativa de telhado
      // Ripas: ~3.5 metros por m² se telha cerâmica, ou quase nada se fibrocimento
      // Caibros: ~1.5 metros por m² se cerâmica, ~0.6m se fibrocimento (apenas vigas/terças)
      // Vigas/Terças: ~0.6 metros por m²
      let caibrosM = 0;
      let ripasM = 0;
      let vigasM = 0;
      let tipoTelhaTxt = "";

      if (telha === "ceramica") {
        caibrosM = Math.ceil(area * 1.6);
        ripasM = Math.ceil(area * 3.8);
        vigasM = Math.ceil(area * 0.5);
        tipoTelhaTxt = "Telha Cerâmica (de Barro)";
      } else if (telha === "fibrocimento") {
        caibrosM = Math.ceil(area * 0.4);
        ripasM = 0; // Não precisa de ripas
        vigasM = Math.ceil(area * 0.85);
        tipoTelhaTxt = "Telha Fibrocimento (Amianto)";
      } else {
        caibrosM = Math.ceil(area * 0.3);
        ripasM = 0;
        vigasM = Math.ceil(area * 0.7);
        tipoTelhaTxt = "Telha Termoacústica (Sanduíche)";
      }

      listItems.push({ label: "Vigas e Terças", qty: `${vigasM} metros lineares`, obs: "Suporte e estruturação do vigamento." });
      if (caibrosM > 0) listItems.push({ label: "Caibros Aparelhados", qty: `${caibrosM} metros lineares`, obs: "Sustentação secundária do caimento." });
      if (ripasM > 0) listItems.push({ label: "Ripas Selecionadas", qty: `${ripasM} metros lineares`, obs: "Estrutura fina para encaixe das telhas." });

      msgWhatsApp = `Olá! Calculei o telhado no simulador da Madeireira Amazônia:\n\n- Projeto: Telhado (${area} m²)\n- Tipo de Telha: ${tipoTelhaTxt}\n- Vigas/Terças estimadas: ${vigasM}m\n- Caibros estimados: ${caibrosM}m\n- Ripas estimadas: ${ripasM}m\n\nGostaria de solicitar os valores exatos e falar com o vendedor!`;

    } else if (projetoAtivo === "deck") {
      const area = parseFloat(document.getElementById("calc-deck-area").value);
      const uso = document.getElementById("calc-deck-uso").value;

      if (!area || area <= 0) {
        alert("Por favor, digite uma área válida.");
        valid = false;
        return;
      }

      // Deck: tábuas (largura ~10cm com espaçamento = ~10.5m por m²)
      // Estrutura de base (caibros/vigas niveladores = ~3m por m²)
      const tabuasM = Math.ceil(area * 10.5);
      const baseM = Math.ceil(area * 3.2);
      const parafusos = Math.ceil(area * 35);
      const tipoUsoTxt = uso === "externo" ? "Área Externa (Exposição Sol/Chuva)" : "Área Interna/Coberta";

      listItems.push({ label: "Pranchas/Tabuado de Deck (Nobre)", qty: `${tabuasM} metros lineares`, obs: "Acabamento visível e resistente ao tráfego." });
      listItems.push({ label: "Vigas/Barrotes de Base", qty: `${baseM} metros lineares`, obs: "Estrutura inferior de apoio e nivelamento." });
      listItems.push({ label: "Fixadores Recomendados", qty: `Aprox. ${parafusos} parafusos inox/especiais`, obs: "Fixação antiferrugem de alta durabilidade." });

      msgWhatsApp = `Olá! Simulei um Deck no site da Madeireira Amazônia:\n\n- Projeto: Deck de Madeira (${area} m²)\n- Tipo de Local: ${tipoUsoTxt}\n- Tabuado estimado: ${tabuasM}m\n- Barrotes de Base estimados: ${baseM}m\n- Fixadores recomendados: ~${parafusos} un\n\nGostaria de um orçamento detalhado com as melhores madeiras (Lei ou Tratada)!`;

    } else if (projetoAtivo === "cerca") {
      const extensao = parseFloat(document.getElementById("calc-cerca-len").value);
      const altura = parseFloat(document.getElementById("calc-cerca-height").value);

      if (!extensao || extensao <= 0 || !altura || altura <= 0) {
        alert("Por favor, digite dimensões válidas para a cerca.");
        valid = false;
        return;
      }

      // Cerca: tábuas de 15cm de largura na vertical
      // Espaçamento de 15cm = ~6.7 tábuas por metro de cerca
      // Se altura é 1.8m, precisamos de tábuas de 1.8m ou múltiplo.
      // Mourões de 8x8cm ou 10x10cm: 1 peça a cada 2.0 metros (extensao/2 + 1)
      // Sarrafos horizontais para fixar as tábuas: 3 linhas (extensao * 3)
      const mouroes = Math.ceil(extensao / 2.0) + 1;
      const sarrafosM = Math.ceil(extensao * 3);
      const tabuasQtd = Math.ceil(extensao * 6.7);
      
      listItems.push({ label: "Mourões/Postes de Sustentação", qty: `${mouroes} peças`, obs: `Tamanho recomendado: mínimo ${Math.ceil(altura + 0.6)}m para fincar na terra.` });
      listItems.push({ label: "Sarrafos Horizontais (Travessas)", qty: `${sarrafosM} metros lineares`, obs: "Três linhas horizontais para fixação sólida." });
      listItems.push({ label: "Tábuas de Fechamento", qty: `${tabuasQtd} peças de ${altura.toFixed(1)}m`, obs: "Corte e acabamento sob medida." });

      msgWhatsApp = `Olá! Fiz o cálculo para uma Cerca no site da Madeireira Amazônia:\n\n- Projeto: Cerca (${extensao}m de extensão por ${altura}m de altura)\n- Mourões estimados: ${mouroes} pçs\n- Sarrafos de apoio estimados: ${sarrafosM}m\n- Tábuas verticais estimadas: ${tabuasQtd} pçs de ${altura.toFixed(1)}m\n\nGostaria de confirmar os valores das peças!`;

    } else if (projetoAtivo === "pergolado") {
      const len = parseFloat(document.getElementById("calc-perg-len").value);
      const wid = parseFloat(document.getElementById("calc-perg-wid").value);
      const hei = parseFloat(document.getElementById("calc-perg-hei").value);

      if (!len || len <= 0 || !wid || wid <= 0 || !hei || hei <= 0) {
        alert("Por favor, preencha todas as medidas do pergolado.");
        valid = false;
        return;
      }

      // Pergolado padrão:
      // 4 colunas (Vigas grossas 12x12 ou 15x15) de altura `hei`
      // Vigas principais de contorno: 4 peças de comprimento `len` e `wid`
      // Vigas de cobertura superior (caibros / travessas a cada 50cm): len / 0.5 = caibros de comprimento `wid`
      const colunas = 4;
      const vigasPrincipais = `2 peças de ${len.toFixed(1)}m + 2 peças de ${wid.toFixed(1)}m`;
      const caibrosQtd = Math.ceil(len / 0.5) + 1;
      
      listItems.push({ label: "Colunas / Pilares de Canto (Robusto)", qty: `${colunas} peças de ${hei.toFixed(1)}m`, obs: "Vigas pesadas de alta espessura para fundação." });
      listItems.push({ label: "Vigas de Contorno/Suspensão", qty: vigasPrincipais, obs: "Estrutura superior que trava os pilares." });
      listItems.push({ label: "Caibros de Sombreamento (Ripado)", qty: `${caibrosQtd} peças de ${wid.toFixed(1)}m`, obs: "Dispostos transversalmente para criar a sombra." });

      msgWhatsApp = `Olá! Estimei um Pergolado no simulador da Madeireira Amazônia:\n\n- Projeto: Pergolado (${len}m x ${wid}m com altura ${hei}m)\n- Pilares de Sustentação: ${colunas} pçs de ${hei.toFixed(1)}m\n- Vigas principais: ${vigasPrincipais}\n- Caibros superiores: ${caibrosQtd} pçs de ${wid.toFixed(1)}m\n\nQuero falar com o especialista para escolher a melhor espécie de madeira nobre!`;
    }

    if (valid) {
      // Exibe os resultados
      calcPlaceholder.classList.add("hidden");
      calcResultBox.classList.remove("hidden");

      calcResult.innerHTML = listItems
        .map(
          (it) => `
          <div class="bg-stone-50 border border-stone-200 p-3 rounded-xl hover:border-amber-700/35 transition">
            <div class="flex justify-between items-start gap-2">
              <span class="font-bold text-stone-900 text-sm sm:text-base">${it.label}</span>
              <span class="bg-amber-100 text-amber-900 text-xs font-extrabold px-2 py-1 rounded-lg shrink-0">${it.qty}</span>
            </div>
            <p class="text-xs text-stone-600 mt-1">${it.obs}</p>
          </div>
        `
        )
        .join("");

      // Altera o evento do botão de cotação final
      calcCta.onclick = (e) => {
        e.preventDefault();
        enviarParaWhatsApp(msgWhatsApp);
      };
    }
  };

  if (calcTabs.length > 0) {
    calcTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        calcTabs.forEach(t => t.classList.remove("bg-amber-850", "text-white", "shadow-sm"));
        calcTabs.forEach(t => t.classList.add("bg-stone-100", "text-stone-700", "hover:bg-stone-200"));

        tab.classList.remove("bg-stone-100", "text-stone-700", "hover:bg-stone-200");
        tab.classList.add("bg-amber-850", "text-white", "shadow-sm");

        const projeto = tab.getAttribute("data-calc-project");
        renderInputs(projeto);
      });
    });

    // Inicializa no primeiro projeto (telhado)
    renderInputs("telhado");
  }

  // --- FLOATING CHAT WIDGET DO WHATSAPP ---
  const chatBubble = document.getElementById("whats-chat-bubble");
  const chatBox = document.getElementById("whats-chat-box");
  const chatClose = document.getElementById("whats-chat-close");
  const chatSend = document.getElementById("whats-chat-send");
  const chatInput = document.getElementById("whats-chat-input");

  if (chatBubble && chatBox) {
    // Exibe notificação de balãozinho após 5 segundos
    setTimeout(() => {
      const badge = chatBubble.querySelector(".whats-badge");
      if (badge) badge.classList.remove("scale-0");
      
      const tip = document.getElementById("whats-chat-tooltip");
      if (tip) {
        tip.classList.remove("opacity-0", "translate-y-2");
        tip.classList.add("opacity-100", "translate-y-0");
      }
    }, 4000);

    // Ocultar o tooltip ao interagir com o balão
    const hideTooltip = () => {
      const tip = document.getElementById("whats-chat-tooltip");
      if (tip) tip.classList.add("hidden");
    };

    chatBubble.addEventListener("click", (e) => {
      e.preventDefault();
      hideTooltip();
      chatBox.classList.toggle("hidden");
      chatBox.classList.toggle("flex");
      if (chatBox.classList.contains("flex")) {
        chatInput.focus();
      }
    });

    if (chatClose) {
      chatClose.addEventListener("click", (e) => {
        e.preventDefault();
        chatBox.classList.add("hidden");
        chatBox.classList.remove("flex");
      });
    }

    const enviarChat = () => {
      const msg = chatInput.value.trim();
      if (msg.length > 0) {
        const fullMsg = `Olá! Me chamo cliente do site da Madeireira Amazônia. Estou precisando de ajuda com o seguinte assunto:\n\n"${msg}"`;
        enviarParaWhatsApp(fullMsg);
        chatInput.value = "";
        chatBox.classList.add("hidden");
        chatBox.classList.remove("flex");
      } else {
        enviarParaWhatsApp("Olá! Gostaria de conversar com um especialista para fazer um orçamento de madeiras.");
      }
    };

    if (chatSend) {
      chatSend.addEventListener("click", (e) => {
        e.preventDefault();
        enviarChat();
      });
    }

    if (chatInput) {
      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          enviarChat();
        }
      });
    }
  }
});
