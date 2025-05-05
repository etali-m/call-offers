<template>
  <div>
    <div class="toolbar">
      <button type="button" @click="toggle('bulletList')" :class="{ active: editor.isActive('bulletList') }">
        <ListIcon />
      </button>
      <button type="button" @click="toggle('orderedList')" :class="{ active: editor.isActive('orderedList') }">
        <ListOrderedIcon />
      </button>
      <button type="button" @click="toggle('bold')" :class="{ active: editor.isActive('bold') }">
        <BoldIcon />
      </button>
      <button type="button" @click="toggle('italic')" :class="{ active: editor.isActive('italic') }">
        <ItalicIcon />
      </button>
      <button type="button" @click="clearFormatting">
        <EraserIcon />
      </button>
    </div>
    <EditorContent :editor="editor" class="editor" />
  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { onBeforeUnmount, watch } from 'vue'

import { ListIcon, ListOrderedIcon, BoldIcon, ItalicIcon, EraserIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  content: props.modelValue || '',
  extensions: [StarterKit],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  }
})

const toggle = (action) => {
  editor.chain().focus()[`toggle${capitalize(action)}`]().run()
}
const clearFormatting = () => {
  editor.chain().focus().clearNodes().unsetAllMarks().run()
}
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

onBeforeUnmount(() => editor.destroy())

watch(() => props.modelValue, (value) => {
  if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value || '')
  }
})
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  background-color: #f5f5f5;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px 5px 0 0;
}

.toolbar button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.toolbar button:hover {
  background-color: #e0e0e0;
  border-radius: 5px;
}

.toolbar button.active svg {
  color: #007bff;
}

.editor {
  border: 1px solid #ddd;
  border-top: none;
  padding: 10px;
  min-height: 150px;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
}
</style>
