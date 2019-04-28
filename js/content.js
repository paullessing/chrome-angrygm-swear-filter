const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
let node;

while (node = walk.nextNode()) {
  if (node.textContent.match(/[$&%]{2,}/)) {
    node.textContent = node.textContent.replace(/([a-z]+)[$&%]{2,}([a-z]*)/gi, (value, pre, post) => {
      const word = unSwear(pre[pre.length - 1]);
      return reconstruct(pre, word, post || '');
    });
  }
}

function unSwear(letterBeforeFilter) {
  switch (letterBeforeFilter.toLocaleLowerCase()) {
    case 's': return 'shit';
    case 'f': return 'fuck';
    case 'a': return 'ass';
    default: console.log('Not Found', letterBeforeFilter); return letterBeforeFilter + '***';
  }
}

function reconstruct(pre, word, post) {
  const newWord = matchCapitalisation(pre, word, post);

  return pre.slice(0, pre.length - 1) + newWord + post;
}

function matchCapitalisation(pre, word, post) {
  if (!post && pre.length === 1) {
    if (isUppercase(pre)) {
      return capitaliseFirst(word);
    } else {
      return word;
    }
  } else {
    if (isUppercase(pre + post)) {
      return word.toLocaleUpperCase();
    } else if (isUppercase(pre[pre.length - 1])) {
      return capitaliseFirst(word);
    } else {
      return word;
    }
  }
}

function capitaliseFirst(word) {
  return word[0].toLocaleUpperCase() + word.slice(1);
}

function isUppercase(word) {
  return word.toLocaleUpperCase() === word;
}
