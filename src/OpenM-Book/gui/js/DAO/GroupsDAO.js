if (OpenM_BookDAO === undefined)
    var OpenM_BookDAO = {};

if (OpenM_BookDAO.group === undefined)
    OpenM_BookDAO.group = {};

OpenM_BookDAO.group.ExchangeObject = function(id, name, type) {
    this.type = type;
    this.id = id;
    this.name = name;
    this.groupChilds = new Array();
    this.userChilds = new Array();
    this.AllCallBack = new Array();
    this.loaded = false;
};

OpenM_BookDAO.group.ExchangeObject.prototype.getContent = function() {
    var controller = this;
    OpenM_Groups.getGroupContent(this.id, function(data) {
        OpenM_BookDAO.group.DAO.parseAndLoadContent(data, controller);
    });
};

OpenM_BookDAO.group.ExchangeObject.prototype.addUpdateCallBack = function(c) {
    this.AllCallBack.push(c);
};

OpenM_BookDAO.group.ExchangeObject.prototype.update = function() {
    for (var i in this.AllCallBack) {
        if (typeof(this.AllCallBack[i]) === 'function')
            this.AllCallBack[i]();
    }
};

OpenM_BookDAO.group.DAO = {
    communityRoot: undefined,
    all: new Array(),
    get: function(id) {
        if (OpenM_BookDAO.group.DAO.all[id] === undefined)
            OpenM_BookDAO.group.DAO.all[id] = new OpenM_BookDAO.group.ExchangeObject(id);
        return OpenM_BookDAO.group.DAO.all[id];
    }
};


OpenM_BookDAO.group.DAO.parseAndLoadContent = function(data, group) {
    OpenM_BookGUI.Pages.showJSON(data);
    if (data[OpenM_Groups.RETURN_STATUS_PARAMETER] === OpenM_Groups.RETURN_STATUS_OK_VALUE) {
        group.loaded = true;
        if (data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER] !== undefined) {
            group.groupChilds = new Array();
            for (var i in data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER]) {
                var json = data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER][i];
                var groupTemp = OpenM_BookDAO.group.DAO.get(json[OpenM_Groups.RETURN_GROUP_ID_PARAMETER]);
                if (groupTemp.name !== json[OpenM_Groups.RETURN_GROUP_NAME_PARAMETER]) {
                    groupTemp.name = json[OpenM_Groups.RETURN_GROUP_NAME_PARAMETER];
                    groupTemp.update();
                }
                group.groupChilds[groupTemp.id] = groupTemp;
            }
            group.update();
        }
    }
};