import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/books/:id (GET)', () => {
    const bookId = 1;
    return request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.id).toBe(bookId);
      });
  });

  it('/books (POST)', () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
    };
    return request(app.getHttpServer())
      .post('/books')
      .send(bookData)
      .expect(201)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.title).toEqual(bookData.title);
        expect(response.body.author).toEqual(bookData.author);
        expect(response.body.id).toBeDefined();
      });
  });

  it('/books/:id (PUT)', () => {
    const bookId = 1;
    const updatedBookData = {
      title: 'Updated Book Title',
      author: 'Updated Book Author',
    };
    return request(app.getHttpServer())
      .put(`/books/${bookId}`)
      .send(updatedBookData)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.title).toEqual(updatedBookData.title);
        expect(response.body.author).toEqual(updatedBookData.author);
        expect(response.body.id).toEqual(bookId);
      });
  });

  it('/books/:id (DELETE)', () => {
    const bookId = 1;
    return request(app.getHttpServer())
      .delete(`/books/${bookId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual('successfully deleted');
      });
  });
});
