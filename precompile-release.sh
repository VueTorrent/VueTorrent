#!/bin/bash

build_and_copy(){
    npm run build
    VERSION=$(jq -r .version package.json)
    mkdir ../vuetorrent-release
    git clone git@github.com:WDaan/VueTorrent.git ../vuetorrent-release
    cd ../vuetorrent-release
    git checkout latest-release
    git pull
    sudo rm -r public
    cp -r ../vuetorrent/vuetorrent/* ./
    
}

cleanup(){
    cd ..
    sudo rm -r vuetorrent-release
}

commit_and_push(){
    git add --all
    git commit -m "Release v$VERSION"
    git push --set-upstream origin latest-release
}

build_and_copy
commit_and_push
cleanup