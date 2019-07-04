<template>
 
<v-layout justify-center>
  <form>
    <v-text-field
      v-model="name"
      error-messages="Du måste ha ett namn."
      label="Namn"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
      v-model="description"
      error-messages="Du måste ha en beskrivning."
      label="Beskrivning"
      data-vv-name="beskrivning"
      required
    ></v-text-field>
    <v-text-field
      v-model="image"
      error-messages="Du måste ha en Bild."
      label="Bild"
      data-vv-name="bild"
      required
    ></v-text-field>
 <v-combobox
    v-model="select"
    :items="items"
    :search-input.sync="search"
    hide-selected
    hint="Max 5 Kategorier"
    label="Lägg till kategorier"
    multiple
    persistent-hint
    small-chips
  >
  <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
           Inga matchande resultat "<strong>{{ search }}</strong>". Tryck <kbd>enter</kbd> för att skapa ny kategori
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
  <h3>Imdb rating</h3>
      <v-flex xs12>
         <v-slider
          v-model="slider"
          min="0" 
          max="100"
          :label="(slider/10).toString()"
        ></v-slider>
      </v-flex>
    <v-flex xs12>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Släppdatumsväljare"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Stäng</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-btn @click="AddNewMovie">Lägg till</v-btn>
  </form>
  </v-layout>

</template>

<script>

const axios = require('axios');
export default {
  name: 'AddMovie',
  props: {
    msg: String
  },
  data() {
    return {
     name: '',
     date: '',
     menu:false,
     image:'',
     search:'',
     slider: 45,
      description: '',
      select: null,
      items: [
        'Fantasy',
        'Family',
        'Sci-Fi',
        'Action',
        'Horror',
        'Mystery',
        'Thriller',

      ],
     
    }
  },
  methods: {
    AddNewMovie(){
        let Newmovie= {
              Name: this.name,
                Types: this.select,
            Image: this.image,
            IMDB_rating: this.slider/10,
            Description: this.description,
            Releasedate: this.date,
          };
        this.$store.dispatch("SetMovies",Newmovie).then(res => {
      console.log(res);
    });
    },
      async fetch () {
     var self = this;
     //const { data} = await axios.get('https://5ctdnqzvzf.execute-api.us-east-1.amazonaws.com/prod/entries');
      const { data} = await PostsRepository.get();
      console.log(data);
      self.Messagedata = data.Items;
    },
        Getdata(){
    let data= "";
     var self = this;
    //  axios.get('https://5ctdnqzvzf.execute-api.us-east-1.amazonaws.com/prod/entries')
      PostsRepository.get()
  .then(function (response) {
    // handle success
    console.log(response);
     data= response.data.Items;
    console.log(data);
    console.log(self.Messagedata);
    self.Messagedata= data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed

  });
  },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
