<template>
  <div class="todo-wrapper">
    <div class="title has-text-centered">
      My ToDo list
    </div>

    <form
    @submit.prevent="addToDo">
      <div class="field is-grouped mb-5">
        <div class="control is-expanded">
          <input v-model="newToDoContent" class="input" type="text" placeholder="Add ToDo">
        </div>
        <div class="control">
          <button :disabled="!newToDoContent" class="button is-info">
            Add
          </button>
        </div>
      </div>
    </form>

    <div 
      class="card mb-5"
      :class="{'has-background-success-light': todo.done}"
      :key="todo.id" 
      v-for="todo in todos">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column"
              :class="{'has-text-success line-through': todo.done}"
            >{{todo.content}}</div>
            <div class="column is-5 has-text-right">
              <button 
                @click="togglerDone(todo.id)"
                class="button is-light"
                :class="todo.done ? 'is-success' : 'is-light'"> &check; </button>
              <button 
                class="button is-danger ml-2"
                @click="deleteToDo(todo.id)"> &cross; </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup> //setup - для однофайловых компонентов
// imports
  import { ref } from 'vue'
  import { v4 as uuidv4 } from 'uuid'

// todos
  const todos = ref([])

// methods
  const addToDo =()=>{
    const newToDo = {
      id: uuidv4(),
      content: newToDoContent.value,
      done: false
    }
    
    todos.value.unshift(newToDo)
    newToDoContent.value = ""
  }
  const newToDoContent = ref("")
  const deleteToDo = id => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }
  const togglerDone = id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    todos.value[index].done = !todos.value[index].done
  }
</script>


<style>
@import "bulma/css/bulma.min.css";
.wrapper-todo {
  max-width: 400px;
  padding: 2px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>