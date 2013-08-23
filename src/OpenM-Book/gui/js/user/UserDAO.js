if(typeof(OpenM_BookDAO)==='undefined')
    var OpenM_BookDAO = {};

function OpenM_Book_UserExchangeObject() {
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
}

var OpenM_Book_UserDAO = {
    'initMe': function(callBack) {
        var user = new OpenM_Book_UserExchangeObject();
        var callBackFunction = callBack;
        if (callBack == undefined) {
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
                OpenM_Book_UserDAO.parseAndLoad(data, user);
                OpenM_Book_UserDAO.me = user;
                callBackFunction();
            });
        }
    },
    'me': undefined,
    'allUsers': new Array(),
    'get': function(userId, allProperties, synchro, reload) {
        var user;
        user = this.allUsers[userId];
        if (!user) {
            user = new OpenM_Book_UserExchangeObject();
            this.allUsers[userId] = user;
        }
        if (allProperties != undefined) {
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
                    OpenM_Book_UserDAO.parseAndLoad(data, user)
                });
            else
                this.parseAndLoad(OpenM_Book_User.getUserProperties(userId), allProperties, user);
        }
        return user;
    },
    'parseAndLoad': function(data, user) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book_User.RETURN_STATUS_PARAMETER] == OpenM_Book_User.RETURN_STATUS_OK_VALUE) {
            if (!this.allUsers[data[OpenM_Book_User.RETURN_USER_ID_PARAMETER]])
                this.allUsers[data[OpenM_Book_User.RETURN_USER_ID_PARAMETER]] = user;

            user.id = data[OpenM_Book_User.RETURN_USER_ID_PARAMETER];
            user.firstName = data[OpenM_Book_User.RETURN_USER_FIRST_NAME_PARAMETER];
            user.lastName = data[OpenM_Book_User.RETURN_USER_LAST_NAME_PARAMETER];
            user.name = user.firstName + " " + user.lastName;
            user.isAdmin = (data[OpenM_Book_User.RETURN_USER_IS_ADMIN_PARAMETER] == OpenM_Book_User.TRUE_PARAMETER_VALUE) ? true : false;
            user.loaded = true;

            if (typeof data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER] != 'undefined') {
                user.otherProperties = new Array();
                for (var i = 0; i < data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER].length; i++) {
                    var property = data[OpenM_Book_User.RETURN_USER_PROPERTY_LIST_PARAMETER][i];
                    if (user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]] == undefined)
                        user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]] = {
                            "var": {
                                "id": property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER],
                                "name": property[OpenM_Book_User.RETURN_USER_PROPERTY_NAME_PARAMETER]
                            },
                            "values": new Array()
                        };
                    if (property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER] != undefined) {
                        user.otherProperties[property[OpenM_Book_User.RETURN_USER_PROPERTY_ID_PARAMETER]].values.push({
                            "id": property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_ID_PARAMETER],
                            "value": property[OpenM_Book_User.RETURN_USER_PROPERTY_VALUE_PARAMETER]
                        });
                    }
                }
            }
        } else {
            if (data[OpenM_Book.RETURN_ERROR_PARAMETER]) {
                OpenM_BookGUI.Pages.showError(data[OpenM_Book.RETURN_ERROR_MESSAGE_PARAMETER]);
            } else {
                OpenM_BookGUI.Pages.showError("une erreur inattendue s'est produite. Impossible de chager les données d'une communauté (id: " + community.id + ") :(");
            }

        }
    }
}