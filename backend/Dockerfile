# Используем официальный образ Node.js
FROM node:20-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --omit=dev

# Копируем исходный код
COPY ./src ./src

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт (если нужно, например 3000)
EXPOSE 3000

# Запускаем приложение
CMD ["nodemon", "--inspect=0.0.0.0:9229", "src/app.js"]