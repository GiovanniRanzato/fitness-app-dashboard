<script setup lang="ts">
import {computed} from 'vue'
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import TheUserForm from './TheUserForm.vue'
import BaseAlertWarning from './../../components/base/BaseAlertWarning.vue'

import { useUsersStore } from "../../stores/users"

import type { User } from '@/interfaces'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const usersStore = useUsersStore()

const save = (user: User) => {
  usersStore.updateUser(user)
}
const userAttributesValues = usersStore.getUserAttributesValuesById(parseInt(props.id))
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle>Modifica utente</BasePageTitle>
      <TheUserForm v-if="userAttributesValues" :user=userAttributesValues :onSubmit="save" />
      <BaseAlertWarning v-else>Si è verificato un problema: dati utente non presenti.</BaseAlertWarning>
    </BaseContainer>
  </main>
</template>