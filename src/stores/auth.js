import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser = ref(null)

  const router = useRouter()

  const errorMessage = ref('')
  const errorCodes = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Invalid password',
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'admin-properties' })
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code]
      })
  }

  function logout() {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' })
      })
      .catch((error) => console.log(error))
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return { login, hasError, errorMessage, isAuth, logout }
})
