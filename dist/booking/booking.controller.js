"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_guard_1 = require("../guard/auth.guard");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const booking_service_1 = require("./booking.service");
let BookingController = class BookingController {
    constructor(service, userService) {
        this.service = service;
        this.userService = userService;
    }
    bookRoomByUser(body, req) {
        console.log(req.user);
        const user = req.user;
        const { roomno } = body;
        return this.service.bookRoomByUser(parseInt(roomno), user);
    }
    getAllrooms(req) {
        const user = req.user.IsAvailable;
        return this.service.getAllAvailablerooms(user);
    }
    checkout(req) {
        const user = req.user;
        return this.service.checkout(user);
    }
};
__decorate([
    (0, common_1.Post)('/bookroom'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "bookRoomByUser", null);
__decorate([
    (0, common_1.Get)('/getallroomsbyuser'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "getAllrooms", null);
__decorate([
    (0, common_1.Patch)('/checkout/:id'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "checkout", null);
BookingController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('booking'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        typeorm_2.Repository])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map