export default {
  // Задайте базовий шлях для GitHub Pages
  base: '/SimCity/',

  // Задайте корінь проєкту для Vite (де знаходиться index.html)
  root: './src', // змінено на ./src, оскільки ваш index.html в src

  // Вказуємо директорію для статичних файлів
  publicDir: './public',

  // Вказуємо директорію для вихідних файлів після побудови
  build: {
    outDir: './dist', // файли будуть зберігатися тут після build
  },
};
