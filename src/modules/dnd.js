function makeDnDInit(zones, listAll, listSelected, leftFriends, rightFriends) {
    let currentDrag;

    zones.forEach(zone => {
        zone.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/html', 'dragstart');
            currentDrag = { source: zone, node: e.target };
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            if (currentDrag) {
                e.preventDefault();

                if (currentDrag.source !== zone) {
                    if (e.target.classList.contains('friend')) {
                        zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
                    } else {
                        zone.insertBefore(currentDrag.node, zone.lastElementChild);
                    }
                }

                leftFriends.length = 0;

                for (let i = 0; i < listAll.children.length; i++) {
                    leftFriends.push(listAll.children[i]);
                }

                rightFriends.length = 0;

                for (let i = 0; i < listSelected.children.length; i++) {
                    rightFriends.push(listAll.children[i]);
                }
                
                currentDrag = null;
            }
        })
    });
}

export {
    makeDnDInit
};