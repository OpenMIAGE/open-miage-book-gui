if (OpenM_BookDAO === undefined)
    var OpenM_BookDAO = {};

if (OpenM_BookDAO.search === undefined)
    OpenM_BookDAO.search = {};

OpenM_BookDAO.search.ExchangeObject = function(search) {
    this.search = search;
    this.users = new Array();
    this.communities = new Array();
    this.groups = new Array();
    this.allUpdateCallBack = new Array();
};

OpenM_BookDAO.search.ExchangeObject.prototype.addUpdateCallBack = function(callback) {
    this.allUpdateCallBack.push(callback);
};

OpenM_BookDAO.search.ExchangeObject.prototype.update = function() {
    for (var i in this.allUpdateCallBack)
        this.allUpdateCallBack[i]();
};

OpenM_BookDAO.search.ExchangeObject.prototype.reload = function() {
    OpenM_BookDAO.search.DAO.get(this.search);
};

OpenM_BookDAO.search.DAO = {
    allSearch: {},
    nbMaxResults: 15
};

OpenM_BookDAO.search.DAO.get = function(search, nbResultsMax, isUserOnly, synchro, reload) {
    if (isUserOnly === undefined)
        isUserOnly = false;
    if (synchro === undefined)
        synchro = false;
    if (nbResultsMax === undefined)
        nbMaxResults = this.nbMaxResults;
    if (reload === undefined || reload !== false)
        reload = true;

    if (this.allSearch[search] === undefined)
        this.allSearch[search] = new OpenM_BookDAO.search.ExchangeObject(search);

    var result = this.allSearch[search];

    if (reload) {
        if (!synchro) {
            var searchTemp = search.substring(0, search.length - 1);
            while (searchTemp.length > 0 && this.allSearch[searchTemp] === undefined) {
                searchTemp = searchTemp.substring(0, searchTemp.length - 1);
            }
            if (searchTemp.length > 0) {
                result.users = this.allSearch[searchTemp].users;
                result.communities = this.allSearch[searchTemp].communities;
                result.groups = this.allSearch[searchTemp].groups;
            }
            OpenM_Groups.search(search, nbResultsMax, function(data) {
                OpenM_BookDAO.search.DAO.parseAndLoadSearch(data, result);
            });
        }
        else
            this.parseAndLoadSearch(OpenM_Groups.search(search, nbResultsMax), result);
    }
    return result;
};

OpenM_BookDAO.search.DAO.parseAndLoadSearch = function(data, result) {
    OpenM_BookGUI.Pages.showJSON(data);
    if (data[OpenM_Groups.RETURN_STATUS_PARAMETER] === OpenM_Groups.RETURN_STATUS_OK_VALUE) {
        result.users = new Array();
        result.communities = new Array();
        result.groups = new Array();
        for (var i in data[OpenM_Groups.RETURN_RESULT_LIST_PARAMETER]) {
            var r = data[OpenM_Groups.RETURN_RESULT_LIST_PARAMETER][i];
            if (r[OpenM_Groups.RETURN_RESULT_TYPE_PARAMETER] === OpenM_Groups.RETURN_RESULT_TYPE_USER_VALUE) {
                var user = OpenM_BookDAO.user.DAO.get(r[OpenM_Groups.RETURN_RESULT_ID_PARAMETER], undefined, undefined, false);
                if (user.name !== r[OpenM_Groups.RETURN_RESULT_NAME_PARAMETER]) {
                    user.name = r[OpenM_Groups.RETURN_RESULT_NAME_PARAMETER];
                    user.update();
                }
                result.users.push(user);
            } else if (r[OpenM_Groups.RETURN_RESULT_TYPE_PARAMETER] === OpenM_Groups.RETURN_RESULT_TYPE_GENERIC_GROUP_VALUE) {
                var community = OpenM_BookDAO.community.DAO.get(r[OpenM_Groups.RETURN_RESULT_ID_PARAMETER], undefined, false);
                if (community.name !== r[OpenM_Groups.RETURN_RESULT_NAME_PARAMETER]) {
                    community.name = r[OpenM_Groups.RETURN_RESULT_NAME_PARAMETER];
                    community.update();
                }
                result.communities.push(community);
            } else if (r[OpenM_Groups.RETURN_RESULT_TYPE_PARAMETER] === OpenM_Groups.RETURN_RESULT_TYPE_PERSONAL_GROUP_VALUE) {

            }
        }

        if (typeof data[OpenM_Groups.RETURN_COMMUNITY_ANCESTORS_LIST] !== 'undefined') {
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
            
            for (var i in result.communities) {
                defineParent(data, result.communities[i]);
            }
        }

        result.update();
    } else {
        if (data[OpenM_Groups.RETURN_ERROR_PARAMETER]) {
            OpenM_BookGUI.Pages.showError(data[OpenM_Groups.RETURN_ERROR_MESSAGE_PARAMETER]);
        } else {
            OpenM_BookGUI.Pages.showError("une erreur inattendue s'est produite. Impossible de chager les résultats de (search: '" + result.search + "')");
        }
    }
};