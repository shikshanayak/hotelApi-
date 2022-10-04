"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
class AdminGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        console.log(req.headers.authorization);
        const [, token] = req.headers.authorization.split(' ');
        if (!token)
            throw new common_1.UnauthorizedException("token is there");
        return req.user.isAdmin;
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map