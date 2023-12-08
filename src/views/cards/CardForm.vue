<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import BaseBtnPrimary from '../../components/base/BaseBtnPrimary.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseTextField from '../../components/base/BaseTextField.vue'
import BaseSelectRemote from '../../components/base/BaseSelectRemote.vue'
import BaseInputLabel from '../../components/base/BaseInputLabel.vue'

import { useUsersStore } from '../../stores/users'
import type { Card } from '@/interfaces'
import { userData } from '@/services/userData'

const userStore = useUsersStore()

const props = defineProps({
  card: {
    type: Object as () => Card,
    required: false,
    default: {
      id: 0,
      name: '',
      disabled: false,
      dateFrom: '',
      dateTo: '',
      userId: '',
      user: userData.emptyUser()
    }
  },
  onSubmit: {
    type: Function,
    required: true
  },
  isCreate: {
    type: Boolean,
    required: false,
    default: false
  }
})
const form = ref(false)
const loading = ref(false)

const cardClone = ref({ ...props.card })

onBeforeMount(async () => {
  if (props.card.user.id) await userStore.getUserById(props.card.user.id)
  else await userStore.retrieveUsers('')
  
})
const userOptions = userStore.getUsersSelectItems


const required = (v: string) => !!v || 'Il campo è richiesto'

function onSubmit() {
  props.onSubmit(cardClone.value)
}

function searchUser (value: string) {
  userStore.retrieveUsers(value)
}

</script>
<template>
  <v-form v-model="form">
    <BaseCard title="Informazioni scheda">
      <v-card-item>
        <BaseInputLabel>Nome</BaseInputLabel>
        <BaseTextField v-model="cardClone.name" :readonly="loading" :rules="[required]" placeholder="Name your mission"
          append-inner-icon="mdi-weight-lifter"></BaseTextField>
        <BaseInputLabel>Utente</BaseInputLabel>
        <BaseSelectRemote
          v-model="cardClone.user.id" 
          :readonly="loading" 
          :rules="[required]"
          :options="userOptions"
          :onSearch="searchUser"
          placeholder="Type user email..."
          append-inner-icon="mdi-account"></BaseSelectRemote>
          {{ userOptions }}
      </v-card-item>
    </BaseCard>

    <div class="d-flex justify-end mt-6">
      <BaseBtnPrimary @click="onSubmit" :disabled="!form">
        Salva
      </BaseBtnPrimary>
    </div>
  </v-form>
</template>