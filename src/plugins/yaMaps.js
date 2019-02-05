import axios from 'axios'
import myMap from '../components/myMap'
export default {
  async install(Vue, opts) {
    let apiKey = '4720f041-472e-48bb-b35c-f29ae43f4651',
        city = 'Москва',
        url1 = `https://geocode-maps.yandex.ru/1.x/`,
        url2 = 'https://api-maps.yandex.ru/2.1/?apikey=4720f041-472e-48bb-b35c-f29ae43f4651&lang=ru_RU',
        url3 = 'https://api-maps.yandex.ru/services/route/2.0/';
    let mapGlogal = await axios.get(`${url2}`, {
      params:{
        apikey: apiKey,
        lang: 'ru_RU'
      }
    });

    // point position
    Vue.prototype.$error = '';
    Vue.prototype.$helpers = {
      async getDist(city){
          try{
            let cityPos = '';
            let map = await axios.get(`${url1}`, {params:{
                geocode: city,
                apikey: apiKey,
                format: 'json'
              }
            });
            cityPos = map.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            cityPos.reverse();
            let result = []
            for(let item of cityPos) {
              result.push(Number(item))
            }
            return result;

          }catch(e) {
            console.log('error: ',e);
            Vue.prototype.$error = e;
          }
        }
      }

    let fn = new Function(mapGlogal.data);
    fn()
  }
}

