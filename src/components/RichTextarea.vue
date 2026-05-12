<template>
  <div class="rte-wrapper">
    <!-- Toolbar principale -->
    <div class="toolbar" @mousedown.prevent>
      <div class="toolbar-group">
        <button
          v-for="level in [1, 2, 3]"
          :key="level"
          type="button"
          class="toolbar-btn"
          :class="{ active: editor.isActive('heading', { level }) }"
          :title="`Titre ${level}`"
          @click="toggleBlock('heading', { level })"
        >
          H{{ level }}
        </button>
      </div>

      <div class="toolbar-divider" />

      <div class="toolbar-group">
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('bold') }" title="Gras" @click="toggle('bold')">
          <BoldIcon :size="16" />
        </button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('italic') }" title="Italique" @click="toggle('italic')">
          <ItalicIcon :size="16" />
        </button>
      </div>

      <div class="toolbar-divider" />

      <!-- Alignement -->
      <div class="toolbar-group">
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive({ textAlign: 'left' }) }" title="Aligner à gauche" @click="setAlign('left')">
          <AlignLeftIcon :size="16" />
        </button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive({ textAlign: 'center' }) }" title="Centrer" @click="setAlign('center')">
          <AlignCenterIcon :size="16" />
        </button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive({ textAlign: 'right' }) }" title="Aligner à droite" @click="setAlign('right')">
          <AlignRightIcon :size="16" />
        </button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive({ textAlign: 'justify' }) }" title="Justifier" @click="setAlign('justify')">
          <AlignJustifyIcon :size="16" />
        </button>
      </div>

      <div class="toolbar-divider" />

      <div class="toolbar-group">
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('bulletList') }" title="Liste à puces" @click="toggle('bulletList')">
          <ListIcon :size="16" />
        </button>
        <button type="button" class="toolbar-btn" :class="{ active: editor.isActive('orderedList') }" title="Liste numérotée" @click="toggle('orderedList')">
          <ListOrderedIcon :size="16" />
        </button>
      </div>

      <div class="toolbar-divider" />

      <div class="toolbar-group">
        <button type="button" class="toolbar-btn" title="Effacer la mise en forme" @click="clearFormatting">
          <EraserIcon :size="16" />
        </button>
        <button
          type="button"
          class="toolbar-btn"
          :class="{ active: showTable }"
          title="Options tableau"
          @click="toggleTable"
        >
          <TableIcon :size="16" />
        </button>
      </div>
    </div>

    <!-- Toolbar tableau (secondaire, conditionnelle) -->
    <transition name="slide-down">
      <div v-if="showTable" class="toolbar toolbar-table" @mousedown.prevent>
        <div class="toolbar-group">
          <button type="button" class="toolbar-btn text-btn" @click="insertTable">
            <PlusIcon :size="14" /> Insérer tableau
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().addColumnBefore()" title="Colonne avant" @click="editor.chain().focus().addColumnBefore().run()">
            <ChevronLeftIcon :size="14" /> Col avant
          </button>
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().addColumnAfter()" title="Colonne après" @click="editor.chain().focus().addColumnAfter().run()">
            Col après <ChevronRightIcon :size="14" />
          </button>
          <button type="button" class="toolbar-btn danger" :disabled="!editor.can().deleteColumn()" title="Supprimer colonne" @click="editor.chain().focus().deleteColumn().run()">
            <MinusIcon :size="14" /> Col
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().addRowBefore()" @click="editor.chain().focus().addRowBefore().run()">
            <ChevronUpIcon :size="14" /> Ligne avant
          </button>
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().addRowAfter()" @click="editor.chain().focus().addRowAfter().run()">
            Ligne après <ChevronDownIcon :size="14" />
          </button>
          <button type="button" class="toolbar-btn danger" :disabled="!editor.can().deleteRow()" @click="editor.chain().focus().deleteRow().run()">
            <MinusIcon :size="14" /> Ligne
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().mergeCells()" @click="editor.chain().focus().mergeCells().run()">
            <MergeIcon :size="14" /> Fusionner
          </button>
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().splitCell()" @click="editor.chain().focus().splitCell().run()">
            <SplitIcon :size="14" /> Diviser
          </button>
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().toggleHeaderRow()" @click="editor.chain().focus().toggleHeaderRow().run()">
            En-tête ligne
          </button>
          <button type="button" class="toolbar-btn icon-label" :disabled="!editor.can().toggleHeaderColumn()" @click="editor.chain().focus().toggleHeaderColumn().run()">
            En-tête col
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn danger" :disabled="!isInsideTable" title="Supprimer le tableau" @click="deleteTable">
            <Trash2Icon :size="14" /> Supprimer tableau
          </button>
        </div>
      </div>
    </transition>

    <!-- Zone d'édition -->
    <EditorContent
      :editor="editor"
      class="editor editor-field"
      :style="{ maxHeight: height, overflowY: 'auto' }"
    />
  </div>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { onBeforeUnmount, watch, ref, computed } from 'vue'
import {
  ListIcon, ListOrderedIcon, BoldIcon, ItalicIcon, EraserIcon,
  AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon,
  TableIcon, PlusIcon, MinusIcon,
  ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon,
  Trash2Icon, MergeIcon, SplitIcon,
} from 'lucide-vue-next'

const props = defineProps({
  modelValue: String,
  height: {
    type: String,
    default: '600px',
  },
})

const emit = defineEmits(['update:modelValue'])

const showTable = ref(false)
const toggleTable = () => { showTable.value = !showTable.value }

// Vérifie si le curseur est bien à l'intérieur d'un tableau
const isInsideTable = computed(() => editor.isActive('table'))

// Extension TableCell personnalisée avec backgroundColor
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => ({
          'data-background-color': attributes.backgroundColor,
          style: `background-color: ${attributes.backgroundColor}`,
        }),
      },
    }
  },
})

const editor = new Editor({
  content: props.modelValue || '',
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    CustomTableCell,
  ],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
})

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const toggle = (action) => {
  editor.chain().focus()[`toggle${capitalize(action)}`]().run()
}

const toggleBlock = (type, options = {}) => {
  const isActive = editor.isActive(type, options)
  if (isActive) {
    editor.chain().focus().setParagraph().run()
  } else {
    editor.chain().focus()[`toggle${capitalize(type)}`](options).run()
  }
}

const setAlign = (alignment) => {
  editor.chain().focus().setTextAlign(alignment).run()
}

const clearFormatting = () => {
  editor.chain().focus().clearNodes().unsetAllMarks().run()
}

// Insertion du tableau : on s'assure que le focus est bien actif avant
const insertTable = () => {
  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

// Suppression du tableau : focus d'abord, puis on vérifie la capacité
const deleteTable = () => {
  if (!editor.isFocused) {
    editor.commands.focus()
  }
  if (editor.can().deleteTable()) {
    editor.chain().focus().deleteTable().run()
  }
}

onBeforeUnmount(() => editor.destroy())

watch(() => props.modelValue, (value) => {
  if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value || '')
  }
})
</script>

<style scoped>
/* ─── Wrapper ─────────────────────────────────────────────── */
.rte-wrapper {
  font-family: 'Segoe UI', system-ui, sans-serif;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  background: #fff;
}

/* ─── Toolbar ─────────────────────────────────────────────── */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 8px 10px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.toolbar-table {
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-divider {
  width: 1px;
  height: 22px;
  background: #d1d5db;
  margin: 0 4px;
  flex-shrink: 0;
}

/* ─── Boutons ─────────────────────────────────────────────── */
.toolbar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 8px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #374151;
  font-size: 0.78rem;
  font-weight: 600;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;
  line-height: 1;
}

.toolbar-btn:hover:not(:disabled) {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

.toolbar-btn.active {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1d4ed8;
}

.toolbar-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.toolbar-btn.danger:not(:disabled):hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #b91c1c;
}

.toolbar-btn.text-btn {
  padding: 5px 10px;
}

/* ─── Animation toolbar tableau ──────────────────────────── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.2s ease, opacity 0.2s ease;
  max-height: 200px;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

/* ─── Zone d'édition ──────────────────────────────────────── */
.editor {
  padding: 14px 16px;
  min-height: 150px;
  background: #fff;
  color: #1e293b;
  font-size: 0.95rem;
  line-height: 1.65;
}

.editor-field::v-deep(.ProseMirror) {
  outline: none;
}

/* Headings */
.editor-field::v-deep(h1),
.editor-field::v-deep(h2),
.editor-field::v-deep(h3) {
  line-height: 1.2;
  font-weight: 700;
  color: #0f172a;
  text-wrap: pretty;
}
.editor-field::v-deep(h1) { font-size: 1.5rem; margin: 2rem 0 0.75rem; }
.editor-field::v-deep(h2) { font-size: 1.25rem; margin: 1.75rem 0 0.6rem; }
.editor-field::v-deep(h3) { font-size: 1.1rem; margin: 1.5rem 0 0.5rem; }

.editor-field::v-deep(p) { margin: 0.4em 0; }

/* Listes */
.editor-field::v-deep(ul),
.editor-field::v-deep(ol) {
  padding-left: 1.4rem;
  margin: 0.5rem 0;
}
</style>

<style>
/* ─── Tableau ProseMirror (non-scoped) ────────────────────── */
.tiptap table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 1.25rem 0;
  overflow: hidden;
  border-radius: 6px;
}

.tiptap td,
.tiptap th {
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  min-width: 1em;
  padding: 8px 10px;
  position: relative;
  vertical-align: top;
  font-size: 0.9rem;
}

.tiptap th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #1e293b;
  text-align: left;
}

.tiptap .selectedCell::after {
  background: rgba(59, 130, 246, 0.12);
  content: "";
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.tiptap .column-resize-handle {
  background-color: #93c5fd;
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 3px;
}

.tiptap .tableWrapper {
  overflow-x: auto;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.tiptap.resize-cursor {
  cursor: col-resize;
}
</style>