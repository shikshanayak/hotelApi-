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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(repo) {
        this.repo = repo;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        password = 'random_password';
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
    async comparepassword(password, hashPassword) {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    }
    async signup(email, password) {
        const existingEmail = await this.repo.findOne({ where: { email } });
        console.log(existingEmail);
        if (existingEmail)
            throw new common_1.BadRequestException("email already exist");
        const hashedpassword = await this.hashPassword(password);
        const user = this.repo.create({ email, password: hashedpassword });
        return await this.repo.save(user);
    }
    async signin(email, password) {
        const existingUser = await this.repo.findOne({ where: { email } });
        if (!existingUser)
            throw new common_1.NotFoundException('user not found');
        const ispasswordMatched = await this.comparepassword(password, existingUser.password);
        if (ispasswordMatched)
            throw new common_1.BadRequestException("password is not matched");
        if (existingUser) {
            return { accessToken: jwt.sign({ sub: existingUser.id, email: existingUser.email }, 'super_secret', { expiresIn: '5d' }) };
        }
        console.log(existingUser);
        return existingUser;
    }
    async UpdateUser(id, data) {
        const index = this.repo.findOne({ where: { id } });
        if (!index)
            throw new common_1.BadRequestException("user with this email not found");
        Object.assign(index, data);
        return this.repo.save(data);
    }
    async deleteUserById(id) {
        const index = await this.repo.findOne({ where: { id } });
        if (!index)
            throw new common_1.BadRequestException("user with this email not found");
        return this.repo.remove(index);
    }
    async deleteAll() {
        return this.repo.delete({});
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map