
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    let errMsg = '';
  
    if (password.length < 8) {
      errMsg += 'Password must be at least 8 characters long. ';
    }
  
    if (!/[A-Z]/.test(password)) {
      errMsg += 'Must contain at least one uppercase letter. ';
    } else {
      errMsg = errMsg.replace('Must contain at least one uppercase letter. ', '');
    }
  
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      errMsg += 'Must contain at least one special character. ';
    }
  
    return errMsg.trim();
  };
  