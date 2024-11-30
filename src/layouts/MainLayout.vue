<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <q-btn flat @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Drawer Items </q-item-label>

        <DrawerItem v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DrawerItem, { DrawerItemProps } from 'components/DrawerItem.vue';
import signout from 'src/firebase/firebase-signout';
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
  name: 'MainLayout',
});

const linksList: DrawerItemProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    route: '/login',
  },
];

const leftDrawerOpen = ref(false);

const logout = () => {
  signout().then(() => {
    router.push('/login');
  });
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
