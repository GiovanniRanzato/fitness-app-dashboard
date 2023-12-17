<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import TheUserView from './TheUserView.vue'
import BaseAlertWarning from './../../components/base/BaseAlertWarning.vue'
import { useUsersStore } from "../../stores/users"



const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const usersStore = useUsersStore()
const userAttributesValues = usersStore.getUserAttributesValuesById(props.id)

</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Visualizza utente"/>
      <TheUserView v-if="userAttributesValues" :user="userAttributesValues" />
      <BaseAlertWarning v-else>Si è verificato un problema: dati utente non presenti.</BaseAlertWarning>
    </BaseContainer>
  </main>
</template>