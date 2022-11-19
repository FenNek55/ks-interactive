<template>
  <section class="form__wrapper">
    <h2 class="form__heading">
      Want to get in touch?
    </h2>
    <p class="form__paragraph">
      Feel free to send me a message, I'll respond as fast as I can
    </p>
    <div v-if="requestStatus !== 'waiting'" class="form__overlay">
      <FormLoader v-if="requestStatus === 'sending'" class="form__loader" />
      <div v-if="requestStatus === 'success'" class="form__success">
        <h2 class="form__heading">
          Thank you for contacting me, I'll respond as fast as I can
        </h2>
      </div>
      <div v-if="requestStatus === 'error'" class="form__error">
        <h2 class="form__heading">
          Whoops! Something went wrong
        </h2>
        <p class="form__paragraph">
          Please send me the message on my personal email address stasik.karol@gmail.com
        </p>
      </div>
    </div>
    <form class="form font-paragraph" @submit="handleSubmit">
      <div class="form__group">
        <label class="form__label" for="name">Name</label>
        <input
          id="name"
          v-model="state.name"
          :disabled="isFormDisabled"
          :class="['form__input', {
            'form__input--error': v$.name.$error,
            'form__input--disabled': isFormDisabled
          }]"
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
        <label class="form__label" for="name">Subject</label>
        <input
          id="subject"
          v-model="state.subject"
          :disabled="isFormDisabled"
          :class="['form__input', {
            'form__input--error': v$.name.$error,
            'form__input--disabled': isFormDisabled
          }]"
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
          :disabled="isFormDisabled"
          :class="['form__input', {
            'form__input--error': v$.name.$error,
            'form__input--disabled': isFormDisabled
          }]"
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
          :disabled="isFormDisabled"
          :class="['form__input', {
            'form__input--error': v$.name.$error,
            'form__input--disabled': isFormDisabled
          }]"
          name="message"
        />
        <div v-if="v$.message.$error && v$.message.$dirty" class="form__error-group">
          <p v-for="error in v$.message.$errors" :key="error.$uid" class="form__error">
            {{ error.$message }}
          </p>
        </div>
      </div>
      <div class="form__group">
        <button
          :disabled="isFormDisabled"
          :class="['form__submit', {
            'form__submit--disabled': isFormDisabled
          }]"
        >
          <span class="form__submit-text">send</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, maxLength } from '@vuelidate/validators'
import axios from 'axios'
import FormLoader from './FormLoader.vue'
// import { delay } from '@/utils/utils'

type status = 'waiting' | 'sending' | 'success' | 'error'

interface State {
  name: string,
  subject: string,
  email: string,
  message: string,
}

const requestStatus = ref<status>('waiting')
const isFormDisabled = ref(false)

const state: State = reactive({
  name: '',
  subject: '',
  email: '',
  message: ''
})

const rules = {
  name: {
    required: helpers.withMessage('Please enter your name', required),
    maxLength: helpers.withMessage('Please enter a valid name', maxLength(64))
  },
  subject: {
    required: helpers.withMessage('Please enter the subject', required),
    maxLength: helpers.withMessage('Please enter a valid subject', maxLength(64))
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

  axios.post('https://api.web3forms.com/submit', data, { timeout: 20000 }).then((response) => {
    if (response.status === 200) {
      requestStatus.value = 'success'
    } else {
      requestStatus.value = 'error'
    }
  }).catch((error) => {
    requestStatus.value = 'error'
    console.log(error)
  })
}
</script>

<style lang="scss" scoped>
@keyframes sending-overlay {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 0.9;
  }
}

@keyframes sending-loader {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  20% {
    opacity: 1;
    transform: translateY(0);
  }
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 28px;

  &__paragraph {
    margin-bottom: 32px;
  }

  &__heading {
    font-size: 32px;
  }

  &__wrapper {
    position: relative;
  }

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

    &--error {
      outline: 1px solid $red;
    }

    &--disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }

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

    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.8;
    }

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

  &__overlay {
    animation: sending-overlay 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $dark;
    opacity: 0.9;
    text-align: center;
  }

  &__loader {
    animation: sending-loader 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    width: 80px;
    height: 80px;
  }

  &__success {
    animation: sending-loader 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
}
</style>
