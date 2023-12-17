<script setup lang="ts">

import BaseCard from '../../components/base/BaseCard.vue'
import BaseLink from '../../components/base/BaseLink.vue'
import type { User, UserRole} from '@/interfaces'
import { useCommonDataStore } from '../../stores/commonData'


const commonDataStore = useCommonDataStore()

const props = defineProps({
  user: {
    type: Object as () => User,
    required: false,
    default: {
      id: 0,
      name: '',
      email: '',
      lastName: '',
      phone: '',
      sex: '',
      birthdate: '',
      weight: 0,
      height: 0,
      address: '',
      city: '',
      zip: 0,
      country: '',
      avatar: '',
      role: '0' as UserRole,
    }
  }
})
const gender = commonDataStore.getGenderFromValue(props.user.sex)
</script>
<template>

    <v-row>
      <v-col>
        <BaseCard title="Informazioni contatto">
            <v-card-item><v-icon class="mr-3" icon="mdi-account"></v-icon>{{ user.name }} {{ user.lastName }}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-email"></v-icon><BaseLink to="" :href="'mailto:'+user.email" target="_blank">{{ user.email }}</BaseLink></v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-phone"></v-icon><BaseLink to="" :href="'tel:'+user.phone" target="_blank">{{ user.phone }}</BaseLink></v-card-item>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <BaseCard title="Dati personali">
            <v-card-item><v-icon class="mr-3" icon="mdi-gender-male-female"></v-icon>{{gender ? gender.title : "-"}}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-calendar"></v-icon>{{ user.birthDate }}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-weight-kilogram"></v-icon>{{ user.weight }}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-human-male-height"></v-icon>{{ user.height }}</v-card-item>
        </BaseCard>
      </v-col>
      <v-col sm="12" md="6">
        <BaseCard title="Indirizzo">
            <v-card-item><v-icon class="mr-3" icon="mdi-map-marker"></v-icon>{{ user.address }}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-city"></v-icon>{{ user.city }}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-target"></v-icon>{{ user.zip }}</v-card-item>
            <v-card-item><v-icon class="mr-3" icon="mdi-earth"></v-icon>{{ user.country }}</v-card-item>
        </BaseCard>
      </v-col>
    </v-row>
</template>