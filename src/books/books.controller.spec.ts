import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
      };
      const createdBook = { ...createBookDto, id: 1 };

      jest.spyOn(service, 'create').mockResolvedValue(createdBook);

      const result = await controller.create(createBookDto);

      expect(result).toEqual(createdBook);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books = [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(books);

      const result = await controller.findAll();

      expect(result).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      const book = { id: 1, title: 'Test Book', author: 'Test Author' };

      jest.spyOn(service, 'findOne').mockResolvedValue(book);

      const result = await controller.findOne('1');

      expect(result).toEqual(book);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        author: 'Updated Author',
      };
      // Create a mock book with the updated data
      const updatedBook: Book = {
        id: 1,
        title: 'Updated Book',
        author: 'Updated Author',
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedBook);

      const result = await controller.update('1', updateBookDto);

      // Assert the result
      expect(result).toEqual(updatedBook);

      // Verify that the service method was called with the correct arguments
      expect(service.update).toHaveBeenCalledWith(1, updateBookDto);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const removedBookId = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(removedBookId);

      expect(result).toBeUndefined();
    });
  });
});
