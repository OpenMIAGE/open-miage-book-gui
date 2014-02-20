if (OpenM_BookDAO === undefined)
    var OpenM_BookDAO = {};

if (OpenM_BookDAO.community === undefined)
    OpenM_BookDAO.community = {};

/**
 * La classe Community, gere data de la commu
 */
OpenM_BookDAO.community.ExchangeObject = function() {

    this.id = '';
    this.name = '';
    this.childs = new Array();
    this.nbChild = 0;
    this.userCanAddSubCommunity = false;
    this.moderatorCanAddSubCommunity = false;
    this.adminCanAddSubCommunity = false;
    this.userCanRegister = false;
    this.userIsBanned = false;
    this.userAlreadyRegistred = false;
    this.userIsModerator = false;
    this.forbidenToAddSubCommunity = false;
    this.cantBeRemoved = true;
    this.childsFamily = undefined;
    this.validationRequired = true;
    this.parent = undefined;
    this.ancestors = new Array();
    this.nbAncestor = 0;
    this.ancestorsLoaded = false;
    this.users = new Array();
    this.usersNotValidTree = new Array();
    this.loaded = false;

    this.AllCallBack = new Array();
    this.AllUsersCallBack = new Array();
    this.AllUsersNotValidCallBack = new Array();
};

OpenM_BookDAO.community.ExchangeObject.prototype.addChild = function(community) {
    if (this.childs[community.id] === undefined) {
        this.childs[community.id] = community;
        community.parent = this;
        this.nbChild++;
    }
};

OpenM_BookDAO.community.ExchangeObject.prototype.removeChild = function(community) {
    if (this.childs[community.id]) {
        delete this.childs[community.id];
        this.nbChild--;
    }
};

/* permet de savoir si il y a des actions a effectuer sur la communauté */
OpenM_BookDAO.community.ExchangeObject.prototype.userCanMakeAction = function() {
    var retour = false;
    if (this.userCanAddSubCommunity)
        retour = true;
    if (this.userCanRegister)
        retour = true;
    return retour;
};

/* par récurcivité, récupérent les ancetres, si on n'a pas d'ancetre, on fait une requete au srv' */
OpenM_BookDAO.community.ExchangeObject.prototype.getAncestors = function(ancestorsArray) {
    if (ancestorsArray === undefined)
        ancestorsArray = new Array();

    if (!this.ancestorsLoaded && this.parent && this.parent.ancestorsLoaded)
        this.ancestorsLoaded = true;

    if (!this.ancestorsLoaded) {
        OpenM_BookDAO.community.DAO.getAncestors(this, true);
        this.ancestorsLoaded = true;
    }

    if (this.parent === undefined)
        return ancestorsArray;

    this.parent.getAncestors(ancestorsArray);
    ancestorsArray.push(this.parent);

    return ancestorsArray;
};

OpenM_BookDAO.community.ExchangeObject.prototype.rename = function(newName) {
    var community = this;
    var name = newName;
    OpenM_Book_Moderator.renameCommunity(this.id, newName, function(data) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            community.name = name;
            community.update();
        }
    });
};

OpenM_BookDAO.community.ExchangeObject.prototype.registerMe = function() {
    var community = this;
    OpenM_Book.registerMeIntoCommunity(this.id, function(data) {
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            community.userAlreadyRegistred = true;
            if (community.validationRequired) {
                if (community.usersNotValidTree[OpenM_BookDAO.user.DAO.me.id] === undefined)
                    community.usersNotValidTree[OpenM_BookDAO.user.DAO.me.id] = new Array();
                community.usersNotValidTree[OpenM_BookDAO.user.DAO.me.id][community.id] = {'community': community, 'isAlreadyAcceptedByUser': true};
                community.updateUsersNotValid();
            }
            else {
                community.users[OpenM_BookDAO.user.DAO.me.id] = OpenM_BookDAO.user.DAO.me;
                community.updateUsers();
            }
            community.update();
        }
    });
};

OpenM_BookDAO.community.ExchangeObject.prototype.unRegisterMe = function() {
    var community = this;
    OpenM_Book.removeMeFromCommunity(this.id, function(data) {
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            community.userAlreadyRegistred = false;
            var remove = function(c) {
                if (c.users[OpenM_BookDAO.user.DAO.me.id] !== undefined) {
                    delete c.users[OpenM_BookDAO.user.DAO.me.id];
                    delete OpenM_BookDAO.user.DAO.me.communities[c.id];
                    OpenM_BookDAO.user.DAO.me.updateCommunities();
                    c.updateUsers();
                }
                if (c.usersNotValidTree[OpenM_BookDAO.user.DAO.me.id] !== undefined) {
                    if (c.usersNotValidTree[OpenM_BookDAO.user.DAO.me.id][c.id] !== undefined) {
                        delete c.usersNotValidTree[OpenM_BookDAO.user.DAO.me.id][c.id];
                        c.updateUsersNotValid();
                    }
                }
                if (c.parent !== undefined)
                    remove(c.parent);
            };
            remove(community);
            community.update();
        }
    });
};

OpenM_BookDAO.community.ExchangeObject.prototype.validateUser = function(user, reason) {
    var community = this;
    var u = user;
    var r = reason;
    OpenM_Book.voteForUser(u.id, this.id, r, function(data) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            /* TODO */
        }
    });
};

OpenM_BookDAO.community.ExchangeObject.prototype.addUpdateCallBack = function(c) {
    this.AllCallBack.push(c);
};

OpenM_BookDAO.community.ExchangeObject.prototype.addUpdateUsersCallBack = function(c) {
    this.AllUsersCallBack.push(c);
};

OpenM_BookDAO.community.ExchangeObject.prototype.addUpdateUsersNotValidCallBack = function(c) {
    this.AllUsersNotValidCallBack.push(c);
};

OpenM_BookDAO.community.ExchangeObject.prototype.update = function() {
    for (var i in this.AllCallBack) {
        if (typeof(this.AllCallBack[i]) === 'function')
            this.AllCallBack[i]();
    }
};

OpenM_BookDAO.community.ExchangeObject.prototype.updateUsers = function() {
    for (var i in this.AllUsersCallBack) {
        if (typeof(this.AllUsersCallBack[i]) === 'function')
            this.AllUsersCallBack[i](this);
    }
};

OpenM_BookDAO.community.ExchangeObject.prototype.updateUsersNotValid = function() {
    for (var i in this.AllUsersNotValidCallBack) {
        if (typeof(this.AllUsersNotValidCallBack[i]) === 'function')
            this.AllUsersNotValidCallBack[i](this);
    }
};


OpenM_BookDAO.community.DAO = {
    root: undefined,
    allCommunities: new Array(),
    get: function(communityId, synchro, reload) {
        var community;
        community = this.allCommunities[communityId];
        if (!community) {
            community = new OpenM_BookDAO.community.ExchangeObject();
            this.allCommunities[communityId] = community;
        }

        if (communityId)
            community.id = communityId;

        if (reload === true || reload === undefined) {
            if (!synchro)
                OpenM_Book.getCommunity(communityId, function(data) {
                    OpenM_BookDAO.community.DAO.parseAndLoad(data, community);
                });
            else
                this.parseAndLoad(OpenM_Book.getCommunity(communityId), community);
        }
        return community;
    },
    getAncestors: function(community, synchro) {
        if (synchro !== true) {
            OpenM_Book.getCommunityAncestors(community.id, function(data) {
                OpenM_BookDAO.community.DAO.parseAndLoadAncestors(data, community);
            });
            return null;
        }
        else
            return this.parseAndLoadAncestors(OpenM_Book.getCommunityAncestors(community.id), community);
    },
    getUsers: function(community, synchro) {
        if (synchro === undefined || synchro === true) {
            var c = community;
            OpenM_Book.getCommunityUsers(c.id, function(data) {
                OpenM_BookDAO.community.DAO.parseUsers(data, c);
                c.updateUsers();
            });
        }
        return community.users;
    },
    getUsersNotValid: function(community, synchro) {
        if (synchro === undefined || synchro === true) {
            var c = community;
            OpenM_Book.getCommunityNotValidUsers(c.id, function(data) {
                OpenM_BookDAO.community.DAO.parseUsersNotValid(data, c);
                c.updateUsersNotValid();
            });
        }
        return community.usersNotValidTree;
    },
    addCommunity: function(name, communityId) {
        var community = this.allCommunities[communityId];
        var n = name;
        if (community) {
            OpenM_Book.addCommunity(name, communityId, function(data) {
                OpenM_BookGUI.Pages.showJSON(data);
                if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
                    var c = new OpenM_BookDAO.community.ExchangeObject();
                    c.id = data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
                    c.parent = community;
                    c.name = n;
                    c.ancestorsLoaded = community.ancestorsLoaded;
                    OpenM_BookDAO.community.DAO.allCommunities[c.id] = c;
                    community.addChild(c);
                    community.update();
                }
            });
        }
    },
    removeCommunity: function(communityId) {
        var community = this.allCommunities[communityId];
        if (community) {
            OpenM_Book_Moderator.removeCommunity(community.id, function(data) {
                OpenM_BookGUI.Pages.showJSON(data);
                if (data[OpenM_Book_Moderator.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
                    var parent = community.parent;
                    parent.removeChild(community);
                    delete OpenM_BookDAO.community.DAO.allCommunities[community.id];
                    OpenM_BookController.commons.URL.clickToCommunity(parent);
                }
            });
        }
    },
    parseAndLoad: function(data, community) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            if (!this.allCommunities[data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]])
                this.allCommunities[data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]] = community;

            community.id = data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
            community.name = data[OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
            community.userCanAddSubCommunity = (data[OpenM_Book.RETURN_USER_CAN_ADD_COMMUNITY_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.moderatorCanAddSubCommunity = (data[OpenM_Book.RETURN_MODERATOR_CAN_ADD_COMMUNITY_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.adminCanAddSubCommunity = (data[OpenM_Book.RETURN_ADMIN_CAN_ADD_COMMUNITY_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.forbidenToAddSubCommunity = (data[OpenM_Book.RETURN_FORBIDDEN_TO_ADD_COMMUNITY_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.userCanRegister = (data[OpenM_Book.RETURN_USER_CAN_REGISTER_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.userIsBanned = (data[OpenM_Book.RETURN_YOU_ARE_BANNED_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.userAlreadyRegistred = (data[OpenM_Book.RETURN_USER_ALREADY_REGISTERED_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.userIsModerator = (data[OpenM_Book.RETURN_YOU_ARE_COMMUNITY_MODERATOR_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.cantBeRemoved = (data[OpenM_Book.RETURN_COMMUNITY_CANT_BE_REMOVED_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            community.validationRequired = (data[OpenM_Book.RETURN_REGISTRATION_VALIDATION_REQUIRED_PARAMETER] === OpenM_Book.TRUE_PARAMETER_VALUE) ? true : false;
            if (data[OpenM_Book.RETURN_COMMUNITIES_CHILDS_FAMILY] !== undefined)
                community.childsFamily = data[OpenM_Book.RETURN_COMMUNITIES_CHILDS_FAMILY];

            if (typeof data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER] !== 'undefined') {
                var liste = new Array();
                for (var i in data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER]) {
                    var subCommunity = this.allCommunities[data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER][i][OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]];
                    var subCommunityJSON = data[OpenM_Book.RETURN_COMMUNITY_CHILDS_PARAMETER][i];

                    if (!subCommunity) {
                        subCommunity = new OpenM_BookDAO.community.ExchangeObject();
                        subCommunity.id = subCommunityJSON[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
                        this.allCommunities[subCommunity.id] = subCommunity;
                    }

                    var name = subCommunityJSON[OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                    if (subCommunity.name !== name) {
                        subCommunity.name = name;
                        subCommunity.update();
                    }
                    subCommunity.parent = community;
                    if (!community.ancestorsLoaded && community.parent && community.parent.ancestorsLoaded)
                        community.ancestorsLoaded = true;
                    if (community.ancestorsLoaded)
                        subCommunity.ancestorsLoaded = true;
                    community.addChild(subCommunity);
                    liste[subCommunity.id] = subCommunity;
                }
                $.each(community.childs, function(key, value) {
                    if (value && liste[value.id] === 'undefined')
                        community.childs[key] === undefined;
                });
            }
            community.loaded = true;
            community.update();
        }
    },
    parseAndLoadAncestors: function(data, community) {
        var ancestors = new Array();
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            if (data[community.id]) {
                var Idparent = data[community.id][OpenM_Book.RETURN_COMMUNITY_PARENT_PARAMETER];
                var communityTmp = community;

                for (var i in data) {
                    if (i !== OpenM_Book.RETURN_STATUS_PARAMETER) {
                        var parentCommunity = this.allCommunities[Idparent];
                        if (!parentCommunity) {
                            parentCommunity = new OpenM_BookDAO.community.ExchangeObject();
                            parentCommunity.id = Idparent;
                            parentCommunity.name = data[communityTmp.id][OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                            parentCommunity.ancestorsLoaded = true;
                            this.allCommunities[parentCommunity.id] = parentCommunity;
                        }
                        else {
                            if (data[communityTmp.id][OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER] !== parentCommunity.name) {
                                parentCommunity.name = data[communityTmp.id][OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                                parentCommunity.update();
                            }

                        }
                        communityTmp.parent = parentCommunity;
                        communityTmp.ancestorsLoaded = true;
                        ancestors.push(parentCommunity);
                        if (data[Idparent]) {
                            Idparent = data[Idparent][OpenM_Book.RETURN_COMMUNITY_PARENT_PARAMETER];
                            communityTmp = parentCommunity;
                        } else {
                            /* la commu parent est introuvable ds le tableau on sort */
                            break;
                        }
                    }
                }

                if (OpenM_BookDAO.community.DAO.root === undefined) {
                    var c = community;
                    while (c.parent !== undefined)
                        c = c.parent;
                    OpenM_BookDAO.community.DAO.root = c;
                }
            }
            for (var k in community.childs) {
                community.childs[k].ancestorsLoaded = true;
            }
            community.ancestorsLoaded = true;
        }
    },
    parseUsers: function(data, community) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            var user;
            var users = new Array();
            var i;
            var u;
            for (i in data[OpenM_Book.RETURN_USER_LIST_PARAMETER]) {
                u = data[OpenM_Book.RETURN_USER_LIST_PARAMETER][i];
                user = OpenM_BookDAO.user.DAO.get(u[OpenM_Book.RETURN_USER_ID_PARAMETER], false, false, false);
                user.name = u[OpenM_Book.RETURN_USER_NAME_PARAMETER];
                users[user.id] = user;
                user.validIn[community.id] = community;
            }
            for (i in community.users) {
                u = community.users[i];
                if (users[u.id] === undefined)
                    community.users[i] = undefined;
            }
            for (i in users) {
                u = users[i];
                if (community.users[u.id] === undefined)
                    community.users[u.id] = u;
            }
            community.updateUsers();
        }
    },
    parseUsersNotValid: function(data, community) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            var user;
            var users = new Array();
            var i;
            var u;
            var communityId;
            var communityTemp;
            community.usersNotValidTree = new Array();
            for (i in data[OpenM_Book.RETURN_USER_LIST_PARAMETER]) {
                u = data[OpenM_Book.RETURN_USER_LIST_PARAMETER][i];
                user = OpenM_BookDAO.user.DAO.get(u[OpenM_Book.RETURN_USER_ID_PARAMETER], false, false, false);
                user.name = u[OpenM_Book.RETURN_USER_NAME_PARAMETER];
                users[user.id] = user;
                communityId = u[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER];
                communityTemp = OpenM_BookDAO.community.DAO.allCommunities[communityId];
                if (communityTemp === undefined) {
                    communityTemp = new OpenM_BookDAO.community.ExchangeObject();
                    communityTemp.id = communityId;
                    communityTemp.name = u[OpenM_Book.RETURN_COMMUNITY_NAME_PARAMETER];
                }
                if (community.usersNotValidTree[user.id] === undefined)
                    community.usersNotValidTree[user.id] = new Array();
                community.usersNotValidTree[user.id][communityTemp.id] = {community: communityTemp,
                    isAlreadyAcceptedByUser: (u[OpenM_Book.RETURN_COMMUNITY_USER_ALREADY_ACCEPTED_BY_YOU] > 0) ? true : false};
            }
            community.updateUsersNotValid();
        }
    }
};