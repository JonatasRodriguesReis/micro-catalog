import { ApplicationConfig, MicroCatalogApplication } from './application';
import './bootstrap';
export * from './application';
export declare function main(options?: ApplicationConfig): Promise<MicroCatalogApplication>;
