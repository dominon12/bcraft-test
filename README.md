# Тестовое задание для компании BCraft

## Задание:

Разработать SPA-приложение с использованием React, Redux, Webpack, либо CRA. Создать несколько страниц: Login, Registration, Change password. Расширяемое меню для переключения между страницами с названием страницы.

Регистрация:
Должна содержать в себе 3 инпута:

1. Email - должен валидироваться, что email указан правильно
2. Password - валидация количества символов (от 4 до 10) и на наличие заглавной буквы.
3. Repeat password - должен быть идентичным password.

Страница с логином должна содержать 2 инпута:

1. Email - должен валидироваться, что email указан правильно
2. Password - валидация количества символов (от 4 до 10) и на наличие заглавной буквы.

Изменить пароль должна содержить в себе 3 инпута:

1. Old password
2. New password - валидация количества символов (от 4 до 10) и на наличие заглавной буквы.
3. Repeat password - должен быть идентичным password.

Страница с изменением пароля доступна только авторизированным пользователям.
Страницы регистрации и авторизации только неавторизированным.
Сделать имитацию запроса серверу для каждой страницы и получить ответ от сервера об успешной регистрации/авторизации/смены пароля.

Дополнения:
Использование middleware для API
Сохранение стейта инпутов при переключении между страницами.
Система уведомлений: О внутренней ошибке, о наличии неверного пароля, об успешном логине, регистрации и пр.
