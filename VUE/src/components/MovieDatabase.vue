<template>
 
<v-layout justify-center>
    <div class="text-xs-center" v-if="Movies !== null">
    
    <v-flex xs12 >
              <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
        <v-flex xs4  v-for="(item, index) in Movies" :key="item.Name">
      <v-card height="450" class="flexcard"  > 
        <v-img
          :src="item.Image"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div> 
           <v-badge left>
      <template v-slot:badge>
        <span>{{item.IMDB_rating}}</span>
      </template>
            <h1 >{{item.Name}}</h1>
    </v-badge>

           
          </div>
        </v-card-title>
<v-card-text class="grow">
 <div> {{ item.Description }} </div>
  </v-card-text>

        <v-card-actions>
          <v-badge color="amber">
      <template v-slot:badge>
        <span>{{item.Likes}}</span>
      </template>
          <v-btn flat 
          @click="UpdateLikes(item.Name,index,'Likes',item.Likes)" color=primary><v-icon>thumb_up_alt</v-icon></v-btn>
    </v-badge>
              <v-badge color="amber">
      <template v-slot:badge>
        <span>{{item.Dislikes}}</span>
      </template>        <v-btn 
       @click="UpdateLikes(item.Name,index,'Dislikes',item.Dislikes)" flat color=secondary> <v-icon>thumb_down_alt</v-icon></v-btn>
    </v-badge>
  
        </v-card-actions>
      </v-card>
      </v-flex> 
        </v-layout> 
    </v-container>

    </v-flex>
  </div>
  </v-layout>

</template>

<script>

const axios = require('axios');
export default {
  name: 'MovieDatabase',
  props: {
    msg: String
  },
  data() {
    return {
      loading:true,
      Messagedata: "Hej"
    }
  },
    computed: {
    Movies() {
      let movies= this.$store.getters.movies;
      console.log( this.$store.getters.movies);
      return movies;
    }
  },
  created() {
    this.$store.dispatch("GetMovies");
  },
  methods: {
    UpdateLikes(Name,index,changeLabel,changeValue){
        let updatedata= {
              Name: Name,
              index:index,
              updateLabels: [changeLabel],
              updateValues: [changeValue+1]
          }
        this.$store.dispatch("UpdateLikes",updatedata).then(res => {
      console.log(res);
    });
    },
      async fetch () {
     var self = this;
     const { data} = await axios.get('https://5ctdnqzvzf.execute-api.us-east-1.amazonaws.com/prod/entries');
      console.log(data);
      self.Messagedata = data.Items;
    },
        Getdata(){
    let data= "";
     var self = this;
 axios.get('https://5ctdnqzvzf.execute-api.us-east-1.amazonaws.com/prod/entries')
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
  text-align:center;
}
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
