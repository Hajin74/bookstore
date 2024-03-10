package eliceproject.bookstore.order;

import eliceproject.bookstore.address.AddressRepository;
import eliceproject.bookstore.book.Book;
import eliceproject.bookstore.book.BookRepository;
import eliceproject.bookstore.exception.OutOfStockException;
import eliceproject.bookstore.order.dto.OrderBookRequest;
import eliceproject.bookstore.order.dto.OrderDTO;
import eliceproject.bookstore.order.dto.OrderRequest;
import eliceproject.bookstore.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final AddressRepository addressRepository;

    @Transactional
    @Override
    public Order create(OrderRequest orderRequest) throws OutOfStockException {
        Order order = new Order();
        order.setUser(userRepository.findById(orderRequest.getUserId()).orElseThrow());
        order.setAddress(addressRepository.findById(orderRequest.getAddressId()).orElseThrow());
        order.setOrderStatus(OrderStatus.READY_FOR_SHIPPING);
        order.setOrderDate(LocalDateTime.now());

        for (OrderBookRequest orderBookRequest : orderRequest.getOrderBookRequestList()) {
            Book book = bookRepository.findById(orderBookRequest.getBookId()).orElseThrow();
            if (book.getStock() < orderBookRequest.getStock()) {
                throw new OutOfStockException("Not enough stocks for book : " + book.getId());
            }

            book.setStock(orderBookRequest.getStock());
            bookRepository.save(book);

            OrderBook orderBook = new OrderBook();
            orderBook.setOrder(order);
            orderBook.setStock(orderBookRequest.getStock());
            orderBook.setBook(bookRepository.findById(orderBookRequest.getBookId()).orElseThrow());
            order.addOrderBook(orderBook);
        }

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    @Override
    public List<OrderDTO> findAll() {
       List<Order> orderList = orderRepository.findAll();
       return orderList.stream()
               .map(OrderDTO::toDTO)
               .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public Order findById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id : " + orderId));
    }

    @Transactional(readOnly = true)
    @Override
    public List<OrderDTO> findByUserId(Long userId) {
        List<Order> orderList = orderRepository.findByUserId(userId);
        return orderList.stream()
                .map(OrderDTO::toDTO)
                .collect(Collectors.toList());
    }

}
