import { createApp } from 'vue';

//import style file
import './scss/general.scss';
import * as bootstrap from 'bootstrap';

import App from './App.vue';
import {router} from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';




import {faXTwitter,faYoutube,faGithub, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
library.add(far,fas,fab,faXTwitter,faYoutube,faGithub,faFacebook,faInstagram)

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
