export const handleTagAddition = (tag, tags, setTags, suggestions) => {
  tag = { ...tag, text: tag.text.toLowerCase() };
  // check if tag already exists.
  if (tags.map((tag) => tag.text).includes(tag.text)) return;
  //check if tag is in suggestions
  if (suggestions.map((suggestedTag) => suggestedTag.text).includes(tag.text)) {
    setTags([
      ...tags,
      {
        ...suggestions.find((suggestedTag) => suggestedTag.text === tag.text),
        newTag: false,
      },
    ]);
    return;
  }
  // if not in suggestions, add it as a new tag
  setTags([
    ...tags,
    { ...tag, id: numberToLetters(cyrb53(tag.id)), newTag: true },
  ]);
};

export const tagB2F = (tag) => ({ id: tag.id, text: tag.name });
export const tagF2B = (tag) => ({ id: tag.id, name: tag.text });

const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const numberToLetters = (number) => {
  let letters = "";
  while (number > 0) {
    let remainder = number % 26;
    let letter = String.fromCharCode(65 + remainder);
    letters = letter + letters;
    number = Math.floor(number / 26);
  }
  return letters;
};
