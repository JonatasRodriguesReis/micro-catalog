/// <reference types="express" />
import { Request } from '@loopback/rest';
import { CategoryRepository } from '../repositories';
/**
 * A simple controller to bounce back http requests
 */
export declare class PingController {
    private req;
    private categoryRepository;
    constructor(req: Request, categoryRepository: CategoryRepository);
    ping(): object;
    index(): Promise<(import("../models").Category & import("../models").CategoryRelations)[]>;
    create(): Promise<import("../models").Category>;
}
