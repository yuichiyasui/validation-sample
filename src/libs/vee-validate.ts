import { defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import {
  required,
  max,
  email,
  integer,
  between,
  regex,
} from "@vee-validate/rules";
import ja from "@vee-validate/i18n/dist/locale/ja.json";

// Install required rule.
defineRule("required", required);

// Install max rule.
defineRule("max", max);

// Install email rule.
defineRule("email", email);

// Install email rule.
defineRule("integer", integer);

// Install max_value rule.
defineRule("between", between);

defineRule("regex", regex);

configure({
  generateMessage: localize({ ja }),
});
