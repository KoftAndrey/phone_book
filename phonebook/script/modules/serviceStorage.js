
const getStorage = key => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return [];
  }
};

const setStorage = (key, obj) => {
  const arr = getStorage(key);
  arr.unshift(obj);
  const str = JSON.stringify(arr);
  localStorage.setItem(key, str);
};

const removeStorage = (key, phone) => {
  const arr = getStorage(key);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].phone === phone) arr.splice(i, 1);
  }
  const str = JSON.stringify(arr);
  localStorage.setItem(key, str);
};

export {getStorage, setStorage, removeStorage};
