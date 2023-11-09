<script setup>
import { ref } from 'vue';
import ContactBar from './ContactBar.vue'
import ContactList from './ContactList.vue'

const filter = ref({keyword: '', sort: 'asc' })

</script>

<template>
  <div className="App-header">
    <ContactBar :filter="filter"/>
    <ContactList :filter="filter"/>
  </div>
</template>

