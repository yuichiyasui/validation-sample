import { extend, localize } from "vee-validate";
import { required, max, email, integer, between, regex } from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";

// Install required rule.
extend("required", required);

// Install max rule.
extend("max", max);

// Install email rule.
extend("email", email);

// Install email rule.
extend("integer", integer);

// Install max_value rule.
extend("between", between);

extend("regex", regex);

// Install Japanese localizations.
localize("ja", ja);
