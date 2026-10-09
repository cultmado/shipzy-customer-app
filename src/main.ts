import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Ionic CSS is imported (in a cascade layer) from ./theme/tailwind.css so Tailwind utilities win. */

/* Fonts */
import '@fontsource-variable/inter';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
