import { mount } from '@vue/test-utils'
import AppButton from '@/components/ui/AppButton.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { formatPeso } from '@/data/services'
import { describe, expect, test } from 'vitest'

describe('ui components', () => {
  test('AppButton renders its slot', () => {
    const wrapper = mount(AppButton, { slots: { default: 'Log In' } })
    expect(wrapper.text()).toBe('Log In')
    expect(wrapper.classes()).toContain('bg-primary')
  })

  test('StatusBadge applies tone classes', () => {
    const wrapper = mount(StatusBadge, { props: { tone: 'green' }, slots: { default: 'Delivered' } })
    expect(wrapper.text()).toBe('Delivered')
    expect(wrapper.classes()).toContain('text-success')
  })
})

describe('formatPeso', () => {
  test('formats with peso sign and two decimals', () => {
    expect(formatPeso(1250)).toBe('₱1,250.00')
  })
})
