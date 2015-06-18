
export EDITOR="vim"

test -d /usr/local/lib/python2.7/site-packages/ && export PYTHONPATH="/usr/local/lib/python2.7/site-packages/"
test -f /usr/libexec/java_home && export JAVA_HOME=$(/usr/libexec/java_home)


test -f ${HOME}/dotfiles/profile-plus        && source ${HOME}/dotfiles/profile-plus
test -f ${HOME}/dev/dotfiles/profile-plus    && source ${HOME}/dev/dotfiles/profile-plus


