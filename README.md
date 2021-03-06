# Тестовое задание Xsolla School 2021 Backend

Описание задания находится [здесь](https://github.com/xsolla/xsolla-school-backend-2021).

## Цели и результат

Написанное приложение работает как ожидается.

- [x] REST-методы для управления товарами и категориями
- [x] Пагинация для товаров и категорий
- [x] Поиск по названию для товаров и категорий
- [x] Фильтрация товаров по типу, стоимости и доступности
- [x] [Документация](https://nestjs-xsolla.herokuapp.com/api/swagger) для разработанного API
- [x] Развёртывание API на [heroku](https://www.heroku.com/)

## Запуск приложения

Прежде всего необходимо убедиться, что установлены [Node.js](http://nodejs.org) и [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable). Проверить установленные версии:

```bash
$ node -v
$ yarn -v
```

Для локальной работы необходимо создать файлик `.env` и подставить туда свой конфиг постгреса, все необходимые переменные окружения можно найти [тут](.env.example).

Далее производится установка всех зависимостей и запуск локального сервера:

```bash
# если не установлен TS
$ yarn global add typescript

# установка зависимостей
$ yarn install

# запуск в режиме разработки
$ yarn start:dev
```

## Docker

### Первый запуск

```bash
# запуск сборки докер-контейнеров
$ docker-compose build

# запуск докер-контейнеров
$ docker-compose up
```

### Повторный запуск

```bash
$ docker-compose up
```

## Другие команды

```bash
# запуск прода в локальном режиме
$ yarn start:prod

# запуск сборки для продакшена
$ yarn build
```
