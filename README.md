## CASL-Redux-NEXT

En | [中文](README-ch.md)

![Banner](/banner.png)

This is a demo about `CASL + Redux`. It uses Redux to store CASL permissions and displays corresponding content based on different permissions.

If you have a need for permission management, it is highly recommended to use [CASL](https://casl.js.org/v6/en) to build this feature on the frontend. This package can centralize the management of permissions, making it easier to maintain in the future. The package can also be used for more complex scenarios, such as allowing only the owner of an article to edit or delete it, eliminating the need for excessive if-else statements in the code.

***For more information, please refer to my article, [[Next Note] - Implementing a Clean and Concise Permission Management Solution using CASL in Next/React](https://rexhung0302.github.io/2023/03/25/20230325/).***

---

### Plugins

- eslint-config-prettier

- ant design

- tailwindcss

- clsx

- lodash

#### Note

1. If you are using VSCode for development, please configure the `.vscode` folder in the root directory. If it does not exist, please create it and add the following code to ensure that ESLint is automatically run for linting after saving:
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

2. If you are using VSCode for development, we recommend installing `Prettier - Code formatter`.

---

### Link

- [Demo](https://casl-redux-app.vercel.app/)

- [Blog Note](https://rexhung0302.github.io/2023/03/25/20230325/#more)