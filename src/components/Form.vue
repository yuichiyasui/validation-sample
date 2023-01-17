<script lang="ts" setup>
import { useField } from "vee-validate";
import { computed } from "vue";

const {
  value: nameValue,
  meta: nameMeta,
  handleReset: handleResetName,
  errorMessage: nameErrorMessage,
} = useField<string>("name", (value) => {
  if (!value) {
    return "氏名は必須項目です";
  }
  if (value.length > 20) {
    return "氏名は20文字以内で入力してください";
  }

  return true;
});

const {
  value: emailValue,
  meta: emailMeta,
  handleReset: handleResetEmail,
  errorMessage: emailErrorMessage,
} = useField<string>("email", (value) => {
  if (!value) {
    return "メールアドレスは必須項目です";
  }
  if (!/^[a-zA-Z0-9_.-]+@gmail.com|^[a-zA-Z0-9_.-]+@yahoo.co.jp/.test(value)) {
    return "メールアドレスは有効なメールアドレスではありません";
  }

  return true;
});

const {
  value: ageValue,
  meta: ageMeta,
  handleReset: handleResetAge,
  errorMessage: ageErrorMessage,
} = useField<string>("age", (value) => {
  if (!value) {
    return "年齢は必須項目です";
  }
  if (!/\d{1,3}/.test(value)) {
    return "年齢は数値でなければありません";
  }
  if (Number(value) < 1 || Number(value) > 100) {
    return "年齢は1から100の間でなければありません";
  }

  return true;
});

const canSubmit = computed(() =>
  [nameMeta.valid, emailMeta.valid, ageMeta.valid].every(Boolean),
);

const onReset = () => {
  handleResetName();
  handleResetEmail();
  handleResetAge();
};

const onSubmit = (event: Event) => {
  event.preventDefault();
  alert(
    JSON.stringify({
      name: nameValue.value,
      email: emailValue.value,
      age: ageValue.value,
    }),
  );
};
</script>

<template>
  <form
    class="border border-gray-400 rounded-md text-left p-10"
    @submit="onSubmit"
  >
    <h1 class="text-lg font-bold mb-2">入力値チェック検証フォーム</h1>
    <p class="mb-4">VeeValidateで入力値のチェックを行うフォームです。</p>

    <div class="mb-6">
      <div role="group" aria-labelledby="input-name-label" class="mb-4">
        <label id="input-name-label" for="input-name" class="mb-2 inline-block">
          氏名
        </label>
        <input
          id="input-name"
          v-model="nameValue"
          type="text"
          :state="nameMeta.touched ? nameMeta.valid : null"
          :aria-invalid="nameMeta.valid ? 'false' : 'true'"
          aria-errormessage="input-name-error"
          aria-required="true"
          placeholder="名前を入力してください"
          class="input input-bordered w-full"
          :class="nameMeta.dirty && !nameMeta.valid ? 'input-error' : ''"
        />
        <p
          v-if="!nameMeta.valid"
          id="input-name-error"
          aria-live="polite"
          class="text-error mt-2 text-sm"
        >
          {{ nameErrorMessage }}
        </p>
      </div>

      <div role="group" aria-labelledby="input-email-label" class="mb-4">
        <label
          id="input-email-label"
          for="input-email"
          class="mb-2 inline-block"
          >メールアドレス(社内ドメインのみ許可)</label
        >
        <input
          id="input-email"
          v-model="emailValue"
          type="text"
          :aria-invalid="emailMeta.valid ? 'false' : 'true'"
          aria-errormessage="input-email-error"
          aria-required="true"
          placeholder="メールアドレスを入力してください"
          class="input input-bordered w-full"
          :class="emailMeta.dirty && !emailMeta.valid ? 'input-error' : ''"
        />
        <p
          v-if="!emailMeta.valid"
          id="input-email-error"
          aria-live="polite"
          class="text-error mt-2 text-sm"
        >
          {{ emailErrorMessage }}
        </p>
      </div>

      <div role="group" aria-labelledby="input-age-label">
        <label id="input-age-label" for="input-age" class="mb-2 inline-block"
          >年齢</label
        >
        <input
          id="input-age"
          v-model="ageValue"
          type="text"
          :aria-invalid="ageMeta.valid ? 'false' : 'true'"
          aria-errormessage="input-age-error"
          aria-required="true"
          placeholder="年齢を半角数字で入力してください"
          class="input input-bordered w-full"
          :class="ageMeta.dirty && !ageMeta.valid ? 'input-error' : ''"
        />
        <p
          v-if="!ageMeta.valid"
          id="input-age-error"
          aria-live="polite"
          class="text-error mt-2 text-sm"
        >
          {{ ageErrorMessage }}
        </p>
      </div>
    </div>

    <div class="flex gap-x-2">
      <button
        type="submit"
        :disabled="!canSubmit"
        class="btn btn-outline btn-success"
      >
        送信
      </button>
      <button type="reset" class="btn btn-outline btn-error" @click="onReset">
        リセット
      </button>
    </div>
  </form>
</template>
