# bks

## 内容

Cli bookmark.

Node.js で作成した CLI ブックマークランチャーアプリケーションです。  
npm でグローバルにインストールして利用することを想定しています。  
ref. https://qiita.com/TsuyoshiUshio@github/items/850245c5fb40310ede9b

## 公開方法

1. package.json のバージョンを increment
1. VersionControl のバージョンを increment
1. npm login
1. npm publish --access=public

```sh
$ npm login
```

```sh
$ npm publish --access=public
```

ref.

- https://chaika.hatenablog.com/entry/2019/08/15/000000
- https://nodachisoft.com/common/jp/article/jp000110/

## コマンド化

コマンドとして動かすには、index.js に`#!/usr/bin/env node`が必要です。

ref. https://stackoverflow.com/questions/34353512/node-npm-package-throw-use-strict-command-not-found-after-publish-and-install-g

# 環境構築

## TypeScript 関連パッケージインストール

```sh
// npmの初期設定
$ npm init
// TypeScript導入
$ npm i typescript -D
$ npm i @types/node
// JSDoc
$ npm i jsdoc -D
```

## テスト

Jest を使用します。  
https://typescript-jp.gitbook.io/deep-dive/intro-1/jest

```sh
$ npm i jest @types/jest ts-jest -D
```

`jest.config.js`を作成します。

- `tests`を`src`に配置します
- `tests`をコンパイル対象から除外するために、`tsconfig.json`の`exclude`プロパティに追加します

※ プロジェクトルート直下に`tests`を配置した場合に`VS Code`のデバッグが動作しなかったために`src`に配置しています。

## 依存パッケージ

### 依存パッケージのアップデート

npm-check-updates をインストールして、一括してアップデートします。

```sh
$ npm i -D npm-check-updates
```

以下コマンドで利用可能な最新パッケージを確認可能です．

```sh
$ npx ncu
```

`$ npx ncu -u`で`package.json`を最新に更新できます。  
`pakcage.json`を更新します。インストールはしません。

```sh
$ npx ncu -u
```

`inquirer`/`inquirer-autocomplete-promp`は後述するようにそれぞれ`v8`系、`v2`系を使用するよう、
package.json を編集してください。

`npm i`で実際にパッケージをインストールします．

```sh
$ npm i
```

ref. https://laboradian.com/update-npm-packages/

### inquirer.js/inquirer-autocomplete-promp

`inquirer`は`v9`から`esm`モジュールになりました。
`@s-hiroshi/bks`で`CommonJS`を使用するので`v8`系を使用します（`v9`系ではエラーになります）。

package.json

```json
$ npm i inquirer@^8.0.0
```

同様に `inquirer-autocomplete-prompt`は`v3`から`esm`モジュールになりました。
`@s-hiroshi/bks`で`CommonJS`を使用するので`v2`系を使用します（`v3`系ではエラーになります）。

```sh
$ npm i inquirer-autocomplete-prompt@^2.0.0
```

## ビルド

```sh
$ cd /path/to/project
$ npm run build
// or
$ npm run build:watch
```

## 実行

```sh
$ cd /path/to/project
$ node dist/index.js
```

## 型定義

`@types`ディレクトリに配置すると自動でグローバルな型定義になります。
本アプリケーションでは`app.d.ts`で定義します。

## デバッグ

- VS Code の機能を使用
- `.vscode`に`launch.json`を作成

## GitHub

https://github.com/octokit/octokit.js#github-app

```
$ npm install octokit
```

- [Gist Api reference](https://docs.github.com/ja/rest/reference/gists#get-a-gist)

https://docs.github.com/ja/rest/reference/gists
[octokit/rest.js](https://octokit.github.io/rest.js/v18)
