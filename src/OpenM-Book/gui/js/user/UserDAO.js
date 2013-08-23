if (typeof(OpenM_BookDAO) === 'undefined')
    var OpenM_BookDAO = {};

OpenM_BookDAO.user = {};

OpenM_BookDAO.user.ExchangeObject = function() {
    this.id = '';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.isAdmin = false;
    this.loaded = false;
    this.validIn = new Array();
    this.notValidIn = new Array();
    this.otherProperties = new Array();
    this.communities = new Array();

    //update listener
    this.AllCallBack = new Array();
    this.AllCommunitiesCallBack = new Array();
};

OpenM_BookDAO.user.ExchangeObject.prototype.addUpdateCallBack = function(c) {
    this.AllCallBack.push(c);
};

OpenM_BookDAO.user.ExchangeObject.prototype.update = function() {
    for (var i in this.AllCallBack) {
        if (typeof(this.AllCallBack[i]) === 'function')
            this.AllCallBack[i]();
    }
};

OpenM_BookDAO.user.ExchangeObject.prototype.addUpdateCommunitiesCallBack = function(c) {
    this.AllCommunitiesCallBack.push(c);
};

OpenM_BookDAO.user.ExchangeObject.prototype.updateCommunities = function() {
    for (var i in this.AllCommunitiesCallBack) {
        if (typeof(this.AllCommunitiesCallBack[i]) === 'function')
            this.AllCommunitiesCallBack[i]();
    }
};


OpenM_BookDAO.user.DAO = {
    me: undefined,
    allUsers: new Array()
};

OpenM_BookDAO.user.DAO.initMe = function(callBack) {
    var user = new OpenM_BookDAO.user.ExchangeObject();
    var callBackFunction = callBack;
    if (callBack === undefined) {
        this.parseAndLoad(OpenM_Book_User.getUserProperties(), user);
        if (user.loaded) {
            this.me = user;
            return true;
        }
        else {
            return false;
        }
    }
    else {
        OpenM_Book_User.getUserProperties(function(data) {
            OpenM_BookDAO.user.DAO.parseAndLoad(data, user);
            OpenM_BookDAO.user.DAO.me = user;
            callBackFunction();
        });
    }
};

OpenM_BookDAO.user.DAO.get = function(userId, allProperties, synchro, reload) {
    var user;
    user = this.allUsers[userId];
    if (!user) {
        user = new OpenM_BookDAO.user.ExchangeObject();
        this.allUsers[userId] = user;
    }
    if (allProperties !== undefined) {
        if (allProperties === true)
            allProperties = OpenM_Book_User.FALSE_PARAMETER_VALUE;
        else
            allProperties = OpenM_Book_User.TRUE_PARAMETER_VALUE;
    }

    if (userId)
        user.id = userId;

    if (reload === true || reload === undefined) {
        if (!synchro)
            OpenM_Book_User.getUserProperties(userId, allProperties, function(data) {
                OpenM_BookDAO.user.DAO.parseAndLoad(data, user);
            });
        else
            this.parseAndLoad(OpenM_Book_User.getUserProperties(userId), allProperties, user);
    }
    return user;
};

OpenM_BookDAO.user.DAO.getCommunities = function(user, withoutAncestors, synchro) {
    if (withoutAncestors === true || withoutAncestors !== undefined)
        withoutAncestors = OpenM_Groups.FALSE_PARAMETER_VALUE;
    else
        withoutAncestors = OpenM_Groups.TRUE_PARAMETER_VALUE;

    if (!synchro)
        OpenM_Groups.getCommunities(user.id, withoutAncestors, function(data) {
            OpenM_BookDAO.user.DAO.parseAndLoadCommunities(data, user);
        });
    else
        this.parseAndLoadCommunities(OpenM_Groups.getCommunities(user, withoutAncestors), user);

    return user;
};

OpenM_BookDAO.user.DAO.parseAndLoad = function(data, user) {
    OpenM_BookGUI.Pages.showJSON(data);
    if (data[OpenM_Book_User.RETURN_STATUS_PARAMETER] === OpenM_Book_User.RETURN_STATUS_OK_VALUE) {
        if (!this.allUsers[data[OpenM_Book_User.RETURN_USER_ID_PARAMETER]])
            this.allUsers[data[OpenM_Book_User.RETURN_USER_ID_PARAMETER]] = user;

        user.id = data[OpenM_Book_User.RETURN_USER_ID_PARAMETER];
        user.firstName = data[OpenM_Book_User.RETURN_USER_FIRST_NAME_PARAMETER];
        user.lastName = data[OpenM_Book_User.RETURN_USER_LAST_NAME_PARAMETER];
        user.name = user.firstName + " " + user.lastName;
        user.isAdmin = (data[OpenM_Book_User.RETURN_USER_IS_ADMIN_PARAMETER] === OpenM_Book_User.TRUE_PARAMETER_VALUE) ? true : false;
        user.loaded = true;

        if (typeof data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER] !== 'undefined') {
            user.otherProperties = new Array();
            for (var i = 0; i < data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER].length; i++) {
                var property = data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER][i];
                if (user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]] === undefined)
                    user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]] = {
                        "var": {
                            "id": property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER],
                            "name": property[OpenM_Book_User.RETURN_USER_PROPERTY_NAME_PARAMETER]
                        },
                        "values": new Array()
                    };
                if (property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER] !== undefined) {
                    user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]].values.push({
                        "id": property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER],
                        "value": property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_PARAMETER]
                    });
                }
            }
        }
        user.update();
    } else {
        if (data[OpenM_Book.RETURN_ERROR_PARAMETER]) {
            OpenM_BookGUI.Pages.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
        } else {
            OpenM_BookGUI.Pages.showError("une erreur inattendue s'est produite. Impossible de chager les données du user (id: " + user.id + ") :(");
        }

    }
};

OpenM_BookDAO.user.DAO.parseAndLoadCommunities = function(data, user) {
    OpenM_BookGUI.Pages.showJSON(data);
    if (data[OpenM_Groups.RETURN_STATUS_PARAMETER] === OpenM_Book_User.RETURN_STATUS_OK_VALUE) {

        user.communities = new Array();
        for (var i = 0; i < data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER].length; i++) {
            var communityJSON = data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER][i];
            var community = OpenM_BookDAO.community.DAO.get(communityJSON[OpenM_Groups.RETURN_GROUP_ID_PARAMETER], false, false);
            if (community.name !== communityJSON[OpenM_Groups.RETURN_GROUP_NAME_PARAMETER]) {
                community.name = communityJSON[OpenM_Groups.RETURN_GROUP_NAME_PARAMETER];
                community.update();
            }
            user.communities.push(community);
        }

        if (typeof data[OpenM_Groups.RETURN_COMMUNITY_ANCESTORS_LIST] !== 'undefined') {
            //TODO
            //        "CAL":{"2543":{"CID":3,"CNA":"Toutes les communautes"},"2546":{"CID":3,"CNA":"Toutes les communautes"},"2555":{"CID":2543,"CNA":"balou"},"2570":{"CID":3,"CNA":"Toutes les communautes"},"2636":{"CID":2570,"CNA":"iiiaaaaab"},"2643":{"CID":2546,"CNA":"djo test 3"},"2696":{"CID":2546,"CNA":"djo test 3"}}}
        }

        user.updateCommunities();
    } else {
        if (data[OpenM_Groups.RETURN_ERROR_PARAMETER]) {
            OpenM_BookGUI.Pages.showError(data[OpenM_Groups.RETURN_ERROR_MESSAGE_PARAMETER]);
        } else {
            OpenM_BookGUI.Pages.showError("une erreur inattendue s'est produite. Impossible de chager les communautés du user (id: " + user.id + ") :(");
        }
    }
};