import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(bookData: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(bookData);
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, bookData: Partial<Book>): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, bookData);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<string> {
    const book = await this.findOne(id);
    if (!book) {
      return 'found no book with that id';
    }
    await this.bookRepository.remove(book);
    return 'successfully deleted ';
  }
}
