<template>
  <div class="d-flex justify-content-center">
  <h1>Cadastrar Medico</h1>
</div>
  <div class="form-group">
    <p>Nome do Medico:</p>
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
      <p>Cidade:</p>
      <input
        class="form-control"
        type="text"
        name="city"
        id="city"
        v-model="people.city"
      />
    </div>

    <div class="form-group col-md-6">
      <p>Data de Nascimento:</p>
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
    <div class="form-group col-md-6">
      <p>Sexo:</p>
      <input
        class="form-control"
        type="text"
        name="gender"
        id="gender"
        v-model="people.gender"
      />
    </div>

    <div class="form-group col-md-6">
      <p>Especialização:</p>
      <select class="form-control" v-model="people.specialization">
        <option disabled value="">Escolha a Especialização</option>
        <option v-for="p in specialization" :value="p" :key="p.id">
          {{ p.specializationType }}
        </option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="form-group">
    <br>
      <button class="btn btn-success" @click="save()">Salvar</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import env from "/env.json";
const apiURL = env.apiURL;

const people = reactive({
  id: null,
  peopleName: "",
  city: "",
  birth_date: "",
  gender: "",
  specialization: "",
  //aqui falta passar
});

const specializations = ref([]);

const findAll = () => {
  axios
    .get(apiURL + "/specialization")
    .then((response) => {
      console.log("Response: " + JSON.stringify(response.data));
      specializations.value = response.data;
    })
    .catch((error) => {
      alert("Error: " + error.response.data);
    });
};

const save = () => {
  console.log(people);
  axios
    .post(apiURL + "/people/v1/", people)
    .then(() => {
      alert("Dados cadastrados com sucesso!");
    })
    .catch((error) => {
      alert("Erro: " + error.response.data);
    });
};

onMounted(() => {
  //console.log("URL: " + url)
  findAll();
  console.log("data: " + specializations.value);
});
</script>