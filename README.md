# Art is for everyone 

Adobe Creative Jam vol.3 in Osaka


## ファイル構成

```
- config              --- gulp taskの設定ファイル、同名のtaskファイルに対応
- gulp                --- gulp taskファイル、タスクごとにファイルを作成
- workspace
  - api               --- ダミーAPI用ディレクトリ（nodejs）
  - build             --- コンパイル済みファイルが出力される場所
  - src               --- ソースファイル
    - components      --- コンポーネントファイル
    - libs            --- ライブラリ
    - pages           --- コンパイル対象のファイル（ページ構成）
    - static          --- ビルド時にコンパイルを行わずbuildディレクトリにコピーされる
```


## AWS IoT の設定

AWS IoT
https://aws.amazon.com/jp/iot-platform/

SocketParams.js ファイルに設定を書いておく

```
workspace/src/components/SocketParams.js
```


## タスクコマンド一覧

#### フォント画像ファイルの書き出し

```
$ npm run exportfont
```

#### 初期化、全書き出し

```
$ npm run build
```

#### フォント画像をbuildフォルダにコピーする

```
$ npm run copyfont
```

#### 開発用ローカルサーバー立ち上げ、自動コンパイル

```
$ npm start
```
