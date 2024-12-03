// useTask.ts (自定义钩子)
import { ref } from 'vue';
import type{ Task } from "@/types/type";


const defaultTaskValues = {
  taskId:-1,
  taskName: '',
  star: 0,
  isFinish: 0,
  basketId:-1,
  remark: '',
  deadline: '',
  createTime: '',
  isDrain: 0,
};

// 用于处理 null 或 undefined 的字段
function handleNullValues<T>(data: T | T[], defaultValues: Partial<T>): T | T[] {
  // 如果是单个对象
  if (!Array.isArray(data)) {
    for (const key in defaultValues) {
      if (data[key] === null || data[key] === undefined) {
        if (defaultValues[key] !== undefined) {
          data[key] = defaultValues[key];
        }
      }
    }
    return data;
  }
  // 如果是数组
  else {
    return data.map(item => {
      for (const key in defaultValues) {
        if (item[key] === null || item[key] === undefined) {
          if (defaultValues[key] !== undefined) {
            item[key] = defaultValues[key];
          }
        }
      }
      return item;
    });
  }
}


// 定义钩子
export function resToTasks() {
  const tasks = ref<Task[]>([]);  // 用数组代替单个任务

  function setTasksData(returnTasks: Task[]) {
    // 使用 handleNullValues 函数处理空值
    tasks.value = handleNullValues(returnTasks, defaultTaskValues) as Task[];
  }

  return {
    tasks,
    setTasksData
  };
}

// 钩子函数的使用方法：
//import { useTask } from './useTask';  // 导入自定义钩子
// const { task, setTaskData } = useTask();
