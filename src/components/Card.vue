<template>
<li class="doc-row">
  <div class="doc-row-left">
    <div class="doc-icon">
      <i class="bi bi-file-earmark-text"></i>
    </div>
    <span class="doc-number">{{ numero }}.</span>
    <p class="doc-title mb-0">{{ titre }}</p>
  </div>

  <div class="doc-row-right">
    <span v-if="statut" class="doc-status doc-status-done" title="Pièce remplie">
      <i class="bi bi-check-circle-fill"></i>
      Complété
    </span>
    <span v-else class="doc-status doc-status-pending" title="Pièce à compléter">
      <i class="bi bi-circle"></i>
      À compléter
    </span>

    <router-link :to="lien" class="doc-edit-btn">
      <i class="bi bi-pencil-square"></i>
      Éditer
    </router-link>
  </div>
</li>
</template>

<script>
export default {
    props: ['titre', 'numero', 'lien', 'statut'],
}
</script>

<style scoped>
.doc-row {
    --ink:            #241505;
    --ink-soft:       #6b5847;
    --orange-50:      #FFF4EC;
    --orange-100:     #FFE4D1;
    --orange-500:     #FF6A1A;
    --orange-600:     #F0560A;
    --orange-700:     #C4460A;
    --white:          #FFFFFF;
    --line:           rgba(36, 21, 5, 0.08);
    --success-bg:     #EFFBF1;
    --success-text:   #1E7B34;

    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 18px;
    margin-bottom: 10px;
    background: var(--white);
    border: 1px solid var(--line);
    border-left: 3px solid var(--orange-500);
    border-radius: 12px;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.doc-row:hover {
    border-color: var(--orange-100);
    border-left-color: var(--orange-500);
    box-shadow: 0 10px 22px -16px rgba(36, 21, 5, 0.3);
}
.doc-row:last-child {
    margin-bottom: 0;
}

.doc-row-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.doc-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--orange-50);
    color: var(--orange-600);
    font-size: 17px;
}

.doc-number {
    flex-shrink: 0;
    font-weight: 700;
    color: var(--orange-700);
    font-size: 14px;
}

.doc-title {
    font-size: 16px;
    color: var(--ink);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.doc-row-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.doc-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 999px;
    white-space: nowrap;
}
.doc-status-done {
    background: var(--success-bg);
    color: var(--success-text);
}
.doc-status-pending {
    background: var(--orange-50);
    color: var(--ink-soft);
}
.doc-status-pending i {
    font-size: 8px;
}

.doc-edit-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 9px;
    border: 1.5px solid var(--orange-500);
    color: var(--orange-600);
    background: var(--white);
    font-size: 12.5px;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
}
.doc-edit-btn:hover {
    background: var(--orange-500);
    color: var(--white);
}

@media (max-width: 560px) {
    .doc-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
    .doc-row-right {
        width: 100%;
        justify-content: space-between;
    }
    .doc-title {
        white-space: normal;
    }
}
</style>