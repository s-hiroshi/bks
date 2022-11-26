# bks

## 公開方法

1. package.jsonのバージョンをincrement
1. VersionControlのバージョンをincrement
1. npm login
1. npm publish --access=public

```sh
$ npm login
```

```sh
$ npm publish --access=public
```

ref. https://chaika.hatenablog.com/entry/2019/08/15/000000

参考

- https://chaika.hatenablog.com/entry/2019/08/15/000000
- https://nodachisoft.com/common/jp/article/jp000110/

## コマンド化

コマンドとして動かすには、index.jsに`#!/usr/bin/env node`が必要

ref. https://stackoverflow.com/questions/34353512/node-npm-package-throw-use-strict-command-not-found-after-publish-and-install-g

# Test

<https://stackoverflow.com/questions/68351994/jest-mock-a-module-to-produce-different-results-on-function-calls>
## 内容

Cli bookmark.

Node.jsで作成したCLIブックマークランチャーアプリケーションです。  
npmでグローバルにインストールして利用することを想定しています。  
ref. https://qiita.com/TsuyoshiUshio@github/items/850245c5fb40310ede9b

## ロードマップ

- 登録機能（JSON）
  - URL
  - キーワード
  - 表示名
- 表示機能
  - httpで始まる場合はそのものを表示
  - 候補がない場合は登録プロンプトを表示
- マニュアルを充実させる <-- 実は一番大事
- サイト検索の選択肢にNoを追加して選択された場合は、最初に戻る

# 環境構築

## TypeScript関連パッケージインストール

```sh
// npmの初期設定
$ npm init
// TypeScript導入
$ npm i typescript -D
// TypeScriptをNode.jsで使用
$ npm i @types/node
// tsファイルを直接実行できるように
$ npm i ts-node -D
// JSDoc
$ npm i jsdoc -D
```

## テスト

Jestを使用します。  
https://typescript-jp.gitbook.io/deep-dive/intro-1/jest


```sh
$ npm i jest @types/jest ts-jest -D
```

`jest.config.js`を作成します。

- `tests`を`src`に配置します
- `tests`をコンパイル対象から除外するために、`tsconfig.json`の`exclude`プロパティに追加します

※ プロジェクトルート直下`tests`を配置した場合に`VS Code`のデバッグが動作しなかったために`src`に配置しています。


## 依存パッケージ

```sh
# https://github.com/SBoudrias/Inquirer.js
$ npm i inquirer
# TypeScript定義
$ npm i @types/inquirer

# https://github.com/sindresorhus/open
$ npm i open
# 型定義ファイルなし
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
// 以下では何故かエラー
// $ npx ts-node src/index.ts
```

## 型定義

@typesディレクトリに配置すると自動でグローバルな型定義になる．
本アプリケーションではapp.d.tsにまとめる．

## デバッグ

- VS Codeの機能を使用
- `.vscode`に`launch.json`を作成


## GitHub

https://github.com/octokit/octokit.js#github-app

```
$ npm install octokit
```

- [Gist Api reference](https://docs.github.com/ja/rest/reference/gists#get-a-gist)

https://docs.github.com/ja/rest/reference/gists
[octokit/rest.js](https://octokit.github.io/rest.js/v18)


```
/*
        * asyncの特徴
        * 1. > 非同期関数は常にプロミスを返します。非同期関数の返値が明示的にプロミスでない場合は、暗黙的にプロミスでラップされます。
        * 1. awaitを使用できる
        * @see
        * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
        *
        */
```