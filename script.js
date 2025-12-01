// Функция для загрузки JSON-файла
async function loadJSON(langCode) {
  try {
    const response = await fetch(`/languages/${langCode}.json`);
    if (!response.ok) throw new Error('Failed to load translation file.');
    return await response.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

// Устанавливаем текстовые значения согласно данным из JSON
function setTranslations(translations) {
  document.getElementById('title-unlimited-access').innerHTML = translations['Get Unlimited <br>Access'];
  document.getElementById('title-art-creation').innerHTML = translations['Unlimited Art <br>Creation'];
  document.getElementById('title-exclusive-styles').innerHTML = translations['Exclusive <br>Styles'];
  document.getElementById('title-magic-avatars').innerHTML = translations['Magic Avatars <br>With 20% Off'];

  document.getElementById('title-yearly-access').innerHTML = translations['YEARLY ACCESS'];
  document.getElementById('slogan-yearly-access').innerHTML = translations['Just {{price}} per year'].replace('{{price}}', '$39.99');
  document.getElementById('best-offer-label').innerHTML = translations['BEST OFFER'];
  document.getElementById('yearly-price-template').innerHTML = translations['{{price}} <br>per week'].replace('{{price}}', '$0.48');

  document.getElementById('title-weekly-access').innerHTML = translations['WEEKLY ACCESS'];
  document.getElementById('weekly-price-template').innerHTML = translations['{{price}} <br>per week'].replace('{{price}}', '$6.99');

  document.getElementById('terms-link').innerHTML = translations['Terms of Use'];
  document.getElementById('policy-link').innerHTML = translations['Privacy Policy'];
  document.getElementById('restore-btn').innerHTML = translations['Restore'];
  document.getElementById('continue-btn').innerHTML = translations['Continue'];
}

// Функция для определения языка из системных настроек
function getSystemLanguage() {
  // Список поддерживаемых языков
  const supportedLanguages = ['en', 'de', 'es', 'fr', 'ja', 'pt'];

  // Получаем системный язык браузера
  const systemLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().substring(0, 2);

  // Проверяем, поддерживается ли системный язык
  if (supportedLanguages.includes(systemLang)) {
    return systemLang;
  }

  // Если системный язык не поддерживается, возвращаем английский
  return 'en';
}

// Основная логика запуска
window.onload = async () => {
  // Получение параметра языка из строки URL
  const urlLangParam = new URLSearchParams(window.location.search).get('lang');

  // Если параметр lang есть в URL, используем его, иначе определяем системный язык
  let langParam = urlLangParam || getSystemLanguage();

  // Пробуем загрузить указанный язык
  let translations = await loadJSON(langParam);

  // Если нужный файл отсутствует, пробуем загрузить en.json
  if (!translations && langParam !== 'en') {
    translations = await loadJSON('en'); // Загружаем fallback-языковой файл
    langParam = 'en'; // Обновляем langParam для корректной обработки стилей
  }

  // Проверяем наличие переводов
  if (translations) {
    setTranslations(translations); // Применяем переводы
  } else {
    alert('Translation not found even in English!'); // Ошибка, если даже EN не найден
  }

  // Уменьшаем размер заголовка для французского языка
  if (langParam === 'fr' || langParam === 'pt')
    document.querySelector('.hero__title').classList.add('hero__title--small');
  else
    document.querySelector('.hero__title').classList.remove('hero__title--small');
};