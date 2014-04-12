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
};

OpenM_BookDAO.group.DAO = {
    communityRoot: undefined,
    all: new Array(),
    
};