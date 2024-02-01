<script setup lang="ts">
import { reactive } from "vue";
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  name: undefined,
  email: undefined,
  message: undefined,
  emailSent: false,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.message) errors.push({ path: "message", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Handle form submission here
  console.log("event data", event.data);
  try {
    const response = await fetch("/api/sendmail", {
      method: "POST",
      body: JSON.stringify(event.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // Handle success
      state.name = undefined;
      state.email = undefined;
      state.message = undefined; // Reset form inputs
      state.emailSent = true; // Show success message
    } else {
      // Handle error
      console.error("Failed to send message");
    }
  } catch (error) {
    // Handle error
    console.error("Error sending message:", error);
  }
}

function consoleHitOn() {
  console.log("ya");
  // close alert
  state.emailSent = false; // Show success message
}
</script>

<template>
  <h1 class="text-4xl mb-4">Contact</h1>
  <div class="flex items-center flex-col max-w-[600px]">
    <UForm
      :validate="validate"
      :state="state"
      class="space-y-4 w-full mb-10"
      @submit="onSubmit"
    >
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" required />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" required />
      </UFormGroup>

      <UFormGroup label="Message" name="message">
        <UTextarea v-model="state.message" required />
      </UFormGroup>

      <UButton type="submit">Submit</UButton>
    </UForm>

    <UAlert
      v-if="state.emailSent"
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'white',
        variant: 'link',
        padded: false,
      }"
      color="primary"
      title="Email Sent!"
      @close="consoleHitOn"
    />
  </div>
</template>
