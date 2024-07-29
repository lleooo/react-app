# React 電影網站[連結](https://movieeeeeeeeee.netlify.app)

這是一個使用 React 框架構建的電影網站，它使用了 The Movie Database (TMDB) 的 API 來提供近期有名的電影，並通過 Flask 伺服器與 mongoDB 連結來管理使用者與其愛好的電影([Flask 伺服器連結](https://github.com/lleooo/react-app-flask-server))

## 架構流程圖

```plaintext
+--------------------+        +-------------------+         +---------------------+
|                    |        |                   |         |                     |
|    前端 (React)    | <----> |    後端 (Flask)   | <-----> |   資料庫 (MongoDB)  |
|  部署於 Netlify    |        |  部署於 Render    |         | 部署於 MongoDB Atlas|
|                    |        |                   |         |                     |
+--------------------+        +-------------------+         +---------------------+
```

## 功能

- **用戶註冊和登錄系統**：實現了基於 JWT 的認證系統。

- **第三方登錄**：用戶可以方便地使用 Google 帳戶登錄。

- **電影搜索和推薦**：用戶可以搜索電影並將其添加到自己的收藏夾中。

- **數據儲存**：使用 MongoDB 數據庫存儲用戶信息和用戶喜歡的電影列表。

## 技術棧

- **前端**：React
  - 使用 Redux 管理全域狀態，如當前 user 訊息。
  - 使用 TanStack Query 實現 API 資料的快取
  - 使用 React Router 管理應用路由,並設置 private route 限制沒有登入的使用者
  - 使用 Redux Saga 和 Redux Thunk 處理發送至 Flask 的異步操作。
  - 使用 styled-components 與 tailwinds 建構畫面
  - 在輸入事件中實現防抖功能減少 API 的呼叫
- **後端**：[Flask](https://github.com/lleooo/react-app-flask-server)
  - 建立 RESTful API，處理用戶認證、數據儲存。
  - 使用 Flask-JWT-Extended 實現 JWT 認證。
  - 驗證 Google 登入之 user
- **資料庫**：MongoDB Atlas
  - 使用 MongoDB Atlas 儲存用戶訊息與喜好電影。

## 專案截圖

#### 登入頁面

![登錄頁面截圖](/screenShot1.png)

#### 首頁

![首頁截圖](/screenShot2.png)

## 安裝和運行步驟

1. 克隆此專案
2. 安裝套件

```
npm install
```

3. 運行專案

```
npm start
```

4. 克隆 [Flask server](https://github.com/lleooo/react-app-flask-server)
5. 進入專案資料夾

```
cd react-app-flask-server
```

6. 安裝虛擬環境套件

```
pip install virtualenv
```

7. 新增虛擬環境

```
virtualenv venv
```

8. 啟動虛擬環境

```
shell:
. \venv\Scripts\activate
```

```
bash:
source venv/Scripts/activate
```

9. 安裝套件

```
pip install -r requirements.txt
```

10. 啟動 Flask server

```
python master.py
```
