<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      :title="(LocalStorage.getItem('user') as User)?.displayName || ''"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LocalStorage } from 'quasar';
import { User } from 'firebase/auth';

import { Meta, Todo } from 'src/models/models';
import ExampleComponent from 'components/ExampleComponent.vue';

console.log('user: ', LocalStorage.getItem('user'));

defineOptions({
  name: 'IndexPage',
});

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
