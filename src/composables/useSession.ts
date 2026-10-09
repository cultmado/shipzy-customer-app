import { computed, reactive } from 'vue';

export type AccountType = 'customer' | 'business';

interface SessionState {
  accountType: AccountType;
  name: string;
  firstName: string;
  email: string;
  memberSince: string;
}

const profiles: Record<AccountType, SessionState> = {
  customer: {
    accountType: 'customer',
    name: 'Ken Barchita',
    firstName: 'Ken',
    email: 'ken.barchita@email.com',
    memberSince: 'May 2024',
  },
  business: {
    accountType: 'business',
    name: 'Shipzy Business Solutions',
    firstName: 'Ken',
    email: 'hello@shipzybusiness.com',
    memberSince: 'May 2024',
  },
};

const STORAGE_KEY = 'shipzy.accountType';

function initialType(): AccountType {
  // `?as=business` / `?as=customer` lets demos and screenshots pick a profile directly.
  const fromQuery = new URLSearchParams(window.location.search).get('as');
  if (fromQuery === 'business' || fromQuery === 'customer') return fromQuery;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'business' || stored === 'customer') return stored;
  } catch {
    /* storage unavailable */
  }
  return 'customer';
}

const state = reactive<SessionState>({ ...profiles[initialType()] });

/**
 * Mock session. There is no backend yet, so "logging in" just picks which
 * demo profile (customer or business) the UI renders.
 */
export function useSession() {
  const initials = computed(() =>
    state.name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join(''),
  );
  const isBusiness = computed(() => state.accountType === 'business');

  function signIn(type: AccountType) {
    Object.assign(state, profiles[type]);
    try {
      localStorage.setItem(STORAGE_KEY, type);
    } catch {
      /* storage unavailable */
    }
  }

  return {
    get name() { return state.name; },
    get firstName() { return state.firstName; },
    get email() { return state.email; },
    get memberSince() { return state.memberSince; },
    get accountType() { return state.accountType; },
    get initials() { return initials.value; },
    get isBusiness() { return isBusiness.value; },
    signIn,
  };
}
