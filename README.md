# Employee-Registration-Form

###### Formulário de cadastro de funcionários, feito em Angular, Typescript e Nodejs, utilizando do Firebase para autenticação e registro em banco não relacional.

<br />

<a href="https://www.figma.com/file/b8FHdHZ2nsdoE1C2SncU3A/EmployeeRegistrationForm?node-id=18%3A5&t=sFIH1QaMdomSGHGD-1" target="_blank">
  Design do Site no Figma
</a>

<br />

<a href="https://employee-web-form.web.app/login" target="_blank">
  Site do Projeto
</a>

<br />
<br />

*****Tecnologias*****

* O site foi feito com o framework Angular e a linguagem Typescript
* Foi utilizado o Firebase Auth, para autenticação e registro de usuários, e o banco Firestore, para guardar as informações necessárias e na consulta dos dados
* O site foi publicado utilizando o Firebase Hosting

<br />
<br />

## Antes de Começar

**1. Programas que você precisa instalar**

1. Node;
2. Angular;
3. Firebase;

<br />
<br />

## Rodando o projeto

1. Vá para a pasta `/employee-web-form` e rode o comando `npm i` para instalar todos os módulos do node;
2. Para rodar localmente basta executar o comando `npm start`
3. Caso queira fazer a build do projeto e publicar no firebase, execute os comandos `npm build` e `npm deploy`;

<br />

### Notas:

> Talvez na hora de rodar dê um erro relacionado ao AngularFirestoreModule, nesse <a href="https://stackoverflow.com/questions/74745954/error-angular-fire-build-incorrectly-extends-interface" target="_blank">link</a> está a solução que utilizei para corrigir esse erro.

> Login de teste: email - usuario.teste@email.com, senha - teste12345
