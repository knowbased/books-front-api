import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/db.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthorsModule,
    BooksModule,
    LoansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
