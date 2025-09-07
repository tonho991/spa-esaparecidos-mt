## Desaparecidos MT

A aplicação consiste em um site que consome a **API da ABITUS** para listar pessoas desaparecidas no estado de Mato Grosso, permitindo visualizar detalhes, aplicar filtros e facilitar a busca.

## 📝 Dados da Inscrição

- Nome: `Marco Antonio da Silva Junior`
- Email: `tonhovg47@gmail.com`
- Telefone: `+55 (65) 9 9340-3335`
- Vaga pretendida: `Desenvolvedor Júnior`

## 🔨 Build

#### 📦 NPM

- Instalação:

```bash
npm install
```

- Inicialização Rápida (DEV):

```bash
npm run dev
```

- Build & Inicialização:

```bash
npm run build && npm run start
```

- Acesso:

```bash
http://localhost:3000
```

#### 🐋 DOCKER

- Build da imagem:

```bash
docker build -t desaparecidos-mt .
```

- Inicializar container:

```bash
docker run -p 3000:3000 desaparecidos-mt
```

- Acesso local:

```bash
http://localhost:3000
```