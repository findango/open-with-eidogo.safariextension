
var lastContextMenuEventTime;

document.addEventListener("contextmenu", handleContextMenu, false);


function findParentNode(parentTagName, childObj) {
    var testObj = childObj;
    while(testObj.tagName !== parentTagName) {
        testObj = testObj.parentNode;
        if (testObj.tagName === 'HTML') {
            return null;
        }
    }
    return testObj;
}


function handleContextMenu(event)
{
    lastContextMenuEventTime = new Date().getTime();
    
    target = findParentNode('A', event.target)

    if (target != null && target.href.substr(-4).toLowerCase() === ".sgf") {
        safari.self.tab.setContextMenuEventUserInfo(event, 
            { "timestamp": lastContextMenuEventTime, "target_url": target.href });
    } else {
        // FIXME: is there some way to unset the previous UserInfo?
        safari.self.tab.setContextMenuEventUserInfo(event, 
            { "timestamp": lastContextMenuEventTime, "target_url": null });
    } 

}

