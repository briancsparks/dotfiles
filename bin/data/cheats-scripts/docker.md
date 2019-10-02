# Docker

## Images and Containers

* An image is a snapshot of a computer.
  * Images are built one on top of another, and never 'revert'. So, you
    have an ever-growing list of images, each taking space. Each image
    is also ever-growing.
* A container is what an image runs within.
  * So, in that sense a container is a run-time.
  * However, the term 'container' is also used to mean any images that
    are not in the 'stopped' state.

## Image and Container Information

```sh
# List all running containers
docker

# Also show their ID and status
docker ps -a

# List all images on the local machine
docker images

docker history <user/image>
docker logs <name/ID>               # Get logs from container
docker port <name/ID>               # Show the exposed port(s)
docker diff <name/ID>               # Show changes made to the container.

```

## Running

```sh
# Run an image
docker run -it <user/image>

# Run an image in detached mode, with port forwarding
docker run -p $HOSTPORT:$CONTAINERPORT -d <user/image>

docker attach [container name or ID]
docker start [container name or ID]
docker stop [container name or ID]
docker rm -f [container name or ID]
docker rmi

docker tag <user/image:tag> <user/image:newtag>

docker exec <container name or ID> <shell command>
```

## Image Creation

```sh
docker commit <user/image>
docker save <user/image>
docker build -t <sampleuser/ubuntu> .

docker load
```

See https://github.com/wsargent/docker-cheat-sheet
And https://docs.docker.com/engine/reference/commandline/cli/
And https://docs.docker.com/engine/reference/commandline/docker/




