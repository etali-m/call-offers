<template>
<div class="header-box">

    <div class="header-box-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/>
            <path d="M14 3v5h5"/>
            <path d="M9 13h6M9 17h6M9 9h1"/>
        </svg>
    </div>

    <div class="header-box-content">
        <span class="header-eyebrow">
            Dossier d'Appel d'Offre {{ type_dossier }} {{ passation }}
        </span>

        <h1 class="header-title">N˚{{ numero_dossier }}</h1>

        <p class="header-ministere">{{ ministere }}</p>

        <p class="header-desc"><span class="desc-label">Pour :</span> {{ description_travaux }}</p>

        <div class="header-meta">
            <span class="meta-pill">
                <span class="meta-key">Financement</span>
                <span class="meta-val">{{ financement }}</span>
            </span>
            <span class="meta-pill">
                <span class="meta-key">Imputation</span>
                <span class="meta-val">{{ imputation }}</span>
            </span>
        </div>
    </div>

</div>
</template>

<script>
export default {
    props: ['type_dossier', 'passation', 'numero_dossier', 'ministere', 'description_travaux', 'financement', 'imputation'],
}
</script>

<style scoped>
.header-box {
    --ink:        #241505;
    --ink-soft:   #6b5847;
    --orange-50:  #FFF4EC;
    --orange-100: #FFE4D1;
    --orange-500: #FF6A1A;
    --orange-600: #F0560A;
    --orange-700: #C4460A;
    --white:      #FFFFFF;
    --line:       rgba(36, 21, 5, 0.08);

    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    max-width: 100%;
    margin: 0 0 24px;
    padding: 24px 28px;
    border-radius: 16px;
    border: 1px solid var(--line);
    background: var(--white);
    box-shadow: 0 12px 28px -20px rgba(36, 21, 5, 0.25);
}

.header-box-icon {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--orange-50);
    color: var(--orange-600);
}

.header-box-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.header-eyebrow {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--orange-600);
}

.header-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin: 2px 0 4px;
    line-height: 1.2;
}

.header-ministere {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink-soft);
    margin: 0;
}

.header-desc {
    font-size: 13.5px;
    color: var(--ink);
    margin: 6px 0 12px;
}
.desc-label {
    font-weight: 700;
    color: var(--ink-soft);
}

.header-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--orange-50);
    font-size: 12.5px;
}
.meta-key {
    font-weight: 700;
    color: var(--orange-700);
}
.meta-val {
    font-weight: 500;
    color: var(--ink);
}

@media (max-width: 640px) {
    .header-box {
        flex-direction: column;
        padding: 20px;
    }
}
</style>