<template>
  <aside :class="{ 'sidebar-open': true }" class="sidebar">
    <!-- 头部 -->
    <header class="sidebar-header">
      <div class="close" @click="$emit('close')">
        <img src="@/assets/close.svg" alt="关闭" class="close-img" />
      </div>
      <div class="sidebar-tag">
        <div class="sidebar-tag-text-wrap">
          <span v-for="(tag, index) in task.tags" :key="index" class="tag">
            #{{ tag }}
          </span>
        </div>
        <div class="sidebar-tag-more">&gt;</div>
      </div>
    </header>

    <!-- 主体内容 -->
    <div class="sidebar-main-content">
      <div class="detail-wrap">
        <Tick
          v-model:checked="task.finish"
          icon-name="checkmark-done"
          @update:checked="handleTaskChange"
        />
        <input class="task-input" v-model="task.taskName" placeholder="任务名称" />
        <Star v-model:starred="task.isStarred" star-color="#efe299" :size="'1.5rem'" />
      </div>

      <!-- 可编辑备注 -->
      <div
        class="remarks-div"
        contenteditable="true"
        :data-placeholder="placeholderText"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        ref="editableDiv"
      >
        {{ task.remark }}
      </div>

      <!-- 附件 -->
      <div class="attachment" @click="addAttachment">
        <ion-icon name="attach-outline" class="attachment-icon"></ion-icon>
        添加附件
      </div>
    </div>

          <!-- 提醒插槽，由DDL的组件定义 -->
          <slot name="ddl" ></slot>

          <!-- 附件 -->
            <div class="detail-wrap shine add-action" >
                <ion-icon name="attach-outline" class="detail-icon"></ion-icon>
                <p class="detail-text" @click="addAttachment">添加附件</p>
              </div>

              <!-- 备注 -->
               <!-- <div class="detail-wrap remarks-wrap">
                 <div class="div-edit remarks-div shine" contenteditable="true" @input="onInput" style="display: line-block; width: 100%; min-height: 100px;"></div>
               </div> -->
               <div class="div-edit remarks-div shine" contenteditable="true"
                  :data-placeholder="placeholderText"
                  @input="onInput"
                  @focus="onFocus"
                  @blur="onBlur"
                  ref="editableDiv"
               >{{ task.remark }}</div>
          </div>

          <!-- 底部 -->
        <footer class="sidebar-footer">
          <div class="sidebar-tag">
            <span class="add-tag">#</span>
            <input type="text" placeholder="添加标签" class="shine tag-input" v-model="tagValue" @keydown.enter="addTag">
          </div>
          <div class="sidebar-create">创建于2024年11月1日</div>
        </footer>
    </aside>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Tick from "@/components/Tick.vue";
import Star from "@/components/Star.vue";

const task = ref({
  taskName: "默认任务名称",
  isStarred: false,
  finish: false,
  remark: "",
  tags: [],
  createdAt: "2024年11月1日",
});

const newTag = ref("");
const placeholderText = "请输入备注内容...";
const editableDiv = ref<HTMLDivElement | null>(null);

// 添加标签
function addTag() {
  if (newTag.value.trim()) {
    task.value.tags.push(newTag.value.trim());
    newTag.value = "";
  }
}

// 编辑框占位符逻辑
function onInput() {
  const div = editableDiv.value;
  if (div) {
    div.classList.toggle("placeholder", div.innerHTML.trim() === "");
  }
}
function onFocus() {
  editableDiv.value?.classList.remove("placeholder");
}
function onBlur() {
  if (editableDiv.value?.innerHTML.trim() === "") {
    editableDiv.value.classList.add("placeholder");
  }
}

// 添加附件逻辑
function addAttachment() {
  console.log("添加附件");
}

// 监听任务完成状态
function handleTaskChange(checked: boolean) {
  task.value.finish = checked;
  console.log("任务完成状态更新:", checked);
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 0;
  height: 96vh;
  overflow: hidden;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-open {
    width: 350px;
  }
}
.sidebar-header,
.sidebar-footer {
  width: 100%;
}
.task-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 1.2rem;
}
.remarks-div {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  margin: 10px 0;
}
.placeholder:empty::before {
  content: attr(data-placeholder);
  color: #aaa;
}
</style>
