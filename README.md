# bks

CLI bookmark launcher application for Mac.

**This application is intended to be installed globally.**

## Set up

### Install

```
$ npm i -g @s-hiroshi/bks
```

### Configuration

```
$ bks configure
```

#### Storage

- local file
- Gist

##### Use local file

- Strictly Recommend /{{YOUR_HOME_DIR}}/.config/s-hiroshi/bks/data.json

##### Use Gist

1. Create Gist with file name bks-contents.json(filename is important)
1. bks configure
1. Input local file、Personal Access Token, GIST ID

## Usage

```
bks url
bks <command> <query>

Available Commands:

  configure   Edit config file
  download    Dowonload data from Gist
  edit        Edit bookmark in data file
  find        Find bookmark in data file
  efind       Extended Find is incremental search in data file
  help        Show help
  import      Import Google Chrome bookmark
  list        Show all bookmarks
  new         Create a new bookmarks
  rm          Remove bookmark
  search      Search on google
  upload      Upload data to Gist
  version     Print the version number
```

e.g

- `bks example.com` Open https://example.com
- `bks find` Display choices from data file
- `bks find keyword` Display choices that correspond to keywords from data file
- `bks efind` Increment search in data file
- `bks search keyword` Search for keyword on Google

## Import Google Chrome bookmark

This command overwrites, not appends!!

1. `manual` Export Google Chrome bookmark file(.html)
1. bks import
1. Imput exported Google Chrome bookmark file(`1.`)
