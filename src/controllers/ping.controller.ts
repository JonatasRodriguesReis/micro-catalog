import {inject} from '@loopback/core';
import {ClassDecoratorFactory} from '@loopback/metadata';
import {repository} from '@loopback/repository';
import {
  get, post, Request, response,
  ResponseObject, RestBindings
} from '@loopback/rest';
import {uuid} from 'uuidv4';
import {CategoryRepository} from '../repositories';


/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

interface MyClassMetaData {
  name: string;
}

function myClassDecorator(spec: MyClassMetaData): ClassDecorator {
  const factory = new ClassDecoratorFactory<MyClassMetaData>(
    'metadata-my-class-decorator',
    spec
  );

  return factory.create();
}

/**
 * A simple controller to bounce back http requests
 */
@myClassDecorator({name: 'teste'})
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(CategoryRepository) private categoryRepository: CategoryRepository
  ) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @get('/categories')
  //@response(200, PING_RESPONSE)
  async index() {
    await this.categoryRepository.create({
      id: uuid().toString(),
      name: 'new-category',
      description: 'testando a primeira criação',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const result = await this.categoryRepository.find();
    return result;
  }

  @post('/new-category')
  //@response(200, PING_RESPONSE)
  async create() {
    const result = await this.categoryRepository.create({
      id: uuid().toString(),
      name: 'new-category',
      description: 'testando a primeira criação'
    });
    return result;
  }
}
