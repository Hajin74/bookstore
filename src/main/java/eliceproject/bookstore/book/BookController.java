package eliceproject.bookstore.book;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookRepository BookRepository;
    private final BookService BookService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBook() {
        List<Book> bookList = BookService.findAll();
        return new ResponseEntity<>(bookList, HttpStatus.OK);
    };

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBook(@PathVariable(name = "bookId") Long bookId) {

        Book book = BookService.findById(bookId);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }
}
