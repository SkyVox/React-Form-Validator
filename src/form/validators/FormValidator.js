const EMAIL_REGEX_VALIDATION = new RegExp("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");
const PASSWORD_REGEX_VALIDATION = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])(?=\\S+$).{6,64}$");

class Validator {

    constructor() {
        this.validators = {};
    }

    setOwn(type, value, text, func) {
        this.validators[type] = this.buildValidator(value, text, func);
        return this;
    }

    required(required, text) {
        this.validators['required'] = this.buildValidator(required, text, (input) => {
            if (required) return (input.value != '');
            return true;
        });
        return this;
    }

    min(minimum, text) {
        this.validators['min'] = this.buildValidator(minimum, text, (input) => {
            return input.value.length >= minimum;
        });
        return this;
    }

    max(maximum, text) {
        this.validators['max'] = this.buildValidator(maximum, text, (input) => {
            return input.value.length <= maximum;
        });
        return this;
    }

    email(text) {
        this.validators['email'] = this.buildValidator(null, text, (input) => {
            return EMAIL_REGEX_VALIDATION.test(input.value);
        });
        return this;
    }

    password(text) {
        this.validators['password'] = this.buildValidator(null, text, (input) => {
            return PASSWORD_REGEX_VALIDATION.test(input.value);
        });
        return this;
    }

    /**
     * makeTest() is a simple function to test if the
     * placed input value matches the requirements inside
     * @validators, true if so, false otherwise.
     * 
     * @param {*} input - HTML input element.
     * @returns If the input value matches the given requirements.
     */
    makeTest(input) {
        if (!input) return this.testResponse(false, "Invalid Input");

        if (JSON.stringify(this.validators) === JSON.stringify({})) return this.testResponse(true, "No validators found.");

        for (let key in this.validators) {
            const validator = this.validators[key];
            if (!validator) return;
            if (!validator.test(input)) return this.testResponse(false, validator.text);
        }

        // Test has passed! Ready to send this data.
        return this.testResponse(true, "Success!");
    }

    testResponse(valid, message) {
        return {
            valid: valid,
            message: message
        }
    }

    buildValidator(value, text, test) {
        return {
            value: value,
            text: text,
            test: test
        }
    }
}

/**
 * @returns New Validator instance.
 */
export let validate = () => {
    return new Validator();
}