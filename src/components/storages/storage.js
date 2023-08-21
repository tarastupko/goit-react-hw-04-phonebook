
import { useState } from 'react';

function DataManager() {
  const storage = window.localStorage;

  const save = (key, value) => {
    try {
      const serializedData = JSON.stringify(value);
      storage.setItem(key, serializedData);
      console.log(`Дані з ключем ${key} успішно збережено.`);
    } catch (error) {
      console.error(`Помилка при збереженні даних: ${error.message}`);
    }
  };

  const load = (key) => {
    try {
      const serializedData = storage.getItem(key);
      if (serializedData === null) {
        console.log(`Дані з ключем ${key} відсутні.`);
        return undefined;
      }
      const parsedData = JSON.parse(serializedData);
      console.log(`Дані з ключем ${key} успішно завантажено.`);
      return parsedData;
    } catch (error) {
      console.error(`Помилка при завантаженні даних: ${error.message}`);
    }
  };

  return {
    save,
    load,
  };
}

export default DataManager;