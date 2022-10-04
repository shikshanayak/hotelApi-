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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rooms_entity_1 = require("./rooms.entity");
let RoomsService = class RoomsService {
    constructor(roomsRepo) {
        this.roomsRepo = roomsRepo;
    }
    async addRoom(createRoomDto, user) {
        const exitingroom = this.roomsRepo.findOne({ where: { roomno: createRoomDto.roomno } });
        if (exitingroom)
            throw new common_1.BadRequestException("this room no already exist");
        const room = this.roomsRepo.create(createRoomDto);
        room.user = user.sub;
        room.IsAvailable = true;
        return this.roomsRepo.save(room);
    }
    async getrooms() {
        return await this.roomsRepo.find();
    }
    async updateRoom(id, data) {
        const index = await this.roomsRepo.findOne({ where: { id } });
        if (!index)
            throw new common_1.BadRequestException("user with id not found");
        Object.assign(index, data);
        return this.roomsRepo.save(index);
    }
    async deleteRoom(id) {
        const index = await this.roomsRepo.findOne({ where: { id } });
        if (!index)
            throw new common_1.BadRequestException("user with id not found");
        return this.roomsRepo.remove(index);
    }
    async deleteAll() {
        return this.roomsRepo.delete({});
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rooms_entity_1.Rooms)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map