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
        v-if="authStore.token"
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
        class="button-sign-in"
        text
      />
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

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
    icon: 'pi pi-user-edit'
  },
  {
    label: 'Configuración',
    icon: 'pi pi-cog'
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => authStore.logout()
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

.button-sign-in {
  text-decoration: none;
}
</style>
