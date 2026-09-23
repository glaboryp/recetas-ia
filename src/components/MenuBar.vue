<template>
  <Menubar :model="itemsMenu">
    <template #start>
      <img src="/logo.webp" alt="logo" height="40" width="40" />
    </template>
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="{ name: item.route }" custom>
        <a
          v-ripple
          :href="href"
          v-bind="props.action"
          @click="navigate"
          aria-hidden="false"
          :class="{ 'nav-login-item': item.mobileOnly }"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
    </template>
    <template #end>
      <SplitButton
        v-if="authStore.token && authStore.userId"
        dropdownIcon="pi pi-user"
        :model="itemsUser"
        text
        severity="secondary"
      />
      <Button
        v-else
        as="router-link"
        label="Iniciar sesión"
        :to="{ name: 'login' }"
        class="button-icon login-btn"
        text
      />
      <Button
        class="button-icon"
        as="a"
        icon="pi pi-github"
        href="https://github.com/glaboryp/recetas-ia"
        target="_blank"
        rel="noopener"
        text
        aria-label="GitHub"
        severity="secondary"
      />
    </template>
  </Menubar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const $router = useRouter()
const authStore = useAuthStore()

const itemsMenu = computed(() => {
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      route: 'home'
    },
    {
      label: 'Recetas',
      icon: 'pi pi-star',
      route: 'recipe'
    }
  ]

  if (authStore.token && authStore.userId) {
    items.push({
      label: 'Favoritos',
      icon: 'pi pi-heart',
      route: 'user-recipes'
    })
  } else {
    items.push({
      label: 'Iniciar sesión',
      icon: 'pi pi-sign-in',
      route: 'login',
      mobileOnly: true
    })
  }

  return items
})

const itemsUser = [
  {
    label: 'Mi perfil',
    icon: 'pi pi-user-edit',
    command: () => $router.push({ name: 'profile' })
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => authStore.logout($router)
  }
]
</script>

<style>
.p-menubar {
  position: sticky !important;
  top: 0 !important;
  z-index: 5;
  background-color: var(--market-wood-dark) !important;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(36, 26, 16, 0.08) 0px,
    rgba(36, 26, 16, 0.08) 10px,
    transparent 10px,
    transparent 22px
  ) !important;
  border: none !important;
  border-bottom: 2px solid var(--market-accent) !important;
  border-radius: 0 !important;
  padding: 0.6rem 1rem 0.8rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
}

.p-menubar::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -9px;
  height: 9px;
  background-image: radial-gradient(circle at 10px 0, var(--market-wood-dark) 9px, transparent 9.5px);
  background-size: 20px 9px;
  background-repeat: repeat-x;
  pointer-events: none;
}

.p-menubar-start {
  margin-right: 1.5rem;
}

.p-menubar-root-list {
  gap: 0.85rem !important;
}

.p-menubar-button {
  background: transparent !important;
  color: var(--market-paper) !important;
  width: 2.2rem !important;
  height: 2.2rem !important;
  transition: color 0.15s ease-out;
}

.p-menubar-button svg {
  width: 1.35rem;
  height: 1.35rem;
}

.p-menubar-button:hover,
.p-menubar-button:focus-visible {
  color: var(--market-accent) !important;
  background: transparent !important;
}

/* "Iniciar sesión" lives in two places depending on viewport: the top-right
   slot on desktop, folded into the hamburger menu on mobile. Only one shows
   at a time. */
.p-menubar.p-menubar-mobile .login-btn {
  display: none !important;
}

.p-menubar:not(.p-menubar-mobile) .p-menubar-item:has(.nav-login-item) {
  display: none !important;
}

.p-menubar.p-menubar-mobile .p-menubar-start {
  margin-right: 0.5rem;
}

.p-menubar.p-menubar-mobile .p-menubar-root-list {
  position: absolute;
  top: calc(100% + 10px);
  left: 1rem;
  width: auto;
  min-width: 190px;
  background: var(--market-paper) !important;
  border: 1.5px solid var(--market-wood-dark) !important;
  border-radius: 3px !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28) !important;
  padding: 8px !important;
  gap: 4px !important;
}

.p-menubar.p-menubar-mobile .p-menubar-item-link {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 3px !important;
  width: 100%;
}

.p-menubar.p-menubar-mobile .p-menubar-item-link::before {
  display: none;
}

.p-menubar.p-menubar-mobile .p-menubar-item-content:hover,
.p-menubar.p-menubar-mobile .p-menubar-item.p-focus > .p-menubar-item-content {
  background: rgba(36, 26, 16, 0.08) !important;
}

.p-menubar-item-link {
  position: relative;
  background: var(--market-paper) !important;
  color: var(--market-ink) !important;
  border-radius: 2px !important;
  padding: 0.35rem 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.28);
  font-family: var(--market-font-label);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.85rem;
  text-decoration: none !important;
}

.p-menubar-item-link::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--market-wood-dark);
}

.p-menubar-item-content:hover .p-menubar-item-link,
.p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-link,
.p-menubar-item-active > .p-menubar-item-content .p-menubar-item-link {
  box-shadow:
    0 0 0 1.5px var(--market-accent-strong),
    0 2px 4px rgba(0, 0, 0, 0.28);
}

.p-menubar-item-content:hover,
.p-menubar-item.p-focus > .p-menubar-item-content,
.p-menubar-item-active > .p-menubar-item-content {
  background: transparent !important;
}

button.p-button.p-component.p-button-secondary.p-button-text.p-splitbutton-button {
  display: none;
}

button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-text.p-splitbutton-dropdown {
  border-radius: 3px;
  color: var(--market-paper) !important;
  background: transparent !important;
  border: none !important;
  transition: color 0.15s ease-out;
}

button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-text.p-splitbutton-dropdown:hover,
button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-text.p-splitbutton-dropdown:focus-visible {
  color: var(--market-accent) !important;
  background: transparent !important;
  border: none !important;
}

.p-splitbutton-dropdown .pi-user {
  font-size: 1.35rem;
}

.button-icon {
  text-decoration: none;
  font-family: var(--market-font-label);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--market-paper) !important;
  background: transparent !important;
  border: none !important;
  transition: color 0.15s ease-out;
}

.button-icon:hover,
.button-icon:focus-visible {
  color: var(--market-accent) !important;
  background: transparent !important;
  border: none !important;
}

span.p-button-icon.pi.pi-github {
  font-size: 1.35rem;
  color: var(--market-paper);
  transition: color 0.15s ease-out;
}

.button-icon:hover span.p-button-icon.pi.pi-github,
.button-icon:focus-visible span.p-button-icon.pi.pi-github {
  color: var(--market-accent);
}
</style>
