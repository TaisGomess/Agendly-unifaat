// LOGIN
async function login() {
    try {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login feito!');
        window.location.href = 'pacientes.html';
    } else {
        alert(data.erro || 'Erro no login');
    }

    } catch (erro) {
    console.error(erro);
    alert('Erro ao conectar com o servidor');
    }
}

// CADASTRAR PACIENTE
async function cadastrarPaciente() {
    try {
    const nome = document.getElementById('nome').value;
    const contato = document.getElementById('contato').value;

    if (!nome || !contato) {
    alert('Preencha todos os campos!');
    return;
}

    await fetch('http://localhost:3000/pacientes', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, contato })
    });

    alert('Paciente cadastrado com sucesso!');

    // limpar depois de cadastrar para evitar duplicados
    document.getElementById('nome').value = '';
    document.getElementById('contato').value = '';


    listarPacientes();

    } catch (erro) {
    console.error(erro);
    alert('Erro ao cadastrar paciente');
    }
}

// LISTAR PACIENTES
async function listarPacientes() {
    try {
    const response = await fetch('http://localhost:3000/pacientes');
    const pacientes = await response.json();

    const lista = document.getElementById('lista');

    if (!lista) return; // 👈 evita erro no login.html

    lista.innerHTML = '';

   // percorre todos os pacientes vindos da API
pacientes.forEach(p => {

    // cria item da lista
    const li = document.createElement('li');

    // mostra nome e contato
    li.innerHTML = `
        ${p.nome} - ${p.contato}

        <button onclick="excluirPaciente(${p.id})">
            Excluir
        </button>
    `;

    // adiciona na tela
    lista.appendChild(li);
});

    } catch (erro) {
    console.error(erro);
    }
}

// 👇 só roda se existir a lista (ou seja, só na página de pacientes)
if (document.getElementById('lista')) {
    listarPacientes();
}

// EXCLUIR PACIENTE
async function excluirPaciente(id) {

    // confirmação para evitar exclusão sem querer
    const confirmar = confirm('Deseja excluir este paciente?');

    if (!confirmar) return;

    try {

        // envia DELETE para API
        await fetch(`http://localhost:3000/pacientes/${id}`, {
            method: 'DELETE'
        });

        alert('Paciente excluído!');

        // atualiza lista
        listarPacientes();

    } catch (erro) {
        console.error(erro);

        alert('Erro ao excluir paciente');
    }
}

// CADASTRAR AGENDAMENTO
async function cadastrarAgendamento() {

    try {

        const paciente_id = document.getElementById('paciente_id').value;

        const data = document.getElementById('data').value;

        const horario = document.getElementById('horario').value;

        const observacao = document.getElementById('observacao').value;

        // validação simples
        if (!paciente_id || !data || !horario) {

            alert('Preencha os campos obrigatórios');

            return;
        }

        // envia para API
        const response = await fetch('http://localhost:3000/agendamentos', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                paciente_id,
                data,
                horario,
                observacao
            })
        });

        // pega resposta da API
        const dataResponse = await response.json();

        // verifica erro vindo da API
        if (!response.ok) {

            alert(dataResponse.erro);

            return;
        }

        // sucesso
        alert('Agendamento criado!');

        // limpa campos
        document.getElementById('paciente_id').value = '';

        document.getElementById('data').value = '';

        document.getElementById('horario').value = '';

        document.getElementById('observacao').value = '';

        // atualiza lista
        listarAgendamentos();

    } catch (erro) {

        console.error(erro);

        alert('Erro ao criar agendamento');
    }
}


// LISTAR AGENDAMENTOS
async function listarAgendamentos() {

    try {

        const response = await fetch('http://localhost:3000/agendamentos');

        const agendamentos = await response.json();

        const lista = document.getElementById('listaAgendamentos');

        // evita erro em outras páginas
        if (!lista) return;

        lista.innerHTML = '';

        agendamentos.forEach(a => {

            const li = document.createElement('li');

            li.innerHTML = `
                <strong>${a.paciente}</strong>

                - ${a.data}

                às ${a.horario}

                <br>

                ${a.observacao || ''}
            `;

            lista.appendChild(li);
        });

    } catch (erro) {

        console.error(erro);
    }
}


// executa apenas na tela de agendamentos
if (document.getElementById('listaAgendamentos')) {

    listarAgendamentos();
}

// CARREGAR PACIENTES NO SELECT
async function carregarPacientes() {

    try {

        // busca pacientes da API
        const response = await fetch('http://localhost:3000/pacientes');

        const pacientes = await response.json();

        // pega select
        const select = document.getElementById('paciente_id');

        // evita erro em outras páginas
        if (!select) return;

        // limpa opções antigas
        select.innerHTML = `
            <option value="">
                Selecione um paciente
            </option>
        `;

        // adiciona pacientes
        pacientes.forEach(p => {

            const option = document.createElement('option');

            option.value = p.id;

            option.textContent = `${p.nome} (${p.creditos} créditos)`;

            select.appendChild(option);
        });

    } catch (erro) {

        console.error(erro);
    }
}


// executa carregamento do select
if (document.getElementById('paciente_id')) {

    carregarPacientes();
}