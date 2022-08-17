import axios from "axios";

const token = localStorage.getItem("token");

if (!token) { console.warn("Отсутствует токен"); }

const requests = axios.create({
  baseURL: "https://webdev-api.loftschool.com",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

requests.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401) { // 401 ошибку возвращает Api когда токен истёк
      const response = await requests.post("/refreshToken"); // получаем новый токен
      const token = response.data.token;

      localStorage.setItem("token", token); //устанавливаем токен в локалсторадж
      requests.defaults.headers["Authorization"] = `Bearer ${token}`; //меняем токен в заголовке
      originalRequest.headers["Authorization"] = `Bearer ${token}`;
      // меняем токен в заголовке в запросе, в котором пришла ошибка

      //возвращаем данные с запросом и вызываем его повторно
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default requests;
