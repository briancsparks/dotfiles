# VIM

See also: https://unix.stackexchange.com/questions/108020/can-vim-display-ascii-characters-only-and-treat-other-bytes-as-binary-data

To see the ASCII values for multi-byte:

```
:set encoding=latin1
:set isprint=
:set display+=uhex
```

Or on one line:

```
:set encoding=latin1|set isprint=|set display+=uhex
```

