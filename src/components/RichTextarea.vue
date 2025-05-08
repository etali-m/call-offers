<template>
  <div>
    <div class="toolbar">
      <!-- Boutons existants -->
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
      <button type="button" @click="toggleTable">
        Tableau
      </button>

      <div v-if="showTable" class="toolbar">
         <!-- Boutons de tableau -->
        <button type="button" @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
          Insert table
        </button>
        <button type="button" @click="editor.chain().focus().insertContent(tableHTML, { parseOptions: { preserveWhitespace: false }}).run()">
          Insert HTML table
        </button>
        <button type="button" @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
          Add column before
        </button>
        <button type="button" @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
          Add column after
        </button>
        <button type="button" @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
          Delete column
        </button>
        <button type="button" @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
          Add row before
        </button>
        <button type="button" @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
          Add row after
        </button>
        <button type="button" @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
          Delete row
        </button>
        <button type="button" @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
          Delete table
        </button>
        <button type="button" @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
          Merge cells
        </button>
        <button type="button" @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
          Split cell
        </button>
        <button type="button" @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
          Toggle header column
        </button>
        <button type="button" @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
          Toggle header row
        </button>
        <button type="button" @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
          Toggle header cell
        </button>
        <button type="button" @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
          Merge or split
        </button>
        <button type="button" @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" 
          :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
          Set cell attribute
        </button>
        <button type="button" @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
          Fix tables
        </button>
        <button type="button" @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">
          Go to next cell
        </button>
        <button type="button" @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">
          Go to previous cell
        </button>
      </div>

    </div>
    <EditorContent
      :editor="editor"
      class="editor"
      :style="{ maxHeight: height, overflowY: 'auto' }"
    />

  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { onBeforeUnmount, watch, ref } from 'vue'
import { ListIcon, ListOrderedIcon, BoldIcon, ItalicIcon, EraserIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: String,
  height: {
    type: String,
    default: '600px', // hauteur par défaut
  }
})

const showTable = ref(false)

const toggleTable = () => {
  showTable.value = !showTable.value;
}

const emit = defineEmits(['update:modelValue'])

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

const tableHTML = `
<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>80</td>
  </tr>
</table>`

const editor = new Editor({
  content: props.modelValue || '',
  extensions: [
    StarterKit,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
  ],
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
  flex-wrap: wrap;
}

.toolbar button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  border-radius: 5px;
}

.toolbar button:hover {
  background-color: #e0e0e0;
}

.toolbar button.active svg {
  color: #007bff;
}

.toolbar button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
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

<style>
/* Styles pour les tableaux */
.tiptap table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.tiptap td,
.tiptap th {
  border: 1px solid #ced4da;
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.tiptap th {
  background-color: #f1f3f5;
  font-weight: bold;
  text-align: left;
}

.tiptap .selectedCell:after {
  background: rgba(200, 200, 255, 0.4);
  content: "";
  left: 0; right: 0; top: 0; bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.tiptap .column-resize-handle {
  background-color: #adf;
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
}

.tiptap .tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.tiptap.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>