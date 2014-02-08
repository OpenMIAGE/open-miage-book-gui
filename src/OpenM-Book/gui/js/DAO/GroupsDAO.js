if (OpenM_BookDAO === undefined)
    var OpenM_BookDAO = {};

if (OpenM_BookDAO.group === undefined)
    OpenM_BookDAO.group = {};

/**
 * La classe Community, gere data de la commu
 */
OpenM_BookDAO.group.ExchangeObject = function() {
    
};

OpenM_BookDAO.group.DAO = {
    all: new Array(),
    parseAndLoad: function(data, community) {
        OpenM_BookGUI.Pages.showJSON(data);
        if (data[OpenM_Book.RETURN_STATUS_PARAMETER] === OpenM_Book.RETURN_STATUS_OK_VALUE) {
            if (!this.all[data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]])
                this.all[data[OpenM_Book.RETURN_COMMUNITY_ID_PARAMETER]] = community;
            
        }
    }
};