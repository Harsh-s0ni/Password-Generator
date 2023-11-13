const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

const passLength = document.getElementById("pass-length");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const passBox = document.getElementById("pass-box");
const lowerInput = document.getElementById("lower");
const upperInput = document.getElementById("upper");
const numberInput = document.getElementById("number");
const symbolInput = document.getElementById("symbol");

const getRandomData = (dataSet) => {
  return dataSet[Math.floor(Math.random() * dataSet.length)];
};

const truncatePassword = (password, length) => {
  if (password.length > length) {
    let newPass = password.substring(0, length);
    return newPass;
  } else {
    return password;
  }
};

const generatePassword = (password = "") => {
  if (upperInput.checked) {
    password += getRandomData(upperSet);
  }
  if (lowerInput.checked) {
    password += getRandomData(lowerSet);
  }
  if (numberInput.checked) {
    password += getRandomData(numberSet);
  }
  if (symbolInput.checked) {
    password += getRandomData(symbolSet);
  }
  if (password.length < passLength.value) {
    return generatePassword(password);
  }
  passBox.value = truncatePassword(password, passLength.value);
};
generatePassword();
generateButton.addEventListener("click", () => {
  generatePassword();
});

copyButton.addEventListener("click", () => {
  if (passBox.value) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passBox.value).then(() => {
        copyButton.innerHTML = "Copied";
        setTimeout(() => {
          copyButton.innerHTML = "Copy To Clipboard";
        }, 1000);
      });
    } else {
      console.log("Browser Not compatible");
    }
  } else {
    alert("No password to copy");
  }
});
