import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import FormRecipe from '../FormRecipe.vue'

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {}
  }))

describe('FormRecipe', () => {
  it('renders the ingredients question', () => {
    const wrapper = mount(FormRecipe, {
      global: { plugins: [PrimeVue] }
    })
    expect(wrapper.text()).toContain('¿Qué ingredientes quieres usar?')
  })

  it('shows a validation message when submitting without ingredients', async () => {
    const wrapper = mount(FormRecipe, {
      global: { plugins: [PrimeVue] }
    })
    await wrapper.find('#button-create').trigger('click')
    expect(wrapper.text()).toContain('Debes introducir al menos un ingrediente')
  })
})
