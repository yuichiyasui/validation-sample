<script lang="ts" setup>
import { useField } from "vee-validate";
import { ref, computed } from "vue";
import {
  required,
  max,
  email as isEmail,
  integer,
  between,
  regex,
} from "@vee-validate/rules";

const name = useField<string>("name", (value) => {
  if (required(value)) {
    return "指名は必須項目です";
  }
  if (max(value, { length: 20 })) {
    return "20文字以内で入力してください";
  }

  return true;
});

const email = useField<string>("email", (value) => {
  if (required(value)) {
    return "メールアドレスは必須項目です";
  }
  if (
    isEmail(value) ||
    regex(value, {
      regex: /^[a-zA-Z0-9_.-]+@gmail.com|^[a-zA-Z0-9_.-]+@yahoo.co.jp/,
    })
  ) {
    return "メールアドレスは有効なメールアドレスではありません";
  }

  return true;
});

const age = useField<string>("age", (value) => {
  if (required(value)) {
    return "年齢は必須項目です";
  }
  if (integer(value)) {
    return "年齢は数値でなければありません";
  }
  if (between(value, { min: 1, max: 100 })) {
    return "年齢は1から100の間でなければありません";
  }

  return true;
});

const hasError = computed(() =>
  [name.meta.valid, email.meta.valid, age.meta.valid].every(Boolean),
);

const form = ref({
  name: "",
  email: "",
  age: "",
});
const onSubmit = () => alert(form);
const onReset = () => {
  form.value = {
    name: "",
    email: "",
    age: "",
  };
};
</script>

<template>
  <b-card class="text-left p-3" title="入力値チェック検証フォーム">
    <b-card-text>
      VeeValidateで入力値のチェックを行うフォームです。
    </b-card-text>
    <b-card-text>
      <b-form-group label="氏名" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="name.value"
          type="text"
          :state="name.meta.touched ? name.meta.valid : null"
          placeholder="名前を入力してください"
        ></b-form-input>
        <b-form-invalid-feedback :state="!name.meta.valid">
          {{ name.errorMessage }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label="メールアドレス(社内ドメインのみ許可)"
        label-for="input-email"
        description=""
      >
        <b-form-input
          id="input-email"
          v-model="email.value"
          type="text"
          :state="email.meta.touched ? email.meta.valid : null"
          placeholder="メールアドレスを入力してください"
        ></b-form-input>
        <b-form-invalid-feedback :state="!email.meta.valid">
          {{ email.errorMessage }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="年齢" label-for="input-age" description="">
        <b-form-input
          id="input-age"
          v-model="age.value"
          type="text"
          :state="age.meta.touched ? age.meta.valid : null"
          placeholder="年齢を半角数字で入力してください"
        ></b-form-input>
        <b-form-invalid-feedback :state="!age.meta.valid">
          {{ age.errorMessage }}
        </b-form-invalid-feedback>
      </b-form-group>
      <div>
        <b-button
          class="mr-2"
          :disabled="hasError"
          variant="info"
          @click="onSubmit"
          >送信</b-button
        >
        <b-button variant="danger" @click="onReset">リセット</b-button>
      </div>
    </b-card-text>
  </b-card>
</template>
