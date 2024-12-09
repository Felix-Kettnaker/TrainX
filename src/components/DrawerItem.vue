<template>
  <q-item
    clickable
    @click="
      console.log(route);
      router.push(`/app/${route}`);
    "
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
  name: 'DrawerItem',
});

export interface DrawerItemProps {
  title: string;
  caption?: string;
  route?: string;
  icon?: string;
}

withDefaults(defineProps<DrawerItemProps>(), {
  caption: '',
  route: '#',
  icon: '',
});
</script>
