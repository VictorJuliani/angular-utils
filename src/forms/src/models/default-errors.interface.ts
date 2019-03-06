export const DEFAULT_ERRORS = {
	required: () => `This field is required`,
	email: () => `This field must be an email address`,
	minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`
};
