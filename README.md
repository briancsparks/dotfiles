# dotfiles
My dotfiles

## scripts_dir

The best way to get scripts_dir:

```bash
script_dir="$(dirname "$(readlink -f "$0")")"
```

On Mac, install `coreutils`, and `alias readlink=greadlink`

```bash
brew install coreutils

greadlink -f file.txt
```

## Notes

- [ ] See Paul Irish's dotfiles (https://github.com/paulirish/dotfiles)
  - [ ] .aliases (https://github.com/paulirish/dotfiles/blob/master/.aliases)
  - [ ] .functions (https://github.com/paulirish/dotfiles/blob/master/.functions)
  - [ ] .inputrc (https://github.com/paulirish/dotfiles/blob/master/.inputrc)
  - [ ] WiFi Password Mac (https://github.com/rauchg/wifi-password/blob/master/wifi-password.sh)
  - [ ] WiFi Password Win (https://github.com/RReverser/WiFi-Password/blob/master/WiFi-Password.psm1)
  - [ ] Bash package manager (https://github.com/bpkg/bpkg)
  - [ ] 'C' package manager (https://github.com/clibs/clib)
  
  
