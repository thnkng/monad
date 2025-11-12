# Web Components — Nomes Poéticos

**Filosofia:** Cada componente tem um nome técnico e um **nome poético** que evoca sua essência emocional.

---

## 🎭 Mapeamento

| Nome Técnico | Nome Poético | Essência | Tag |
|---|---|---|---|
| **MonadActiveNav** | **Compass** | Bússola que guia a navegação, sempre apontando onde você está | `<monad-compass>` |
| **MonadDropdown** | **Cascade** | Menu que cascateia como água, revelando opções gradualmente | `<monad-cascade>` |
| **MonadModal** | **Veil** | Véu que cobre o mundo, focando atenção em uma única verdade | `<monad-veil>` |
| **MonadSidebar** | **Drawer** | Gaveta de contexto, escondendo e revelando ferramentas | `<monad-drawer>` |
| **MonadTabs** | **Pages** | Páginas de um livro, alternando entre capítulos do conteúdo | `<monad-pages>` |
| **MonadToast** | **Whisper** | Sussurro efêmero, mensagem que aparece e desaparece suavemente | `<monad-whisper>` |
| **MonadTooltip** | **Hint** | Dica sutil, informação que flutua ao alcance do cursor | `<monad-hint>` |

---

## 📖 Descrições Poéticas

### Compass (Active Nav)
> *"Uma bússola magnética que sempre aponta para onde você está na jornada."*

Observa silenciosamente a posição de scroll e ilumina o caminho atual. Não interfere, apenas revela.

**Uso:**
```html
<monad-compass>
  <nav>
    <a href="#intro" class="sidebar-link">Introdução</a>
    <a href="#tokens" class="sidebar-link">Tokens</a>
  </nav>
</monad-compass>
```

---

### Cascade (Dropdown)
> *"Como água que flui de uma fonte, revelando opções em cascata."*

Um menu que se desdobra naturalmente, respeitando o espaço e a atenção do usuário.

**Uso:**
```html
<monad-cascade position="bottom-right">
  <button>Opções ▾</button>
  <menu>
    <li><button class="hoverable">Editar</button></li>
    <li><button class="hoverable danger">Excluir</button></li>
  </menu>
</monad-cascade>
```

---

### Veil (Modal)
> *"Um véu que separa o mundo, criando um momento de foco absoluto."*

Cobre tudo com silêncio visual, permitindo que apenas uma verdade exista por vez.

**Uso:**
```html
<monad-veil id="confirm" size="small">
  <div slot="header">Confirmar exclusão</div>
  <div slot="body">Esta ação não pode ser desfeita.</div>
  <div slot="footer">
    <button onclick="this.closest('monad-veil').close()">Cancelar</button>
    <button class="state-break">Excluir</button>
  </div>
</monad-veil>
```

---

### Drawer (Sidebar)
> *"Uma gaveta de ferramentas, escondendo complexidade até ser necessária."*

Sidebar que desliza, revelando contexto adicional sem sobrecarregar a interface.

**Uso:**
```html
<monad-drawer side="left" collapsible>
  <nav>
    <a href="#" class="hoverable active">Dashboard</a>
    <a href="#" class="hoverable">Configurações</a>
  </nav>
</monad-drawer>
```

---

### Pages (Tabs)
> *"Páginas de um livro, cada uma contendo um capítulo diferente da história."*

Abas que alternam conteúdo como folhas sendo viradas, mantendo contexto enquanto explora.

**Uso:**
```html
<monad-pages>
  <button slot="tab" active>Visão Geral</button>
  <button slot="tab">Detalhes</button>
  
  <div slot="panel">Conteúdo da visão geral</div>
  <div slot="panel">Detalhes técnicos</div>
</monad-pages>
```

---

### Whisper (Toast)
> *"Um sussurro efêmero, uma mensagem que surge e desvanece como brisa."*

Notificação não-intrusiva que aparece, comunica, e desaparece sem interromper o fluxo.

**Uso:**
```javascript
// API simples
MonadWhisper.show('Salvo com sucesso!', 'success', 3000);

// Ou manual
const whisper = document.createElement('monad-whisper');
whisper.type = 'success';
whisper.message = 'Alterações salvas';
document.body.appendChild(whisper);
whisper.show();
```

---

### Hint (Tooltip)
> *"Uma dica sutil, informação que flutua ao alcance do cursor como uma nota musical."*

Contexto adicional que aparece apenas quando necessário, desaparecendo quando o foco muda.

**Uso:**
```html
<monad-hint content="Salvar alterações" position="top">
  <button>💾</button>
</monad-hint>
```

---

## 🎨 Princípios de Nomenclatura

### Por que nomes poéticos?

1. **Emotional Precision** — Cada nome evoca a *sensação* do componente, não apenas sua função
2. **Memorability** — "Whisper" é mais memorável que "Toast Notification"
3. **Human-First** — Desenvolvedores são humanos; código deve ter alma
4. **Distinction** — Evita conflitos com outros design systems genéricos

### Regras para novos componentes

- **Uma palavra** quando possível (Veil, Hint, Drawer)
- **Metáfora natural** — água, luz, objetos físicos, elementos da natureza
- **Evoca sensação**, não apenas descreve função
- **Fácil de pronunciar** em inglês (idioma universal do código)
- **Único** — não conflita com termos técnicos comuns

---

## 🔄 Migração (Futuro)

**Manteremos compatibilidade com nomes técnicos:**

```javascript
// Ambos funcionam
<monad-modal>...</monad-modal>
<monad-veil>...</monad-veil>

// API também
MonadToast.show('...');
MonadWhisper.show('...');
```

**Como migrar:**
1. Adicionar aliases nos `customElements.define()`
2. Documentação passa a usar nomes poéticos
3. Deprecar nomes técnicos gradualmente

---

## 📊 Comparação

| Antes | Depois | Ganho Emocional |
|---|---|---|
| `MonadModal` | `Veil` | 🎭 Foco, isolamento, momento sagrado |
| `MonadToast` | `Whisper` | 🌬️ Sutileza, efemeridade, não-intrusão |
| `MonadTooltip` | `Hint` | 💡 Descoberta, ajuda sutil, curiosidade |
| `MonadDropdown` | `Cascade` | 💧 Fluidez, revelação gradual, naturalidade |
| `MonadActiveNav` | `Compass` | 🧭 Orientação, confiança, clareza de localização |
| `MonadTabs` | `Pages` | 📖 Narrativa, capítulos, exploração organizada |
| `MonadSidebar` | `Drawer` | 🗄️ Organização, revelação sob demanda, contexto |

---

**Filosofia:** _"Tecnologia desaparece. Experiência permanece. Nomes carregam alma."_

---

**Versão:** 1.0.0  
**Data:** 12 de novembro de 2025  
**Autor:** Thinkng
