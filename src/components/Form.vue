<template>
  <b-card class="text-left p-3" title="入力値チェック検証フォーム">
    <b-card-text>
      VeeValidateで入力値のチェックを行うフォームです。
    </b-card-text>
    <b-card-text>
      <validation-observer v-slot="{ invalid: observerInvalid }">
        <validation-provider
          v-slot="{ errors, valid, invalid, untouched }"
          name="氏名"
          rules="required|max:20"
        >
          <b-form-group label="氏名" label-for="input-name">
            <b-form-input
              id="input-name"
              v-model="form.name"
              type="text"
              :state="untouched ? null : valid"
              placeholder="名前を入力してください"
            ></b-form-input>
            <b-form-invalid-feedback :state="invalid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          v-slot="{ errors, valid, invalid, untouched }"
          name="メールアドレス"
          rules="required|email"
        >
          <b-form-group
            label="メールアドレス"
            label-for="input-email"
            description=""
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="text"
              :state="untouched ? null : valid"
              placeholder="メールアドレスを入力してください"
            ></b-form-input>
            <b-form-invalid-feedback :state="invalid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          v-slot="{ errors, valid, invalid, untouched }"
          name="年齢"
          rules="required|integer|between:1,100"
        >
          <b-form-group label="年齢" label-for="input-age" description="">
            <b-form-input
              id="input-age"
              v-model="form.age"
              type="text"
              :state="untouched ? null : valid"
              placeholder="年齢を半角数字で入力してください"
            ></b-form-input>
            <b-form-invalid-feedback :state="invalid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <div>
          <b-button
            class="mr-2"
            :disabled="observerInvalid"
            variant="info"
            @click="onSubmit"
            >送信</b-button
          >
          <b-button variant="danger" @click="onReset">リセット</b-button>
        </div>
      </validation-observer>
    </b-card-text>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Form",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        age: "",
      },
    };
  },
  methods: {
    onSubmit() {
      alert(JSON.stringify(this.form));
    },
    onReset() {
      this.form = {
        name: "",
        email: "",
        age: "",
      };
    },
  },
};
</script>
