function generateSku() {
  const randomNumber = Math.floor(Math.random() * 10000000);
  let formattedNumber = randomNumber.toString();

  if (formattedNumber.length < 7) {
    const zerosToAdd = 7 - formattedNumber.length;
    formattedNumber = '0'.repeat(zerosToAdd) + formattedNumber;
  }

  return formattedNumber;
}

module.exports = generateSku;
