const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

tabBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const targetId = event.currentTarget.dataset.target;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => {
      c.classList.remove('active');
      c.style.display = 'none';
    });

    event.currentTarget.classList.add('active');
    const targetElement = document.getElementById(targetId);
    targetElement.classList.add('active');
    targetElement.style.display = 'block';
  });
});

togglePasswordBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const inputElement = event.currentTarget.previousElementSibling;
    
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
    } else {
      inputElement.type = 'password';
    }
  });
});

const citiesData = {
  ua: ['Kyiv', 'Lviv', 'Chernivtsi'],
  us: ['New York', 'Los Angeles', 'Chicago'],
  uk: ['London', 'Manchester', 'Liverpool']
};

countrySelect.addEventListener('change', (event) => {
  const selectedCountry = event.currentTarget.value;

  if (selectedCountry && citiesData[selectedCountry]) {
    citySelect.disabled = false;
    
    const optionsHtml = citiesData[selectedCountry]
      .map(city => `<option value="${city.toLowerCase()}">${city}</option>`)
      .join('');
      
    citySelect.innerHTML = `<option value="">Select city...</option>` + optionsHtml;
  } else {
    citySelect.disabled = true;
    citySelect.innerHTML = `<option value="">Select city...</option>`;
  }
});

const signupForm = document.getElementById('signup-form');

const setError = (element, message) => {
  element.classList.remove('is-valid');
  element.classList.add('is-invalid');
  
  const errorContainer = element.closest('.form-group').querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = message;
  }
};

const setSuccess = (element) => {
  element.classList.remove('is-invalid');
  element.classList.add('is-valid');
  
  const errorContainer = element.closest('.form-group').querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = '';
  }
};

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFormValid = true;

  const formElements = event.currentTarget.elements;
  
  const validateName = (inputObj, fieldName) => {
    const val = inputObj.value.trim(); 
    if (val.length < 3 || val.length > 15) {
      setError(inputObj, `${fieldName} must be 3-15 characters.`);
      isFormValid = false;
    } else {
      setSuccess(inputObj);
    }
  };
  validateName(formElements.firstName, 'First Name');
  validateName(formElements.lastName, 'Last Name');

  const email = formElements.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (!emailRegex.test(email.value)) {
    setError(email, 'Please enter a valid email.');
    isFormValid = false;
  } else {
    setSuccess(email);
  }

  const password = formElements.password;
  const confirmPassword = formElements.confirmPassword;
  
  if (password.value.length < 6) {
    setError(password, 'At least 6 characters required.');
    isFormValid = false;
  } else {
    setSuccess(password);
  }

  if (confirmPassword.value === '' || confirmPassword.value !== password.value) {
    setError(confirmPassword, 'Passwords do not match.');
    isFormValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  const phone = formElements.phone;
  const phoneRegex = /^\+380\d{9}$/; 
  if (!phoneRegex.test(phone.value)) {
    setError(phone, 'Format: +380XXXXXXXXX.');
    isFormValid = false;
  } else {
    setSuccess(phone);
  }

  const dateBirth = formElements.dateBirth;
  if (!dateBirth.value) {
    setError(dateBirth, 'Date is required.');
    isFormValid = false;
  } else {
    const birthDateObj = new Date(dateBirth.value);
    const currentDate = new Date(); 
    
    if (birthDateObj.getTime() > currentDate.getTime()) {
      setError(dateBirth, 'Date cannot be in the future.');
      isFormValid = false;
    } else {
      let age = currentDate.getFullYear() - birthDateObj.getFullYear();
      const mDiff = currentDate.getMonth() - birthDateObj.getMonth();
      
      if (mDiff < 0 || (mDiff === 0 && currentDate.getDate() < birthDateObj.getDate())) {
        age--;
      }

      if (age < 12) {
        setError(dateBirth, 'Must be at least 12 years old.');
        isFormValid = false;
      } else {
        setSuccess(dateBirth);
      }
    }
  }

  const validateSelect = (selectObj, fieldName) => {
    if (!selectObj.value) {
      setError(selectObj, `Select ${fieldName}.`);
      isFormValid = false;
    } else {
      setSuccess(selectObj);
    }
  };
  validateSelect(formElements.gender, 'gender');
  validateSelect(formElements.country, 'country');
  validateSelect(formElements.city, 'city');

  if (isFormValid) {
    const formData = new FormData(event.currentTarget);
    
    console.log('--- FormData Зібрано ---');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    alert('Successfully registered!');
    
    event.currentTarget.reset();
    
    const allInputs = event.currentTarget.querySelectorAll('input, select');
    allInputs.forEach(input => input.classList.remove('is-valid'));
    
    const citySelect = formElements.city;
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Select city...</option>';
  }
});

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFormValid = true;
  
  const formElements = event.currentTarget.elements;

  const username = formElements.username;
  if (username.value.trim() === '') {
    setError(username, 'Please choose a username.');
    isFormValid = false;
  } else {
    setSuccess(username);
  }

  const password = formElements.password;
  if (password.value.length < 6) {
    setError(password, 'At least 6 characters required.');
    isFormValid = false;
  } else {
    setSuccess(password);
  }

  if (isFormValid) {
    const formData = new FormData(event.currentTarget);
    
    console.log('--- Login FormData Зібрано ---');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    alert('Successfully logged in!');
    
    event.currentTarget.reset();
    
    const allInputs = event.currentTarget.querySelectorAll('input');
    allInputs.forEach(input => input.classList.remove('is-valid'));
  }
});