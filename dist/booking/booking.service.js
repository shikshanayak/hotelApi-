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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
const rooms_entity_1 = require("../rooms/rooms.entity");
const user_entity_1 = require("../user/user.entity");
let BookingService = class BookingService {
    constructor(bookingrepo, userrepo, roomrepo) {
        this.bookingrepo = bookingrepo;
        this.userrepo = userrepo;
        this.roomrepo = roomrepo;
    }
    async bookRoomByUser(roomno, user) {
        const existingRoom = await this.roomrepo.findOne({ where: { roomno } });
        if (!existingRoom)
            throw new common_2.BadRequestException("room is not added by admin");
        const roomnonew = this.bookingrepo.create({ roomno });
        roomnonew.user = user;
        roomnonew.status = "booked";
        existingRoom.IsAvailable = "booked";
        return this.bookingrepo.save(roomnonew);
    }
    async getAllAvailablerooms(user) {
        const availableRoom = await this.roomrepo.find({ where: { user: user } });
        if (!availableRoom)
            throw new common_2.BadRequestException("all rooms are booked");
        return this.bookingrepo.find();
    }
    async checkout(user) {
        const existingbooking = await this.bookingrepo.findOne({ where: { user: user, status: "booked" } });
        console.log(existingbooking);
        if (!existingbooking)
            throw new common_2.NotFoundException("this booking not found");
        existingbooking.status = "checked out";
        const existingroom = await this.roomrepo.findOne({ where: { user: user } });
        console.log(existingroom);
        if (!existingroom)
            throw new common_2.NotFoundException("room not not exist");
        existingroom.IsAvailable = "available";
        this.roomrepo.save(existingroom);
        return this.bookingrepo.save(existingbooking);
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(rooms_entity_1.Rooms)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map