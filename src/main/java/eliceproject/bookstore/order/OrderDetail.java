package eliceproject.bookstore.order;

import eliceproject.bookstore.book.Book;
import jakarta.persistence.*;

@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;

    private int stock;

}
