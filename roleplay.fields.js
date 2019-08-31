const fields = [
    {
        type: 'radios',
        label: 'Possui microfone?',
        model: 'mic',
        values: [
          "Sim",
          "Não"
        ],
        required: true,
    },
    {
        type: 'radios',
        label: 'Já jogou RP antes?',
        model: 'jogouRpAntes',
        values: [
          "Sim",
          "Não"
        ],
        required: true,
    },
   {
        type: 'select',
        label: 'Qual horário você pretende jogar?',
        model: 'horariosDeJogo',
        values: [
            "Manhã",
            "Tarde",
            "Noite"
        ],
        selectOptions: {
            noneSelectedText: "Selecione o horário"
        },
        required: true,
    },
    /*
    {
        type: 'textArea',
        label: 'Descreva com suas palavras o que é Anti-RP',
        model: 'descreverAntiRp',
        max: 1024,
        hint: 'Máximo de 1024 caracteres.',
        placeholder: 'Descreva com suas palavras o que é Anti-RolePlay e como isso pode interferir na jogatina...',
        rows: 2,
        required: true
    },
    {
        type: 'textArea',
        label: 'Descreva com suas palavras o que é MetaGaming? Cite pelo menos 2 exemplos.',
        model: 'descreverMetaGaming',
        max: 1024,
        hint: 'Máximo de 1024 caracteres.',
        placeholder: 'Descreva com com suas palavras o que é Meta-Gaming e cite pelo menos 2 exemplos...',
        rows: 2,
        required: true
    },
    {
        type: 'textArea',
        label: 'Quais são os locais da cidade considerados Área Safe (Zona-Segura)?',
        model: 'areasSafe',
        max: 1024,
        hint: 'Máximo de 1024 caracteres.',
        placeholder: 'Digite o nome dos locais que são considerados zona-segura',
        rows: 2,
        required: true
    } */
]

// Trabalhos disponíveis no seu servidor
const jobs = [
    { text: "Mecânico", value: "Mecanico" },
    { text: "Taxista", value: "Taxista" },
    { text: "Entregador", value: "Entregador" },
    { text: "Minerador", value: "Minerador" },
    { text: "Hacker", value: "Hacker "},
    { text: "Lixeiro", value: "Lixeiro" }
]

module.exports = { fields, jobs };