# 🚀 Calendário & Calculadora Funcional  

Este projeto é uma **aplicação web com calendário interativo e calculadora funcional**, desenvolvida com o objetivo de oferecer uma experiência prática e intuitiva aos usuários. O sistema conta com autenticação JWT, interface responsiva e recursos práticos.  

---

## 🛠️ Tecnologias Utilizadas  

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js com Express  
- **Autenticação:** JWT (JSON Web Token)  
- **Gerenciamento de Rotas:** Express.js  
- **Banco de Dados:** Configuração a ser implementada  

---

## 📋 Pré-requisitos  

Antes de executar o projeto, você deve garantir as configurações e ferramentas abaixo:  

1. **Node.js:**  

   Certifique-se de ter o Node.js instalado em sua máquina. Caso contrário, faça o download [aqui](https://nodejs.org/).  

2. **Configuração JWT:**  

   Configure as variáveis de ambiente com chaves seguras para autenticação JWT.  

---

## ⚙️ Configuração  

### 1. Clone este repositório  

Caso ainda não tenha feito o clone, execute o comando abaixo para obter os arquivos:  

git clone https://github.com/rateryyz/gymapp
cd seu-repositorio  

### 2. Instale as dependências necessárias  

Após clonar o projeto, instale as dependências:  

npm install  

### 3. Configure as variáveis de ambiente para autenticação JWT  

Crie um arquivo `.env` na raiz do projeto com o conteúdo:  

JWT_SECRET=suachavesecretajwt  

**Importante:** Não compartilhe essas credenciais publicamente. Adicione `.env` no seu `.gitignore` para proteger esses dados:  

.env  

### 4. Inicie o servidor localmente  

Após a configuração, execute o servidor com o comando:  

npm run dev  

Você poderá acessar a aplicação no endereço:  

http://localhost:3000  

---

## 📂 Estrutura do Projeto  

Veja como os arquivos estão organizados:  

seu-repositorio/  
  backend/  
    controllers/  
      authController.js  
    routes/  
      authRoutes.js  
    server.js  
  frontend/  
    index.html  
    style.css  
    script.js  
.gitignore  
.env  
README.md  
package.json  

---

## 🤝 Como Contribuir  

Se deseja contribuir para este projeto, sinta-se à vontade para **forkar**, criar uma branch e enviar um **Pull Request** com suas modificações.  

### Passos para contribuição:  

1. Fork este repositório.  
2. Crie uma nova branch:  

git checkout -b minha-modificacao  

3. Faça as alterações e comite:  

git commit -am 'Minha contribuição'  

4. Envie as alterações para o repositório remoto:  

git push origin minha-modificacao  

5. Submeta um **Pull Request** explicando as mudanças feitas.  

---

## 📝 Licença  

Este projeto está licenciado sob a **MIT License** - veja o arquivo LICENSE para detalhes.  

---

## 🚧 Status do Projeto  

> **Este projeto está em andamento.**  

Estamos trabalhando para implementar novas funcionalidades, correções e melhorias. Agradeço desde já seu apoio! 💡  
