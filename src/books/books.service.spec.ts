import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const bookData: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
      };

      const createdBook: Book = {
        id: 1,
        ...bookData,
      };
      jest
        .spyOn(service['bookRepository'], 'save')
        .mockResolvedValue(createdBook);

      const result = await service.create(bookData);

      expect(result).toEqual(createdBook);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
      ];

      // Mock the find method of the bookRepository to return the books
      jest.spyOn(service['bookRepository'], 'find').mockResolvedValue(books);

      const result = await service.findAll();

      expect(result).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const book: Book = { id: 1, title: 'Test Book', author: 'Test Author' };

      // Mock the findOne method of the bookRepository to return the book
      jest.spyOn(service['bookRepository'], 'findOne').mockResolvedValue(book);

      const result = await service.findOne(1);

      expect(result).toEqual(book);
    });

    it('should throw NotFoundException when book not found', async () => {
      // Mock the findOne method of the bookRepository to return null (book not found)
      jest.spyOn(service['bookRepository'], 'findOne').mockResolvedValue(null);

      // The service.findOne method should throw a NotFoundException
      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const bookDataToUpdate: Partial<Book> = {
        title: 'Updated Book Title',
        author: 'Updated Book Author',
      };
      const existingBook: Book = {
        id: 1,
        title: 'Old Book Title',
        author: 'Old Book Author',
      };

      // Mock the findOne and save methods of the bookRepository
      jest.spyOn(service, 'findOne').mockResolvedValue(existingBook);
      jest
        .spyOn(service['bookRepository'], 'save')
        .mockResolvedValue({ ...existingBook, ...bookDataToUpdate });

      const result = await service.update(1, bookDataToUpdate);

      expect(result).toEqual({ ...existingBook, ...bookDataToUpdate });
    });

    it('should throw NotFoundException when book not found', async () => {
      // Mock the findOne method of the bookRepository to return null (book not found)
      jest.spyOn(service['bookRepository'], 'findOne').mockResolvedValue(null);

      // The service.update method should throw a NotFoundException
      await expect(service.update(1, {})).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const existingBook: Book = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
      };

      // Mock the findOne and remove methods of the bookRepository
      jest.spyOn(service, 'findOne').mockResolvedValue(existingBook);
      jest
        .spyOn(service['bookRepository'], 'remove')
        .mockResolvedValue(undefined);

      const result = await service.remove(1);

      expect(result).toEqual('successfully deleted');
    });

    it('should return "found no book with that id" when book not found', async () => {
      // Mock the findOne method of the bookRepository to return null (book not found)
      jest.spyOn(service['bookRepository'], 'findOne').mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual('found no book with that id');
    });
  });
});

// Create a mock class for the Repository to be used in the Testing Module
class RepositoryMock {
  // Implement the necessary methods for testing purposes
  find = jest.fn();
  findOne = jest.fn();
  save = jest.fn();
  remove = jest.fn();
}
