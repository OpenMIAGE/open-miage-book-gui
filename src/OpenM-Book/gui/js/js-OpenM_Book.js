var OpenM_Book = { 
    'RETURN_USER_PROPERTY_LIST_PARAMETER': 'UPL',  
    'RETURN_USER_GROUP_PROPERTY_VISIBILITY_LIST_PARAMETER': 'PGVL',  
    'RETURN_USER_PROPERTY_ID_PARAMETER': 'PID',  
    'RETURN_USER_PROPERTY_VALUE_ID_PARAMETER': 'PVID',  
    'RETURN_USER_PROPERTY_NAME_PARAMETER': 'UPN',  
    'RETURN_USER_FIRST_NAME_PARAMETER': 'UFN',  
    'RETURN_USER_LAST_NAME_PARAMETER': 'ULN',  
    'RETURN_USER_PHOTO_PARAMETER': 'UPH',  
    'RETURN_USER_PROPERTY_VALUE_PARAMETER': 'UPV',  
    'RETURN_USER_IS_ADMIN_PARAMETER': 'UIA',  
    'FIRST_NAME_PROPERTY_VALUE_ID': -1,  
    'NAME_PROPERTY_VALUE_ID': -2,  
    'PHOTO_ID_PROPERTY_VALUE_ID': -3,  
    'BIRTHDAY_ID_PROPERTY_VALUE_ID': -4,  
    'AGE_LIMIT_TO_REGISTER': 13,  
    'PROPERTY_NAME_PATTERN': '/^[a-z](([a-z]|\.)*[a-z])?$/',  
    'RETURN_ERROR_MESSAGE_USER_ALREADY_REGISTERED_VALUE': 'User already registered',  
    'RETURN_ERROR_MESSAGE_YOU_ARE_TOO_YOUNG_VALUE': 'You\'re too young to register, the age limit is 13 years old',  
    'RETURN_ERROR_MESSAGE_PROPERTY_NOTFOUND_VALUE': 'Property not found',  
    'SIGNAL_TYPE_BUG': 'BUG',  
    'RETURN_ERROR_MESSAGE_USER_NOT_REGISTERED_VALUE': 'you\'re not registered',  
    'RETURN_ERROR_MESSAGE_USER_NOT_ACTIVATED_VALUE': 'you\'re not activated',  
    'RETURN_ERROR_MESSAGE_USER_NOT_FOUND_VALUE': 'user not found',  
    'RETURN_ERROR_MESSAGE_GROUP_NOT_FOUND_VALUE': 'group not found',  
    'RETURN_USER_LIST_PARAMETER': 'USER_LIST',  
    'RETURN_USER_ID_PARAMETER': 'ID',  
    'USER_ID_PARAMETER_PATERN': '/^[1-9][0-9]*$/',  
    'GROUP_ID_PARAMETER_PATERN': '/^[1-9][0-9]*$/',  
    'ID_PARAMETER_PATERN': '/^[1-9][0-9]*$/',  
    'RETURN_COMMUNITY_NAME_PARAMETER': 'CNA',  
    'RETURN_COMMUNITY_ID_PARAMETER': 'CID',  
    'RETURN_COMMUNITY_PARENT_PARAMETER': 'CPP',  
    'RETURN_COMMUNITY_CHILDS_PARAMETER': 'CCP',  
    'RETURN_YOU_ARE_COMMUNITY_MODERATOR_PARAMETER': 'YACM',  
    'RETURN_YOU_ARE_BANNED_PARAMETER': 'YAB',  
    'RETURN_USER_CAN_ADD_COMMUNITY_PARAMETER': 'UCAC',  
    'RETURN_FORBIDDEN_TO_ADD_COMMUNITY_PARAMETER': 'FTAC',  
    'RETURN_USER_CAN_REGISTER_PARAMETER': 'UCR',  
    'RETURN_ERROR_PARAMETER': 'ERROR',  
    'RETURN_ERROR_CODE_PARAMETER': 'ERROR_CODE',  
    'RETURN_VOID_PARAMETER': 'VOID',  
    'RETURN_ERROR_MESSAGE_PARAMETER': 'ERROR_MESSAGE',  
    'RETURN_STATUS_PARAMETER': 'STATUS',  
    'RETURN_STATUS_OK_VALUE': 'OK',  
    'RETURN_ERROR_MESSAGE_ONLY_CALLABLE_BY_API_VALUE': 'Restricted to API usage only',  
    'RETURN_ERROR_MESSAGE_ONLY_CALLABLE_BY_USER_VALUE': 'Restricted to USER usage only',  
    'RETURN_ERROR_MESSAGE_UNKNOWN_VALUE': 'Unknown error occurs',  
    'TRUE_PARAMETER_VALUE': 'true',  
    'FALSE_PARAMETER_VALUE': 'false',  
    'r': '/open-miage-book-gui/http/api/?api=OpenM_Book&method=', 
    'addCommunity': function(name, communityParentId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'addCommunity', 
            data: {arg1: name, arg2: communityParentId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'registerMeIntoCommunity': function(communityId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'registerMeIntoCommunity', 
            data: {arg1: communityId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'modifyMyVisibilityOnCommunity': function(communityId, visibleByGroupAndCommunityIdJSONList, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'modifyMyVisibilityOnCommunity', 
            data: {arg1: communityId, arg2: visibleByGroupAndCommunityIdJSONList, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'addPropertyValue': function(propertyId, propertyValue, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'addPropertyValue', 
            data: {arg1: propertyId, arg2: propertyValue, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'getCommunity': function(communityId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'getCommunity', 
            data: {arg1: communityId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined){
            ajax.async = false;
            var retour;
            ajax.success = function(r){
                retour = r;
            }
            $.ajax(ajax);
            return retour;
        }             
        else{
            ajax.success = function(r){callback_function(r)};
            $.ajax(ajax);
        } 
    }, 
    'getCommunityAncestors': function(communityId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'getCommunityAncestors', 
            data: {arg1: communityId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined){
            ajax.async = false; 
            var retour;
            ajax.success = function(r){
                retour = r;
            }
            $.ajax(ajax);
            return retour;
        }  
        else{
            ajax.success = function(r){callback_function(r)};
            $.ajax(ajax);
        }   
    }, 
    'getCommunityParent': function(communityId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'getCommunityParent', 
            data: {arg1: communityId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'getCommunityUsers': function(communityJSONList, start, numberOfResult, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'getCommunityUsers', 
            data: {arg1: communityJSONList, arg2: start, arg3: numberOfResult, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'getNotValidUsers': function(communityJSONList, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'getNotValidUsers', 
            data: {arg1: communityJSONList, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'getUserProperties': function(userId, basicOnly, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'getUserProperties', 
            data: {arg1: userId, arg2: basicOnly, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'registerMe': function(firstName, lastName, birthDay, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'registerMe', 
            data: {arg1: firstName, arg2: lastName, arg3: birthDay, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'removeMeFromCommunity': function(communistyId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'removeMeFromCommunity', 
            data: {arg1: communistyId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'removePropertyValue': function(propertyValueId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'removePropertyValue', 
            data: {arg1: propertyValueId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'setPropertyValue': function(propertyValueId, propertyValue, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'setPropertyValue', 
            data: {arg1: propertyValueId, arg2: propertyValue, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'setPropertyVisibility': function(propertyValueId, visibilityGroupJSONList, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'setPropertyVisibility', 
            data: {arg1: propertyValueId, arg2: visibilityGroupJSONList, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'unRegisterMe': function(callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'unRegisterMe', 
            data: {ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'validateUser': function(userId, communityId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'validateUser', 
            data: {arg1: userId, arg2: communityId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'buildMyData': function(callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'buildMyData', 
            data: {ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'invitPeople': function(mailJSONList, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'invitPeople', 
            data: {arg1: mailJSONList, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'signal': function(url, message, type, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'signal', 
            data: {arg1: url, arg2: message, arg3: type, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'signalUser': function(userId, message, groupId, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'signalUser', 
            data: {arg1: userId, arg2: message, arg3: groupId, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
    'signalCommunity': function(communityId, message, callback_function){ 
        var ajax = { 
            type: "POST", 
            url: this.r+'signalCommunity', 
            data: {arg1: communityId, arg2: message, ok:1}, 
            dataType: "json" 
        }; 
        if(callback_function===undefined) 
            ajax.async = false; 
        else  
            ajax.success = function(r){callback_function(r)}; 
        $.ajax(ajax); 
    }, 
  'ok':1 
};