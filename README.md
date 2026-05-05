# 🧠 Agendly - Sistema de Agendamento Psicológico

Projeto desenvolvido para a disciplina de Desenvolvimento Web do curso de Análise e Desenvolvimento de Sistemas.

---

## 📌 Sobre o projeto

O Agendly é um sistema web voltado para profissionais da área da psicologia, com o objetivo de facilitar o cadastro e gerenciamento de pacientes.

A proposta é substituir controles manuais por uma solução digital simples, organizada e funcional.

---

## 🚀 Funcionalidades

* 🔐 Login de usuário
* 👤 Cadastro de pacientes
* 📋 Listagem de pacientes
* 🔗 Integração com API REST

---

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* PostgreSQL
* HTML, CSS e JavaScript
* Insomnia (testes de API)

---

## 🧱 Arquitetura

O sistema segue o modelo cliente-servidor:

* Frontend: interface do usuário (HTML, CSS e JS)
* Backend: API REST desenvolvida com Node.js e Express
* Banco de dados: PostgreSQL para armazenamento das informações

---

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

git clone https://github.com/TaisGomess/Agendly-unifaat.git

---

### 2. Acessar o backend

cd backend

---

### 3. Instalar dependências

npm install

---

### 4. Configurar banco de dados

Criar a tabela de pacientes no PostgreSQL:

CREATE TABLE pacientes (
id SERIAL PRIMARY KEY,
nome TEXT NOT NULL,
contato TEXT NOT NULL
);

---

### 5. Rodar o servidor

node server.js

Servidor disponível em: http://localhost:3000

---

### 6. Rodar o frontend

Na raiz do projeto:

npx serve

Acesse no navegador o endereço informado (ex: http://localhost:51750)

---

## 📈 Próximas melhorias

* Sistema de agendamento de consultas
* Diferenciação de usuários (psicólogo e paciente)
* Melhorias na interface (UI/UX)
* Autenticação mais segura

---

## 📌 Status do projeto

Em desenvolvimento (MVP funcional)

---

## 👩‍💻 Autora

Taís Gomes
Curso: Análise e Desenvolvimento de Sistemas
UNIFAAT - Prof Cabral