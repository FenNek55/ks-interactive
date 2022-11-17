<template>
  <form class="form font-paragraph" @submit="handleSubmit">
    <div class="form__group">
      <label class="form__label" for="name">Name</label>
      <input
        id="name"
        v-model="state.name"
        class="form__input"
        type="text"
        name="name"
      >
      <div v-if="v$.name.$error" class="form__error-group">
        <p v-for="error in v$.name.$errors" :key="error.$uid" class="form__error">
          {{ error.$message }}
        </p>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label" for="name">Subject{{ state.subject }}</label>
      <input
        id="subject"
        v-model="state.subject"
        class="form__input"
        type="text"
        name="subject"
      >
      <div v-if="v$.subject.$error" class="form__error-group">
        <p v-for="error in v$.subject.$errors" :key="error.$uid" class="form__error">
          {{ error.$message }}
        </p>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label" for="name">Your email</label>
      <input
        id="email"
        v-model="state.email"
        class="form__input"
        type="email"
        name="email"
      >
      <div v-if="v$.email.$error" class="form__error-group">
        <p v-for="error in v$.email.$errors" :key="error.$uid" class="form__error">
          {{ error.$message }}
        </p>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label" for="name">Message</label>
      <textarea
        id="message"
        v-model="state.message"
        class="form__input"
        name="message"
      />
      <div v-if="v$.message.$error && v$.message.$dirty" class="form__error-group">
        <p v-for="error in v$.message.$errors" :key="error.$uid" class="form__error">
          {{ error.$message }}
        </p>
      </div>
    </div>
    <div class="form__group">
      <button class="form__submit">
        <span class="form__submit-text">send</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'
import axios from 'axios'

type status = 'waiting' | 'sending' | 'success' | 'error'

interface State {
  name: string,
  subject: string,
  email: string,
  message: string,
}

const requestStatus = ref<status>('waiting')

const state: State = reactive({
  name: '',
  subject: '',
  email: '',
  message: ''
})

const rules = {
  name: {
    required: helpers.withMessage('Please enter your name', required)
  },
  subject: {
    required: helpers.withMessage('Please enter the subject', required)
  },
  email: {
    required: helpers.withMessage('Please enter your email', required),
    email: helpers.withMessage('Please enter a valid email', email)
  },
  message: {
    required: helpers.withMessage('Please enter a message', required),
    minLength: helpers.withMessage('Please enter a longer message', minLength(20))
  }
}

const v$ = useVuelidate(rules, state)

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const isValid = await v$.value.$validate()

  if (!isValid) { return }

  requestStatus.value = 'sending'

  const data = {
    ...state,
    access_key: 'abd5280c-f5f1-43cb-a79a-6f1e424430c8'
  }

  axios.post('https://api.web3forms.com/submit', data).then((response) => {
    if (response.status === 200) {
      requestStatus.value = 'success'
    } else {
      requestStatus.value = 'error'
    }
  })
}
</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 28px;

  &__label {
    display: block;
    margin-bottom: 10px;
  }

  &__group {
    grid-column: span 2;

    @media(min-width: $breakpoint-sm) {
      &:nth-child(1), &:nth-child(2) {
        grid-column: span 1;
      }
    }
  }

  &__input {
    width: 100%;
    background-color: $light;
    outline: none;
    border: none;
    padding: 8px 12px;

    &#message {
      min-height: 220px;
      max-height: 460px;
      resize: vertical;
    }
  }

  &__submit {
    padding: 16px 66px;
    background-color: transparent;
    border: none;
    color: $light;
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      height: 100%;
      width: 2px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: $mint;
      transition: 0.2s;
    }

    &:hover {
      &::before {
        width: 100%;
      }
    }
  }

  &__submit-text {
    position: relative;
    z-index: 10;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }

  &__error {
    color: $red;
  }

  &__error-group {
    padding-top: 8px;
  }
}
</style>
