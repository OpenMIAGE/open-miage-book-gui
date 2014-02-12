if (OpenM_BookDAO === undefined)
    var OpenM_BookDAO = {};

if (OpenM_BookDAO.user === undefined)
    OpenM_BookDAO.user = {};

OpenM_BookDAO.user.ExchangeObject = function() {
    this.id = '';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.birthday = undefined;
    this.birthdayDisplayYear = false;
    this.isAdmin = false;
    this.loaded = false;
    this.validIn = new Array();
    this.notValidIn = new Array();
    this.otherProperties = new Array();
    this.communities = new Array();

    this.AllCallBack = new Array();
    this.AllCommunitiesCallBack = new Array();
};

OpenM_BookDAO.user.ExchangeObject.prototype.removePropertyValue = function(field, value) {
    var controller = this;
    OpenM_Book_User.removePropertyValue(value.id, function(data) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book_User.RETURN_STATUS_PARAMETER] === OpenM_Book_User.RETURN_STATUS_OK_VALUE) {
            delete controller.otherProperties[field.id].values[value.id];
            controller.update();
        }
    });
};

OpenM_BookDAO.user.ExchangeObject.prototype.addPropertyValue = function(field, value) {
    var controller = this;
    OpenM_Book_User.addPropertyValue(field.id, value, function(data) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book_User.RETURN_STATUS_PARAMETER] === OpenM_Book_User.RETURN_STATUS_OK_VALUE) {
            controller.otherProperties[field.id]
                    .values[data[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER]] = {
                "id": data[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER],
                "value": value
            },
            controller.update();
        }
    });
};

OpenM_BookDAO.user.ExchangeObject.prototype.setPropertyValue = function(fieldId, valueId, value) {
    var controller = this;
    var v = controller.otherProperties[fieldId].values[valueId].value;
    controller.otherProperties[fieldId].values[valueId].value = value;
    controller.update();
    OpenM_Book_User.setPropertyValue(valueId, value, function(data) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book_User.RETURN_ERROR_PARAMETER] !== undefined) {
            controller.otherProperties[fieldId].values[valueId].value = v;
            controller.update();
        }
    });
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

OpenM_BookDAO.user.DAO.get = function(userId, basicOnly, synchro, reload) {
    var user;
    user = this.allUsers[userId];
    if (!user) {
        user = new OpenM_BookDAO.user.ExchangeObject();
        this.allUsers[userId] = user;
    }
    if (basicOnly !== undefined) {
        if (basicOnly === false)
            basicOnly = OpenM_Book_User.FALSE_PARAMETER_VALUE;
        else
            basicOnly = OpenM_Book_User.TRUE_PARAMETER_VALUE;
    } else
        basicOnly = null;

    if (userId)
        user.id = userId;

    if (reload === true || reload === undefined) {
        if (synchro === false || synchro === undefined)
            OpenM_Book_User.getUserProperties(userId, basicOnly, function(data) {
                OpenM_BookDAO.user.DAO.parseAndLoad(data, user);
            });
        else
            this.parseAndLoad(OpenM_Book_User.getUserProperties(userId), basicOnly, user);
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

        if (typeof data[OpenM_Book_User.RETURN_USER_BIRTHDAY_PARAMETER] !== 'undefined') {
            user.birthday = data[OpenM_Book_User.RETURN_USER_BIRTHDAY_PARAMETER];
            if (typeof data[OpenM_Book_User.RETURN_USER_BIRTHDAY_DISPLAY_YEAR_PARAMETER] !== 'undefined')
                user.birthdayDisplayYear = (data[OpenM_Book_User.RETURN_USER_BIRTHDAY_DISPLAY_YEAR_PARAMETER] === OpenM_Book_User.TRUE_PARAMETER_VALUE) ? true : false;
        }

        if (typeof data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER] !== 'undefined') {
            user.otherProperties = new Array();
            for (var i in data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER]) {
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
                    user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]].values[property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER]] = {
                        "id": property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER],
                        "value": property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_PARAMETER]
                    };
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
    if (data[OpenM_Groups.RETURN_STATUS_PARAMETER] === OpenM_Groups.RETURN_STATUS_OK_VALUE) {
        if (data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER] !== undefined) {
            user.communities = new Array();
            user.communitiesNotValidated = new Array();
            var defaultCommunity = undefined;
            for (var i in data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER]) {
                var json = data[OpenM_Groups.RETURN_GROUP_LIST_PARAMETER][i];
                var community = OpenM_BookDAO.community.DAO.get(json[OpenM_Groups.RETURN_GROUP_ID_PARAMETER], false, false);
                defaultCommunity = community;
                if (community.name !== json[OpenM_Groups.RETURN_GROUP_NAME_PARAMETER]) {
                    community.name = json[OpenM_Groups.RETURN_GROUP_NAME_PARAMETER];
                    community.update();
                }
                if (json[OpenM_Groups.RETURN_USER_VALIDATED_IN_COMMUNITY_PARAMETER] === OpenM_Groups.TRUE_PARAMETER_VALUE)
                    user.communities[community.id] = community;
                else
                    user.communitiesNotValidated[community.id] = community;
            }

            function defineParent(d, c) {
                c.ancestorsLoaded = true;
                if (c === undefined)
                    return;
                if (c.parent === undefined && d[OpenM_Groups.RETURN_COMMUNITY_ANCESTORS_LIST][c.id] === undefined)
                    return;
                if (c.parent === undefined) {
                    var json = d[OpenM_Groups.RETURN_COMMUNITY_ANCESTORS_LIST][c.id];
                    c.parent = OpenM_BookDAO.community.DAO.get(json[OpenM_Groups.RETURN_COMMUNITY_ID_PARAMETER], false, false);
                    c.parent.childs[c.id] = c;
                    if (c.parent.name !== json[OpenM_Groups.RETURN_COMMUNITY_NAME_PARAMETER]) {
                        c.parent.name = json[OpenM_Groups.RETURN_COMMUNITY_NAME_PARAMETER];
                        c.parent.update();
                    }
                    defineParent(d, c.parent);
                }
            }

            if (typeof data[OpenM_Groups.RETURN_COMMUNITY_ANCESTORS_LIST] !== 'undefined') {
                for (var i in user.communities) {
                    defineParent(data, user.communities[i]);
                }
                for (var i in user.communitiesNotValidated) {
                    defineParent(data, user.communitiesNotValidated[i]);
                }
            }
            if (defaultCommunity !== undefined) {
                function getRoot(c) {
                    if (c.parent !== undefined)
                        return getRoot(c.parent);
                    return c;
                }
                OpenM_BookDAO.community.DAO.root = getRoot(defaultCommunity);
            }

            user.updateCommunities();
        }
    } else {
        if (data[OpenM_Groups.RETURN_ERROR_PARAMETER]) {
            OpenM_BookGUI.Pages.showError(data[OpenM_Groups.RETURN_ERROR_MESSAGE_PARAMETER]);
        } else {
            OpenM_BookGUI.Pages.showError("une erreur inattendue s'est produite. Impossible de chager les communautés du user (id: " + user.id + ") :(");
        }
    }
};