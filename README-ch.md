## CASL-Redux-NEXT

[En](README.md) | 中文

![Banner](/banner.png)

這是一個關於 `CASL + Redux` Demo，使用 Redux 存放 CASL 權限，並且依照不同的權限給予相對應該顯示的內容。

如果你有需求需要做到權限管理，而前端的部分非常推薦使用 [CASL](https://casl.js.org/v6/en) 來搭建這個功能，該套件能夠將權限集中管理，方便日後維護，套件亦能夠使用於更複雜的強況，例如只有文章擁有者能編輯或刪除文章，程式碼內不會再充斥著 `if-else` 了。

***更多使用心得可以參考我的文章 [[Next Note] - 在 Next/React 使用 CASL 執行乾淨俐落的權限管理方案](https://rexhung0302.github.io/2023/03/25/20230325/)***

---

### Plugins

- eslint-config-prettier

- ant design

- tailwindcss

- clsx

- lodash

#### Note

1. 如使用 VSCode 開發，請自行配置跟目錄底下的 `.vscode`，沒有請自行創建，內容請加上下列程式碼，確保儲存後會自動執行 ESLint 的檢測
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

2. 如使用 VSCode 開發，建議安裝 `Prettier - Code formatter`，

---

### Link

- [Demo](https://casl-redux-app.vercel.app/)

- [Blog Note](https://rexhung0302.github.io/2023/03/25/20230325/#more)