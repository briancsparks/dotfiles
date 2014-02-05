

export PATH=$HOME/local/bin:$PATH
test -f ${HOME}/local/bin/node && export NODE_PATH=${HOME}/local/bin

export NETWORK_TYPE="home"
(ifconfig | egrep 'inet (addr:)?1[56]\.' > /dev/null) && export NETWORK_TYPE="net15"

if [ $NETWORK_TYPE == "net15" ]
then
  #echo 'Assuming net15, and using proxy'
  export the_proxy_server_host=proxy.atlanta.hp.com
  export the_proxy_server_port=8080
  export the_proxy_server="${the_proxy_server_host}:${the_proxy_server_port}"
  export http_proxy="http://${the_proxy_server}/"
  export https_proxy="https://${the_proxy_server}/"
  export HTTP_PROXY="http://${the_proxy_server}/"
  export HTTPS_PROXY="https://${the_proxy_server}/"

  export socks_proxy="socks://${the_proxy_server}/"
  export all_proxy="socks://${the_proxy_server}/"
  export ALL_PROXY="socks://${the_proxy_server}/"

  export EC2_JVM_ARGS="-Dhttps.proxyHost=${the_proxy_server_host} -Dhttps.proxyPort=${the_proxy_server_port}"

  #export HTTP_PROXY="http://proxy.atlanta.hp.com:8080"
  #export http_proxy="$HTTP_PROXY"
  #export HTTPS_PROXY="https://proxy.atlanta.hp.com:8080"
  #export https_proxy="$HTTPS_PROXY"

  export no_proxy=localhost,127.0.0.0/8,15.80.0.0/16,192.168.0.0/16
  export NO_PROXY=localhost,127.0.0.0/8,15.80.0.0/16,192.168.0.0/16

  git config --global http.proxy http://proxy.atlanta.hp.com:8080
else
  (ifconfig | egrep 'inet (addr:)?10\.' > /dev/null) && export NETWORK_TYPE="net10"
  if [ $NETWORK_TYPE == "net10" ]
  then
    echo 'Assuming cloud net, NOT using proxy'
    export no_proxy=localhost,127.0.0.0/8,10.0.0.0/8
    export NO_PROXY=localhost,127.0.0.0/8,10.0.0.0/8
  else
    echo 'Assuming home net, NOT using proxy'
    export no_proxy=localhost,127.0.0.0/8,192.168.0.0/16
    export NO_PROXY=localhost,127.0.0.0/8,192.168.0.0/16
    git config --global --unset http.proxy
  fi
fi

export PYTHONPATH="/usr/local/lib/python2.7/site-packages/"

# set PATH so it includes user's private bin if it exists
[ -d "$HOME/bin" ] && PATH="$HOME/bin:$PATH"
[ -d "$HOME/local/bin" ] && PATH="$HOME/local/bin:$PATH"

. ~/setprompt


