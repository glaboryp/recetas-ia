import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import HelloWorld from '../FormRecipe.vue'

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {}
  }))

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Hello Vitest' },
      global: { plugins: [PrimeVue] }
    })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
