import { defineStore } from "pinia";
import { getAllTaskByListId } from "@/api/task";

export const useTaskSotre = defineStore('task', {
  state: () => ({
    currentListId:0,

  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchAllTaskByListId() {
      const res=await getAllTaskByListId(this.currentListId)
    },
  },
})

export const useTskSotre = defineStore('task',{
  state:()=>({
    tasks:[],

  }),
  getters:{},
  actions:{
    addTask(newTask) {
      this.tasks.push(newTask)
    }

  },
},{persist:true})
