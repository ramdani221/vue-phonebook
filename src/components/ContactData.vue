<script setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter';

const prop = defineProps({
  phonebooks: Array
})

const store = useCounterStore()
const isEdite = ref(false)
const newData = ref({id: prop.phonebooks[0], name: prop.phonebooks[1].name, phone: prop.phonebooks[1].phone})

function update(data) {
  store.updateContact(data)
}

</script>

<template>
  <div className="contact-data" id="data" v-if="!isEdite">
    <div className="btn-image">
      <div className="btn-avatar">
        <img src="/user-tie-solid.svg" alt="avatar" />
      </div>
    </div>
    <div className="identity">
      <p>{{ phonebooks[1].name }}</p>
      <p>{{ phonebooks[1].phone }}</p>
      <div className="btn-identity">
        <button @click="isEdite = true">
            <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
        </button>
        <button type="button" @click="store.deleteContact(phonebooks[0])">
            <font-awesome-icon icon="fa-solid fa-trash-can"/>
        </button>
      </div>
    </div>
  </div>

  <div className="contact-data" id="data" v-if="isEdite">
    <div className="btn-image">
        <div className="btn-avatar">
        <img src="/user-tie-solid.svg" alt="avatar" />
      </div>
    </div>
    <div className="identity">
      <form>
        <input type="text" name="name" :value="phonebooks[1].name" @change="(e) => newData.name = e.target.value"/>
        <input type="text" name="phone" :value="phonebooks[1].phone" @change="(e) => newData.phone = e.target.value" />
        <div className="btn-identity">
          <button @click="isEdite = false; update({...newData})"><font-awesome-icon icon="fa-floppy-disk"/></button>
        </div>
      </form>
    </div>
  </div>
</template>
