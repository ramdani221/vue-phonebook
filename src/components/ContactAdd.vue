<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/counter';

const store = useCounterStore()
const data = ref({name:'', phone: ''})
async function submit(e) {
    try{
    e.preventDefault()
    await store.addContact(data.value)
    window.location.href = '/'
    } catch (err) {
        console.log(err)
    }
}
</script>

<template>
  <div className="add-contact">
            <form @submit="(e) => submit(e)" >
                <input type="text" id="name" name="name" placeholder="name" @change="(e) => data.name = e.target.value"/>
                <input type="text" id="phone" name="phone" placeholder="phone" @change="(e) => data.phone = e.target.value"/>
                <div className="btn-form-add">
                    <button type="submit">save</button>
                    <router-link to="/">cancel</router-link>
                </div>
            </form>
        </div>
</template>