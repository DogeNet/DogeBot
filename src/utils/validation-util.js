const validateUserControllerParams = args => {
  if (args.length !== 2) {
    return false;
  }
  if (args[1] === '') {
    return false;
  }
  return true;
};

const validateUserControllerInput = args => {
  if (args.length < 1 || args.length > 2) {
    return false;
  }
  return true;
};

export { validateUserControllerInput, validateUserControllerParams };
