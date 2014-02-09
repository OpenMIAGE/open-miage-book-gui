if (OpenM_BookDAO === undefined)
    var OpenM_BookDAO = {};

if (OpenM_BookDAO.group === undefined)
    OpenM_BookDAO.group = {};

OpenM_BookDAO.group.ExchangeObject = function(id, name, type) {
    this.type = type;
    this.id = id;
    this.name = name;
};

OpenM_BookDAO.group.DAO = {
    all: new Array(),
    getContent: function(groupId){

    }
};