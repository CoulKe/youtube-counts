<template>
  <div>
    <div class="bg-white max-w-4xl m-auto p-4 mt-4">
      <p>{{ message }}</p>
      <Examples />
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  props: {
    message: {
      type: String,
      default: "You seem lost, try the following examples",
      required: false,
    },
  },
};
</script>