import { computed, inject, provide, reactive, type InjectionKey } from 'vue';
import {
  estimateFees,
  pabiliStores,
  savedAddresses,
  type PabiliCategoryKey,
  type PabiliProduct,
  type PabiliStore,
} from '@/data/pabili';

export interface CartLine {
  product: PabiliProduct;
  qty: number;
}

export interface CartGroup {
  store: PabiliStore;
  lines: CartLine[];
  itemCount: number;
  total: number;
}

function createPabiliForm() {
  const state = reactive({
    addressMode: 'book' as 'book' | 'custom',
    addressId: savedAddresses[0].id,
    customAddress: { street: '', barangay: '', city: '' },
    schedule: 'now' as 'now' | 'scheduled',
    scheduleDate: '',
    scheduleTime: '',
    category: 'food' as PabiliCategoryKey,
    storeId: pabiliStores[0].id,
    /** storeId → productId → qty */
    cart: {
      'sm-supermarket': { 'sm-rice': 1, 'sm-milk': 1 },
      'watermart-davao': { 'wm-eggs': 1 },
    } as Record<string, Record<string, number>>,
    payment: 'cod' as 'cod' | 'gcash',
    notes: '',
  });

  const selectedStore = computed(() => pabiliStores.find((s) => s.id === state.storeId) ?? pabiliStores[0]);

  const deliveryAddress = computed(() => {
    if (state.addressMode === 'custom') {
      const c = state.customAddress;
      const text = [c.street, c.barangay, c.city].filter(Boolean).join(', ');
      return { label: 'Custom Address', address: text || 'No address entered yet' };
    }
    const a = savedAddresses.find((x) => x.id === state.addressId) ?? savedAddresses[0];
    return { label: a.label, address: a.address };
  });

  function qty(storeId: string, productId: string): number {
    return state.cart[storeId]?.[productId] ?? 0;
  }

  function setQty(storeId: string, productId: string, value: number) {
    const lines = { ...(state.cart[storeId] ?? {}) };
    if (value > 0) lines[productId] = value;
    else delete lines[productId];
    if (Object.keys(lines).length) state.cart[storeId] = lines;
    else delete state.cart[storeId];
  }

  const cartGroups = computed<CartGroup[]>(() =>
    pabiliStores
      .filter((s) => state.cart[s.id])
      .map((store) => {
        const lines = store.products
          .filter((p) => qty(store.id, p.id) > 0)
          .map((product) => ({ product, qty: qty(store.id, product.id) }));
        return {
          store,
          lines,
          itemCount: lines.reduce((n, l) => n + l.qty, 0),
          total: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
        };
      })
      .filter((g) => g.lines.length),
  );

  const storeCount = computed(() => cartGroups.value.length);
  const itemCount = computed(() => cartGroups.value.reduce((n, g) => n + g.itemCount, 0));
  const subtotal = computed(() => cartGroups.value.reduce((n, g) => n + g.total, 0));
  const fees = computed(() => estimateFees(subtotal.value, storeCount.value));

  const selectionLabel = computed(
    () =>
      `${storeCount.value} ${storeCount.value === 1 ? 'store' : 'stores'} and ${itemCount.value} ${
        itemCount.value === 1 ? 'item' : 'items'
      } selected`,
  );

  return {
    state,
    selectedStore,
    deliveryAddress,
    qty,
    setQty,
    cartGroups,
    storeCount,
    itemCount,
    subtotal,
    fees,
    selectionLabel,
  };
}

export type PabiliForm = ReturnType<typeof createPabiliForm>;

const key: InjectionKey<PabiliForm> = Symbol('pabili-form');

export function providePabiliForm(): PabiliForm {
  const form = createPabiliForm();
  provide(key, form);
  return form;
}

export function usePabiliForm(): PabiliForm {
  const form = inject(key);
  if (!form) throw new Error('usePabiliForm() called outside PabiliBookPage');
  return form;
}
