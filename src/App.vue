<template>
  <transition appear
  @before-enter="onStartLogoAnim"
  @enter="enterLogoAnim">
    <div class="todo-wrapper">
    <div class="title has-text-centered"> My ToDo list </div>

    <form @submit.prevent="addToDo">
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
      <transition appear
      @before-enter="onStartCardAnim"
      @enter="enterCardAnim">
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
      </transition>
    </div>

  </div>
  </transition>
</template>

<script setup> //setup - для однофайловых компонентов
// imports
  import { ref, onMounted } from 'vue'
  // import { v4 as uuidv4 } from 'uuid'
  import { db } from '@/firebase'
  import { 
    /** General */ collection, doc, 
    /** CRUD */ addDoc, updateDoc, deleteDoc, onSnapshot,  
    /** Data */ query, orderBy, limit 
  } from "firebase/firestore"
  import gsap from "gsap"



// fb refs
  const todosCollectionRef = collection(db, "todos")
  const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc')/*, limit(5)*/)
// todos
  const todos = ref([])
  const newToDoContent = ref("")



/*GET todos from db */ onMounted(() => { //для первого случая добавить async
    // todo вариант без обновлений realtime
    // const querySnapshot = await getDocs(collection(db, "todos"));
    // let dbTodos = []
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   const todo = {
    //     id: doc.id,
    //     content: doc.data().content,
    //     done: doc.data().done
    //   }
    //   dbTodos.push(todo)
    // });
    // todos.value = dbTodos
    // todo вариант с realtime обновлениями
    onSnapshot(todosCollectionQuery, (querySnapshot) => {
      const dbTodos = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done
        }
        dbTodos.push(todo)  
      });
      todos.value = dbTodos
    });
  })



// methods
  const addToDo = () => {
    // todo вариант без fb
    // const newToDo = {
    //   id: uuidv4(),
    //   content: newToDoContent.value,
    //   done: false
    // }
    // todos.value.unshift(newToDo)
    // todo вариант с fb
    addDoc(todosCollectionRef, {
      content: newToDoContent.value,
      done: false,
      date: Date.now()
    });

    newToDoContent.value = ""
  }
  const deleteToDo = id => {
    // todos.value = todos.value.filter(todo => todo.id !== id)
    deleteDoc(doc(todosCollectionRef, id))
  }
  const togglerDone = id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    // todos.value[index].done = !todos.value[index].done
    updateDoc(doc(todosCollectionRef, id), {
      done: !todos.value[index].done
    })
  }



// animations
  const onStartLogoAnim = (el) => {
    el.style.transform = 'translateY(-60px)'
    el.style.opacity = 0
  }
  const enterLogoAnim = (el) => {
    gsap.to(el, {
      duration: 1,
      y: 0,
      opacity: 1,
    })
  }
  const onStartCardAnim = (el) => {
    el.style.transform = 'translateX(120px)'
    el.style.opacity = 0
  }
  const enterCardAnim = (el) => {
    gsap.to(el, {
      duration: 1,
      x: 0,
      opacity: 1,
    })
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