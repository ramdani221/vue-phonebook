<script setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter';

const isAsc = ref(true)
const store = useCounterStore() 

defineProps({
  filter: Object
})

</script>

<template>
  <div className="contact-bar">
    <button @click="isAsc = false; store.setFilter({...store.filter, sort: 'desc'})" v-if="isAsc">
        <font-awesome-icon icon="fa-solid fa-arrow-down-z-a" />
    </button>
    <button @click="isAsc = true; store.setFilter({...store.filter, sort: 'asc'})" v-if="!isAsc">
        <font-awesome-icon icon="fa-solid fa-arrow-down-a-z" />
    </button>
    <div className="search">
      <span><font-awesome-icon icon="fa-solid fa-magnifying-glass"/></span>
      <input type="text" name="keyword" id="keyword" @keyup="(e) => store.setFilter({...store.filter, keyword: e.target.value})"/>
    </div>
    <RouterLink to="/add"><font-awesome-icon icon="fa-solid fa-user-plus"/></RouterLink>
  </div>
</template>

