<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/auth'

const { handleSubmit } = useForm({ validationSchema })
const auth = useAuthStore()

const email = useField('email')
const password = useField('password')

const submit = handleSubmit((values) => {
  auth.login(values)
})
</script>

<template>
  <v-sheet max-width="480" class="mx-auto">
    <v-row>
      <v-col cols="12">
        <h1>Login</h1>
      </v-col>
      <v-col v-if="auth.hasError">
        <v-alert
          type="error"
          :text="auth.errorMessage"
          variant="tonal"
          density="default"
        />
      </v-col>
      <v-col cols="12">
        <v-form>
          <v-text-field
            type="email"
            label="Email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
          />
          <v-text-field
            type="password"
            label="Password"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          />
          <v-btn @click="submit">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-sheet>
</template>
