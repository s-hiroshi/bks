# bks

CLI site bookmark application for Mac.


## Usage

```
bks url
bks <command> <query>

Available Commands:

  configure   Edit config file
  download    Dowonload from Gist
  edit        Edit bookmark file
  find        Find bookmark in file 
  efind       Extended Finder is incremental search in file
  help        Show help
  import      Import Google Chrome bookmark
  list        Show all bookmarks
  new         Create a new bookmarks
  rm          Remove bookmark
  search      Search in google
  upload      Upload to Gist
  version     Print the version number
```

e.g

- `bks example.com`     Open https://example.com
- `bks find`            Display choices from a bookmark file
- `bks find example`    Display choices that correspond to keywords
- `bks search example`  Search for KEYWORD on Google

## Configuration

```
$ bks configure
```

## Storage

- local file
- Gist

## Use local file

- Recommend storage/data.json(default)

## Use Gist

1. Create Gist with file name bks-contents.json(filename is important)
1. bks configure
1. Input local file、Personal Access Token, GIST ID

## Import Google Chrome bookmark

1. `manual` Export Google Chrome bookmark file(.html)
1. bks import
1. Imput exported Google Chrome bookmark file(`1.`)