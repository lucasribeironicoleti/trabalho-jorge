<template>
  <div class="d-flex justify-content-center">
    <h1>Editar Medico</h1>
  </div>
  <div class="form-group ">
    Nome do Medico:
    <input
      class="form-control"
      type="text"
      name="peopleName"
      id="peopleName"
      v-model="people.peopleName"
    />
  </div>

  <div class="row">
    <div class="form-group col-md-6">
      Cidade:
      <input
        class="form-control"
        type="text"
        name="city"
        id="city"
        v-model="people.city"
      />
    </div>

    <div class="form-group col-md-6">
      Data de Nascimento:
      <input
        class="form-control"
        type="date"
        name="birth_date"
        id="birth_date"
        v-model="people.birth_date"
      />
    </div>
  </div>

  <div class="row">
    <div class="form-group col-md-6 ">
      Sexo:
      <input
        class="form-control"
        type="text"
        name="gender"
        id="gender"
        v-model="people.gender"
      />
    </div>
    <div class="form-group col-md-6">
      <select class="form-control" v-model="people.specialization">
        <option selected :value="people.specialization">{{ people.specialization.specializationType }}</option>
        <option
          v-for="p in specializations"
          :value="p"
          :key="p.id"
          v-show="people.specialization.id != p.id"
        >
          {{ p.specializationType }}
        </option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="form-group">
      <button class="btn btn-success" @click="update">Alterar</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import env from "/env.json";
import { useRoute } from "vue-router";
import axios from "axios";

const apiURL = env.apiURL;

const route = useRoute();

const people = ref({
  id: null,
  peopleName: "",
  city: "",
  birth_date: "",
  gender: "",
  specialization: "",
  //falta referenciar aqui
});

const specializations = ref([]);

const findAll = () => {
  axios
    .get(apiURL + "/specialization")
    .then((response) => {
      //console.log("Response: " + JSON.stringify(response.data));
      specializations.value = response.data;
    })
    .catch((error) => {
      alert("Error: " + error.response.status);
    });
};

const load = () => {
  let id = route.params.id;
  axios
    .get(apiURL + "/people/v1/" + id)
    .then((response) => {
      people.value.id = response.data.id;
      people.value.peopleName = response.data.peopleName;
      people.value.city = response.data.city;
      people.value.birth_date = response.data.birth_date;

      // let data = new Date(people.value.birth_date);
      // people.value.birth_date = "" + data.getFullYear() + "-" + data.getDate() + "-" + data.getDay();

      // console.log(people.value.birth_date);

      people.value.gender = response.data.gender;
      people.value.specialization = response.data.specialization;
      console.log(response.data.specialization);

      console.log(people.value);
    })
    .catch((error) => {
      alert("Erro: " + error.response.status);
    });
};

const update = () => {
  axios
    .put(apiURL + "/people/v1", people.value)
    .then((response) => {
      if (response.data != "") {
        alert("Dados atualizados com sucesso!");
        load();
      }
    })
    .catch((error) => {
      alert("Erro: " + error.response.status);
    });
};

onMounted(() => {
  findAll();
  load();
});
</script>