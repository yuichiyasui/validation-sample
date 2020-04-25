<template>
  <b-container>
    <b-row class="justify-content-sm-center">
      <b-col sm="6">
        <Form />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    Form,
  },
};
</script>
