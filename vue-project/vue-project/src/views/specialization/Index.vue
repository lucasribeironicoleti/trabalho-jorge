<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <h1>Listar Especialização</h1>
    </div>
    <table class="table table-bordered table-striped border-dark">
      <thead>
        <tr>
          <th>Especialização</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="p in specializations">
          <td>{{ p.name }}</td>
          <td>
            <router-link :to="{ name: 'specialization-edit', params: { id: p.id } }"
              ><button class="btn btn-primary">Editar</button></router-link
            >
          </td>
          <td>
            <button class="btn btn-danger" @click="destroy(p.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import env from "/env.json";
import { onMounted, ref } from "vue";
import axios from "axios";

const apiURL = env.apiURL;

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

const destroy = (id) => {
  if (confirm("Deseja excluir a especialização selecionada?")) {
    axios
      .delete(apiURL + "/specialization/" + id)
      .then((response) => {
        if (response.status === 200 && response.data == "") {
          alert("Especialização Excluída com sucesso!");
          findAll();
        }
      })
      .catch((error) => {
        alert("Erro: " + error.response.status);
      });
  }
};

onMounted(() => {
  //console.log("URL: " + url)
  findAll();
  console.log("data: " + specializations.value);
});
</script>