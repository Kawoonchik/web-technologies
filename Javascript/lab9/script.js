
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
  //повертає перший знайдений Element
  const errorContainer = element.parentElement.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = message;
  }
};

const setSuccess = (element) => {
  element.classList.remove('is-invalid');
  element.classList.add('is-valid');
  const errorContainer = element.parentElement.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.textContent = '';
  }
};

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFormValid = true;

  //elements повертає 
  //елементи(input, select, button) форми
  const formElements = event.currentTarget.elements;
  
  const validateName = (inputObj, fieldName) => {
    //trim() повертає новий рядок, видаляючи пробіли на початку та в кінці
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
  //перевіряє наявність будь-яких символів окрім 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  //пошук збігу і повертає (true/false)
  if (!emailRegex.test(email.value)) {
    setError(email, 'Please enter a valid email.');
    isFormValid = false;
  } else {
    setSuccess(email);
  }

  // 3. Password та Confirm Password [cite: 31, 32]
  const password = formElements.password; // Отримується за атрибутом name
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

  // 4. Phone [cite: 33]
  const phone = formElements.phone;
  // ^\+380 - початок рядка і префікс, \d{9}$ - рівно 9 цифр до кінця рядка
  const phoneRegex = /^\+380\d{9}$/; 
  if (!phoneRegex.test(phone.value)) {
    setError(phone, 'Format: +380XXXXXXXXX.');
    isFormValid = false;
  } else {
    setSuccess(phone);
  }

  // 5. Date of Birth [cite: 34]
  const dateBirth = formElements.dateBirth;
  if (!dateBirth.value) {
    setError(dateBirth, 'Date is required.');
    isFormValid = false;
  } else {
    // Конструктор Date() перетворює рядок дати у внутрішній числовий формат об'єкта Date
    const birthDateObj = new Date(dateBirth.value);
    const currentDate = new Date(); 
    
    // Метод getTime() повертає примітив (число) — кількість мілісекунд з 1 січня 1970 року
    if (birthDateObj.getTime() > currentDate.getTime()) {
      setError(dateBirth, 'Date cannot be in the future.');
      isFormValid = false;
    } else {
      // Метод getFullYear() повертає рік у вигляді 4-значного числа
      let age = currentDate.getFullYear() - birthDateObj.getFullYear();
      const mDiff = currentDate.getMonth() - birthDateObj.getMonth();
      
      // Коригуємо вік, якщо день народження ще не настав у поточному році
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

  // 6. Selects: Sex, Country, City [cite: 35, 36, 37]
  const validateSelect = (selectObj, fieldName) => {
    if (!selectObj.value) {
      setError(selectObj, `Select ${fieldName}.`);
      isFormValid = false;
    } else {
      setSuccess(selectObj);
    }
  };
  validateSelect(formElements.sex, 'sex');
  validateSelect(formElements.country, 'country');
  validateSelect(formElements.city, 'city');


  // Фінальний етап: якщо всі перевірки пройдено
  if (isFormValid) {
    // Виклик конструктора FormData з передачею об'єкта HTMLFormElement 
    // ініціалізує новий об'єкт FormData, захоплюючи всі поля, що мають атрибут name [cite: 6]
    const formData = new FormData(event.currentTarget);
    
    console.log('--- FormData Зібрано ---');
    // Метод entries() об'єкта FormData повертає об'єкт-ітератор, 
    // який дозволяє перебрати всі пари ключ-значення у масиві [key, value]
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    alert('Successfully registered!'); [cite: 55]
    
    // Метод reset() належить інтерфейсу HTMLFormElement. 
    // Він повертає властивості value всіх дочірніх інпутів до їхніх default-значень 
    event.currentTarget.reset();
    
    // Очищення візуальних станів успіху
    const allInputs = event.currentTarget.querySelectorAll('input, select');
    allInputs.forEach(input => input.classList.remove('is-valid'));
    
    // Скидання стану поля City
    const citySelect = formElements.city;
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Select city...</option>';
  }
});