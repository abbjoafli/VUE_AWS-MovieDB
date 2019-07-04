import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'


import store from './store/store'
// // const apiGateway = require('aws-api-gateway-client').default;
// const axios = require('axios');
// // Configuration
// const config = {
//     // Server port
//     port: 3000,
//     // AWS API Gateway stage
//     apiStage: 'iot',
//     // AWS API Gateway Key
//     apiKey: 'K3Lk2ZcD1h58HXedKnAbk8ZzScmsmCR4aEI9h6zw',
//     // Logging to console
//     enableDebugLog: false,
//     enableInfoLog: false,
//     enableErrorLog: true,
// };

// // Create web app
// if(config.enableDebugLog) {
//     console.debug("Initializing express");
// }
// // Create API Gateway client
// if(config.enableDebugLog) {
//     console.debug("Creating AWS API Gateway client");
// }
// const apiClient = apiGateway.newClient({
//     invokeUrl: 'https://agafh7et1a.execute-api.us-east-1.amazonaws.com',
//     apiKey: config.apiKey,
//     region: 'us-east-1'
// })

// Vue.config.productionTip = false



// axios.get('/', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });  

new Vue({
  render: h => h(App),
  
  store,
}).$mount('#app')
