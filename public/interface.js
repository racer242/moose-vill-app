// Этот файл содержит всё для взаимодействия с окружением

// В index.html - пример размещения приложения в контейнере на странице
// Приложение загружается в тег с id="root"
// класс game нужен для изолирования базовых стилей
// <div id="container" style="position: absolute;left:100px;top:100px;right: 100px; bottom: 100px;">
//   <div id="root" class="game" oninit="onAppReadyHandler"></div>
// </div>

// Просто переменная - используется внутри этого файла для удобства,
// передается ниже в конфигурацию, сама на приложение не влияет
window.gameId = "SNOWBALL"; //"VIBE"; //"SNOWBALL";

// Просто переменная - используется внутри этого файла для удобства,
// передается ниже в конфигурацию, сама на приложение не влияет
window.userAuthorized = true; //true; false;

// Просто переменная - используется внутри этого файла для удобства,
// передается ниже в конфигурацию, сама на приложение не влияет
window.activityIsOver = false; //true; false;

// Также функция для использования внутри этого файла, заглушка
// Имитирует закрытие попапа с игрой
window.closeGamePopup = function () {
  console.log("closeGamePopup");
};

// Также функция для использования внутри этого файла, заглушка
// Имитирует переход к регистрации чека
window.registerBill = function () {
  console.log("registerBill");
};

// Также функция для использования внутри этого файла, заглушка
// Имитирует переход к регистрации пользователя
window.signUp = function () {
  console.log("signUp");
};

// Функция инициализации приложения. Вызывается из обработчика в Index.html,
// см. <div id="root" class="game" oninit="onAppReadyHandler">
function onAppReadyHandler(app) {
  // Функция обработки ресайза страницы.
  // Берется элемент-контейнер и передается его размер в приложение.
  // Это как пример, реализация может быть любой, главное, передать размеры для приложения
  function updateLayout() {
    var container = document.getElementById("container");
    app.resize(container.clientWidth, container.clientHeight);
  }
  updateLayout();

  // Инициализация веб-страницы
  // Обновление размеров приложения при готовности страницы
  function initHandler() {
    updateLayout();
  }

  // Ресайз веб-страницы
  // Обновление размеров приложения при ресайзе страницы
  function resizeHandler() {
    updateLayout();
  }

  // Подписываемся на события изменения, чтобы вызывать updateLayout
  // Обновление размеров приложения можно делать и иначе -
  // здесь просто пример использования
  window.addEventListener("load", initHandler);
  window.addEventListener("resize", resizeHandler);

  // Настройки приложения
  var data = {
    // Это список настроек для обмена данными игр
    games: {
      // id - для передачи кода игры
      // request1 - запрос до старта
      // request2 - запрос после старта
      1: {
        id: "VIBE",
        // request1: { url: "/api/TentGame", method: "POST" },
        request1: { url: "/api/TentGame1.json", method: "GET" },
        // request2: { url: "/api/TentGame", method: "POST" },
        request2: { url: "/api/TentGame2.json", method: "GET" },
      },
      2: {
        id: "SNOWBALL",
        // request1: { url: "/api/TentGame", method: "POST" },
        request1: { url: "/api/TentGame1.json", method: "GET" },
        // request2: { url: "/api/TentGame", method: "POST" },
        request2: { url: "/api/TentGame2.json", method: "GET" },
      },
      3: {
        id: "MATCH",
        request1: { url: "/api/TentGame", method: "POST" },
        request2: { url: "/api/TentGame", method: "POST" },
      },
      4: {
        id: "STAGE",
        request1: { url: "/api/TentGame", method: "POST" },
        request2: { url: "/api/TentGame", method: "POST" },
      },
      5: {
        id: "FIVE",
        request1: { url: "/api/PlayVip", method: "POST" },
        // request1: { url: "/api/FiveGame1.json", method: "GET" },
        request2: { url: "/api/PlayVip", method: "POST" },
        // request2: { url: "/api/FiveGame2.json", method: "GET" },
      },
      // Это индекс игр для быстрой идентификации внутри приложения
      index: { VIBE: 1, SNOWBALL: 2, MATCH: 3, STAGE: 4, FIVE: 5 },
    },
    // Обработчик закрытия попапа
    closeHandler: window.closeGamePopup,
    // Обработчик перехода к регистрации чека
    registerHandler: window.registerBill,
    signUpHandler: window.signUp,
    switchToMobileWidth: 720,
    userNotAuthorized: !window.userAuthorized,
    activityIsOver: window.activityIsOver,
  };

  // Передается номер текущей игры (внутри приложения игры идентифицируются по номерам)
  data.gameIndex = data.games.index[window.gameId];
  // Передаются данные текущей игры
  data.gameData = data.games[data.gameIndex];

  app.setData(data);
}
