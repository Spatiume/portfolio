import axios from "axios";

const token = localStorage.getItem('token');

if (!token) {
  console.warn("Токен отсутствует");
}

const requests = axios.create({
  baseURL: "https://webdev-api.loftschool.com/",
  headers: {
    "Authorization": `Bearer ${token}`
  }
});


/* interceptors response use принимает две функции:
 response если всё пошло хорошо, тогда возвращаем ответ 
 error, если произойдет ошибка то мы выполним какую-то функцию
 interseptor axios 
https://github.com/axios/axios
 */

requests.interceptors.response.use(
  response => response,
  async error => {
    // console.log(error.config)
    /* получаем объект из error.config,  с данными о запросе и ошибке, 
     обновим в заголовках токен, и передадим его функции axios, 
     которая выполнит запрос снова 
    */
    const originalRequest = error.config; //сохраняем в переменную данные о запросе
    // проверяем статус ошибки
    if (error.response.status === 401) { // 401 ошибку возвращает Api когда токен истёк
      const { data } = await requests.post("/refreshToken"); // новый запрос на получение нового токена
      const token = data.token; //сохраняем новый токен

      localStorage.setItem("token", token); //устанавливаем новый токен в localStorage
      requests.defaults.headers["Authorization"] = `Bearer ${token}`; //меняем токен в заголовке
      originalRequest.headers["Authorization"] = `Bearer ${token}`;
      // меняем токен в заголовке запроса, в котором произошла ошибка

      // передаем функции axios 
      // повторяем запрос в котором произошла ошибка с новыми данными  
      // возвращаем функцию, чтобы сработали наши обработчики в случае ошибки try catch 
      return axios(originalRequest);
    }


    // чтобы после выполнения функции сработал обработчик, который обрабатывает запрос, возвращаем промис
    // если ошибка не 401, то возвращаем ошибку .
    return Promise.reject(error);
  }
);

export default requests;
