import axios from 'axios'
export default {
  async install(Vue, opts) {
    let apiKey = '4720f041-472e-48bb-b35c-f29ae43f4651',
        url1 = `https://geocode-maps.yandex.ru/1.x/`,
        url2 = 'https://api-maps.yandex.ru/2.1/?apikey=4720f041-472e-48bb-b35c-f29ae43f4651&lang=ru_RU';
    let mapGlogal = await axios.get(`${url2}`, {
      params:{
        apikey: apiKey,
        lang: 'ru_RU'
      }
    });

    // point position
    Vue.prototype.$methods = {
      async getDist(city){
        try {
          let cityPos = '',
              map = await axios.get(`${url1}`, {params:{
              geocode: city,
              apikey: apiKey,
              format: 'json'
            }
          });
          cityPos = map.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse();
          let result = []
          for(let item of cityPos) {
            result.push(Number(item))
          }
          return result;
        } catch(error) {
          if(!error.response) {
            throw error = {
              status: 200,
              message: 'no result'
            };
          } else {
            throw error.response.data.error;
          }
        }
      }

    }

    let fn = new Function(mapGlogal.data);
    fn()
  }
}

