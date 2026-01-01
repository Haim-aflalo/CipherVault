export function chosenCipher(word, option) {
  switch (option) {
    case 'reverse':
      return word.split('').reverse().join('').split(' ').join(' ');
    case 'RANDOM_SHUFFLE':
      return word
        .split('')
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join('');
    case 'ATBASH':
      let result = '';
      const letters = word.split('');
      for (let letter of letters) {
        result += (letter.charCodeAt(0) % 26) + 1;
        return result.toString();
      }
  }
}

