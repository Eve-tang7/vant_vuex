import Vue from "vue"
import { Swipe, SwipeItem,Area } from 'vant';
import { ContactCard, ContactList, ContactEdit ,Popup } from 'vant';
Vue.use(ContactCard).use(ContactList).use(ContactEdit).use(Popup);
Vue.use(Swipe).use(SwipeItem).use(Area);
