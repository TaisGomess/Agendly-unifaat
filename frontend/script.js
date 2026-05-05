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

    pacientes.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nome} - ${p.contato}`;
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