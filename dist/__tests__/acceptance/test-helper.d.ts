import { Client } from '@loopback/testlab';
import { MicroCatalogApplication } from '../..';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: MicroCatalogApplication;
    client: Client;
}
