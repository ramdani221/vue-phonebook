<script setup>
// import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useCounterStore } from '../stores/counter'
import ContactData from './ContactData.vue'

const store = useCounterStore()

store.setFilter({keyword:'', sort: 'asc'})

watchEffect( async () => {
  store.loadContact(store.filter)
})
</script>

<template>
  <div className="contact-list">
    <ContactData v-for="item in store.phonebooks" :phonebooks="item" :key="item[0]"></ContactData>
  </div>
</template>

