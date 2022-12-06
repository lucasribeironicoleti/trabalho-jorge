<template>
  <div class="container">
    <div class="d-flex justify-content-center">
    <h1>Listar Medicos</h1>
    </div>
    <table class="table table-bordered table-striped border-dark">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cidade</th>
          <th>Data Nascimento</th>
          <th>Sexo</th>
          <th>Especialização</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="b in people">
          <td>{{ b.peopleName }}</td>
          <td>{{ b.city }}</td>
          <td>{{ b.birth_date }}</td>
          <td>{{ b.gender }}</td>
          <td>{{ b.specialization.specializationType }}</td>
          <td>
            <router-link :to="{ name: 'people-edit', params: { id: b.id } }"
              ><button class="btn btn-primary">Editar</button></router-link
            >
          </td>
          <td>
            <button class="btn btn-danger" @click="destroy(b.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>  <p> página atual: {{page.number+1}}</p>
                      <p> total de páginas: {{page.totalgender}}</p>
                      <p> Quantidade de Medicos cadastrados: {{page.totalElements}}</p>
                    </td>

          <td colspan="7">
            <ul class="pagination">
              <li class="page-item disabled">
                <span class="page-link">Anterior</span>
              </li>
              <li class="page-item active">
                <span class="page-link">
                  1
                  <span class="sr-only">(atual)</span>
                </span>
              </li>
              <li class="page-item"><a class="page-link" to="#">2</a></li>
              <li class="page-item"><a class="page-link" to="#">3</a></li>
              <li class="page-item">
                <a class="page-link" to="#">Próximo</a>
              </li>
            </ul>
            <button class="btn btn-primary" @click="findAll(links.first.href)">
              Primeiro
            </button>
            <button class="btn btn-primary" @click="findAll(links.prev.href)">Anterior</button>
            <button class="btn btn-primary" @click="findAll(links.next.href)">
              Próximo
            </button>
            <button class="btn btn-primary" @click="findAll(links.last.href)">Ultimo</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import env from "/env.json";
import { onMounted, ref } from "vue";
import axios from "axios";

const apiURL = env.apiURL;

const peoples = ref([]);

const page = ref([]);
const links = ref([]);

const findAll = (linkc) => {
  let link = null;
  if (linkc == null) {
    link = "";
  } else {
    let linkq = linkc.split("?");
    link = "?" + linkq[1];
    console.log(link);
  }
  axios
    .get(apiURL + "/people/v1" + link)
    .then((response) => {
      console.log("Response: " + JSON.stringify(response.data));
      peoples.value = response.data._embedded.peopleModelV1List;
      links.value = response.data._links;
      page.value = response.data.page;
      console.log("Medicos Buscados" + peoples);
    })
    .catch((error) => {
      alert("Error: " + error.response.data);
    });
};

const destroy = (id) => {
  if (confirm("Deseja excluir o medico selecionado?")) {
    axios
      .delete(apiURL + "/people/v1/" + id)
      .then((response) => {
        if (response.status === 200 && response.data == "") {
          alert("Medico Excluído com sucesso!");
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
  console.log("data: " + peoples.value);
  console.log("Medico: " + peoples.value.PagedModel);
});
</script>