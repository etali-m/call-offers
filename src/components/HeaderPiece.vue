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
        <span class="header-eyebrow">Dossier d'Appel d'Offre</span>

        <h4 class="header-box-title mb-0">
            N˚<router-link :to="{ name:'edit', params:{ project_id: id } }" class="header-link">{{ numero_dossier }}</router-link>
        </h4>

        <span class="header-moe">{{ moe }}</span>
        <span class="header-desc">POUR: {{ description_travaux }}</span>
    </div>

</div>
</template>

<script>
export default {
    props: ['id', 'numero_dossier', 'moe', 'description_travaux']
}

</script>

<style scoped>
    .header-box {
        --ink:        #241505;
        --ink-soft:   #6b5847;
        --orange-50:  #FFF4EC;
        --orange-500: #FF6A1A;
        --orange-600: #F0560A;
        --line:       rgba(36, 21, 5, 0.08);

        display: flex;
        align-items: flex-start;
        gap: 16px;
        max-width: 100%;
        width: 100%;
        margin: 0 0 20px;
        padding: 20px 24px;
        border-radius: 15px;
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        border: 1px solid var(--line);
        background: white;
    }

    .header-box-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
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
        gap: 3px;
        min-width: 0;
    }

    .header-eyebrow {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--orange-600);
    }

    .header-box-title{
        font-size: 22px;
        font-weight: bold;
        color: var(--ink);
        margin: 2px 0 4px;
    }
    .header-link {
        color: var(--ink);
        text-decoration: none;
    }
    .header-link:hover {
        color: var(--orange-600);
        text-decoration: underline;
    }

    .header-moe {
        color: var(--ink-soft);
        font-weight: 600;
        font-size: 13.5px;
    }

    .header-desc {
        color: var(--ink);
        font-size: 13.5px;
        margin-top: 2px;
    }

    @media (max-width: 640px) {
        .header-box {
            flex-direction: column;
            padding: 18px;
        }
    }
</style>