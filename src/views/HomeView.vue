<template>
  <main class="market-home">
    <div class="chalkboard">
      <h1 class="headline">
        <span class="line">El plato del día</span>
        <span class="line accent">lo pones tú.</span>
      </h1>

      <p class="chalk-note">
        Hoy no toca buscar recetas. Ni pedir <del>lo de siempre</del>.
        <br />
        Toca lo que ya tienes en casa.
      </p>

      <p class="body-copy">
        Dinos qué ingredientes tienes, para cuántos cocinas y cuánto tiempo te queda. En un
        momento tienes tu receta lista para hacer, a tu medida — como el especial que cambia cada
        día en la pizarra del mercado.
      </p>

      <div class="tags-block">
        <p class="tags-label">Por ejemplo, con esto:</p>
        <ul class="tags-row">
          <li v-for="(tag, i) in exampleIngredients" :key="tag" class="tag" :style="tagStyle(i)">
            {{ tag }}
          </li>
        </ul>
      </div>

      <p class="connector">se convierte en tu receta</p>

      <Button as="router-link" :to="{ name: 'recipe' }" class="ticket" aria-label="Comenzar">
        <span class="ticket-number">Nº 001</span>
        <span class="ticket-label">
          Comenzar
          <span class="pi pi-arrow-right" aria-hidden="true" />
        </span>
      </Button>
    </div>
  </main>
</template>

<script setup>
const exampleIngredients = ['Tomate', 'Huevos', 'Arroz', 'Cebolla', 'Pollo']

const tagStyle = (i) => ({
  '--tag-rotate': `${i % 2 === 0 ? -3 : 2.5}deg`,
  '--tag-delay': `${0.55 + i * 0.08}s`
})
</script>

<style scoped>
.market-home {
  --reveal-fast: 0.5s;
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  align-items: safe center;
  justify-content: center;
  padding: 40px 24px;
  background: var(--market-bg);
  background-image:
    radial-gradient(circle at 12% 18%, rgba(246, 241, 228, 0.05), transparent 42%),
    radial-gradient(circle at 88% 82%, rgba(246, 241, 228, 0.04), transparent 45%),
    radial-gradient(ellipse at center, var(--market-bg-soft) 0%, var(--market-bg) 75%);
  overflow: hidden;
}

.market-home ::selection {
  background: var(--market-accent);
  color: var(--market-paper);
}

.chalkboard {
  max-width: 1060px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.headline {
  font-family: var(--market-font-chalk);
  font-weight: 700;
  color: var(--market-chalk);
  font-size: clamp(3rem, 7vw, 5.6rem);
  line-height: 1.05;
  margin: 0;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.01em;
}

.headline .line {
  display: inline-block;
  clip-path: inset(0 100% 0 0);
  animation: chalk-write 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.headline .line.accent {
  color: var(--market-accent);
  animation-delay: 0.2s;
}

.chalk-note {
  font-family: var(--market-font-chalk);
  font-weight: 600;
  color: var(--market-chalk-dim);
  font-size: clamp(1.4rem, 2.8vw, 1.9rem);
  line-height: 1.4;
  margin: 20px 0 0;
  opacity: 0;
  animation: fade-up var(--reveal-fast) ease-out 0.5s forwards;
}

.chalk-note del {
  color: inherit;
  text-decoration-color: var(--market-accent);
  text-decoration-thickness: 2px;
}

.body-copy {
  font-family: Inter, system-ui, sans-serif;
  color: var(--market-paper);
  font-size: 1.2rem;
  line-height: 1.65;
  max-width: 68ch;
  margin: 28px 0 0;
  opacity: 0;
  animation: fade-up var(--reveal-fast) ease-out 0.65s forwards;
}

.tags-block {
  margin-top: 40px;
}

.tags-label {
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--market-chalk-dim);
  margin: 0 0 14px;
  opacity: 0;
  animation: fade-up var(--reveal-fast) ease-out 0.6s forwards;
}

.tags-row {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 0;
  padding: 0;
}

.tag {
  font-family: var(--market-font-label);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.98rem;
  color: var(--market-ink);
  background: var(--market-paper);
  padding: 10px 20px 9px;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.28);
  transform: rotate(var(--tag-rotate)) scale(0.85);
  opacity: 0;
  animation: tag-stamp 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--tag-delay) forwards;
}

.tag::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--market-wood-dark);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.connector {
  font-family: var(--market-font-label);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--market-chalk-dim);
  margin: 24px 0 0;
  padding-left: 10px;
  border-left: 2px dashed var(--market-line);
  opacity: 0;
  animation: fade-up var(--reveal-fast) ease-out 1.1s forwards;
}

.ticket {
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  background: var(--market-accent-strong) !important;
  color: var(--market-paper) !important;
  border: none !important;
  border-radius: 4px;
  padding: 18px 34px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  isolation: isolate;
  opacity: 0;
  transform: translateY(14px);
  animation: ticket-drop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards;
  transition: background-color 0.15s ease-out;
}

.ticket::before,
.ticket::after {
  content: '';
  position: absolute;
  top: -6px;
  bottom: -6px;
  width: 12px;
  background:
    radial-gradient(circle, var(--market-bg) 6px, transparent 6.5px) top / 100% 12px repeat-y;
}

.ticket::before {
  left: -6px;
}

.ticket::after {
  right: -6px;
}

.ticket-number {
  font-family: var(--market-font-label);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  font-weight: 500;
  color: var(--market-paper);
}

.ticket-label {
  font-family: var(--market-font-label);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ticket:hover,
.ticket:focus-visible {
  background: var(--market-accent) !important;
  border: none !important;
}

.ticket:focus-visible {
  outline: 3px solid var(--market-chalk);
  outline-offset: 3px;
}

@keyframes chalk-write {
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tag-stamp {
  to {
    opacity: 1;
    transform: rotate(var(--tag-rotate)) scale(1);
  }
}

@keyframes ticket-drop {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .headline .line,
  .chalk-note,
  .body-copy,
  .tags-label,
  .tag,
  .connector,
  .ticket {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }
}

@media (width < 750px) {
  .market-home {
    padding: 28px 18px;
  }

  .headline {
    font-size: clamp(2.6rem, 10vw, 3.6rem);
  }

  .ticket {
    padding: 15px 28px;
  }

  .ticket-number {
    font-size: 0.7rem;
  }

  .ticket-label {
    font-size: 1.2rem;
  }
}
</style>
