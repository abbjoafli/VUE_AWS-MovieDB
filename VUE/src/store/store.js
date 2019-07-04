import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";
Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0,
  loadingStatus:"not loading",
  Movies: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    Loading_Status (state,Status) {
        state.loadingStatus = Status;
      },
  Get_Movies (state,Movies) {
    state.Movies = Movies;
    // Vue.set(state.Movies, prop, Movies)
    // Vue.set(state.Movies,state.Movies,Movies)
  },
  Set_Movies (state,NewMovie) {
    let allmovies= state.Movies;
    allmovies.push(NewMovie);
    state.Movies = allmovies;
  },
  Update_Likes (state,updatedata) {
      //Plockar ut indexet så vi vet vart i listan denna film är
      let index= updatedata.index;
      //Tar ut labelen, Det finns bara en det vet vi så vi tar plats [0]
      let Label= updatedata.updateLabels[0];
    let Movie= state.Movies[index];
    //Uppdaterar Filmens "Label" dvs Likes om vi skickar in likes o Dislikes annars.
    Movie[Label]=updatedata.updateValues[0];
    //Lägger tillbaka movies
    state.Movies[index]= Movie;
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
    GetMovies: ({ commit }) => {
        let data= "";
          axios.get('https://g8aqa0611j.execute-api.us-east-1.amazonaws.com/Beta/movies')
      .then(function (response) {        // handle success
        console.log(response);
         data= response.data.Items;
        console.log(data);
        commit('Get_Movies',data);
      })
      .catch(function (error) {        // handle error
        console.log(error);
        return "Något gick fel";
      })
      .finally(function () {      // always executed
        
      });
      return "Filmer hämtade";
      },
      SetMovies: ({ commit },NewMovie) => {
        axios.post('https://g8aqa0611j.execute-api.us-east-1.amazonaws.com/Beta/movies', NewMovie)
          .then(function (response) {
            console.log(response);
            commit('Set_Movies',NewMovie)
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      UpdateLikes: ({ commit },updatedata) => {
    
        commit('Update_Likes',updatedata);
        axios.put('https://g8aqa0611j.execute-api.us-east-1.amazonaws.com/Beta/movies', updatedata)
          .then(function (response) {
            console.log(response);
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

}

// getters are functions
const getters = {
   movies: state => state.Movies,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})