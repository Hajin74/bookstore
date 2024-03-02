package eliceproject.bookstore.order;

import eliceproject.bookstore.book.Book;
import eliceproject.bookstore.book.BookRepository;
import eliceproject.bookstore.order.dto.OrderBookRequest;
import eliceproject.bookstore.order.dto.OrderRequest;
import eliceproject.bookstore.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Transactional
    @Override
    public Order create(OrderRequest orderRequest) {
        Order order = new Order();
        order.setUser(userRepository.findById(orderRequest.getUserId()).orElseThrow());

        for (OrderBookRequest orderBookRequest : orderRequest.getOrderBookRequestList()) {
            OrderBook orderBook = new OrderBook();
            orderBook.setOrder(order);
            orderBook.setBook(bookRepository.findById(orderBookRequest.getBookId()).orElseThrow());
            order.addOrderBook(orderBook);
        }

        return orderRepository.save(order);
    }

}
