import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('phonebooks', () => {
  const phonebooks = ref({})
  const filter = ref()

  async function loadContact({keyword, sort}) {
    try {
      const data = await fetch(
        'https://phonebook-api-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/phonebooks.json?auth=Rb1bzG3nmfwkLNpuUpUoN1JcfwvgeBSalaBe1LC3'
      )
      const result = await data.json()
      const arrResult = Object.entries(result)
      arrResult.sort((a, b) => {
        if (a[1].name.toLowerCase() < b[1].name.toLowerCase()) return -1;
        if (a[1].name.toLowerCase() > b[1].name.toLowerCase()) return 1;
        return 0;
    })   
    if(sort === "desc") arrResult.reverse()
      phonebooks.value = arrResult.filter(item => item[1].name.toLowerCase().includes(keyword.toLowerCase()) || item[1].phone.toLowerCase().includes(keyword.toLowerCase()))
    } catch (error) {
      console.log(error)
    }
  }

  async function addContact({name, phone}) {
    try {
    await fetch(
      'https://phonebook-api-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/phonebooks.json?auth=Rb1bzG3nmfwkLNpuUpUoN1JcfwvgeBSalaBe1LC3',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, phone})
      }
    )
  } catch (error) {
    console.log(error)
  }}

  async function updateContact({id, name, phone}) {
    try{
      const getData = await fetch(
        `https://phonebook-api-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/phonebooks/${id}.json?auth=Rb1bzG3nmfwkLNpuUpUoN1JcfwvgeBSalaBe1LC3`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, phone})
        }
      )
      const newData = await getData.json()
      const result = phonebooks.value.map(contact => {
        if(contact[0] === id) return [id, newData]
        return contact
      })
      result.sort((a, b) => {
        if (a[1].name.toLowerCase() < b[1].name.toLowerCase()) return -1;
        if (a[1].name.toLowerCase() > b[1].name.toLowerCase()) return 1;
        return 0;
      })
      if(filter.value.sort === "desc") result.reverse()
      phonebooks.value = result.filter(item => item[1].name.toLowerCase().includes(filter.value.keyword.toLowerCase()) || item[1].phone.toLowerCase().includes(filter.value.keyword.toLowerCase()))
    } catch(err) {
      console.log(err)
    }
  }

  async function deleteContact(id) {
    try{
      await fetch(
        `https://phonebook-api-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/phonebooks/${id}.json?auth=Rb1bzG3nmfwkLNpuUpUoN1JcfwvgeBSalaBe1LC3`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      phonebooks.value = phonebooks.value.filter(contact => contact[0] !== id)
    } catch(err) {
      console.log(err)
    }
  }
  
  function setFilter({keyword, sort}) {
    filter.value = {...filter.value, keyword, sort}
  }

  return { phonebooks, filter, loadContact, addContact, updateContact, deleteContact, setFilter }
})
