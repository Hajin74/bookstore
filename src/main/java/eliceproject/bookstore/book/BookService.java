package eliceproject.bookstore.book;

import java.util.List;

public interface BookService {
    List<Book> findAll();

    Book findById(Long Id);

}
