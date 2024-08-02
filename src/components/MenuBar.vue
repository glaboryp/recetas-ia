<template>
  <Menubar :model="itemsMenu">
    <template #start>
      <img src="/logo.webp" alt="logo" height="40" />
    </template>
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="{ name: item.route }" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate" aria-hidden="false">
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
        class="button-icon"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const $router = useRouter()
const authStore = useAuthStore()

const itemsMenu = ref([
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
])
const itemsUser = [
  {
    label: 'Mi perfil',
    icon: 'pi pi-user-edit',
    command: () => $router.push({ name: 'profile' })
  },
  {
    label: 'Mis recetas',
    icon: 'pi pi-receipt',
    command: () => $router.push({ name: 'user-recipes' })
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => authStore.logout($router)
  }
]
</script>

<style>
button.p-button.p-component.p-button-secondary.p-button-text.p-splitbutton-button {
  display: none;
}

button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-text.p-splitbutton-dropdown {
  border-radius: 5px;
}

.button-icon {
  text-decoration: none;
}

span.p-button-icon.pi.pi-github {
  font-size: 1.2rem;
}
</style>
