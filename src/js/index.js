export default {
    install: (app, options) => {
        app.config.globalProperties.can = function (value) {
            let permissions = (options.inertiaJS) ? options.accessRights.permissions : window.Laravel.jsPermissions.permissions
            let _return = false

            //console.log(permissions);

            if (permissions == 0) {
                return false
            }

            // allow all if superiorRole is defined in options and current user has superiorRole
            if (options.superiorRole) {
                let roles = (options.inertiaJS) ? options.accessRights.roles : window.Laravel.jsPermissions.roles

                if (roles.includes(options.superiorRole)) {
                    return true
                }
            }

            if (!Array.isArray(permissions)) {
                return false
            }

            // check for wildcard permission
            if (value.includes('.')) {
                let wildcardPermisssion = value.split(".")[0];

                if (permissions.includes(wildcardPermisssion)) {
                    return true
                }
            }

            if (value.includes('|')) {
                value.split('|').forEach(function (item) {
                    if (permissions.includes(item.trim())) {
                        _return = true
                    }
                })
            } else if (value.includes('&')) {
                _return = true
                value.split('&').forEach(function (item) {
                    if (!permissions.includes(item.trim())) {
                        _return = false
                    }
                })
            } else {
                _return = permissions.includes(value.trim())
            }
            return _return
        }
        app.config.globalProperties.is = function (value) {
            let roles = (options.inertiaJS) ? options.accessRights.roles : window.Laravel.jsPermissions.roles
            let _return = false

            if (roles == 0) {
                return false
            }

            if (!Array.isArray(roles)) {
                return false
            }
            if (value.includes('|')) {
                value.split('|').forEach(function (item) {
                    if (roles.includes(item.trim())) {
                        _return = true
                    }
                })
            } else if (value.includes('&')) {
                _return = true
                value.split('&').forEach(function (item) {
                    if (!roles.includes(item.trim())) {
                        _return = false
                    }
                })
            } else {
                _return = roles.includes(value.trim())
            }
            return _return
        }
    }
}
