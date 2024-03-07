package eliceproject.bookstore.book;

import eliceproject.bookstore.book.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService{
    private final BookRepository BookRepository;
    @Transactional(readOnly = true)
    @Override
    public List<Book> findAll() {
        return BookRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Book findById(Long id) {
        Book book = BookRepository.findById(id).orElseThrow();
        return book;
    }
}
