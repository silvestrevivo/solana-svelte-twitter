import { writable } from 'svelte/store';

type Notification = {
    type: 'success' | 'error'
}

export const notificationStore = writable<Notification>(null);
